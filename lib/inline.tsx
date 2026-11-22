import { Fragment, type ReactNode } from "react";

/** Tiny inline formatter: **bold**, *italic*, [text](url) — for short CMS fields. */
export function Inline({ text, boldClass = "" }: { text?: string; boldClass?: string }) {
  if (!text) return null;
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0, m: RegExpExecArray | null, i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(<Fragment key={i++}>{text.slice(last, m.index)}</Fragment>);
    if (m[1]) out.push(<b key={i++} className={boldClass}>{m[1]}</b>);
    else if (m[2]) out.push(<em key={i++}>{m[2]}</em>);
    else if (m[3]) out.push(<a key={i++} href={m[4]} className="underline underline-offset-4">{m[3]}</a>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(<Fragment key={i++}>{text.slice(last)}</Fragment>);
  return <>{out}</>;
}
