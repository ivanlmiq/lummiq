import { useEffect } from "react";

export const useKeyDown = (keys: string[], callback: () => void) => {
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            const wasAnyKeyPressed = keys.some((key) => event.key === key);
            if (wasAnyKeyPressed) {
                callback();
            }
        };

        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [callback, keys]);
};
