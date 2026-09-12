import { BaseRepository, Repository } from "myLibrary";

import userSchema, { UserDocument } from "./user.schemat";
import { User } from "../../../domain/entities/user";
import {
  CreateUser,
  UpdateUser,
  UserRepositoryPort,
} from "../../../domain/repository/user.repository.port";

@Repository("User", userSchema)
class UserRepositoryAdapter
  extends BaseRepository<UserDocument, User, CreateUser, UpdateUser>
  implements UserRepositoryPort
{
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.model.findOne({ email }).exec();

    return this.toObject(user);
  }

  protected toObject(document: UserDocument): User {
    return {
      id: document._id.toHexString(),
      name: document.name,
      dateOfBirth: document.dateOfBirth,
      email: document.email,
      password: document.password,
    };
  }
}

export { UserRepositoryAdapter };
