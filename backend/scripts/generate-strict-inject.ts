import { glob } from "glob";
import * as path from "path";
import * as fs from "fs";

/**
 * Build Script for strict-inject System
 *
 * This script automatically:
 * 1. Scans for decorators (@Repository, @Provider, @Producer, etc.)
 * 2. Generates token enums
 * 3. Creates strict-inject wrapper
 * 4. Generates registration files
 * 5. Updates dependency registry
 * 6. Discovers @Resolver classes and generates GraphQL resolver index
 * 7. Fails the build if a Query/Mutation schema field has no resolver
 */

type GraphQLRootType = "Query" | "Mutation";

interface ResolverInfo {
  className: string;
  filePath: string;
  rootType: GraphQLRootType;
  methods: string[];
}

interface TokenInfo {
  name: string;
  category: string;
  filePath: string;
  className: string;
}

interface DecoratorInfo {
  decorator: string;
  name: string;
  category: string;
  filePath: string;
  className: string;
}

class StrictInjectGenerator {
  private srcDir = "./src";
  private outputDir = "./src/lib";
  private resolverDir = "./src/application/api/customer/resolver";
  private tokens: TokenInfo[] = [];
  private decorators: DecoratorInfo[] = [];
  private resolvers: ResolverInfo[] = [];

  async generate() {
    console.log("🚀 Starting strict-inject generation...");

    // Step 1: Scan for decorators
    await this.scanDecorators();

    // Step 2: Generate token files
    await this.generateTokenFiles();

    // Step 3: Generate strict-inject wrapper
    await this.generateStrictInject();

    // Step 4: Generate registration files
    await this.generateRegistrationFiles();

    // Step 5: Discover GraphQL resolvers and fail if schema fields are missing
    await this.scanResolvers();
    await this.generateResolverIndex();
    this.assertResolverCoverage();

    console.log("✅ strict-inject generation complete!");
  }

  private async scanDecorators() {
    console.log("📡 Scanning for decorators...");

    const patterns = [
      "**/*.repository.adapter.ts",
      "**/*.provider.adapter.ts",
      "**/*.producer.adapter.ts",
      "**/*.repository.hook.ts",
    ];

    for (const pattern of patterns) {
      const files = await glob(pattern, { cwd: this.srcDir });

      for (const file of files) {
        const filePath = path.join(this.srcDir, file);
        const content = fs.readFileSync(filePath, "utf8");

        // Scan for @Repository decorators
        const repositoryMatch = content.match(
          /@Repository\s*\(\s*['"`]([^'"`]+)['"`]/,
        );
        if (repositoryMatch) {
          const className = this.extractClassName(content);
          this.decorators.push({
            decorator: "Repository",
            name: repositoryMatch[1] + "Repository",
            category: "Repository",
            className,
            filePath: file,
          });
        }

        // Scan for @Provider decorators
        const providerMatch = content.match(
          /@Provider(?:\s*\(\s*['"`]([^'"`]+)['"`]?[^)]*\))?/,
        );
        if (providerMatch) {
          const className = this.extractClassName(content);
          this.decorators.push({
            decorator: "Provider",
            name: providerMatch[1] || className,
            category: "Provider",
            className,
            filePath: file,
          });
        }

        // // Scan for @Producer decorators
        // const producerMatch = content.match(/@Producer\s*\(\s*['"`]([^'"`]+)['"`]/);
        // if (producerMatch) {
        //     const className = this.extractClassName(content);
        //     this.decorators.push({
        //         decorator: 'Producer',
        //         name: producerMatch[1],
        //         category: 'Producer',
        //         className,
        //         filePath: file,
        //     });
        // }
      }
    }

    console.log(`Found ${this.decorators.length} decorators`);
  }

  private extractClassName(content: string): string {
    const classMatch = content.match(/class\s+(\w+)/);
    return classMatch ? classMatch[1] : "Unknown";
  }

  private async generateTokenFiles() {
    console.log("🔑 Generating token files...");

    // Group decorators by category
    const categories = this.groupByCategory();

    for (const [category, decorators] of Object.entries(categories)) {
      await this.generateTokenFile(category, decorators);
    }
  }

  private groupByCategory() {
    const categories: { [key: string]: DecoratorInfo[] } = {};

    for (const decorator of this.decorators) {
      if (!categories[decorator.category]) {
        categories[decorator.category] = [];
      }
      categories[decorator.category].push(decorator);
    }

    return categories;
  }

  private async generateTokenFile(
    category: string,
    decorators: DecoratorInfo[],
  ) {
    const tokenName = `${category}Tokens`;
    const typeName = `${category}TokensType`;

    const enumContent = decorators
      .map((d) => `  ${d.name} = '${d.name}',`)
      .join("\n");

    const content = `// ******** THIS FILE IS GENERATED, MANUAL CHANGES WILL BE OVERWRITTEN ******** //

enum ${tokenName} {
${enumContent}
}

type ${typeName} = keyof typeof ${tokenName};

export { ${tokenName}, ${typeName} };
        `;

    const outputPath = path.join(
      this.outputDir,
      "injection-tokens",
      `${category.toLowerCase()}-tokens.ts`,
    );

    // Get the directory (folder) part of the path
    const outputDir = path.dirname(outputPath);

    // Make sure the directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, content);

    console.log(`Generated ${outputPath}`);
  }

  private async generateStrictInject() {
    console.log("💉 Generating strict-inject wrapper...");

    const categories = Object.keys(this.groupByCategory());
    const imports = categories
      .map(
        (cat) =>
          `import { ${cat}TokensType } from './injection-tokens/${cat.toLowerCase()}-tokens';`,
      )
      .join("\n");

    const unionType = categories
      .map((cat) => `${cat}TokensType`)
      .join("\n  | ");

    const content = `// ******** THIS FILE IS GENERATED, MANUAL CHANGES WILL BE OVERWRITTEN ******** //
        
${imports}
const tsyringe_ = require("tsyringe");

function _inject(token: string) {
    return(0, tsyringe_.inject)(token)
}

function strictInjectDecoratorFactory<T>(){
    return _inject
}

const inject = strictInjectDecoratorFactory<
${unionType}
>();

export { inject};
            `;

    const outputPath = path.join(this.outputDir, "strict-inject.ts");
    fs.writeFileSync(outputPath, content);

    console.log(`Generated ${outputPath}`);
  }

  private async generateRegistrationFiles() {
    console.log("📝 Generating registration files...");

    const categories = this.groupByCategory();

    for (const [category, decorators] of Object.entries(categories)) {
      await this.generateRegistrationFile(category, decorators);
    }
  }

  private async generateRegistrationFile(
    category: string,
    decorators: DecoratorInfo[],
  ) {
    const functionName = `register${category}s`;

    // Determine if this category needs Mongoose (only Repository)
    const needsMongoose = category === "Repository";

    // Import each decorator class
    const imports = decorators
      .map((d) => {
        const normalizedPath = d.filePath
          .replace(/\\/g, "/")
          .replace(/\.ts$/, "");
        return `import { ${d.className} } from '../../${normalizedPath}';`;
      })
      .join("\n");

    // Conditional Mongoose imports
    const mongooseImports = needsMongoose
      ? `import { DependencyRegistry, createMongoose, instanceCachingFactory } from 'myLibrary';
import config from "config-dug";
import { Mongoose } from "mongoose";`
      : `import { DependencyRegistry } from 'myLibrary';`;

    // Conditional Mongoose registration
    const mongooseRegistration = needsMongoose
      ? ` this.container.register(Mongoose, {
    useFactory: instanceCachingFactory(() =>
      createMongoose(config.MONGO_CONNECTION_STRING as string)
    ),
  });`
      : "";

    // Decorator registrations
    const registrations = decorators.map((d) => `  ${d.className};`).join("\n");

    // Full file content
    const content = `// ******** THIS FILE IS GENERATED, MANUAL CHANGES WILL BE OVERWRITTEN ******** //

${mongooseImports}
${imports}

function ${functionName}(this: DependencyRegistry): void {${mongooseRegistration}
${registrations}
}

export { ${functionName} };
`;

    // Write the file
    const outputPath = path.join(
      "./src/configuration/dependency-registries",
      `${category.toLowerCase()}s.ts`,
    );
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, content);

    console.log(`Generated ${outputPath}`);
  }

  private async scanResolvers() {
    console.log("🔎 Scanning for GraphQL @Resolver classes...");

    const files = await glob("**/*.resolver.ts", { cwd: this.resolverDir });
    files.sort();

    if (files.length === 0) {
      throw new Error(
        `No *.resolver.ts files found under ${this.resolverDir}.`,
      );
    }

    for (const file of files) {
      const filePath = path.join(this.resolverDir, file);
      const content = fs.readFileSync(filePath, "utf8");
      const normalized = file.replace(/\\/g, "/");

      if (!/@Resolver\b/.test(content)) {
        throw new Error(
          `Resolver file '${normalized}' is not included: add @Resolver so pnpm build can register it.`,
        );
      }

      let rootType: GraphQLRootType;
      if (normalized.includes(".query.resolver.")) {
        rootType = "Query";
      } else if (normalized.includes(".mutation.resolver.")) {
        rootType = "Mutation";
      } else {
        throw new Error(
          `Resolver file '${normalized}' is not included: name it *.query.resolver.ts or *.mutation.resolver.ts so pnpm build knows whether to attach its methods to Query or Mutation.`,
        );
      }

      const className = this.extractClassName(content);
      if (className === "Unknown") {
        throw new Error(
          `Resolver file '${normalized}' is not included: could not find an exported class.`,
        );
      }

      this.resolvers.push({
        className,
        filePath: normalized,
        rootType,
        methods: this.extractResolverMethods(content, normalized),
      });
    }

    console.log(`Found ${this.resolvers.length} resolver classes`);
  }

  private extractResolverMethods(content: string, filePath: string): string[] {
    const stripped = content
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/.*$/gm, "");

    const classBodyMatch = stripped.match(
      /export\s+class\s+\w+[\s\S]*?\{([\s\S]*)\}\s*$/,
    );

    if (!classBodyMatch) {
      throw new Error(
        `Resolver file '${filePath}' is not included: could not parse class body.`,
      );
    }

    const methods: string[] = [];
    const methodRegex =
      /^  (?:public\s+|private\s+|protected\s+)?(?:async\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*\(/gm;
    const body = classBodyMatch[1];
    let match: RegExpExecArray | null;

    while ((match = methodRegex.exec(body)) !== null) {
      const name = match[1];
      if (name !== "constructor") {
        methods.push(name);
      }
    }

    if (methods.length === 0) {
      throw new Error(
        `Resolver class in '${filePath}' is not included: it has no GraphQL field methods.`,
      );
    }

    return methods;
  }

  private async generateResolverIndex() {
    console.log("🧩 Generating GraphQL resolver index...");

    const byType: Record<GraphQLRootType, ResolverInfo[]> = {
      Query: [],
      Mutation: [],
    };

    for (const resolver of this.resolvers) {
      byType[resolver.rootType].push(resolver);
    }

    const imports = this.resolvers
      .map((resolver) => {
        const importPath = `./${resolver.filePath.replace(/\.ts$/, "")}`;
        return `import { ${resolver.className} } from "${importPath}";`;
      })
      .join("\n");

    const formatList = (items: ResolverInfo[]) =>
      items.length === 0
        ? ""
        : items.map((item) => `      ${item.className},`).join("\n");

    const content = `// ******** THIS FILE IS GENERATED, MANUAL CHANGES WILL BE OVERWRITTEN ******** //

import { buildResolvers } from "myLibrary";
${imports}

export function createResolvers() {
  return buildResolvers({
    Query: [
${formatList(byType.Query)}
    ],
    Mutation: [
${formatList(byType.Mutation)}
    ],
  });
}
`;

    const outputPath = path.join(this.resolverDir, "index.ts");
    fs.writeFileSync(outputPath, content);
    console.log(`Generated ${outputPath}`);
  }

  private assertResolverCoverage() {
    console.log("🧪 Checking Query/Mutation fields have resolvers...");

    const { makeExecutableSchema } = require("@graphql-tools/schema");
    const { typeDefs } = require(path.resolve(
      __dirname,
      "../src/application/api/customer/schema/index.ts",
    ));

    const schema = makeExecutableSchema({ typeDefs });
    const methodsByType: Record<GraphQLRootType, Set<string>> = {
      Query: new Set(),
      Mutation: new Set(),
    };

    for (const resolver of this.resolvers) {
      for (const method of resolver.methods) {
        methodsByType[resolver.rootType].add(method);
      }
    }

    const missing: string[] = [];

    for (const rootType of ["Query", "Mutation"] as GraphQLRootType[]) {
      const graphqlType =
        rootType === "Query" ? schema.getQueryType() : schema.getMutationType();

      if (!graphqlType) {
        continue;
      }

      for (const fieldName of Object.keys(graphqlType.getFields())) {
        if (!methodsByType[rootType].has(fieldName)) {
          missing.push(`${rootType}.${fieldName}`);
        }
      }
    }

    if (missing.length === 0) {
      return;
    }

    throw new Error(
      [
        "GraphQL resolver coverage failed. Apollo has no resolver for:",
        ...missing.map((field) => `  - ${field}`),
        "",
        "That is the same bug as:",
        '  "Cannot return null for non-nullable field Mutation.<name>."',
        "",
        "Fix: add a method named exactly after the schema field on a @Resolver class in",
        "src/application/api/customer/resolver/*.query.resolver.ts or *.mutation.resolver.ts.",
        "pnpm build scans those files and generates resolver/index.ts; do not register resolvers by hand.",
      ].join("\n"),
    );
  }
}

// Run the generator
async function main() {
  const generator = new StrictInjectGenerator();
  await generator.generate();
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
