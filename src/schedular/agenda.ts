import Agenda from 'agenda';
import { NotificationService } from '../modules/notifications/notifications.services';
import { LeadsModel } from '../modules/leads/leads.model';
import config from '../app/config';

const mongoConnectionString = config.databaseUri as string;

export const agenda = new Agenda({
  db: { address: mongoConnectionString, collection: 'agendaJobs' },
});

// Define job for follow-up reminder
agenda.define('follow-up reminder', async (job: any) => {
  const { leadId, employeeEmail } = job.attrs.data;

  const lead = await LeadsModel.findById(leadId);
  if (!lead || lead.status !== 'Follow-up') return; // Only continue if still Follow-up

  // Send small notification to employee
  await NotificationService.createNotification(
    `Reminder: Please follow up with ${lead.customerName}`,
    employeeEmail,
    { leadId: lead._id },
  );

  // Send small notification to super admin
  await NotificationService.createNotification(
    `Reminder: Employee ${employeeEmail} has a follow-up lead (${lead.customerName})`,
    'superadmin@example.com',
    { leadId: lead._id },
  );

  // Cancel any existing scheduled follow-up jobs for this lead
  await agenda.cancel({ 'data.leadId': leadId, name: 'follow-up reminder' });

  // Reschedule next reminder in 2 days
  await agenda.schedule('in 2 days', 'follow-up reminder', {
    leadId,
    employeeEmail,
  });
});

// Start agenda
(async function () {
  await agenda.start();
})();
