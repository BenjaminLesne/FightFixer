import type { TriggerRef } from "@rn-primitives/popover";
import React, { useRef } from "react";
import { Alert, View } from "react-native";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";

import { useTranslation } from "@acme/translations";

import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Text } from "~/components/ui/text";
import { Textarea } from "~/components/ui/textarea";
import { trpc } from "~/utils/api";

export function FeedbackButton() {
  const { t } = useTranslation();
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
        Alert.alert(t("common.success"), t("feedback.success"));
      },
      onError: (error: { message?: string }) => {
        Alert.alert(t("common.error"), error.message ?? t("feedback.error"));
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
        <Button variant="outline">
          <Text>{t("feedback.button")}</Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="gap-4">
        <Text variant="h4">{t("feedback.title")}</Text>
        <form.Field
          name="message"
          validators={{
            onChange: ({ value }) => {
              const trimmed = value.trim();
              return trimmed.length === 0
                ? t("feedback.validation.required")
                : undefined;
            },
          }}
        >
          {(field) => (
            <>
              <Textarea
                placeholder={t("feedback.placeholder")}
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
        <View className="flex-row justify-end gap-2">
          <Button
            variant="outline"
            onPress={handleCancel}
            disabled={submitMutation.isPending}
          >
            <Text>{t("common.cancel")}</Text>
          </Button>
          <Button
            onPress={() => form.handleSubmit()}
            disabled={submitMutation.isPending || !form.state.isValid}
          >
            <Text>
              {submitMutation.isPending
                ? t("common.sending")
                : t("common.send")}
            </Text>
          </Button>
        </View>
      </PopoverContent>
    </Popover>
  );
}
