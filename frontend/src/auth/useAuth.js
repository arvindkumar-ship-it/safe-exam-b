// STUB of Product A auth/useAuth.js — token sirf memory me (localStorage nahi).
import { useSyncExternalStore } from 'react';
import { apiRequest, setTokenProvider } from '../api/client.js';

let state = { user: null, accessToken: null };
const subs = new Set();
const tokenSubs = new Set();

function set(next) {
  const prev = state.accessToken;
  state = { ...state, ...next };
  subs.forEach((f) => f());
  if (state.accessToken !== prev) tokenSubs.forEach((f) => f(state.accessToken));
}
const subscribe = (f) => { subs.add(f); return () => subs.delete(f); };

export function onAccessTokenChange(cb) { tokenSubs.add(cb); return () => tokenSubs.delete(cb); }

async function login(credentials) {
  const data = await apiRequest('/auth/login', { method: 'POST', body: credentials });
  set({ user: data.user, accessToken: data.accessToken });
}
async function logout() {
  try { await apiRequest('/auth/logout', { method: 'POST' }); } catch { /* ignore */ }
  set({ user: null, accessToken: null });
}
async function refreshSession() {
  const data = await apiRequest('/auth/refresh', { method: 'POST' });
  set({ accessToken: data.accessToken });
}
setTokenProvider({ getAccessToken: () => state.accessToken, refreshSession });

export function useAuth() {
  const s = useSyncExternalStore(subscribe, () => state);
  return { user: s.user, accessToken: s.accessToken, isAuthenticated: !!s.accessToken, login, logout, refreshSession };
}
