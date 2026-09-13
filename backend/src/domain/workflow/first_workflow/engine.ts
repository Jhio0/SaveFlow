import { Workflow, WorkflowEngine } from "myLibrary";
import {
  createNodes,
  registerNodes,
  WorkflowDeps,
  WorkflowIntialContext,
} from "./nodes";
import { registerEdges } from "./edges/edges";

export function createApplicationWorkflowEngine(
  deps: WorkflowDeps,
  initialContext?: WorkflowIntialContext,
): WorkflowEngine {
  const workflow = new Workflow();
  const nodes = createNodes(deps);

  registerNodes(workflow, nodes);
  registerEdges(workflow, nodes);

  return new WorkflowEngine(workflow, {
    context: initialContext?.context ?? {},
    results: initialContext?.results ?? [],
    completed: initialContext?.completed ?? false,
    currentNodeId: initialContext?.currentNodeId ?? nodes.start.id, // ← uses initialState if provided
  });
}
