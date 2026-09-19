import { ApplicationScreen } from "../../entities/application";
import { SumbitScreenResponse } from "../application.provider.port";

export type handleIncomeNodeHandlerInput = {
  applicationId: string;
  incomeAmount: number;
};

interface SubmitIncomeNodeHandlerProviderPort {
  handleIncomeNodeHandler(
    input: handleIncomeNodeHandlerInput,
  ): Promise<SumbitScreenResponse>;
}

export default SubmitIncomeNodeHandlerProviderPort;
