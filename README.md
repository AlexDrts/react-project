# AFTERGLOW

A clothing store built with React for the exam project (draft). Dark and light themes use the pink / magenta / purple palette of the author's avatar.

## Run

```bash
npm install
npm start        # json-server on :3001 + Vite on :5173
```

Or in two terminals: `npm run api` and `npm run dev`. The browser talks to `/api/*`, Vite forwards it to json-server.
`npm run reset-db` restores the sample data (`db.seed.json` → `db.json`).

## Environment variables

Base URLs live in `.env` (project root, next to `index.html`), not in the code. Only names starting with `VITE_` reach the browser.

Create a file named `.env` in the project root with:

```
VITE_API_URL=/api
VITE_API_PROXY_TARGET=http://localhost:3001
```

| Variable | Meaning |
| --- | --- |
| `VITE_API_URL` | Base URL of the API, read in `src/api/client.js` as `import.meta.env.VITE_API_URL` |
| `VITE_API_PROXY_TARGET` | Where the Vite dev server forwards `/api` (read in `vite.config.js`) |

`.env` is listed in `.gitignore`, so real values are never pushed to GitHub.
On a host such as render.com, set the same variables in its dashboard. Restart `npm start` after editing `.env`.

## Routes

| Path | Page |
| --- | --- |
| `/` | Home: hero, category menu, filters, infinite product grid |
| `/category/:categoryId` | One category (unknown id redirects to `/`) |
| `/product/:productId` | Product details, size and quantity (unknown id redirects to `/`) |
| `/cart` | Cart |
| `/checkout` | Order form (empty cart redirects to `/cart`) |
| `/admin` | CRUD for products and categories, user registration |

`/shop` redirects to `/`. Active links use `NavLink`.

## Where each requirement lives

| Requirement | Where |
| --- | --- |
| Classes `Product`, `Category`, `Cart`, `Order` | `src/models/` |
| Inheritance and polymorphism | `ClothingProduct`, `FootwearProduct` override `icon` and `getDetails()`; `productFromApi()` picks the class |
| List item + list component with `data.map` | `CategoryItem`/`CategoryList`, `ProductCard`/`ProductGrid`, `CartItem`/`CartList`, `SizeOption`/`SizePicker`, `DetailItem`/`DetailList`, `AdminProductRow`/`AdminProductTable`, `AdminCategoryRow`/`AdminCategoryTable`, `UserRow`/`UserList` |
| Conditional rendering | loaders, errors, empty states, sale / sold-out badges, `ProductGrid`, `CartPage` |
| `useState` | filters (`ShopSection`), "added" flags, checkout result |
| `useReducer` | admin panel (`adminReducer`), size / quantity picker (`selectionReducer`) |
| `useContext` | current category (`CategoryContext`), theme (`ThemeContext`) |
| Redux Toolkit | `src/store/`: cart items and the signed-in user, both saved in `localStorage` |
| `useEffect` + cleanup | `useInfiniteScroll`, `useDebouncedValue`, `Modal`, timers in `ProductCard` / `ConfirmButton` / `AdminPage` |
| `useRef` | focus on the size list (`ProductDetails`), scroll to top after submit (`CheckoutPage`), close button focus (`Modal`), `IntersectionObserver` sentinel |
| TanStack Query | `src/hooks/useShopQueries.js`, mutations in the admin forms and checkout |
| `fetch`, loaders, `try-catch-finally` | `src/api/client.js` (timeout, readable errors), `CheckoutPage` |
| Infinite scroll | `ProductGrid` + `useInfiniteScroll` (`IntersectionObserver`), `useInfiniteQuery` |
| React Hook Form | `OrderForm` (from the 25.06.2026 homework), `ProductForm`, `CategoryForm`, `UserRegisterForm` |
| Validation, checkboxes, selects | `OrderForm` (phone, email, terms checkbox, delivery / payment selects) |
| `localStorage` | cart, user, theme |
| Dexie (IndexedDB) | `src/api/cacheDb.js`: products and categories are cached; the catalog still opens if the API is down |
| Tailwind + styled-components | Tailwind for layout and tokens (`index.css`), styled-components for `Modal` and `Badge` |
| Dialog from a library (homework 30.06.2026) | Headless UI `Dialog`: `ConfirmDialog` (`src/components/ui/ConfirmDialog.jsx`) asks before clearing the cart and before deleting a product or category. The library gives the portal, focus trap, Escape, click-outside and scroll lock; Tailwind styles it and animates it with `data-closed`. State: `useConfirm` hook |
| Fragments and Portals | `Modal` renders into `document.body` through `createPortal` inside a `Fragment` |
| GET / POST | `src/api/shopApi.js`: products and categories (GET), orders and users (POST), admin PUT / DELETE |

## Not included (not in the brief)

Tests, JWT login, i18n. Users are registered without a password; this is a draft.

## Notes

- `vite.config.js` tells Vite to ignore `db.json`. json-server rewrites that file on every write, and without the setting the page would reload after each order or admin change.
- Prices and descriptions are sample data. Product pictures are gradients with an emoji.
