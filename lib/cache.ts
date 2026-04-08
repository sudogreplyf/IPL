interface CacheEntry<T> {
  data: T;
  expiresAt: number;
  updatedAt: string;
}

const STORE = new Map<string, CacheEntry<unknown>>();

export function getCache<T>(key: string): CacheEntry<T> | null {
  const entry = STORE.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    STORE.delete(key);
    return null;
  }
  return entry;
}

export function setCache<T>(key: string, data: T, ttlSeconds: number): CacheEntry<T> {
  const entry: CacheEntry<T> = {
    data,
    expiresAt: Date.now() + ttlSeconds * 1000,
    updatedAt: new Date().toISOString()
  };

  STORE.set(key, entry);
  return entry;
}
