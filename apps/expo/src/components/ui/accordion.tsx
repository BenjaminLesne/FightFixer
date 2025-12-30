import * as React from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { cn } from "@/lib/utils";
import * as AccordionPrimitive from "@rn-primitives/accordion";
import { ChevronDown } from "lucide-react-native";

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
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn("flex-row items-center justify-between py-4", className)}
      {...props}
    >
      {children}
      <Animated.View style={chevronStyle}>
        <ChevronDown size={18} className="shrink-0 text-muted-foreground" />
      </Animated.View>
    </AccordionPrimitive.Trigger>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  AccordionPrimitive.ContentRef,
  AccordionPrimitive.ContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn("pb-4", className)}
      {...props}
    >
      {children}
    </AccordionPrimitive.Content>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
