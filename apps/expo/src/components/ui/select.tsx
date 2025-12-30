import * as React from "react";
import { Platform, StyleSheet } from "react-native";
import { cn } from "@/lib/utils";
import * as SelectPrimitive from "@rn-primitives/select";

import { Text } from "./text";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  value: Option | undefined;
  onValueChange: (option: Option | undefined) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

function Select({
  value,
  onValueChange,
  options,
  placeholder = "Select...",
  disabled = false,
  className,
}: SelectProps) {
  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectPrimitive.Trigger
        className={cn(
          "flex h-10 w-full flex-row items-center justify-between rounded-md border border-input bg-background px-3 py-2",
          disabled && "opacity-50",
          className,
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder}>
          <Text>{value?.label ?? placeholder}</Text>
        </SelectPrimitive.Value>
        <Text className="text-muted-foreground">▼</Text>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Overlay
          style={Platform.OS !== "web" ? StyleSheet.absoluteFill : undefined}
        >
          <SelectPrimitive.Content
            className={cn(
              "z-50 min-w-32 rounded-md border border-border bg-popover p-1 shadow-md",
              Platform.OS === "web" && "animate-in fade-in-80",
            )}
            sideOffset={4}
          >
            <SelectPrimitive.Viewport>
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  className="flex-row items-center rounded-sm px-2 py-1.5 active:bg-accent"
                >
                  {option.label}
                  <SelectPrimitive.ItemIndicator className="ml-auto">
                    <Text>✓</Text>
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Overlay>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

export { Select };
export type { Option };
