import bcrypt from "bcryptjs";

import { Provider, signToken, TokenPayload } from "myLibrary";
import {
  AuthPayload,
  AuthProviderPort,
  LoginInput,
  SignupInput,
} from "./auth.provider.port";
import { RepositoryTokens } from "../../../lib/injection-tokens/repository-tokens";
import { inject } from "tsyringe";
import { UserRepositoryPort } from "../../repository/user.repository.port";

@Provider
export class AuthProviderAdapter implements AuthProviderPort {
  // The service needs a user repository to look up / create users.
  // We receive it via the constructor (dependency injection).
  constructor(
    @inject(RepositoryTokens.UserRepository)
    private userRepositoryPort: UserRepositoryPort,
  ) {}

  /**
   * SIGNUP
   *
   * Flow:
   * 1. Check if email already exists → error if it does
   * 2. Hash the password
   * 3. Save the new user with the hashed password
   * 4. Generate a JWT token
   * 5. Return token + user info
   */
  async signup(input: SignupInput): Promise<AuthPayload> {
    // 1. Check if a user with this email already exists
    // const existingUser = await this.userRepositoryPort.findByEmail(input.email);
    // if (existingUser) {
    //   throw new Error("A user with this email already exists.");
    // }

    // 2. Hash the password
    // bcrypt.hash(plainText, saltRounds)
    // saltRounds = 12 means bcrypt runs the hashing algorithm 2^12 times.
    // Higher = slower = harder to brute force. 10-12 is the standard.
    const hashedPassword = await bcrypt.hash(input.password, 12);

    // 3. Create the user in the database with the HASHED password
    const user = await this.userRepositoryPort.create({
      name: input.name,
      email: input.email,
      password: hashedPassword, // stored hash, never the plain text
      dateOfBirth: new Date(input.dateOfBirth),
    });

    // 4. Create a JWT token for this user
    const tokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
    };
    const token = signToken(tokenPayload);

    // 5. Return token and user info to the client
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        dateOfBirth: new Date(user.dateOfBirth).toISOString(),
      },
    };
  }

  /**
   * LOGIN
   *
   * Flow:
   * 1. Find user by email → error if not found
   * 2. Compare submitted password against stored hash → error if mismatch
   * 3. Generate a JWT token
   * 4. Return token + user info
   */
  async login(input: LoginInput): Promise<AuthPayload> {
    // 1. Look up the user by email
    const user = await this.userRepositoryPort.findByEmail(input.email);

    if (!user) {
      // Deliberately vague — don't tell attackers which part was wrong
      throw new Error("Invalid email or password.");
    }

    // The user must have a password stored (they signed up with email/password)
    if (!user.password) {
      throw new Error("Invalid email or password.");
    }

    // 2. bcrypt.compare(plainText, hash) → true if they match
    // This is the magic: bcrypt hashes the plain text using the same salt
    // that was embedded in the stored hash, then compares.
    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password.");
    }

    // 3. Generate token
    const tokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
    };
    const token = signToken(tokenPayload);

    // 4. Return to client
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        dateOfBirth: new Date(user.dateOfBirth).toISOString(),
      },
    };
  }
}
