import { ApplicationScreen } from "../entities/application-screen";

interface ApplicationProviderPort {
  createApplication(userId: string): Promise<ApplicationScreen>;
}

export default ApplicationProviderPort;
