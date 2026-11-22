# Regenerates public/admin/config.yml (the CMS schema). Optional: you can also edit config.yml by hand.
# Usage: python3 scripts/generate-cms-config.py   (needs: pip install pyyaml)
import yaml, re, sys
ICONS = re.findall(r'^\s{2}(\w+): \[', open(sys.argv[1] if len(sys.argv) > 1 else "components/Icon.tsx").read(), re.M)

def F(name, label, widget="string", req=False, **kw):
    d = {"label": label, "name": name, "widget": widget}
    if not req: d["required"] = False
    d.update(kw); return d
def S(name, label, req=False, **kw): return F(name, label, "string", req, **kw)
def T(name, label, **kw): return F(name, label, "text", **kw)
def IMG(name, label, **kw): return F(name, label, "image", choose_url=True, **kw)
def B(name, label, default=False, **kw): return F(name, label, "boolean", default=default, **kw)
def STRLIST(name, label, **kw): return F(name, label, "list", field={"label": "Item", "name": "item", "widget": "string"}, **kw)
def LIST(name, label, fields, summary=None, **kw):
    d = F(name, label, "list", fields=fields, **kw)
    if summary: d["summary"] = summary
    return d
def OBJ(name, label, fields, **kw): return F(name, label, "object", fields=fields, collapsed=True, **kw)
def ICON(name="icon", label="Icon"): return F(name, label, "select", options=ICONS, hint="Line icon shown on the tile/card")
def THEME(default="dark"): return F("theme", "Background", "select", options=[{"label":"Dark","value":"dark"},{"label":"Light (white)","value":"light"}], default=default)

BOLD = "Wrap words in **double asterisks** to make them bold & italic."
common = [S("anchor", "Anchor ID", hint="Used for menu links, e.g. 'about' → link to /#about. Lowercase, no spaces."),
          B("hidden", "Hide this section", hint="Turn on to hide without deleting.")]
def TITLE(): return [S("titleTop", "Title (solid part)"), S("titleOutline", "Title (outlined part)")]

types = [
 {"label": "★ Hero (intro with portrait)", "name": "hero", "widget": "object", "summary": "{{fields.firstName}} {{fields.lastName}}", "fields": common + [
   S("firstName", "First name (big)", req=True), S("lastName", "Last name (big)", req=True), S("tag", "Black tag line"),
   T("lead", "Intro paragraph"), STRLIST("chips", "Badges / chips"), S("location", "Small location line"),
   IMG("portrait", "Portrait image", hint="Best: PNG/WebP with transparent background, ~900px wide"),
   S("portraitAlt", "Portrait description (accessibility)"), IMG("splash", "Background ink texture"),
   B("colorReveal", "Black & white portrait with colour reveal on hover", default=True), S("revealHint", "Reveal hint label"),
   S("exploreLabel", "Vertical 'explore' label"), S("exploreHref", "Explore link", hint="e.g. #about")]},
 {"label": "Marquee (scrolling text bands)", "name": "marquee", "widget": "object", "summary": "Marquee", "fields": common + [
   STRLIST("items", "Main band words"), STRLIST("secondary", "Back band words (outlined)")]},
 {"label": "About (title + statement + columns)", "name": "about", "widget": "object", "summary": "{{fields.titleTop}} {{fields.titleOutline}}", "fields": common + TITLE() + [
   S("subline", "Small line under title"), S("statementLead", "Statement (grey line)"), S("statementHighlight", "Statement (white highlight)"),
   LIST("columns", "Numbered columns", [S("number", "Number"), S("title", "Title", req=True), S("tag", "Tag after //"), T("body", "Text", hint=BOLD)], summary="{{fields.number}}. {{fields.title}}"),
   S("status", "Status bar text")]},
 {"label": "Cards grid (journey / projects)", "name": "cards", "widget": "object", "summary": "{{fields.titleTop}} {{fields.titleOutline}}", "fields": common + TITLE() + [
   LIST("items", "Cards", [
     S("name", "Card title", req=True), S("duration", "Duration (small)"), S("meta", "Cover top-left label"), S("badge", "Cover top-right badge"),
     B("live", "Show live red dot"), S("from", "Cover: from (outlined)"), S("to", "Cover: to (solid)"), S("role", "Cover: role line"),
     IMG("image", "Cover image (replaces the typographic cover)"), S("link", "Card link (URL)"),
     T("description", "Description"), STRLIST("tags", "Tags")], summary="{{fields.name}} ({{fields.from}}–{{fields.to}})"),
   S("footnote", "Footnote label")]},
 {"label": "Tabs + tiles (toolkit / skills)", "name": "tabs", "widget": "object", "summary": "{{fields.titleTop}} {{fields.titleOutline}}", "fields": common + TITLE() + [
   LIST("tabs", "Tabs", [
     S("label", "Tab name", req=True), S("sub", "Small label above tab name"), S("registry", "Boxed label"),
     T("heading", "Big heading"), T("note", "Small note", hint=BOLD),
     LIST("tiles", "Tiles", [S("label", "Label", req=True), ICON()], summary="{{fields.label}}")], summary="{{fields.label}}"),
   S("signature", "Faint signature text")]},
 {"label": "Featured highlight (award / milestone)", "name": "feature", "widget": "object", "summary": "{{fields.title}}", "fields": common + [
   S("label", "Section label"), S("tag", "Red tag"), S("title", "Title", req=True), T("description", "Description"),
   S("ctaLabel", "Link label"), S("ctaUrl", "Link URL (e.g. Credly badge)"),
   LIST("stats", "Animated numbers", [S("label", "Label", req=True), F("value", "Number", "number", req=True, value_type="int"), S("suffix", "Suffix (e.g. +)"), ICON()], summary="{{fields.value}}{{fields.suffix}} {{fields.label}}")]},
 {"label": "Ledger list (certifications / education)", "name": "ledger", "widget": "object", "summary": "{{fields.titleTop}} {{fields.titleOutline}}", "fields": common + [S("label", "Section label")] + TITLE() + [
   LIST("groups", "Groups", [S("label", "Group label"),
     LIST("rows", "Rows", [S("code", "Code (e.g. LOG_01)"), S("title", "Title", req=True), S("meta", "Details line"), S("status", "Status badge"),
       F("style", "Badge style", "select", options=[{"label":"Default","value":"default"},{"label":"Highlighted (maroon)","value":"live"},{"label":"In progress (dashed)","value":"progress"}], default="default"),
       S("url", "Link")], summary="{{fields.code}} — {{fields.title}}")], summary="{{fields.label}}")]},
 {"label": "Principles grid (core commitments)", "name": "commitments", "widget": "object", "summary": "{{fields.titleTop}} {{fields.titleOutline}}", "fields": common + [S("label", "Section label")] + TITLE() + [
   LIST("items", "Principles", [ICON(), S("title", "Title", req=True), S("practiceLabel", "Label 1"), T("practice", "Text 1"), S("outcomeLabel", "Label 2"), T("outcome", "Big statement")], summary="{{fields.title}}"),
   T("closing", "Closing text"), S("ctaSub", "Button small label"), S("ctaLabel", "Button big label"), S("ctaUrl", "Button URL (blank = contact)")]},
 {"label": "✚ Text / Story (rich text)", "name": "text", "widget": "object", "summary": "{{fields.titleTop}} {{fields.titleOutline}}", "fields": common + [S("label", "Section label")] + TITLE() + [
   F("body", "Body", "markdown", buttons=["bold","italic","link","heading-two","heading-three","quote","bulleted-list","numbered-list"]), THEME("dark")]},
 {"label": "✚ Image + Text", "name": "imageText", "widget": "object", "summary": "{{fields.title}}", "fields": common + [
   S("label", "Section label"), S("title", "Title"), F("body", "Body", "markdown"), IMG("image", "Image"), S("imageAlt", "Image description"),
   F("imageSide", "Image side", "select", options=["right","left"], default="right"), S("buttonLabel", "Button label"), S("buttonUrl", "Button URL"), THEME("light")]},
 {"label": "✚ Photo gallery (with lightbox)", "name": "gallery", "widget": "object", "summary": "{{fields.titleTop}} {{fields.titleOutline}}", "fields": common + [S("label", "Section label")] + TITLE() + [
   LIST("images", "Photos", [IMG("image", "Photo", req=True), S("caption", "Caption")], summary="{{fields.caption}}")]},
 {"label": "✚ Testimonials / quotes", "name": "quotes", "widget": "object", "summary": "{{fields.titleTop}} {{fields.titleOutline}}", "fields": common + [S("label", "Section label")] + TITLE() + [
   LIST("items", "Quotes", [T("quote", "Quote", req=True), S("name", "Name"), S("role", "Role (e.g. Parent, Grade 7)")], summary="{{fields.name}}")]},
 {"label": "✚ Call to action banner", "name": "cta", "widget": "object", "summary": "{{fields.title}}", "fields": common + [
   S("kicker", "Small tag"), S("title", "Title", req=True), T("text", "Text"), S("buttonLabel", "Button label"), S("buttonUrl", "Button URL")]},
 {"label": "✚ Video (YouTube / Vimeo)", "name": "video", "widget": "object", "summary": "{{fields.title}}", "fields": common + [
   S("label", "Section label"), S("title", "Title"), S("url", "Video URL", req=True, hint="Paste a normal YouTube or Vimeo link"), S("caption", "Caption")]},
]

settings_fields = [
 OBJ("site", "Site & SEO", [S("firstName", "First name", req=True), S("lastName", "Last name", req=True), S("title", "Browser / Google title", req=True),
   T("description", "Google description", req=True), S("url", "Live site URL", hint="e.g. https://fahmidasultana.com — used for share previews"),
   IMG("ogImage", "Share preview image (1200×630)"), S("jobTitle", "Job title (for Google)"), S("worksFor", "Current school (for Google)")]),
 OBJ("contact", "Contact details", [S("email", "Email"), S("linkedin", "LinkedIn URL"), S("phone", "Phone")]),
 OBJ("theme", "Colours & motion", [F("accent", "Accent colour", "color"), F("accentDeep", "Deep accent colour", "color"), B("smoothScroll", "Smooth scrolling", default=True)]),
 LIST("nav", "Menu links", [S("label", "Label", req=True), S("href", "Link", req=True, hint="Section: /#about · Page: /my-page/ · External: https://…")], summary="{{fields.label}} → {{fields.href}}"),
 OBJ("headerButton", "Header button", [S("label", "Label"), S("url", "Link or file", hint="Leave blank to use your contact link. Upload a CV via Media and paste e.g. /uploads/cv.pdf")]),
 OBJ("footer", "Footer", [S("badge", "Badge"), S("kicker", "Small line"), T("line", "Statement"), S("inquiriesLabel", "Inquiries label"),
   S("buttonLabel", "Big button label"), S("buttonUrl", "Big button link (blank = contact)"), S("location", "Location"), IMG("splash", "Background texture")]),
]

config = {
 "backend": {"name": "github", "repo": "YOUR-GITHUB-USERNAME/YOUR-REPO-NAME", "branch": "main", "auth_endpoint": "api/auth", "commit_messages": {"update": "content: update {{collection}} “{{slug}}”", "create": "content: create {{collection}} “{{slug}}”", "delete": "content: delete {{collection}} “{{slug}}”", "uploadMedia": "media: upload “{{path}}”", "deleteMedia": "media: delete “{{path}}”"}},
 "local_backend": True,
 "publish_mode": "simple",
 "media_folder": "public/uploads",
 "public_folder": "/uploads",
 "slug": {"encoding": "ascii", "clean_accents": True},
 "collections": [
  {"name": "pages", "label": "Pages", "label_singular": "Page", "folder": "content/pages", "format": "json", "extension": "json",
   "create": True, "delete": True, "slug": "{{slug}}", "identifier_field": "title", "editor": {"preview": False},
   "description": "“home” is the homepage. New pages appear at /page-name/. Add, reorder (drag) or hide sections inside each page.",
   "fields": [S("title", "Page title", req=True), S("seoTitle", "SEO title"), T("seoDescription", "SEO description"),
     {"label": "Sections", "name": "sections", "widget": "list", "typeKey": "type", "types": types, "collapsed": True, "label_singular": "Section", "add_to_top": False}]},
  {"name": "settings", "label": "Site settings", "editor": {"preview": False}, "files": [
    {"name": "settings", "label": "Global settings (menu, contact, footer, SEO, colours)", "file": "content/settings.json", "format": "json", "fields": settings_fields}]},
 ],
}

class D(yaml.SafeDumper):
    def increase_indent(self, flow=False, indentless=False): return super().increase_indent(flow, False)
out = "# Decap CMS configuration — edit content at /admin\n# 1) Set backend.repo to your GitHub repo  2) See README for the GitHub login setup\n" + yaml.dump(config, Dumper=D, sort_keys=False, allow_unicode=True, width=200)
open(sys.argv[2] if len(sys.argv) > 2 else "public/admin/config.yml", "w").write(out)
print("icons:", len(ICONS), "types:", len(types))
