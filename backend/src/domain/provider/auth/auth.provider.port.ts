export interface SignupInput {
  name: string;
  email: string;
  password: string; // plain text — we hash it before storing
  dateOfBirth: string;
}

export interface LoginInput {
  email: string;
  password: string; // plain text — we compare it against the stored hash
}

// What we return to the client after successful auth.
// The token is what the client stores and sends back with every request.
export interface AuthPayload {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    dateOfBirth: string;
  };
}

interface AuthProviderPort {
  signup(input: SignupInput): Promise<AuthPayload>;
  login(input: LoginInput): Promise<AuthPayload>;
}

export { AuthProviderPort };
