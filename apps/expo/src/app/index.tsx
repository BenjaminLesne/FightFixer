import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import { FeedbackButton } from "~/components/feedback-button";
import { FightForm } from "~/components/fight-form";

export default function Index() {
  return (
    <SafeAreaView className="bg-background">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="flex-1">
        <FightForm />
        <View className="p-4">
          <FeedbackButton />
        </View>
      </View>
    </SafeAreaView>
  );
}
