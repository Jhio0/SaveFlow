import { ApplicationScreen } from "../entities/application";
import { ExpenseItems } from "../entities/collected-expsense-data";
import { SumbitScreenResponse } from "./application.provider.port";

export type handleExpenseNodeInput = {
  applicationId: string;
  items: ExpenseItems[];
};

export interface CollectedExpenseDataProviderPort {
  handleExpenseNode(
    input: handleExpenseNodeInput,
  ): Promise<SumbitScreenResponse>;
}
