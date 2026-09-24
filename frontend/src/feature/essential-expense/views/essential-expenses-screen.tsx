import { useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { Button, Input, Text, XStack, YStack } from "tamagui";
import { useCollectPresetExpensesViewModel } from "../viewModels/useCollectPresetExpensesViewModel";

export function EssentialExpensesScreen() {
  const {
    categories,
    onToggleCategory,
    onAmountChange,
    onAddCustomCategory,
    submit,
  } = useCollectPresetExpensesViewModel();

  const [customName, setCustomName] = useState("");
  const [isAddingCustom, setIsAddingCustom] = useState(false);

  const hasAtLeastOneAmount = categories.some(
    (c) => c.enabled && c.amount !== null && c.amount > 0,
  );

  const handleAddCustom = () => {
    if (customName.trim().length === 0) return;
    onAddCustomCategory(customName.trim());
    setCustomName("");
    setIsAddingCustom(false);
  };

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
        <YStack gap="$5">
          <Text
            fontSize="$3"
            fontWeight="600"
            color="$gray10"
            textTransform="uppercase"
            letterSpacing={1}
          >
            Step 2 of 4
          </Text>

          <Text fontSize="$8" fontWeight="800" lineHeight="$8">
            Which expenses apply to you?
          </Text>

          <YStack gap="$2">
            {categories.map((category) => (
              <YStack key={category.id}>
                <XStack
                  items="center"
                  justify="space-between"
                  py="$3"
                  px="$4"
                  border="$5"
                  background={
                    category.enabled ? "$backgroundStrong" : "transparent"
                  }
                  borderWidth={1}
                  borderColor={category.enabled ? "$blue5" : "transparent"}
                  onPress={() => onToggleCategory(category.id)}
                >
                  <XStack items="center" gap="$3">
                    <YStack
                      width={18}
                      height={18}
                      border="$2"
                      borderWidth={category.enabled ? 0 : 1}
                      borderColor="$borderColor"
                      background={category.enabled ? "$blue9" : "transparent"}
                      items="center"
                      justify="center"
                    >
                      {category.enabled && (
                        <Text color="white" fontSize="$1" fontWeight="700">
                          ✓
                        </Text>
                      )}
                    </YStack>
                    <Text
                      fontSize="$4"
                      color={category.enabled ? "$color" : "$gray10"}
                    >
                      {category.name}
                    </Text>
                  </XStack>

                  {category.enabled && (
                    <XStack items="center" gap="$1">
                      <Text fontSize="$4" fontWeight="600" color="$gray10">
                        $
                      </Text>
                      <Input
                        unstyled
                        width={80}
                        placeholder="0"
                        keyboardType="numeric"
                        value={category.amount?.toString() ?? ""}
                        onChangeText={(value) =>
                          onAmountChange(category.id, value)
                        }
                        fontSize="$4"
                        fontWeight="600"
                        textAlign="right"
                      />
                    </XStack>
                  )}
                </XStack>
              </YStack>
            ))}
          </YStack>

          {isAddingCustom ? (
            <XStack gap="$2">
              <Input
                flex={1}
                placeholder="Category name"
                value={customName}
                onChangeText={setCustomName}
                onSubmitEditing={handleAddCustom}
                autoFocus
              />
              <Button
                onPress={handleAddCustom}
                background="$blue9"
                color="white"
              >
                Add
              </Button>
            </XStack>
          ) : (
            <XStack
              items="center"
              justify="center"
              py="$3"
              borderWidth={1}
              borderStyle="dashed"
              borderColor="$borderColor"
              border="$5"
              onPress={() => setIsAddingCustom(true)}
            >
              <Text fontSize="$4" color="$gray10">
                + Add custom category
              </Text>
            </XStack>
          )}
        </YStack>

        <Button
          size="$5"
          border="$6"
          background="$blue9"
          color="white"
          fontWeight="700"
          onPress={submit}
          disabled={!hasAtLeastOneAmount}
          opacity={!hasAtLeastOneAmount ? 0.5 : 1}
        >
          Continue
        </Button>
      </YStack>
    </TouchableWithoutFeedback>
  );
}
