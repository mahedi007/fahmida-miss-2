import { notFound } from "next/navigation";
import { getPage, getSettings } from "@/lib/content";
import { BlockRenderer } from "@/components/BlockRenderer";

export default function Home() {
  const page = getPage("home");
  if (!page) notFound();
  return <BlockRenderer sections={page.sections || []} settings={getSettings()} />;
}
