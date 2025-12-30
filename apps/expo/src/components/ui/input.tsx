import type { TextInputProps } from "react-native";
import { TextInput } from "react-native";
import { cn } from "@/lib/utils";

function Input({
  className,
  placeholderClassName,
  ...props
}: TextInputProps & React.RefAttributes<TextInput>) {
  return (
    <TextInput
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base text-foreground shadow-sm shadow-black/5 dark:bg-input/30 md:text-sm",
        props.editable === false && "opacity-50",
        className,
      )}
      placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
      {...props}
    />
  );
}

export { Input };
