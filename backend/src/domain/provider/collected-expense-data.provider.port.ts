import { ApplicationScreen } from "../entities/application";
import { ExpenseItems } from "../entities/collected-expsense-data";

export type handleExpenseNodeInput = {
  applicationId: string;
  items: ExpenseItems[];
};

export interface CollectedExpenseDataProviderPort {
  handleExpenseNode(input: handleExpenseNodeInput): Promise<ApplicationScreen>;
}
