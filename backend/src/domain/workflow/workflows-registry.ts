import {
  injectable,
  StartNode,
  Workflow,
  WorkflowEngine,
  WorkflowState,
} from "myLibrary";

import { ApplicationRepositoryPort } from "../repository/application.repository.port";
import { inject } from "../../lib/strict-inject";
import { RepositoryTokens } from "../../lib/injection-tokens/repository-tokens";
import { buildFirstWorkflow } from "./first_workflow/engine";

@injectable()
export class WorkflowRegistry {
  public readonly engine: WorkflowEngine;
  private readonly workflows = new Map<string, Workflow>();

  constructor(
    @inject(RepositoryTokens.ApplicationRepository)
    private applicationRepositoryPort: ApplicationRepositoryPort,
  ) {
    this.engine = new WorkflowEngine();

    this.register(
      "first_workflow",
      buildFirstWorkflow({
        applicationRepository: this.applicationRepositoryPort,
      }),
    );

    // future workflows just get added here, nowhere else:
    // this.register("appeal_workflow", buildAppealWorkflow({ ... }));
  }

  private register(workflowId: string, workflow: Workflow): void {
    this.engine.registerWorkflow(workflowId, workflow);
    this.workflows.set(workflowId, workflow);
  }

  private getWorkflow(workflowId: string): Workflow {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) throw new Error(`Unknown workflow: ${workflowId}`);
    return workflow;
  }

  // Builds a fresh, valid initial state for starting a brand-new applicationwo

  // need to refactor this overall beacuse eac applicaiton in future mught have a different context overall and what we can do is based on the workflowId we can dteremine waht context it need's to build overall
  createInitialState(): WorkflowState {
    return {
      context: {},
      currentNodeId: StartNode.NODE_ID,
      results: [],
      completed: false,
    };
  }
}
