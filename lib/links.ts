import type { Settings } from "./types";

/** Best available contact link: email > LinkedIn > #contact */
export function contactHref(s: Settings): string {
  const { email, linkedin } = s.contact || {};
  if (email) return `mailto:${email}?subject=${encodeURIComponent("Hello Fahmida")}`;
  if (linkedin) return linkedin;
  return "#contact";
}

export const isExternal = (href?: string) => !!href && /^(https?:)?\/\//.test(href);
export const isFile = (href?: string) => !!href && /\.(pdf|docx?|pptx?)$/i.test(href);

export function linkProps(href: string) {
  return isExternal(href) || isFile(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};
}
