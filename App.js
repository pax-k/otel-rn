import "./polyfills.js";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import OpenAI from "openai";
import { OpenAIInstrumentation } from "@traceloop/instrumentation-openai";
import Tracer from "./tracer.js";

const openaiInstrumentation = new OpenAIInstrumentation();
openaiInstrumentation.manuallyInstrument(OpenAI);

Tracer("example-react-native-openai", openaiInstrumentation);

const openai = new OpenAI({
  dangerouslyAllowBrowser: true,
  apiKey: process.env?.EXPO_PUBLIC_OPENAI_API_KEY,
});

export default function App() {
  useEffect(() => {
    const chat = async () => {
      const chatCompletion = await openai.chat.completions.create({
        messages: [
          { role: "user", content: "Tell me a joke about OpenTelemetryxxx" },
        ],
        model: "gpt-3.5-turbo",
      });
      console.log(chatCompletion.choices[0].message.content);
    };
    chat();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
