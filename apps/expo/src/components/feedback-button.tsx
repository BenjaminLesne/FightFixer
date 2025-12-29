import React, { useRef } from "react";
import { Alert, View } from "react-native";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import type { TriggerRef } from "@rn-primitives/popover";

import { Button } from "~/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Text } from "~/components/ui/text";
import { Textarea } from "~/components/ui/textarea";
import { trpc } from "~/utils/api";

export function FeedbackButton() {
  const triggerRef = useRef<TriggerRef>(null);

  const closePopover = () => {
    triggerRef.current?.close();
  };

  const form = useForm({
    defaultValues: {
      message: "",
    },
    onSubmit: ({ value }) => {
      submitMutation.mutate({ message: value.message.trim() });
    },
  });

  const submitMutation = useMutation(
    trpc.feedback.create.mutationOptions({
      onSuccess: () => {
        form.reset();
        closePopover();
        Alert.alert("Success", "Thank you for your feedback!");
      },
      onError: (error: { message?: string }) => {
        Alert.alert("Error", error.message ?? "Failed to send feedback. Please try again later.");
      },
    }),
  );

  const handleCancel = () => {
    form.reset();
    closePopover();
  };

  return (
    <Popover>
      <PopoverTrigger ref={triggerRef} asChild>
        <Button variant="outline"><Text>Send Feedback</Text></Button>
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
            <Text>Cancel</Text>
          </Button>
          <Button
            onPress={() => form.handleSubmit()}
            disabled={submitMutation.isPending || !form.state.isValid}
          >
            <Text>{submitMutation.isPending ? "Sending..." : "Send"}</Text>
          </Button>
        </View>
      </PopoverContent>
    </Popover>
  );
}

