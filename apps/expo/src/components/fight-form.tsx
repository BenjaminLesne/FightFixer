import { Alert, ScrollView, View } from "react-native";
import { useForm } from "@tanstack/react-form";

import { fightFormSchema } from "~/lib/fight-schema";
import { db } from "~/lib/local-db";
import { fights } from "~/lib/local-schema";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Rating } from "./ui/rating";
import { Text } from "./ui/text";
import { Textarea } from "./ui/textarea";

export function FightForm() {
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
      Alert.alert("Success", "Fight logged.");
    },
  });

  return (
    <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
      <View className="gap-4 p-4">
        <Text variant="h4">Log a Fight</Text>

        <form.Field name="partner">
          {(field) => (
            <View className="gap-1.5">
              <Label>Who are you fighting with?</Label>
              <Input
                placeholder="Partner name"
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
              <Label>Date</Label>
              <Input
                placeholder="YYYY-MM-DD"
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

        <form.Field name="name">
          {(field) => (
            <View className="gap-1.5">
              <Label>Name for this fight</Label>
              <Input
                placeholder="e.g., Dishes argument"
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
              <Label>What happened? (facts only)</Label>
              <Textarea
                placeholder="Describe what happened objectively..."
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
              <Label>My POV, how I felt, my opinion</Label>
              <Textarea
                placeholder="How did you feel? What's your perspective?"
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
              <Label>What I think my partner's POV is</Label>
              <Textarea
                placeholder="What do you think they felt/thought?"
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
              <Label>Intensity</Label>
              <Rating
                value={field.state.value}
                onChange={field.handleChange}
                labels={{ low: "Calm", high: "Screaming" }}
              />
            </View>
          )}
        </form.Field>

        <form.Field name="seriousness">
          {(field) => (
            <View className="gap-1.5">
              <Label>Seriousness</Label>
              <Rating
                value={field.state.value}
                onChange={field.handleChange}
                labels={{ low: "Minor", high: "Major" }}
              />
            </View>
          )}
        </form.Field>

        <form.Field name="conclusion">
          {(field) => (
            <View className="gap-1.5">
              <Label>Conclusion / how to prevent this</Label>
              <Textarea
                placeholder="What was resolved? How to avoid this?"
                value={field.state.value}
                onChangeText={field.handleChange}
                onBlur={field.handleBlur}
              />
            </View>
          )}
        </form.Field>

        <Button
          onPress={() => form.handleSubmit()}
          disabled={!form.state.canSubmit}
        >
          <Text>Save Fight</Text>
        </Button>
      </View>
    </ScrollView>
  );
}
