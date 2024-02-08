import { Poll, PollOption } from '@prisma/client';

export class PollEntity implements Poll {
  id: string;
  title: string;
  created_at: Date;
  updated_at: Date;
  options: PollOption[];
}
