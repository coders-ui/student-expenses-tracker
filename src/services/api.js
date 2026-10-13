const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");

/** Generic REST transport. Pass only endpoint paths agreed with the backend team. */
export async function apiRequest(path, options = {}) {
  if (!baseUrl) throw new Error("API is not configured. Add VITE_API_BASE_URL to .env.local.");
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `Request failed (${response.status})`);
  }
  return response.status === 204 ? null : response.json();
}

export const isApiConfigured = Boolean(baseUrl);
