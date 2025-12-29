import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PortalHost } from "@rn-primitives/portal";
import { View, Text } from "react-native";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";

import { queryClient } from "~/utils/api";
import { db } from "@acme/db/client";
import migrations from "@acme/db/migrations";

import "../global.css";

import { QueryClientProvider } from "@tanstack/react-query";

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      {/*
          The Stack component displays the current page.
          It also allows you to configure your screens 
        */}
      <Stack />
      <PortalHost />
      <StatusBar />
    </QueryClientProvider>
  );
}
