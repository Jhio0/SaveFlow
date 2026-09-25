// src/app/_layout.tsx

import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TamaguiProvider, Theme } from "tamagui";

import { client } from "@/network/graphqlClient";
import { ApolloProvider } from "@apollo/client/react";
import tamaguiConfig from "../tamagui.config";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApolloProvider client={client}>
        <TamaguiProvider config={tamaguiConfig} defaultTheme="dark">
          <Theme name="dark">
            <SafeAreaProvider>
              <SafeAreaView
                style={{
                  flex: 1,
                  backgroundColor: "#000",
                }}
              >
                <Slot />
              </SafeAreaView>
            </SafeAreaProvider>
          </Theme>
        </TamaguiProvider>
      </ApolloProvider>
    </GestureHandlerRootView>
  );
}
