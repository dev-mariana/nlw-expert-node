import { Vote } from '@prisma/client';

export class VoteEntity implements Vote {
  id: number;
  session_id: string;
  created_at: Date;
  poll_option_id: string;
  poll_id: string;
}
