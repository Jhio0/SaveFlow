import { WorkflowContext } from "myLibrary";
import { ApplicationScreen } from "../entities/application";

export type SumbitScreenResponse = {
  screen: ApplicationScreen;
  context: WorkflowContext;
};

interface ApplicationProviderPort {
  createApplication(userId: string): Promise<ApplicationScreen>;
  submitScreen<T extends WorkflowContext>(
    applicationId: string,
    data: T,
  ): Promise<SumbitScreenResponse>;
}

export default ApplicationProviderPort;
