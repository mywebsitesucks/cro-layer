
# CRO Layer MVP

## Files
- `inject.js` — snippet your client pastes into their site.
- `optimized.html` + `optimized.css` — the optimized page.

## How to use
1) Host these files online (Vercel/Netlify/etc).
2) Give client this in their <head>:
<script src="https://YOUR-CDN/inject.js"
        data-url="https://YOUR-CDN/optimized.html"
        data-enabled="true"
        data-keep-scripts="true"></script>
3) Script fetches optimized page and swaps it in live.
