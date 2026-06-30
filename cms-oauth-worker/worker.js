// Cloudflare Worker die GitHub-inloggen regelt voor de Decap CMS-editor op /admin.
// Nodig omdat Decap CMS (gratis, geen eigen server) een kleine tussenstap nodig
// heeft om een GitHub-token op te halen zonder het geheime "client secret"
// in de browser te hoeven blootstellen.

const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/auth") {
      const authorizeUrl = new URL(GITHUB_AUTHORIZE_URL);
      authorizeUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
      authorizeUrl.searchParams.set("redirect_uri", `${url.origin}/callback`);
      authorizeUrl.searchParams.set("scope", "repo,user");
      authorizeUrl.searchParams.set("state", crypto.randomUUID());
      return Response.redirect(authorizeUrl.toString(), 302);
    }

    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      if (!code) {
        return new Response("Geen 'code' ontvangen van GitHub.", { status: 400 });
      }

      const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });
      const tokenData = await tokenResponse.json();

      if (tokenData.error) {
        return new Response(`GitHub gaf een fout: ${tokenData.error_description || tokenData.error}`, { status: 400 });
      }

      const payload = JSON.stringify({ token: tokenData.access_token, provider: "github" });

      // Dit handdrukprotocol is wat Decap CMS in het hoofdvenster verwacht:
      // het pop-upvenster meldt zich, het hoofdvenster antwoordt, en pas dan
      // wordt het token teruggestuurd.
      const html = `<!DOCTYPE html><html><body>
<script>
(function() {
  function receiveMessage(e) {
    window.opener.postMessage('authorization:github:success:${escapeForScript(payload)}', e.origin);
    window.removeEventListener('message', receiveMessage, false);
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script>
Je kunt dit venster sluiten.
</body></html>`;

      return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }

    return new Response("Niet gevonden", { status: 404 });
  },
};

function escapeForScript(payload) {
  return payload.replace(/</g, "\\u003c");
}
