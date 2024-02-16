import { z } from 'zod';

export const createVoteSchemaBody = z.object({
  poll_option_id: z.string().uuid(),
});

export const createVoteSchemaParam = z.object({
  poll_id: z.string().uuid(),
});

export type CreateVoteDTOBody = z.infer<typeof createVoteSchemaBody>;
export type CreateVoteDTOParam = z.infer<typeof createVoteSchemaParam>;
