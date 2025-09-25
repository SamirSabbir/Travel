import { InvoiceModel } from './invoice.model';
import { TInvoice } from './invoice.interface';
import PdfPrinter from 'pdfmake';

// ✅ Create invoice
export const createInvoiceInDB = async (data: TInvoice) => {
  const invoice = new InvoiceModel(data);
  return await invoice.save();
};

// ✅ Get all invoices (SuperAdmin, Accounts)
export const getAllInvoicesFromDB = async () => {
  return await InvoiceModel.find().populate('workId');
};

// ✅ Get invoice by ID
export const getInvoiceByIdFromDB = async (id: string) => {
  return await InvoiceModel.findById(id).populate('workId');
};

// ✅ Get invoice by workId
export const getInvoiceByWorkIdFromDB = async (workId: string) => {
  return await InvoiceModel.findOne({ workId }).populate('workId');
};

// ✅ Update invoice by ID
export const updateInvoiceByIdInDB = async (
  id: string,
  updateData: Partial<TInvoice>,
) => {
  const result = await InvoiceModel.findByIdAndUpdate(id, updateData, {
    new: true,
  }).populate('workId');
  return result;
};

// ✅ Delete invoice
export const deleteInvoiceByIdInDB = async (id: string) => {
  return await InvoiceModel.findByIdAndDelete(id);
};


// ✅ Generate Invoice PDF (without extra fonts)
export const generateInvoicePDFInDB = async (invoiceId: string, res: any) => {
  const invoice = await InvoiceModel.findById(invoiceId).populate('workId');
  if (!invoice) throw new Error('Invoice not found');

  // ✅ Just use Helvetica everywhere
  const fonts = {
    Helvetica: {
      normal: 'Helvetica',
      bold: 'Helvetica-Bold',
      italics: 'Helvetica-Oblique',
      bolditalics: 'Helvetica-BoldOblique',
    },
  };

  const printer = new PdfPrinter(fonts);

  const docDefinition: any = {
    content: [
      { text: 'INVOICE', style: 'header' },
      { text: `Invoice No: ${invoice.invoiceNo}`, margin: [0, 10, 0, 5] },
      { text: `Submitted On: ${new Date(invoice.submittedOn).toDateString()}` },
      { text: `Invoice For: ${invoice.invoiceFor}` },
      { text: `Payable To: ${invoice.payableTo}` },
      { text: `Service: ${invoice.service}` },
      { text: `Due Date: ${new Date(invoice.dueDate).toDateString()}` },

      { text: '\nItems', style: 'subheader' },
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto'],
          body: [
            ['Description', 'Quantity', 'Unit Price', 'Total'],
            ...invoice.items.map((item: any) => [
              item.description,
              item.quantity,
              item.unitPrice,
              item.quantity * item.unitPrice,
            ]),
          ],
        },
      },

      { text: `\nTotal Amount: ${invoice.totalAmount}`, style: 'total' },
      {
        text: '\nThis is a system generated certificate and requires no signature.',
        style: 'footer',
      },
    ],
    styles: {
      header: { fontSize: 22, bold: true, alignment: 'center' },
      subheader: { fontSize: 16, bold: true, margin: [0, 10, 0, 5] },
      total: { fontSize: 14, bold: true, alignment: 'right' },
      footer: {
        fontSize: 10,
        italics: true,
        alignment: 'center',
        margin: [0, 20, 0, 0],
      },
    },
    defaultStyle: {
      font: 'Helvetica',
    },
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename=invoice-${invoice.invoiceNo}.pdf`,
  );

  pdfDoc.pipe(res);
  pdfDoc.end();
};
