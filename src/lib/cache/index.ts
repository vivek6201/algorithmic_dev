import ICache from '@/types/cache';
import { RedisCache } from './redis-cache';
import { InMemoryCache } from './in-memory-cache';

const redisUrl = process.env.REDIS_URL;

export class Cache implements ICache {
  private static instance: Cache;
  private delegate: ICache;

  private constructor() {
    if (redisUrl) {
      this.delegate = RedisCache.getInstance(redisUrl);
    } else {
      this.delegate = InMemoryCache.getInstance();
    }
  }

  static getInstance(): Cache {
    if (!this.instance) {
      this.instance = new Cache();
    }
    return this.instance;
  }

  async set<T>(
    type: string,
    args: string[],
    value: T,
    expirySeconds: number = parseInt(process.env.CACHE_EXPIRE_S || '10', 10),
  ): Promise<void> {
    return this.delegate.set(type, args, value, expirySeconds);
  }

  async get<T>(type: string, args: string[]): Promise<T | null> {
    return this.delegate.get(type, args);
  }

  async evict(type: string, args: string[]): Promise<null> {
    return this.delegate.evict(type, args);
  }
}

const cache = Cache.getInstance();

export default cache;
