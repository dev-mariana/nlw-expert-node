import { z } from 'zod';

export const createPollSchema = z.object({
  title: z.string(),
});

export type CreatePollDTO = z.infer<typeof createPollSchema>;
