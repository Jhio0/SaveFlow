import { EndNode, StartNode, Workflow } from "myLibrary";
import { FetchDataNode } from "./FetchDataNode";
import { PrintDataNode } from "./printNode";

export type WorkflowNodes = {
  start: StartNode;
  fetch: FetchDataNode;
  print: PrintDataNode;
  end: EndNode;
};

export function createNodes(): WorkflowNodes {
  return {
    start: new StartNode(),
    fetch: new FetchDataNode(),
    print: new PrintDataNode(),
    end: new EndNode(),
  };
}

export function registerNodes(workflow: Workflow, nodes: WorkflowNodes): void {
  workflow.addNode(nodes.start);
  workflow.addNode(nodes.fetch);
  workflow.addNode(nodes.print);
  workflow.addNode(nodes.end);
}
