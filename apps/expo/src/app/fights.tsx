import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { desc } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";

import { useTranslation } from "@acme/translations";

import type { Fight } from "~/lib/local-schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Text } from "~/components/ui/text";
import { db } from "~/lib/local-db";
import { fights } from "~/lib/local-schema";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function FightField({
  label,
  value,
  noValue,
}: {
  label: string;
  value: string | number | null | undefined;
  noValue: string;
}) {
  return (
    <View className="mb-3">
      <Text className="mb-1 text-sm text-muted-foreground">{label}</Text>
      <Text>{value ?? noValue}</Text>
    </View>
  );
}

function FightDetails({ fight, noValue }: { fight: Fight; noValue: string }) {
  const { t } = useTranslation();

  return (
    <View className="gap-2">
      <FightField
        label={t("fight:fields.partner.label")}
        value={fight.partner}
        noValue={noValue}
      />
      <FightField
        label={t("fight:fields.date.label")}
        value={formatDate(fight.date)}
        noValue={noValue}
      />
      <FightField
        label={t("fight:fields.whatHappened.label")}
        value={fight.whatHappened}
        noValue={noValue}
      />
      <FightField
        label={t("fight:fields.myPov.label")}
        value={fight.myPov}
        noValue={noValue}
      />
      <FightField
        label={t("fight:fields.perceivedPartnerPov.label")}
        value={fight.perceivedPartnerPov}
        noValue={noValue}
      />
      <FightField
        label={t("fight:fields.intensity.label")}
        value={fight.intensity}
        noValue={noValue}
      />
      <FightField
        label={t("fight:fields.seriousness.label")}
        value={fight.seriousness}
        noValue={noValue}
      />
      <FightField
        label={t("fight:fields.conclusion.label")}
        value={fight.conclusion}
        noValue={noValue}
      />
    </View>
  );
}

export default function FightsPage() {
  const { t } = useTranslation();

  const { data: fightList } = useLiveQuery(
    db.select().from(fights).orderBy(desc(fights.date)),
  );

  const noValue = t("fightList:noValue");

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Stack.Screen options={{ title: t("fightList:title") }} />
      <ScrollView className="flex-1 p-4">
        {fightList.length === 0 ? (
          <Text className="text-center text-muted-foreground">
            {t("fightList:empty")}
          </Text>
        ) : (
          <Accordion type="multiple" collapsible>
            {fightList.map((fight) => (
              <AccordionItem key={fight.id} value={String(fight.id)}>
                <AccordionTrigger>
                  <Text className="flex-1">
                    {fight.name ?? formatDate(fight.date)}
                  </Text>
                </AccordionTrigger>
                <AccordionContent>
                  <FightDetails fight={fight} noValue={noValue} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
