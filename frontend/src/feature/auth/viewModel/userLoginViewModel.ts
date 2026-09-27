import { useLazyQuery } from "@apollo/client/react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";

import { LoginDocument } from "@/network/__generated__/graphql";
import { SESSION_KEY } from "@/network/graphqlClient";

export function useLoginViewModel() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { loading, error }] = useLazyQuery(LoginDocument);

  const submit = async () => {
    if (!email || !password) {
      return;
    }

    const result = await login({
      variables: {
        email,
        password,
      },
    });

    const payload = result.data?.login;

    if (!payload?.sessionId) {
      return;
    }

    await SecureStore.setItemAsync(SESSION_KEY, payload.sessionId);

    router.replace("/screens/create-application-screen");
  };

  return {
    email,
    password,

    setEmail,
    setPassword,

    submit,

    isLoggingIn: loading,
    loginError: error,
  };
}
