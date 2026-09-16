import { ApplicationScreen } from "../entities/application";
import { ExpenseItems } from "../entities/collected-expsense-data";

export type handleExpenseNodeInput = ExpenseItems & {
  applicationId: string;
};

export interface CollectedExpenseDataProviderPort {
  handleExpenseNode(input: handleExpenseNodeInput): Promise<ApplicationScreen>;
}
