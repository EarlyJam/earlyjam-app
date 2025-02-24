import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      shadow: [{ shadow: ["ej-card", "ej-2", "ej-markup-comment-box"] }],
      "font-size": [{ fontSize: ["2.5xl", "5.5xl"] }]
    }
  }
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
    "yandex.com": "https://mail.yandex.com"
  };

  const domain = email.split("@")[1];
  return providers[domain as keyof typeof providers] || providers["gmail.com"];
}

export function getNameInitials(name?: string) {
  if (!name) {
    return "";
  }

  const names = name.split(" ");

  return names
    .map((name) => name.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
}

export function convertToLabel(value: string, delimiter = "_") {
  return value
    .split(delimiter)
    .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
    .join(" ");
}
