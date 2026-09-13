import "reflect-metadata";

import { applicationSchema } from "./application.schema";
import { authSchema } from "./auth.schema";
import { userSchema } from "./user.schema";

export const typeDefs = [userSchema, authSchema, applicationSchema];
