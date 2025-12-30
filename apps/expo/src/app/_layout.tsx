import { Text, View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PortalHost } from "@rn-primitives/portal";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";

import { useTranslation } from "@acme/translations";

import { db } from "~/lib/local-db";
import { queryClient } from "~/utils/api";
import migrations from "../../drizzle/migrations";

import "../global.css";

import { QueryClientProvider } from "@tanstack/react-query";

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  const { t } = useTranslation();
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>{t("migration.error", { message: error.message })}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>{t("migration.inProgress")}</Text>
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
      <StatusBar />
      <PortalHost />
    </QueryClientProvider>
  );
}
