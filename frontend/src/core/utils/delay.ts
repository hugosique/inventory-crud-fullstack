import { DEBOUNCE_TIME, IS_DEV } from "../../shared/constants/dev-config";

export async function simulateDelayMs<T>(promise: Promise<T>): Promise<T> {
    if (IS_DEV && DEBOUNCE_TIME > 0) {
        await new Promise((resolve) => setTimeout(resolve, DEBOUNCE_TIME));
    }
    return promise;
}