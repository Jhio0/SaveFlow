import { EndNode, StartNode, Workflow, WorkflowContext } from "myLibrary";
import { FetchDataNode } from "./FetchDataNode";
import { PrintDataNode } from "./printNode";
import { ApplicationRepositoryPort } from "../../../repository/application.repository.port";

export type WorkflowDeps = {
  applicationRepository: ApplicationRepositoryPort;
};

export type WorkflowIntialContext = {
  context: WorkflowContext;
  currentNodeId: string;
  results: [];
  completed: boolean;
};

export type WorkflowNodes = {
  start: StartNode;
  fetch: FetchDataNode;
  print: PrintDataNode;
  end: EndNode;
};

export function createNodes(deps: WorkflowDeps): WorkflowNodes {
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
