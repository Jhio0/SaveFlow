export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export enum ApplicationScreen {
  CompletedScreen = 'CompletedScreen',
  EssentialExpenseScreen = 'EssentialExpenseScreen',
  IncomeDetailScreen = 'IncomeDetailScreen'
}

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
};

export type CollectIncomeApplicationInput = {
  applicationId: Scalars['ID']['input'];
  incomeAmount: Scalars['Int']['input'];
};

export type CreateApplicationPayload = {
  __typename?: 'CreateApplicationPayload';
  screen?: Maybe<ApplicationScreen>;
};

export type ExpenseApplicationInput = {
  applicationId: Scalars['ID']['input'];
  items: ExpenseItemsInput;
};

export type ExpenseItemsInput = {
  amount: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  source: ExpenseSource;
};

export enum ExpenseSource {
  Essentials = 'ESSENTIALS'
}

export type Mutation = {
  __typename?: 'Mutation';
  createApplication: CreateApplicationPayload;
  createUser: User;
  signup: AuthPayload;
  submitCollectIncomeApplication: CreateApplicationPayload;
  submitEssentialExpenseApplication: CreateApplicationPayload;
};


export type MutationCreateUserArgs = {
  dateOfBirth: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationSignupArgs = {
  dateOfBirth: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSubmitCollectIncomeApplicationArgs = {
  input: CollectIncomeApplicationInput;
};


export type MutationSubmitEssentialExpenseApplicationArgs = {
  input: ExpenseApplicationInput;
};

export type Query = {
  __typename?: 'Query';
  login: AuthPayload;
  me?: Maybe<User>;
  user: User;
};


export type QueryLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  dateOfBirth: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};
