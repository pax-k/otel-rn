import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { registerInstrumentations } from "@opentelemetry/instrumentation";

export default (serviceName, openAiInstrumentation) => {
  const provider = new WebTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
      [SemanticResourceAttributes.SERVICE_VERSION]: "1.0.0",
      [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: "development",
    }),
  });

  const exporter = new OTLPTraceExporter({
    url: "https://otlp-gateway-prod-eu-north-0.grafana.net/otlp/v1/traces",
    headers: {
      Authorization: process.env?.EXPO_PUBLIC_GRAFANA_BASIC_AUTH,
    },
  });

  provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

  provider.register();

  registerInstrumentations({
    instrumentations: [openAiInstrumentation],
  });
  console.log("Tracer initialized");
};
