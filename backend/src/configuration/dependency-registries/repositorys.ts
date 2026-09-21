// ******** THIS FILE IS GENERATED, MANUAL CHANGES WILL BE OVERWRITTEN ******** //

import { DependencyRegistry, createMongoose, instanceCachingFactory } from 'myLibrary';
import config from "config-dug";
import { Mongoose } from "mongoose";
import { ApplicationRepositoryAdapter } from '../../infrastructure/repositories/application/application.repository.adapter';
import { UserRepositoryAdapter } from '../../infrastructure/repositories/user/user.repository.adapter';

function registerRepositorys(this: DependencyRegistry): void { this.container.register(Mongoose, {
    useFactory: instanceCachingFactory(() =>
      createMongoose(config.MONGO_CONNECTION_STRING as string)
    ),
  });
  ApplicationRepositoryAdapter;
  UserRepositoryAdapter;
}

export { registerRepositorys };
