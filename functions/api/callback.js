/**
 * Cloudflare Pages Function — step 2 of GitHub login for Decap CMS.
 * Exchanges the GitHub code for a token and hands it to the CMS window.
 */
function page(status, content) {
  const msg = JSON.stringify(`authorization:github:${status}:${JSON.stringify(content)}`);
  return new Response(
    `<!doctype html><html><head><meta charset="utf-8"><title>Signing in…</title></head>
<body style="font-family:system-ui;padding:2rem">${status === "success" ? "Signed in. You can close this window." : "Sign-in failed. Close this window and try again."}
<script>
(function () {
  function receive(e) {
    if (e.origin !== window.location.origin) return;
    window.opener.postMessage(${msg}, e.origin);
    window.removeEventListener("message", receive, false);
  }
  window.addEventListener("message", receive, false);
  window.opener && window.opener.postMessage("authorizing:github", window.location.origin);
})();
</script></body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "Set-Cookie": "decap_oauth_state=; Path=/api; Max-Age=0" } }
  );
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookie = (request.headers.get("Cookie") || "").match(/decap_oauth_state=([^;]+)/)?.[1];
  if (!code || !state || state !== cookie) return page("error", { message: "Invalid login state. Please try again." });

  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", "User-Agent": "decap-cms-cloudflare-oauth" },
    body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code, redirect_uri: `${url.origin}/api/callback` }),
  });
  const data = await res.json().catch(() => ({}));
  if (!data.access_token) return page("error", { message: data.error_description || "GitHub did not return a token." });
  return page("success", { token: data.access_token, provider: "github" });
}
