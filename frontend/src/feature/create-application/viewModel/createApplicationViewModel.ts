import { useMutation } from "@apollo/client/react";
import { useRouter } from "expo-router";

import { SCREEN_TO_ROUTE } from "@/feature/helper/screenRouteMapper";
import { CreateApplicationDocument } from "@/network/__generated__/graphql";

export function useCreateApplicationViewModel() {
  const router = useRouter();

  const [createApplication, { loading, error }] = useMutation(
    CreateApplicationDocument,
  );

  const create = async () => {
    const result = await createApplication();

    const payload = result.data?.createApplication;

    if (payload && "screen" in payload) {
      const route = SCREEN_TO_ROUTE[payload.screen];

      if (route) {
        router.push({
          pathname: route,
          params: {
            applicationId: payload.applicationId,
          },
        });
      }
    }
  };

  return {
    create,
    isCreating: loading,
    createError: error,
  };
}
