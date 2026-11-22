import type { Block, Settings } from "@/lib/types";
import { Hero } from "./blocks/Hero";
import { Marquee } from "./blocks/Marquee";
import { About } from "./blocks/About";
import { Cards } from "./blocks/Cards";
import { Tabs } from "./blocks/Tabs";
import { Feature } from "./blocks/Feature";
import { Ledger } from "./blocks/Ledger";
import { Commitments } from "./blocks/Commitments";
import { Gallery } from "./blocks/Gallery";
import { Cta, ImageText, Quotes, Text, Video } from "./blocks/Extras";

/** Maps each CMS section "type" to its component. Add new block types here. */
export function BlockRenderer({ sections, settings }: { sections: Block[]; settings: Settings }) {
  return (
    <>
      {sections.filter((b) => !b.hidden).map((b, i) => {
        switch (b.type) {
          case "hero": return <Hero key={i} b={b} />;
          case "marquee": return <Marquee key={i} b={b} />;
          case "about": return <About key={i} b={b} />;
          case "cards": return <Cards key={i} b={b} />;
          case "tabs": return <Tabs key={i} b={b} />;
          case "feature": return <Feature key={i} b={b} />;
          case "ledger": return <Ledger key={i} b={b} />;
          case "commitments": return <Commitments key={i} b={b} s={settings} />;
          case "text": return <Text key={i} b={b} />;
          case "imageText": return <ImageText key={i} b={b} />;
          case "gallery": return <Gallery key={i} b={b} />;
          case "quotes": return <Quotes key={i} b={b} />;
          case "cta": return <Cta key={i} b={b} />;
          case "video": return <Video key={i} b={b} />;
          default: return null;
        }
      })}
    </>
  );
}
