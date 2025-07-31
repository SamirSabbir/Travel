export type TInvoice = {
  airTicket: number;
  visaProcessing: number;
  hotel: number;
  appointmentDate: Date;
  package: string;
  documents: string[]; // Array of file paths or URLs for uploaded invoice
};
