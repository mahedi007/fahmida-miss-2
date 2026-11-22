/* Content types — mirror public/admin/config.yml */
export type NavItem = { label: string; href: string };

export type Settings = {
  site: { firstName: string; lastName: string; title: string; description: string; url?: string; ogImage?: string; jobTitle?: string; worksFor?: string };
  contact: { email?: string; linkedin?: string; phone?: string };
  theme: { accent?: string; accentDeep?: string; smoothScroll?: boolean };
  nav: NavItem[];
  headerButton: { label: string; url?: string };
  footer: { badge?: string; kicker?: string; line?: string; inquiriesLabel?: string; buttonLabel?: string; buttonUrl?: string; location?: string; splash?: string };
};

type Base = { type: string; anchor?: string; hidden?: boolean };

export type HeroBlock = Base & { type: "hero"; firstName: string; lastName: string; tag?: string; lead?: string; chips?: string[]; location?: string; portrait?: string; portraitAlt?: string; splash?: string; colorReveal?: boolean; revealHint?: string; exploreLabel?: string; exploreHref?: string };
export type MarqueeBlock = Base & { type: "marquee"; items?: string[]; secondary?: string[] };
export type AboutBlock = Base & { type: "about"; titleTop: string; titleOutline?: string; subline?: string; statementLead?: string; statementHighlight?: string; columns?: { number?: string; title: string; tag?: string; body: string }[]; status?: string };
export type CardItem = { name: string; duration?: string; meta?: string; badge?: string; live?: boolean; from?: string; to?: string; role?: string; image?: string; link?: string; description?: string; tags?: string[] };
export type CardsBlock = Base & { type: "cards"; titleTop: string; titleOutline?: string; items?: CardItem[]; footnote?: string };
export type TabsBlock = Base & { type: "tabs"; titleTop: string; titleOutline?: string; tabs?: { label: string; sub?: string; registry?: string; heading?: string; note?: string; tiles?: { label: string; icon?: string }[] }[]; signature?: string };
export type FeatureBlock = Base & { type: "feature"; label?: string; tag?: string; title: string; description?: string; ctaLabel?: string; ctaUrl?: string; image?: string; stats?: { label: string; value: number; suffix?: string; icon?: string }[] };
export type LedgerBlock = Base & { type: "ledger"; label?: string; titleTop: string; titleOutline?: string; groups?: { label?: string; rows?: { code?: string; title: string; meta?: string; status?: string; style?: "default" | "live" | "progress"; url?: string }[] }[] };
export type CommitmentsBlock = Base & { type: "commitments"; label?: string; titleTop: string; titleOutline?: string; items?: { icon?: string; title: string; practiceLabel?: string; practice?: string; outcomeLabel?: string; outcome?: string }[]; closing?: string; ctaSub?: string; ctaLabel?: string; ctaUrl?: string };
export type TextBlock = Base & { type: "text"; label?: string; titleTop?: string; titleOutline?: string; body?: string; theme?: "dark" | "light" };
export type ImageTextBlock = Base & { type: "imageText"; label?: string; title?: string; body?: string; image?: string; imageAlt?: string; imageSide?: "left" | "right"; buttonLabel?: string; buttonUrl?: string; theme?: "dark" | "light" };
export type GalleryBlock = Base & { type: "gallery"; label?: string; titleTop?: string; titleOutline?: string; images?: { image: string; caption?: string }[] };
export type QuotesBlock = Base & { type: "quotes"; label?: string; titleTop?: string; titleOutline?: string; items?: { quote: string; name?: string; role?: string }[] };
export type CtaBlock = Base & { type: "cta"; kicker?: string; title: string; text?: string; buttonLabel?: string; buttonUrl?: string };
export type VideoBlock = Base & { type: "video"; label?: string; title?: string; url: string; caption?: string };

export type Block =
  | HeroBlock | MarqueeBlock | AboutBlock | CardsBlock | TabsBlock | FeatureBlock | LedgerBlock
  | CommitmentsBlock | TextBlock | ImageTextBlock | GalleryBlock | QuotesBlock | CtaBlock | VideoBlock;

export type Page = { title: string; seoTitle?: string; seoDescription?: string; sections: Block[] };
