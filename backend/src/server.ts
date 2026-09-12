import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { Mongoose } from "mongoose";

import { createResolvers } from "./application/api/customer/resolver";
import { getDependencyRegistry } from "./configuration/dependency-registry";
import { buildContext } from "myLibrary";
import { typeDefs } from "./application/api/customer/schema/index";

async function initializeDatabase(): Promise<Mongoose> {
  const dependencyRegistry = getDependencyRegistry();
  const mongooseInstance = dependencyRegistry.resolve(Mongoose);
  await mongooseInstance.connect(mongooseInstance.connectionString);
  console.log("✅ Database connected");
  return mongooseInstance;
}

function initializeApolloServer(): ApolloServer {
  const resolvers = createResolvers();

  const server = new ApolloServer({
    typeDefs,
    resolvers,

    // context: Apollo calls this function for EVERY incoming request.
    // The return value is passed as the third argument to all resolvers.
    // This is where "middleware" happens in Apollo — not Express middleware,
    // but the same concept: code that runs before your business logic.
    context: buildContext,
  });

  return server;
}

async function initializeServer(): Promise<void> {
  try {
    await initializeDatabase();
    const server = initializeApolloServer();
    const { url } = await server.listen({ port: 5000 });
    console.log(`🚀 Server running at ${url}`);
  } catch (error) {
    console.error("❌ Failed to initialize server:", error);
    process.exit(1);
  }
}

initializeServer();
