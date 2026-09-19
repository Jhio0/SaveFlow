import {
  getCurrentScreen,
  Provider,
  WorkflowContext,
  WorkflowEngine,
  WorkflowState,
} from "myLibrary";
import {
  ApplicationPayload,
  ApplicationScreen,
  ApplicationStatus,
} from "../entities/application";

import { RepositoryTokens } from "../../lib/injection-tokens/repository-tokens";
import { ApplicationRepositoryPort } from "../repository/application.repository.port";
import { inject } from "../../lib/strict-inject";
import ApplicationProviderPort from "./application.provider.port";
import { nodeIdToScreen, screenToNodeId } from "../entities/application-screen";

import { WorkflowRegistry } from "../workflow/workflows-registry";

const FIRST_WORKFLOW_ID = "first_workflow"; // definelty replace this since we can get theworkflowId in the applicaiton itself
@Provider
export class ApplicationProviderAdapter implements ApplicationProviderPort {
  constructor(
    @inject(RepositoryTokens.ApplicationRepository)
    private applicationRepositoryPort: ApplicationRepositoryPort,
    private workflowRegistry: WorkflowRegistry,
  ) {}

  async createApplication(userId: string): Promise<ApplicationScreen> {
    const initialState: WorkflowState =
      this.workflowRegistry.createInitialState();

    const state = await this.workflowRegistry.engine.run(
      FIRST_WORKFLOW_ID,
      initialState,
    );

    await this.applicationRepositoryPort.create({
      userId,
      workflowContext: {
        context: state.context,
        currentNodeId: state.currentNodeId,
      },
      status: ApplicationStatus.IN_PROGRESS,
    });

    return getCurrentScreen(nodeIdToScreen, state);
  }

  async submitScreen<T extends WorkflowContext>(
    applicationId: string,
    data: T,
  ): Promise<ApplicationPayload> {
    const application =
      await this.applicationRepositoryPort.findById(applicationId);

    if (!application.workflowContext.context.screen) {
      throw new Error("context screen is undefined, cannot be undefined");
    }

    const state = await this.workflowRegistry.engine.storeCollectedData(
      FIRST_WORKFLOW_ID,
      {
        context: application.workflowContext.context,
        currentNodeId: application.workflowContext.currentNodeId,
        results: [],
        completed: false,
      },
      data,
    );

    await this.applicationRepositoryPort.updateOne(applicationId, {
      workflowContext: {
        context: state.context,
        currentNodeId: state.currentNodeId,
      },
      ...(state.completed
        ? { status: ApplicationStatus.COMPLETED }
        : { status: ApplicationStatus.IN_PROGRESS }),
    });

    if (state.completed) {
      return {
        screen: ApplicationScreen.CompletedScreen,
        context: state.context,
      };
    }

    const screen = getCurrentScreen(nodeIdToScreen, state);

    return {
      screen,
      context: state.context,
    };
  }
}
