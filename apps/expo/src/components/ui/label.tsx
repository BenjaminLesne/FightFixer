import { View } from "react-native";
import { cn } from "@/lib/utils";

import { Text } from "./text";

interface LabelProps {
  children: React.ReactNode;
  className?: string;
}

function Label({ children, className }: LabelProps) {
  return (
    <View className={cn("gap-1.5", className)}>
      <Text className="text-sm font-medium text-foreground">{children}</Text>
    </View>
  );
}

export { Label };
