import type { ConfigContext, ExpoConfig } from "expo/config";
import { createJiti } from "jiti";

import type { Env } from "~/lib/env";

const jiti = createJiti(import.meta.url);
const { env } = (await jiti.import("./src/lib/env")) as { env: Env };

const getAppName = () => {
  if (env.APP_VARIANT === "development") return "FightFixer (Dev)";
  if (env.APP_VARIANT === "preview") return "FightFixer (Preview)";
  return "FightFixer";
};

const getPackageSuffix = () => {
  if (env.APP_VARIANT === "development") return ".dev";
  if (env.APP_VARIANT === "preview") return ".preview";
  return "";
};

const BASE_PACKAGE = "com.benjaminlesne.fightfixer";

export default ({ config }: ConfigContext): ExpoConfig =>
  ({
    ...config,
    name: getAppName(),
    slug: "fightfixer",
    scheme: "fightfixer",
    version: "0.1.0",
    orientation: "portrait",
    icon: "./assets/icon-light.png",
    userInterfaceStyle: "automatic",
    updates: {
      fallbackToCacheTimeout: 0,
    },
    newArchEnabled: true,
    assetBundlePatterns: ["**/*"],
    ios: {
      bundleIdentifier: `${BASE_PACKAGE}${getPackageSuffix()}`,
      supportsTablet: true,
      icon: {
        light: "./assets/icon-light.png",
        dark: "./assets/icon-dark.png",
      },
    },
    android: {
      package: `${BASE_PACKAGE}${getPackageSuffix()}`,
      adaptiveIcon: {
        foregroundImage: "./assets/icon-light.png",
        backgroundColor: "#1F104A",
      },
      edgeToEdgeEnabled: true,
    },
    extra: {
      eas: {
        projectId: "6b78744d-f752-45a8-91ed-d69bee9c2cf0",
      },
    },
    experiments: {
      tsconfigPaths: true,
      typedRoutes: true,
    },
    plugins: [
      "expo-router",
      "expo-secure-store",
      "expo-web-browser",
      [
        "expo-splash-screen",
        {
          backgroundColor: "#E4E4E7",
          image: "./assets/icon-light.png",
          dark: {
            backgroundColor: "#18181B",
            image: "./assets/icon-dark.png",
          },
        },
      ],
    ],
  }) as const;
