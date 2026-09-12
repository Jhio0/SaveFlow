import { DependencyRegistry } from "myLibrary";
import { registerRepositorys } from "./dependency-registries/repositorys";
import { registerProviders } from "./dependency-registries/providers";

let dependencyRegistry: DependencyRegistry;

const getDependencyRegistry = (): DependencyRegistry => {
  if (!dependencyRegistry) {
    dependencyRegistry = new DependencyRegistry([
      registerRepositorys,
      registerProviders,
    ]);
  }
  return dependencyRegistry;
};

export { getDependencyRegistry };
