import { WorkflowContext } from "myLibrary";
import { ApplicationScreen } from "../entities/application";

interface ApplicationProviderPort {
  createApplication(userId: string): Promise<ApplicationScreen>;
  submitScreen<T extends WorkflowContext>(
    applicationId: string,
    data: T,
  ): Promise<ApplicationScreen>;
}

export default ApplicationProviderPort;
