import { z, ZodTypeAny } from 'zod';

type SafeActionResult<T> = { success: true; data: T } | { success: false; error: string };

interface SafeActionOptions<TSchema extends ZodTypeAny, TResult> {
  schema: TSchema;
  handler: (input: z.infer<TSchema>) => Promise<TResult>;
}

export function safeAction<TSchema extends ZodTypeAny, TResult>({
  schema,
  handler,
}: SafeActionOptions<TSchema, TResult>) {
  return async (values: z.infer<TSchema>): Promise<SafeActionResult<TResult>> => {
    const parsed = schema.safeParse(values);

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.flatten().formErrors.join(', '),
      };
    }

    try {
      const result = await handler(parsed.data);
      return {
        success: true,
        data: result,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error?.message ?? 'Something went wrong.',
      };
    }
  };
}
