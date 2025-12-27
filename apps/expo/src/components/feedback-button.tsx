import React, { useState } from "react";
import { Alert, View } from "react-native";
import { useForm } from "@tanstack/react-form";

import { Button } from "~/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Text } from "~/components/ui/text";
import { Textarea } from "~/components/ui/textarea";
import { trpc } from "~/utils/api";

export function FeedbackButton() {
  const [open, setOpen] = useState(false);

  const submitMutation = trpc.feedback.submit.useMutation({
    onSuccess: () => {
      form.reset();
      setOpen(false);
      Alert.alert("Success", "Thank you for your feedback!");
    },
    onError: (error) => {
      Alert.alert("Error", error.message || "Failed to send feedback. Please try again later.");
    },
  });

  const form = useForm({
    defaultValues: {
      message: "",
    },
    onSubmit: async ({ value }) => {
      submitMutation.mutate({ message: value.message.trim() });
    },
  });

  const handleCancel = () => {
    form.reset();
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">Send Feedback</Button>
      </PopoverTrigger>
      <PopoverContent className="gap-4">
        <Text variant="h4">Send Feedback</Text>
        <form.Field
          name="message"
          validators={{
            onChange: ({ value }) => {
              const trimmed = value.trim();
              return trimmed.length === 0 ? "Please enter your feedback message." : undefined;
            },
          }}
        >
          {(field) => (
            <>
              <Textarea
                placeholder="Enter your feedback here..."
                value={field.state.value}
                onChangeText={field.handleChange}
                onBlur={field.handleBlur}
                editable={!submitMutation.isPending}
              />
              {field.state.meta.errors.length > 0 && (
                <Text variant="small" className="text-destructive">
                  {field.state.meta.errors[0]}
                </Text>
              )}
            </>
          )}
        </form.Field>
        <View className="flex-row gap-2 justify-end">
          <Button
            variant="outline"
            onPress={handleCancel}
            disabled={submitMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            onPress={() => form.handleSubmit()}
            disabled={submitMutation.isPending || !form.state.isValid}
          >
            {submitMutation.isPending ? "Sending..." : "Send"}
          </Button>
        </View>
      </PopoverContent>
    </Popover>
  );
}

