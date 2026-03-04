export type CookieOptions = {
  maxAgeSeconds?: number;
  path?: string;
};

export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  if (typeof document === 'undefined') return;

  const encoded = encodeURIComponent(value);
  const path = options.path ?? '/';
  let cookie = `${name}=${encoded}; path=${path}`;

  if (options.maxAgeSeconds != null) {
    cookie += `; max-age=${options.maxAgeSeconds}`;
  }

  document.cookie = cookie;
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const target = `${name}=`;
  const parts = document.cookie.split(';');

  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.startsWith(target)) {
      return decodeURIComponent(trimmed.substring(target.length));
    }
  }

  return null;
}

export function deleteCookie(name: string, path: string = '/'): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; path=${path}; max-age=0`;
}
