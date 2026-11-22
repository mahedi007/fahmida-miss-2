export default function NotFound() {
  return (
    <section className="relative m-2 min-h-[80vh] bg-white text-black border-[7px] border-black flex flex-col justify-center p-8 md:p-24 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] dots pointer-events-none" />
      <h1 className="relative text-[clamp(7rem,26vw,22rem)] italic tracking-[-0.06em] leading-[0.8]">4<span className="text-transparent [-webkit-text-stroke:2px_black]">0</span>4</h1>
      <p className="relative mt-8 self-start bg-black text-white px-6 py-3 font-bold uppercase -rotate-1">This page skipped class.</p>
      <a href="/" className="relative mt-8 self-start border-[3px] border-black px-8 py-2.5 text-xs font-black uppercase tracking-[0.3em] shadow-[6px_6px_0_0_#000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all">Back to the classroom →</a>
    </section>
  );
}
