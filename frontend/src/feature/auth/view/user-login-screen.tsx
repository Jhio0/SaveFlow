import { Button, Input, Text, YStack } from "tamagui";
import { useLoginViewModel } from "../viewModel/userLoginViewModel";

export function LoginScreen() {
  const {
    email,
    password,
    setEmail,
    setPassword,
    submit,
    isLoggingIn,
    loginError,
  } = useLoginViewModel();

  return (
    <YStack flex={1} p="$4" content="center" gap="$4">
      <YStack gap="$2">
        <Text fontSize="$8" fontWeight="700">
          Login
        </Text>

        <Text color="$gray10">Login to continue to SaveFlow</Text>
      </YStack>

      <YStack gap="$3">
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {loginError && (
          <Text color="$red10">
            Login failed. Please check your email and password.
          </Text>
        )}

        <Button size="$5" onPress={submit} disabled={isLoggingIn}>
          {isLoggingIn ? "Logging in..." : "Login"}
        </Button>
      </YStack>
    </YStack>
  );
}
