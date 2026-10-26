import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchAllProducts, fetchCategories, fetchOrder, fetchOrdersByEmail, fetchProduct, fetchProductsPage } from "../api/shopApi";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: ({ signal }) => fetchCategories(signal),
  });
}

/** Paged product list for the infinite-scroll grid. `filters` is part of the cache key. */
export function useProducts(filters) {
  return useInfiniteQuery({
    queryKey: ["products", filters],
    queryFn: ({ pageParam, signal }) => fetchProductsPage({ ...filters, page: pageParam }, signal),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce((sum, page) => sum + page.items.length, 0);
      return loaded < lastPage.total ? lastPage.page + 1 : undefined;
    },
  });
}

export function useProduct(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: ({ signal }) => fetchProduct(id, signal),
    retry: (count, error) => error.status !== 404 && count < 2,
  });
}

export function useAllProducts() {
  return useQuery({
    queryKey: ["admin-products"],
    queryFn: ({ signal }) => fetchAllProducts(signal),
  });
}

export function useUserOrders(email) {
  return useQuery({
    queryKey: ["orders", email],
    queryFn: ({ signal }) => fetchOrdersByEmail(email, signal),
  });
}

export function useOrder(id) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: ({ signal }) => fetchOrder(id, signal),
    retry: (count, error) => error.status !== 404 && count < 2,
  });
}
