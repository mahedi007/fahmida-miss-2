/* Generic, reusable blocks for adding new sections from the CMS */
import ReactMarkdown from "react-markdown";
import type { CtaBlock, ImageTextBlock, QuotesBlock, TextBlock, VideoBlock } from "@/lib/types";
import { linkProps } from "@/lib/links";
import { Icon } from "../Icon";
import { Magnetic } from "../motion/Magnetic";
import { Reveal } from "../motion/Reveal";

function Title({ top, outline, dark }: { top?: string; outline?: string; dark: boolean }) {
  if (!top && !outline) return null;
  return (
    <Reveal variant="left" className={`mb-10 border-l-[8px] md:border-l-[12px] pl-5 md:pl-8 ${dark ? "border-stone-100" : "border-black"}`}>
      <h2 className={`text-5xl sm:text-6xl md:text-[6rem] leading-[0.8] tracking-tighter italic uppercase ${dark ? "text-stone-100" : "text-black"}`}>
        {top} {outline && <span className={`text-transparent ${dark ? "[-webkit-text-stroke:1px_#f5f5f4]" : "[-webkit-text-stroke:1.5px_black]"}`}>{outline}</span>}
      </h2>
    </Reveal>
  );
}

function Label({ text, dark }: { text?: string; dark: boolean }) {
  if (!text) return null;
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-2 h-2 bg-accent animate-pulse" />
      <span className={`text-[10px] font-black tracking-[0.4em] uppercase ${dark ? "text-stone-500" : "text-black/50"}`}>{text}</span>
    </div>
  );
}

export function Text({ b }: { b: TextBlock }) {
  const dark = b.theme !== "light";
  return (
    <section id={b.anchor || undefined} className={`max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 ${dark ? "bg-stone-950 text-stone-300" : "bg-white text-black"}`}>
      <Label text={b.label} dark={dark} />
      <Title top={b.titleTop} outline={b.titleOutline} dark={dark} />
      <Reveal variant="up" className="prose-brutal max-w-3xl text-base md:text-xl leading-relaxed font-medium">
        <ReactMarkdown>{b.body || ""}</ReactMarkdown>
      </Reveal>
    </section>
  );
}

export function ImageText({ b }: { b: ImageTextBlock }) {
  const dark = b.theme === "dark";
  const right = b.imageSide !== "left";
  return (
    <section id={b.anchor || undefined} className={`max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 ${dark ? "bg-stone-950 text-stone-300" : "bg-white text-black"}`}>
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <Reveal variant="up" className={right ? "md:order-1" : "md:order-2"}>
          <Label text={b.label} dark={dark} />
          {b.title && <h2 className={`text-4xl md:text-6xl leading-[0.9] tracking-tighter italic uppercase mb-6 ${dark ? "text-stone-100" : ""}`}>{b.title}</h2>}
          <div className="prose-brutal text-base md:text-lg leading-relaxed font-medium"><ReactMarkdown>{b.body || ""}</ReactMarkdown></div>
          {b.buttonLabel && b.buttonUrl && (
            <a href={b.buttonUrl} {...linkProps(b.buttonUrl)} className={`inline-flex items-center gap-3 mt-4 border-[3px] px-8 py-3 text-xs font-black uppercase tracking-[0.3em] transition-all hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] ${dark ? "border-stone-100 text-stone-100 shadow-[6px_6px_0_0_#f5f5f4]" : "border-black text-black shadow-[6px_6px_0_0_#000]"}`}>
              {b.buttonLabel} <Icon name="arrow" size={14} />
            </a>
          )}
        </Reveal>
        {b.image && (
          <Reveal variant="scale" delay={0.1} className={`group relative ${right ? "md:order-2" : "md:order-1"}`}>
            <div className={`relative border-[4px] overflow-hidden ${dark ? "border-stone-100 shadow-[12px_12px_0_0_#f5f5f4]" : "border-black shadow-[12px_12px_0_0_#000]"}`}>
              <img src={b.image} alt={b.imageAlt || ""} className="w-full h-auto grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 opacity-10 dots-8 pointer-events-none" />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export function Quotes({ b }: { b: QuotesBlock }) {
  return (
    <section id={b.anchor || undefined} className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 bg-stone-950">
      <Label text={b.label} dark />
      <Title top={b.titleTop} outline={b.titleOutline} dark />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {(b.items || []).map((q, i) => (
          <Reveal key={i} variant="up" delay={(i % 3) * 0.1} className="group relative border-[3px] border-stone-100 bg-stone-950 p-6 md:p-8 shadow-[8px_8px_0_0_#f5f5f4] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
            <span className="block text-7xl leading-[0.6] italic text-accent mb-4">“</span>
            <p className="text-stone-100 text-lg md:text-xl font-semibold italic leading-snug tracking-tight mb-8">{q.quote}</p>
            <div className="border-t border-stone-800 pt-4">
              {q.name && <p className="text-sm font-black uppercase tracking-widest text-stone-100">{q.name}</p>}
              {q.role && <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-500 mt-1">{q.role}</p>}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Cta({ b }: { b: CtaBlock }) {
  return (
    <section id={b.anchor || undefined} className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
      <Reveal variant="upLg" className="relative bg-white text-black border-[7px] border-black p-8 md:p-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] dots pointer-events-none" />
        <div className="relative grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            {b.kicker && <div className="inline-block bg-black text-white px-4 py-2 text-xs font-black uppercase tracking-[0.3em] -rotate-1 mb-6">{b.kicker}</div>}
            <h2 className="text-5xl md:text-8xl leading-[0.85] tracking-tighter italic uppercase">{b.title}</h2>
            {b.text && <p className="mt-6 text-lg md:text-xl font-medium text-black/70 max-w-2xl">{b.text}</p>}
          </div>
          {b.buttonLabel && b.buttonUrl && (
            <div className="md:col-span-4 md:justify-self-end">
              <Magnetic strength={0.25}>
                <a href={b.buttonUrl} {...linkProps(b.buttonUrl)} className="group relative inline-flex items-center gap-4 px-10 py-5 bg-black text-white text-2xl italic uppercase tracking-widest isolate">
                  {b.buttonLabel} <Icon name="arrow" size={20} />
                  <span className="absolute -inset-1 border-2 border-black -z-10 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
                </a>
              </Magnetic>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}

function embedUrl(url: string) {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
  return url;
}

export function Video({ b }: { b: VideoBlock }) {
  if (!b.url) return null;
  return (
    <section id={b.anchor || undefined} className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 bg-stone-950">
      <Label text={b.label} dark />
      {b.title && <h2 className="text-4xl md:text-7xl text-stone-100 italic uppercase tracking-tighter leading-[0.85] mb-10">{b.title}</h2>}
      <Reveal variant="scale" className="border-[4px] border-stone-100 shadow-[14px_14px_0_0_#f5f5f4] aspect-video bg-black">
        <iframe src={embedUrl(b.url)} title={b.title || "Video"} className="w-full h-full" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      </Reveal>
      {b.caption && <p className="mt-6 text-[10px] font-black uppercase tracking-[0.4em] text-stone-500">{b.caption}</p>}
    </section>
  );
}
