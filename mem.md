
# Project Memory — brinqueTEAndo E-commerce

## Stack
- Shopify Hydrogen (React-based) with React Router
- Tailwind CSS for styling
- Deployed via Cloudflare Workers (wrangler.toml)
- Vite as build tool

## Architecture
- `app/routes/` — page routes (React Router file-based routing)
- `app/components/` — shared UI components (Aside, CartDrawer, Header, Footer, etc.)
- `app/lib/` — utilities (shopify client, session, queries, variants, countdown hook)
- `app/styles/app.css` — global styles

## Key Patterns
- Uses `useAside()` hook from `~/components/Aside` to open cart/menu drawers
- Cart managed via Hydrogen's cart API (`context.cart`)
- Footer menu is hardcoded in loader (not fetched from Shopify menu API)
- Multiple routes duplicate header/countdown/promo banner logic (e.g., `_index.jsx`, `collections.all.jsx`)

## Known Issues & Fixes
- Countdown timer: `calculateHolidayCountdown()` must NOT call `setState` inside itself. Return data and update state only in `useEffect`. Always destructure only `{days, hours, minutes, seconds}` into `setTimeLeft` to avoid passing extra props.
- Hydration: use `isMounted` state guard for client-only dynamic content (countdown timers). Render static placeholder on server, real values after mount.
- Meta tags: avoid `rel: 'preload', as: 'video'` — React doesn't support it and breaks hydration.
- Fallback returns in countdown must include `holiday: null` for consistency.

## Important Files
- `app/routes/_index.jsx` — Homepage (large, ~847 lines, includes countdown, promo banner, testimonials, footer)
- `app/routes/collections.all.jsx` — All products catalog with QuickView modal, pagination, own header/footer
- `app/components/AddToCartButton.jsx` — Reusable add-to-cart with Hydrogen CartForm
- `app/components/Aside.jsx` — Drawer/aside system (cart, menu)
