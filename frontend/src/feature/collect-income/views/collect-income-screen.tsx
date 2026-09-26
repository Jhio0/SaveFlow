import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { Button, Input, Text, XStack, YStack } from "tamagui";
import { useCollectIncomeViewModel } from "../viewModels/useCollectIncomeViewModel";

type CollectIncomeScreenProps = {
  applicationId: string;
};

export function CollectIncomeScreen({
  applicationId,
}: CollectIncomeScreenProps) {
  const { incomeAmount, onIncomeAmountChange, submit } =
    useCollectIncomeViewModel(applicationId);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <YStack
        flex={1}
        background="$background"
        px="$5"
        pt="$8"
        pb="$5"
        justify="space-between"
      >
        <YStack gap="$6">
          <Text
            fontSize="$3"
            fontWeight="600"
            color="$gray10"
            textTransform="uppercase"
            letterSpacing={1}
          >
            Step 1 of 4
          </Text>

          <YStack gap="$2">
            <Text fontSize="$9" fontWeight="800" lineHeight="$9">
              What's your income this month?
            </Text>

            <Text fontSize="$4" color="$gray10">
              Enter what you expect to bring in this month.
            </Text>
          </YStack>

          <XStack
            items="center"
            justify="center"
            gap="$2"
            borderWidth={2}
            borderColor="$borderColor"
            border="$6"
            py="$5"
            px="$4"
            background="$backgroundStrong"
            focusStyle={{ borderColor: "$blue8" }}
          >
            <Text fontSize="$9" fontWeight="700" color="$gray10">
              $
            </Text>

            <Input
              unstyled
              flex={1}
              placeholder="0"
              keyboardType="numeric"
              value={incomeAmount}
              onChangeText={onIncomeAmountChange}
              fontSize="$9"
              fontWeight="700"
              textAlign="center"
              autoFocus
              color="$gray10"
            />
          </XStack>
        </YStack>

        <Button
          size="$5"
          border="$6"
          background="$blue9"
          color="white"
          fontWeight="700"
          onPress={submit}
          disabled={!incomeAmount}
          opacity={!incomeAmount ? 0.5 : 1}
        >
          Continue
        </Button>
      </YStack>
    </TouchableWithoutFeedback>
  );
}
