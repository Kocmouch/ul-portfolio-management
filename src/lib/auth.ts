import { deleteCookie, getCookie, setCookie } from './cookies';

const AUTH_COOKIE_NAME = 'pm_course_auth';
const AUTH_COOKIE_VALUE = '1';
const THIRTY_DAYS_IN_SECONDS = 60 * 60 * 24 * 30;

export function hasAuthCookie(): boolean {
  return getCookie(AUTH_COOKIE_NAME) === AUTH_COOKIE_VALUE;
}

export function setAuthCookie(remember: boolean): void {
  if (remember) {
    // Persist auth across browser restarts.
    setCookie(AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE, {
      maxAgeSeconds: THIRTY_DAYS_IN_SECONDS,
    });
  } else {
    // Session cookie: valid until the browser session ends.
    setCookie(AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE);
  }
}

export function clearAuth(): void {
  deleteCookie(AUTH_COOKIE_NAME);
}
