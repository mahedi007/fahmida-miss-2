import type { Settings } from "@/lib/types";
import { contactHref, linkProps } from "@/lib/links";
import { Icon } from "./Icon";
import { Magnetic } from "./motion/Magnetic";
import { Reveal } from "./motion/Reveal";

export function Footer({ s }: { s: Settings }) {
  const f = s.footer || {};
  const contact = contactHref(s);
  const btnHref = f.buttonUrl || contact;
  const isFile = /\.(pdf|docx?)$/i.test(btnHref);
  const inquiry = s.contact.email || (s.contact.linkedin ? "Message me on LinkedIn" : "Get in touch");
  return (
    <footer id="contact" className="relative bg-white text-black pt-24 pb-12 overflow-hidden border-t-[12px] border-black">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {f.splash && <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.14] bg-contain bg-no-repeat rotate-90 scale-150" style={{ backgroundImage: `url(${f.splash})` }} />}
        <div className="absolute inset-0 opacity-[0.04] dots-10" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-12 gap-8 items-end">
          <Reveal variant="left" className="md:col-span-7 space-y-4">
            {f.badge && <div className="inline-block bg-black text-white text-[10px] font-black tracking-[0.5em] px-3 py-1 mb-2 uppercase">{f.badge}</div>}
            <h2 className="text-[clamp(4rem,9.2vw,10rem)] leading-[0.8] tracking-tighter italic uppercase">
              {s.site.firstName} <br />
              <span className="relative inline-block">{s.site.lastName}<span className="absolute -bottom-2 left-0 w-full h-4 bg-black skew-x-[-20deg]" /></span>
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.15} className="md:col-span-5 flex flex-col gap-6 border-b-[6px] border-black pb-4">
            <div className="space-y-1">
              {f.kicker && <p className="font-black text-[10px] uppercase tracking-widest text-black/70 flex items-center gap-2"><Icon name="bolt" size={12} /> {f.kicker}</p>}
              {f.line && <p className="font-bold text-lg text-black leading-tight uppercase">{f.line}</p>}
            </div>
            <div className="flex gap-4">
              {s.contact.linkedin && <a href={s.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 border-2 border-black text-black/70 hover:bg-black hover:text-white transition-all"><Icon name="linkedin" /></a>}
              {s.contact.email && <a href={`mailto:${s.contact.email}`} aria-label="Email" className="p-2 border-2 border-black text-black/70 hover:bg-black hover:text-white transition-all"><Icon name="mail" /></a>}
            </div>
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="flex flex-col gap-1 min-w-0">
            <span className="font-black text-xs uppercase tracking-[0.4em] text-black">{f.inquiriesLabel || "Inquiries"}</span>
            <a href={contact} {...linkProps(contact)} className="text-2xl md:text-4xl text-black hover:italic transition-all break-words">{inquiry}</a>
          </div>
          <Magnetic strength={0.2}>
            <a href={btnHref} {...linkProps(btnHref)} className="group relative block px-12 py-6 bg-black text-white text-3xl tracking-widest italic transition-transform active:scale-95 isolate">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity overflow-hidden"><div className="absolute inset-0 stripes" /></div>
              <span className="relative z-10 flex items-center gap-4 uppercase whitespace-nowrap">{f.buttonLabel || "Say Hello"} <Icon name={isFile ? "download" : "arrow"} size={22} /></span>
              <div className="absolute -inset-1 border-2 border-black -z-10 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
            </a>
          </Magnetic>
        </div>

        <div className="mt-24 pt-4 border-t-2 border-black flex flex-wrap gap-3 justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-black/70">
          {f.location && <span>{f.location}</span>}
          <span className="text-black">© {new Date().getFullYear()} {s.site.firstName.charAt(0) + s.site.firstName.slice(1).toLowerCase()} {s.site.lastName.charAt(0) + s.site.lastName.slice(1).toLowerCase()}</span>
          <a href="#top" className="hover:text-black hover:italic">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
