import {
  getCurrentScreen,
  Provider,
  WorkflowContext,
  WorkflowEngine,
} from "myLibrary";
import { ApplicationScreen, ApplicationStatus } from "../entities/application";

import { RepositoryTokens } from "../../lib/injection-tokens/repository-tokens";
import { ApplicationRepositoryPort } from "../repository/application.repository.port";
import { createApplicationWorkflowEngine } from "../workflow/first_workflow/engine";
import { inject } from "../../lib/strict-inject";
import ApplicationProviderPort from "./application.provider.port";
import { nodeIdToScreen } from "../entities/application-screen";

@Provider
export class ApplicationProviderAdapter implements ApplicationProviderPort {
  private engine: WorkflowEngine;

  constructor(
    @inject(RepositoryTokens.ApplicationRepository)
    private applicationRepositoryPort: ApplicationRepositoryPort,
  ) {
    this.engine = createApplicationWorkflowEngine({
      applicationRepository: this.applicationRepositoryPort,
    });
  }

  async createApplication(userId: string): Promise<ApplicationScreen> {
    const state = await this.engine.run();

    const application = await this.applicationRepositoryPort.create({
      userId,
      workflowContext: {
        context: state.context,
        currentNodeId: state.currentNodeId,
      },
      status: ApplicationStatus.IN_PROGRESS,
    });

    this.engine = createApplicationWorkflowEngine(
      {
        applicationRepository: this.applicationRepositoryPort,
      },
      {
        context: application.workflowContext.context,
        currentNodeId: application.workflowContext.currentNodeId,
        results: [],
        completed: false,
      },
    );

    return getCurrentScreen(nodeIdToScreen, state);
  }

  async submitScreen<T extends WorkflowContext>(
    applicationId: string,
    data: T,
  ): Promise<ApplicationScreen> {
    const application =
      await this.applicationRepositoryPort.findById(applicationId);

    if (!application.screen) {
      throw new Error("context screen is undefined, cannot be undefined");
    }

    const state = await this.engine.storeCollectedData(data);

    await this.applicationRepositoryPort.updateOne(applicationId, {
      workflowContext: {
        context: state.context,
        currentNodeId: state.currentNodeId,
      },
      ...(state.completed
        ? { status: ApplicationStatus.IN_PROGRESS }
        : { status: ApplicationStatus.COMPLETED }),
    });

    if (state.completed) {
      return ApplicationScreen.CompletedScreen;
    }

    return getCurrentScreen(nodeIdToScreen, state);
  }
}
