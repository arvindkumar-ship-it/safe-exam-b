// STUB of Product A api/client.js — same exports. Real module ho toh ise replace karo.
export const API_BASE_URL = (import.meta.env && import.meta.env.VITE_API_BASE_URL) || 'http://localhost:8000';
let provider = null;
export function setTokenProvider(p) { provider = p; }

export class ApiError extends Error {
  constructor({ code = 'UNKNOWN', message = 'Request failed', status = 0, requestId = null, details = null } = {}) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.requestId = requestId;
    this.details = details;
  }
}

export async function apiRequest(path, { method = 'GET', body, headers = {}, signal } = {}, _retried = false) {
  const token = provider && provider.getAccessToken ? provider.getAccessToken() : null;
  let res;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      method,
      signal,
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...headers },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError({ code: 'NETWORK_ERROR', message: 'Network request failed' });
  }
  let json = null;
  try { json = await res.json(); } catch { /* non-json */ }
  if ((json && json.error) || !res.ok) {
    const err = (json && json.error) || {};
    if (err.code === 'TOKEN_EXPIRED' && !_retried && provider && provider.refreshSession) {
      await provider.refreshSession();
      return apiRequest(path, { method, body, headers, signal }, true);
    }
    throw new ApiError({ code: err.code || `HTTP_${res.status}`, message: err.message, status: res.status, requestId: json && json.requestId, details: err.details });
  }
  return json ? json.data : undefined;
}
