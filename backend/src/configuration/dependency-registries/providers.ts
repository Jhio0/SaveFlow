// ******** THIS FILE IS GENERATED, MANUAL CHANGES WILL BE OVERWRITTEN ******** //

import { DependencyRegistry } from 'myLibrary';
import { ApplicationProviderAdapter } from '../../domain/provider/application.provider.adapter';
import { AuthProviderAdapter } from '../../domain/provider/auth/auth.provider.adapter';

function registerProviders(this: DependencyRegistry): void {
  ApplicationProviderAdapter;
  AuthProviderAdapter;
}

export { registerProviders };
