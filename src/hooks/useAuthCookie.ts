import { useSyncExternalStore } from "react";

function getAuthCookie() {
  return document.cookie.includes("auth=1");
}

function getAuthCookieServer() {
  return false;
}

function subscribeToAuthCookie(callback: () => void) {
  window.addEventListener("focus", callback);
  return () => window.removeEventListener("focus", callback);
}

export function useAuthCookie() {
  return useSyncExternalStore(
    subscribeToAuthCookie,
    getAuthCookie,
    getAuthCookieServer
  );
}
