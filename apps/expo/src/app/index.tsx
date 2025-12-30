import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import { FeedbackButton } from "~/components/feedback-button";
import { FightForm } from "~/components/fight-form";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <ScrollView className="flex-1">
        <View className="p-4">
          <FeedbackButton />
        </View>
        <FightForm />
      </ScrollView>
    </SafeAreaView>
  );
}
