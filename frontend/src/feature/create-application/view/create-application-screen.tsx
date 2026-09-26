import { Button } from "tamagui";
import { useCreateApplicationViewModel } from "../viewModel/createApplicationViewModel";

export function CreateApplicationButton() {
  const { create, isCreating } = useCreateApplicationViewModel();

  return (
    <Button
      size="$5"
      background="$blue9"
      color="white"
      fontWeight="700"
      onPress={create}
      disabled={isCreating}
      opacity={isCreating ? 0.5 : 1}
    >
      {isCreating ? "Creating..." : "Start Application"}
    </Button>
  );
}
