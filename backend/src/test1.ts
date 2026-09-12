import "reflect-metadata";
import { engine } from "./domain/workflow/first_workflow/engine";

(async () => {
  console.log("=== Initial Run ===");
  await engine.run();

  console.log("=== Store Collected Data for Async Node ===");
  const result = await engine.storeCollectedData({ data: "async override" });

  console.log(JSON.stringify(result.context));
  console.log(JSON.stringify(result.currentNodeId));
})();
