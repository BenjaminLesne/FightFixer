import * as React from "react";
import { View } from "react-native";
import { cn } from "@/lib/utils";

import type { Option } from "./select";
import { Select } from "./select";
import { Text } from "./text";

interface RatingProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  labels?: { low: string; high: string };
  className?: string;
}

function Rating({
  value,
  onChange,
  min = 1,
  max = 5,
  disabled = false,
  labels,
  className,
}: RatingProps) {
  const options: Option[] = Array.from({ length: max - min + 1 }, (_, i) => {
    const num = min + i;
    return { value: String(num), label: String(num) };
  });

  const selectedOption = options.find((o) => o.value === String(value));

  const handleChange = (option: Option | undefined) => {
    if (option) {
      onChange(Number(option.value));
    }
  };

  return (
    <View className={cn("gap-1", className)}>
      <Select
        value={selectedOption}
        onValueChange={handleChange}
        options={options}
        placeholder="Select..."
        disabled={disabled}
      />
      {labels && (
        <View className="flex-row justify-between px-1">
          <Text variant="muted" className="text-xs">
            {labels.low}
          </Text>
          <Text variant="muted" className="text-xs">
            {labels.high}
          </Text>
        </View>
      )}
    </View>
  );
}

export { Rating };
