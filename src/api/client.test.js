import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

function jsonResponse(body, init = {}) {
  return new Response(JSON.stringify(body), { status: 200, headers: { "Content-Type": "application/json" }, ...init });
}

describe("api client", () => {
  let request;
  let ApiError;

  beforeEach(async () => {
    vi.resetModules();
    vi.stubEnv("VITE_API_URL", "/api");
    ({ request, ApiError } = await import("./client"));
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("requests the base URL from the environment and returns parsed JSON", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse([{ id: 1 }]));
    vi.stubGlobal("fetch", fetchMock);

    const data = await request("/categories");

    expect(fetchMock.mock.calls[0][0]).toBe("/api/categories");
    expect(data).toEqual([{ id: 1 }]);
  });

  it("sends a JSON body with the right header", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ id: 7 }));
    vi.stubGlobal("fetch", fetchMock);

    await request("/orders", { method: "POST", body: { total: 10 } });

    const [, options] = fetchMock.mock.calls[0];
    expect(options.method).toBe("POST");
    expect(options.headers).toEqual({ "Content-Type": "application/json" });
    expect(options.body).toBe(JSON.stringify({ total: 10 }));
  });

  it("returns the total count from the X-Total-Count header", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse([{ id: 1 }], { headers: { "X-Total-Count": "36" } })));

    const result = await request("/products", { withTotal: true });

    expect(result.total).toBe(36);
    expect(result.data).toHaveLength(1);
  });

  it("turns a 404 into a readable ApiError", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 404 })));

    await expect(request("/products/9999")).rejects.toMatchObject({ name: "ApiError", status: 404, message: "Not found" });
  });

  it("reports an unreachable server as status 0", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));

    const error = await request("/products").catch((caught) => caught);

    expect(error).toBeInstanceOf(ApiError);
    expect(error.status).toBe(0);
  });
});
