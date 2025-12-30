import type { TriggerRef } from "@rn-primitives/popover";
import type { DateData } from "react-native-calendars";
import { useRef } from "react";
import { Calendar } from "react-native-calendars";

import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Text } from "~/components/ui/text";

type CalendarPickerProps = {
  value?: string;
  onChange: (date: string) => void;
  placeholder?: string;
};

export function CalendarPicker({
  value,
  onChange,
  placeholder = "Select date",
}: CalendarPickerProps) {
  const triggerRef = useRef<TriggerRef>(null);

  const handleDayPress = (day: DateData) => {
    onChange(day.dateString);
    triggerRef.current?.close();
  };

  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Popover>
      <PopoverTrigger ref={triggerRef} asChild>
        <Button variant="outline">
          <Text>{value ? formatDisplayDate(value) : placeholder}</Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          onDayPress={handleDayPress}
          markedDates={
            value
              ? { [value]: { selected: true, selectedColor: "#3b82f6" } }
              : undefined
          }
        />
      </PopoverContent>
    </Popover>
  );
}
