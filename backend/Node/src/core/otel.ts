import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

let sdk: NodeSDK | undefined;

export function startOtel() {
	sdk = new NodeSDK({
		instrumentations: [getNodeAutoInstrumentations()],
	});
	sdk.start();
}

export async function stopOtel() {
	if (sdk) await sdk.shutdown();
}
