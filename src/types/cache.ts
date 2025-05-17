export default interface ICache {
  set<T>(type: string, args: string[], value: T, expirySeconds?: number): Promise<void>;
  get<T>(type: string, args: string[]): Promise<T | null>;
  evict(type: string, args: string[]): Promise<null>;
}
