import { EndNode, StartNode, Workflow, WorkflowContext } from "myLibrary";
import { PrintDataNode } from "./printNode";
import { ApplicationRepositoryPort } from "../../../repository/application.repository.port";
import { CollectIncomeNode } from "./collect-income.node";

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
  collectIncome: CollectIncomeNode;
  print: PrintDataNode;
  end: EndNode;
};

export function createNodes(deps: WorkflowDeps): WorkflowNodes {
  return {
    start: new StartNode(),
    collectIncome: new CollectIncomeNode(),
    print: new PrintDataNode(),
    end: new EndNode(),
  };
}

export function registerNodes(workflow: Workflow, nodes: WorkflowNodes): void {
  workflow.addNode(nodes.start);
  workflow.addNode(nodes.collectIncome);
  workflow.addNode(nodes.print);
  workflow.addNode(nodes.end);
}
