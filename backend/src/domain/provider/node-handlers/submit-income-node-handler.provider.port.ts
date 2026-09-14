import { ApplicationScreen } from "../../entities/application";

export type handleIncomeNodeHandlerInput = {
  applicationId: string;
  incomeAmount: number;
};

interface SubmitIncomeNodeHandlerProviderPort {
  handleIncomeNodeHandler(
    input: handleIncomeNodeHandlerInput,
  ): Promise<ApplicationScreen>;
}

export default SubmitIncomeNodeHandlerProviderPort;
