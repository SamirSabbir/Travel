export type TNotary = {
  date?: Date;
  clientName?: string;
  documents?: string;
  employee?: string;
  note?: string;
  bill?: number;
  status?: 'Pending' | 'Completed';
};
