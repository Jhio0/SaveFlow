import { useCreateApplicationViewModel } from "@/feature/create-application/viewModel/createApplicationViewModel";
import { Button, Text, YStack } from "tamagui";

export default function CreateRoute() {
  const { create, isCreating } = useCreateApplicationViewModel();

  return (
    <YStack flex={1} justify="center" items="center" gap="$4">
      <Text fontSize="$8" fontWeight="700">
        Start an Application
      </Text>

      <Button
        size="$5"
        background="$blue9"
        color="white"
        onPress={create}
        disabled={isCreating}
        opacity={isCreating ? 0.5 : 1}
      >
        {isCreating ? "Creating..." : "Create Application"}
      </Button>
    </YStack>
  );
}
