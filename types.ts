
export enum Chapter {
  GREETING = 0,
  ENVELOPE = 1,
  SCRATCH = 2,
  MEMORIES = 3,
  KISS = 4,
  LOVE = 5
}

export interface Memory {
  id: number;
  url: string;
  caption: string;
}
