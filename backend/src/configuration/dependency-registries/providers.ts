// ******** THIS FILE IS GENERATED, MANUAL CHANGES WILL BE OVERWRITTEN ******** //

import { DependencyRegistry } from 'myLibrary';
import { ApplicationProviderAdapter } from '../../domain/provider/application.provider.adapter';
import { SubmitIncomeNodeHandlerProviderAdapter } from '../../domain/provider/node-handlers/submit-income-node-handler.provider.adapter';
import { SubmitCollectedExpenseDataProviderAdapter } from '../../domain/provider/node-handlers/submit-collected-expense-data.provider.adapter';
import { AuthProviderAdapter } from '../../domain/provider/auth/auth.provider.adapter';

function registerProviders(this: DependencyRegistry): void {
  ApplicationProviderAdapter;
  SubmitIncomeNodeHandlerProviderAdapter;
  SubmitCollectedExpenseDataProviderAdapter;
  AuthProviderAdapter;
}

export { registerProviders };
