import { Alert, View } from "react-native";
import { useForm } from "@tanstack/react-form";

import { useTranslation } from "@acme/translations";

import { fightFormSchema } from "~/lib/fight-schema";
import { db } from "~/lib/local-db";
import { fights } from "~/lib/local-schema";
import { Button } from "./ui/button";
import { CalendarPicker } from "./ui/calendar-picker";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Rating } from "./ui/rating";
import { Text } from "./ui/text";
import { Textarea } from "./ui/textarea";

export function FightForm() {
  const { t } = useTranslation();

  const form = useForm({
    defaultValues: {
      partner: "",
      date: new Date().toISOString(),
      name: "",
      whatHappened: "",
      myPov: "",
      perceivedPartnerPov: "",
      intensity: 3,
      seriousness: 3,
      conclusion: "",
    },
    validators: { onChange: fightFormSchema },
    onSubmit: async ({ value }) => {
      try {
        await db.insert(fights).values({
          partner: value.partner || undefined,
          date: value.date,
          name: value.name || undefined,
          whatHappened: value.whatHappened || undefined,
          myPov: value.myPov || undefined,
          perceivedPartnerPov: value.perceivedPartnerPov || undefined,
          intensity: value.intensity,
          seriousness: value.seriousness,
          conclusion: value.conclusion || undefined,
        });
        form.reset();
        Alert.alert(t("common.success"), t("fight.success"));
      } catch (e) {
        console.error("Insert error:", e);
        Alert.alert(
          t("common.error"),
          e instanceof Error ? e.message : t("fight.error"),
        );
      }
    },
  });

  return (
    <View>
      <View className="gap-4 p-4">
        <Text variant="h4">{t("fight.title")}</Text>

        <form.Field name="partner">
          {(field) => (
            <View className="gap-1.5">
              <Label>{t("fight.fields.partner.label")}</Label>
              <Input
                placeholder={t("fight.fields.partner.placeholder")}
                value={field.state.value}
                onChangeText={field.handleChange}
                onBlur={field.handleBlur}
              />
            </View>
          )}
        </form.Field>

        <form.Field name="date">
          {(field) => (
            <View className="gap-1.5">
              <Label>{t("fight.fields.date.label")}</Label>
              <CalendarPicker
                value={field.state.value}
                onChange={field.handleChange}
              />
              {field.state.meta.errors[0] && (
                <Text variant="small" className="text-destructive">
                  {typeof field.state.meta.errors[0] === "string"
                    ? field.state.meta.errors[0]
                    : field.state.meta.errors[0].message}
                </Text>
              )}
            </View>
          )}
        </form.Field>

        <form.Field name="name">
          {(field) => (
            <View className="gap-1.5">
              <Label>{t("fight.fields.name.label")}</Label>
              <Input
                placeholder={t("fight.fields.name.placeholder")}
                value={field.state.value}
                onChangeText={field.handleChange}
                onBlur={field.handleBlur}
              />
            </View>
          )}
        </form.Field>

        <form.Field name="whatHappened">
          {(field) => (
            <View className="gap-1.5">
              <Label>{t("fight.fields.whatHappened.label")}</Label>
              <Textarea
                placeholder={t("fight.fields.whatHappened.placeholder")}
                value={field.state.value}
                onChangeText={field.handleChange}
                onBlur={field.handleBlur}
              />
              {field.state.meta.errors[0] && (
                <Text variant="small" className="text-destructive">
                  {typeof field.state.meta.errors[0] === "string"
                    ? field.state.meta.errors[0]
                    : field.state.meta.errors[0].message}
                </Text>
              )}
            </View>
          )}
        </form.Field>

        <form.Field name="myPov">
          {(field) => (
            <View className="gap-1.5">
              <Label>{t("fight.fields.myPov.label")}</Label>
              <Textarea
                placeholder={t("fight.fields.myPov.placeholder")}
                value={field.state.value}
                onChangeText={field.handleChange}
                onBlur={field.handleBlur}
              />
            </View>
          )}
        </form.Field>

        <form.Field name="perceivedPartnerPov">
          {(field) => (
            <View className="gap-1.5">
              <Label>{t("fight.fields.perceivedPartnerPov.label")}</Label>
              <Textarea
                placeholder={t("fight.fields.perceivedPartnerPov.placeholder")}
                value={field.state.value}
                onChangeText={field.handleChange}
                onBlur={field.handleBlur}
              />
            </View>
          )}
        </form.Field>

        <form.Field name="intensity">
          {(field) => (
            <View className="gap-1.5">
              <Label>{t("fight.fields.intensity.label")}</Label>
              <Rating
                value={field.state.value}
                onChange={field.handleChange}
                labels={{
                  low: t("fight.fields.intensity.low"),
                  high: t("fight.fields.intensity.high"),
                }}
              />
            </View>
          )}
        </form.Field>

        <form.Field name="seriousness">
          {(field) => (
            <View className="gap-1.5">
              <Label>{t("fight.fields.seriousness.label")}</Label>
              <Rating
                value={field.state.value}
                onChange={field.handleChange}
                labels={{
                  low: t("fight.fields.seriousness.low"),
                  high: t("fight.fields.seriousness.high"),
                }}
              />
            </View>
          )}
        </form.Field>

        <form.Field name="conclusion">
          {(field) => (
            <View className="gap-1.5">
              <Label>{t("fight.fields.conclusion.label")}</Label>
              <Textarea
                placeholder={t("fight.fields.conclusion.placeholder")}
                value={field.state.value}
                onChangeText={field.handleChange}
                onBlur={field.handleBlur}
              />
            </View>
          )}
        </form.Field>

        <Button onPress={() => form.handleSubmit()}>
          <Text>{t("fight.save")}</Text>
        </Button>
      </View>
    </View>
  );
}
