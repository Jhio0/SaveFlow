import { Workflow, WorkflowEngine } from "myLibrary";
import { createNodes, registerNodes } from "./nodes";
import { registerEdges } from "./edges/edges";

const workflow = new Workflow();
const nodes = createNodes();

registerNodes(workflow, nodes);
registerEdges(workflow, nodes);

export const engine = new WorkflowEngine(workflow, {
  context: {},
  results: [],
  completed: false,
  currentNodeId: nodes.start.id,
});
