import Dexie from "dexie";

/**
 * IndexedDB cache (Dexie). Every product / category the shop loads is copied here,
 * so the catalog still opens when the API is down.
 */
export const cacheDb = new Dexie("afterglow-cache");

cacheDb.version(1).stores({
  products: "id, categoryId",
  categories: "id",
});
