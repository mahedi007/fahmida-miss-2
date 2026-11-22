import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage, getPageSlugs, getSettings } from "@/lib/content";
import { BlockRenderer } from "@/components/BlockRenderer";

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = getPageSlugs();
  // Next's static export needs at least one param; "__empty" renders a 404 and is harmless
  return slugs.length ? slugs.map((slug) => ({ slug })) : [{ slug: "__empty" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);
  const s = getSettings();
  if (!page) return {};
  return { title: page.seoTitle || `${page.title} | ${s.site.firstName} ${s.site.lastName}`, description: page.seoDescription || s.site.description };
}

export default async function CmsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) notFound();
  return <BlockRenderer sections={page.sections || []} settings={getSettings()} />;
}
