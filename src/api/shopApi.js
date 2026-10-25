import { request, ApiError } from "./client";
import { cacheDb } from "./cacheDb";
import { productFromApi, categoryFromApi } from "../models";

export const PAGE_SIZE = 8;

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating-desc", label: "Top rated" },
];

const SORT_PARAMS = {
  "price-asc": { _sort: "price", _order: "asc" },
  "price-desc": { _sort: "price", _order: "desc" },
  "rating-desc": { _sort: "rating", _order: "desc" },
};

async function saveToCache(table, rows) {
  try {
    await table.bulkPut(rows);
  } catch {
    // The cache is a bonus; a failed write must never break the page.
  }
}

/* ---------- Products ---------- */

function buildProductParams({ page, limit, categoryId, search, sort, gender, inStockOnly }) {
  const params = new URLSearchParams();
  if (page) params.set("_page", page);
  if (limit) params.set("_limit", limit);
  if (categoryId) params.set("categoryId", categoryId);
  if (search) params.set("q", search);
  if (gender && gender !== "all") params.set("gender", gender);
  if (inStockOnly) params.set("inStock", "true");
  const sorting = SORT_PARAMS[sort];
  if (sorting) {
    params.set("_sort", sorting._sort);
    params.set("_order", sorting._order);
  }
  return params;
}

/** Same filtering as the server does, but over the Dexie copy. Used when the API is unreachable. */
async function readProductsFromCache({ page, limit, categoryId, search, sort, gender, inStockOnly }) {
  let rows = await cacheDb.products.toArray();
  if (categoryId) rows = rows.filter((p) => p.categoryId === categoryId);
  if (gender && gender !== "all") rows = rows.filter((p) => p.gender === gender);
  if (inStockOnly) rows = rows.filter((p) => p.inStock);
  if (search) rows = rows.filter((p) => productFromApi(p).matches(search));

  const sorting = SORT_PARAMS[sort];
  if (sorting) {
    const dir = sorting._order === "asc" ? 1 : -1;
    rows.sort((a, b) => (a[sorting._sort] - b[sorting._sort]) * dir);
  } else {
    rows.sort((a, b) => a.id - b.id);
  }

  const start = (page - 1) * limit;
  return { rows: rows.slice(start, start + limit), total: rows.length };
}

export async function fetchProductsPage(filters, signal) {
  const { page = 1, limit = PAGE_SIZE } = filters;
  const params = buildProductParams({ ...filters, page, limit });

  try {
    const { data, total } = await request(`/products?${params}`, { signal, withTotal: true });
    saveToCache(cacheDb.products, data);
    return { items: data.map(productFromApi), total, page, fromCache: false };
  } catch (error) {
    // Only fall back to the cache when the server is unreachable (status 0), not on 4xx/5xx.
    if (!(error instanceof ApiError) || error.status !== 0 || signal?.aborted) throw error;

    const cached = await readProductsFromCache({ ...filters, page, limit });
    if (cached.total === 0) throw error;
    return { items: cached.rows.map(productFromApi), total: cached.total, page, fromCache: true };
  }
}

export async function fetchProduct(id, signal) {
  try {
    const data = await request(`/products/${id}`, { signal });
    saveToCache(cacheDb.products, [data]);
    return productFromApi(data);
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 0 || signal?.aborted) throw error;
    const cached = await cacheDb.products.get(Number(id));
    if (!cached) throw error;
    return productFromApi(cached);
  }
}

export async function fetchAllProducts(signal) {
  const data = await request("/products?_sort=id&_order=asc", { signal });
  saveToCache(cacheDb.products, data);
  return data.map(productFromApi);
}

export const saveProduct = (product) =>
  product.id
    ? request(`/products/${product.id}`, { method: "PUT", body: product })
    : request("/products", { method: "POST", body: product });

export const removeProduct = (id) => request(`/products/${id}`, { method: "DELETE" });

/* ---------- Categories ---------- */

export async function fetchCategories(signal) {
  try {
    const data = await request("/categories", { signal });
    saveToCache(cacheDb.categories, data);
    return data.map(categoryFromApi);
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 0 || signal?.aborted) throw error;
    const cached = await cacheDb.categories.toArray();
    if (cached.length === 0) throw error;
    return cached.map(categoryFromApi);
  }
}

export async function saveCategory(category, { isNew }) {
  if (isNew) return request("/categories", { method: "POST", body: category });
  return request(`/categories/${category.id}`, { method: "PUT", body: category });
}

export const removeCategory = (id) => request(`/categories/${id}`, { method: "DELETE" });

/* ---------- Orders & users ---------- */

export const postOrder = (payload) => request("/orders", { method: "POST", body: payload });

export const fetchUsers = (signal) => request("/users", { signal });

export const registerUser = (user) => request("/users", { method: "POST", body: user });

export async function isEmailTaken(email) {
  const found = await request(`/users?email=${encodeURIComponent(email)}`);
  return found.length > 0;
}
