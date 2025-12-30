import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { useTranslation } from "@acme/translations";

import { FeedbackButton } from "~/components/feedback-button";
import { FightForm } from "~/components/fight-form";

export default function Index() {
  const { t } = useTranslation();

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 50}
    >
      <SafeAreaView className="flex-1 bg-background">
        <Stack.Screen options={{ title: t("home") }} />
        <ScrollView className="flex-1">
          <View className="p-4">
            <FeedbackButton />
          </View>
          <FightForm />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
