import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import { FeedbackButton } from "~/components/feedback-button";

export default function Index() {
  return (
    <SafeAreaView className="bg-background">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="p-4 gap-4">
        <FeedbackButton />
      </View>
    </SafeAreaView>
  );
}
