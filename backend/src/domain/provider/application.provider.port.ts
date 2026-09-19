import { WorkflowContext } from "myLibrary";
import { ApplicationPayload, ApplicationScreen } from "../entities/application";

interface ApplicationProviderPort {
  createApplication(userId: string): Promise<ApplicationScreen>;
  submitScreen<T extends WorkflowContext>(
    applicationId: string,
    data: T,
  ): Promise<ApplicationPayload>;
}

export default ApplicationProviderPort;
