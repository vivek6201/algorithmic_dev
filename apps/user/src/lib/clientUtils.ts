import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';

export const updateParams = (
  key: string,
  value: string,
  searchParams: ReadonlyURLSearchParams,
  router?: AppRouterInstance,
) => {
  const params = new URLSearchParams(searchParams.toString());
  const current = params.get(key)?.split(',') ?? [];

  const updated = current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value];

  if (updated.length > 0) {
    params.set(key, updated.join(','));
  } else {
    params.delete(key);
  }

  router?.replace(`?${params.toString()}`);
};
