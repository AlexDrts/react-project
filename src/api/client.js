// Comes from .env (VITE_API_URL). Restart `npm start` after changing it.
const API_URL = import.meta.env.VITE_API_URL;
const DEFAULT_TIMEOUT = 8000;

export class ApiError extends Error {
  /** status 0 = the server could not be reached (network error or timeout) */
  constructor(message, status = 0) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * Thin wrapper around fetch: JSON in/out, timeout, readable errors.
 * With `withTotal: true` it returns { data, total } using json-server's X-Total-Count header.
 */
export async function request(path, { method = "GET", body, signal, timeout = DEFAULT_TIMEOUT, withTotal = false } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  const onOuterAbort = () => controller.abort();
  signal?.addEventListener("abort", onOuterAbort);

  try {
    const response = await fetch(`${API_URL}${path}`, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new ApiError(
        response.status === 404 ? "Not found" : `The server answered with an error (${response.status})`,
        response.status,
      );
    }

    const data = response.status === 204 ? null : await response.json();
    return withTotal ? { data, total: Number(response.headers.get("X-Total-Count") ?? data.length) } : data;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (signal?.aborted) throw error; // cancelled by the caller (TanStack Query), not a failure
    if (error.name === "AbortError") throw new ApiError("The server took too long to answer. Try again.");
    throw new ApiError("Can't reach the server. Start it with `npm run api` and try again.");
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", onOuterAbort);
  }
}
