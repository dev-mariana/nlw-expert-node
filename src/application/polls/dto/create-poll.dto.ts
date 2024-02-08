import { z } from 'zod';

export const createPollSchema = z.object({
  title: z.string(),
  options: z.array(z.string()),
});

export type CreatePollDTO = z.infer<typeof createPollSchema>;
