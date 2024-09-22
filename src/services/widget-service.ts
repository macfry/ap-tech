import { WidgetState } from "../types/WidgetTypes";

export const fetchWidgetState = (): Promise<WidgetState> => new Promise((resolve) => {
    setTimeout(() => {
        resolve({
            brightness: 20,
            timeLeft: 12,
            nightVision: false,
            duskTillDawn: true,
            flashing: true,
        });
    }, 2000);
});
