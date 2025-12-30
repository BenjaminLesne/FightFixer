import * as React from "react";
import { Platform, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { cn } from "@/lib/utils";
import * as AccordionPrimitive from "@rn-primitives/accordion";
import { ChevronDown } from "lucide-react-native";

import { TextClassContext } from "./text";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  AccordionPrimitive.ItemRef,
  AccordionPrimitive.ItemProps
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-border", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

type AccordionTriggerProps = Omit<
  AccordionPrimitive.TriggerProps,
  "children"
> & {
  children?: React.ReactNode;
};

const AccordionTrigger = React.forwardRef<
  AccordionPrimitive.TriggerRef,
  AccordionTriggerProps
>(({ className, children, ...props }, ref) => {
  const { isExpanded } = AccordionPrimitive.useItemContext();

  const progress = useDerivedValue(() =>
    isExpanded
      ? withTiming(1, { duration: 200 })
      : withTiming(0, { duration: 200 }),
  );

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${interpolate(progress.value, [0, 1], [0, 180])}deg` },
    ],
  }));

  return (
    <AccordionPrimitive.Header className="flex">
      <TextClassContext.Provider
        value={cn(
          "flex-1 text-base font-medium text-foreground",
          Platform.select({ web: "transition-all" }),
        )}
      >
        <AccordionPrimitive.Trigger
          ref={ref}
          className={cn(
            "flex-1 flex-row items-center justify-between py-4",
            Platform.select({ web: "hover:underline" }),
            className,
          )}
          {...props}
        >
          {children}
          <Animated.View style={chevronStyle}>
            <ChevronDown size={18} className="shrink-0 text-muted-foreground" />
          </Animated.View>
        </AccordionPrimitive.Trigger>
      </TextClassContext.Provider>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  AccordionPrimitive.ContentRef,
  AccordionPrimitive.ContentProps
>(({ className, children, ...props }, ref) => {
  const { isExpanded } = AccordionPrimitive.useItemContext();

  const progress = useDerivedValue(() =>
    isExpanded
      ? withTiming(1, { duration: 200 })
      : withTiming(0, { duration: 200 }),
  );

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    height: isExpanded
      ? "auto"
      : interpolate(progress.value, [0, 1], [0, 1]) === 0
        ? 0
        : "auto",
  }));

  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn("overflow-hidden", className)}
      {...props}
    >
      <Animated.View style={animatedStyle}>
        <View className="pb-4 pt-0">{children}</View>
      </Animated.View>
    </AccordionPrimitive.Content>
  );
});
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
