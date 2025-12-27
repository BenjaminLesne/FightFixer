import React, { useState } from "react";
import { Alert, View } from "react-native";

import { Button } from "~/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Text } from "~/components/ui/text";
import { Textarea } from "~/components/ui/textarea";
import { trpc } from "~/utils/api";

export function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const submitMutation = trpc.feedback.submit.useMutation({
    onSuccess: () => {
      setMessage("");
      setOpen(false);
      Alert.alert("Success", "Thank you for your feedback!");
    },
    onError: (error) => {
      Alert.alert("Error", error.message || "Failed to send feedback. Please try again later.");
    },
  });

  const handleSubmit = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      Alert.alert("Validation", "Please enter your feedback message.");
      return;
    }

    submitMutation.mutate({ message: trimmedMessage });
  };

  const handleCancel = () => {
    setMessage("");
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">Send Feedback</Button>
      </PopoverTrigger>
      <PopoverContent className="gap-4">
        <Text variant="h4">Send Feedback</Text>
        <Textarea
          placeholder="Enter your feedback here..."
          value={message}
          onChangeText={setMessage}
          editable={!submitMutation.isPending}
        />
        <View className="flex-row gap-2 justify-end">
          <Button
            variant="outline"
            onPress={handleCancel}
            disabled={submitMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            onPress={handleSubmit}
            disabled={submitMutation.isPending || !message.trim()}
          >
            {submitMutation.isPending ? "Sending..." : "Send"}
          </Button>
        </View>
      </PopoverContent>
    </Popover>
  );
}

