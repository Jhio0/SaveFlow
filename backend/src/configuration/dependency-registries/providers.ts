// ******** THIS FILE IS GENERATED, MANUAL CHANGES WILL BE OVERWRITTEN ******** //

import { DependencyRegistry } from 'myLibrary';
import { CollectedExpenseDataProviderAdapter } from '../../domain/provider/collected-expense-data.provider.adapter';
import { ApplicationProviderAdapter } from '../../domain/provider/application.provider.adapter';
import { AuthProviderAdapter } from '../../domain/provider/auth/auth.provider.adapter';
import { SubmitIncomeNodeHandlerProviderAdapter } from '../../domain/provider/node-handlers/submit-income-node-handler.provider.adapter';

function registerProviders(this: DependencyRegistry): void {
  CollectedExpenseDataProviderAdapter;
  ApplicationProviderAdapter;
  AuthProviderAdapter;
  SubmitIncomeNodeHandlerProviderAdapter;
}

export { registerProviders };
