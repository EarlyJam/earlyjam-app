import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      shadow: [{ shadow: ["ej-card", "ej-2"] }],
      "font-size": [{ fontSize: ["2.5xl"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getEmailProvider(email: string) {
  const providers = {
    "gmail.com": "https://mail.google.com",
    "yahoo.com": "https://mail.yahoo.com",
    "outlook.com": "https://outlook.live.com",
    "hotmail.com": "https://outlook.live.com", // Hotmail is now part of Outlook
    "icloud.com": "https://www.icloud.com/mail",
    "aol.com": "https://mail.aol.com",
    "protonmail.com": "https://mail.protonmail.com",
    "zoho.com": "https://mail.zoho.com",
    "mail.com": "https://www.mail.com/int/",
    "yandex.com": "https://mail.yandex.com",
  };

  const domain = email.split("@")[1];
  return providers[domain as keyof typeof providers] || providers["gmail.com"];
}
