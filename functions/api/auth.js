/**
 * Cloudflare Pages Function — step 1 of GitHub login for Decap CMS.
 * Requires env vars (Cloudflare Pages → Settings → Variables and secrets):
 *   GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
 */
export async function onRequestGet({ request, env }) {
  if (!env.GITHUB_CLIENT_ID) return new Response("GITHUB_CLIENT_ID is not set in Cloudflare Pages settings.", { status: 500 });
  const url = new URL(request.url);
  const state = crypto.randomUUID();
  const gh = new URL("https://github.com/login/oauth/authorize");
  gh.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  gh.searchParams.set("redirect_uri", `${url.origin}/api/callback`);
  gh.searchParams.set("scope", url.searchParams.get("scope") || "repo,user");
  gh.searchParams.set("state", state);
  return new Response(null, {
    status: 302,
    headers: {
      Location: gh.toString(),
      "Set-Cookie": `decap_oauth_state=${state}; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
      "Cache-Control": "no-store",
    },
  });
}
