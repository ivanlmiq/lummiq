import { getSession } from "next-auth/react";
import { getRequestConfig } from "next-intl/server";

const locales = [
    "en", // English
    "es", // Spanish
    "de", // German
    "fr", // French
    "it", // Italian
];

export default getRequestConfig(async () => {
    const session = await getSession();

    console.log("getRequestConfig -> SESSION", session);

    const locale = "en";

    return {
        locale,
        messages: (await import(`./../messages/${locale}.json`)).default,
    };
});
