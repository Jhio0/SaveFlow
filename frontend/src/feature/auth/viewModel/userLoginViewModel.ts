import { useLazyQuery } from "@apollo/client/react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";

import { LoginDocument } from "@/network/__generated__/graphql";

const TOKEN_KEY = "auth_token";

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

    if (!payload?.token) {
      return;
    }

    await SecureStore.setItemAsync(TOKEN_KEY, payload.token);

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
