const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  'New': { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-600 dark:text-slate-300' },
  'Review': { bg: 'bg-amber-50 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300' },
  'Design': { bg: 'bg-indigo-50 dark:bg-indigo-900/30', text: 'text-indigo-700 dark:text-indigo-300' },
  'Production': { bg: 'bg-violet-50 dark:bg-violet-900/30', text: 'text-violet-700 dark:text-violet-300' },
  'Quality Check': { bg: 'bg-purple-50 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300' },
  'Ready': { bg: 'bg-indigo-50 dark:bg-indigo-900/30', text: 'text-indigo-700 dark:text-indigo-300' },
  'Completed': { bg: 'bg-indigo-50 dark:bg-indigo-900/30', text: 'text-indigo-700 dark:text-indigo-300' },
  'Cancelled': { bg: 'bg-red-50 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300' },
  'Open': { bg: 'bg-violet-50 dark:bg-violet-900/30', text: 'text-violet-700 dark:text-violet-300' },
  'In Progress': { bg: 'bg-amber-50 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300' },
  'Closed': { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-600 dark:text-slate-300' },
  'Pending': { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-600 dark:text-slate-300' },
  'Invoiced': { bg: 'bg-violet-50 dark:bg-violet-900/30', text: 'text-violet-700 dark:text-violet-300' },
  'Paid': { bg: 'bg-indigo-50 dark:bg-indigo-900/30', text: 'text-indigo-700 dark:text-indigo-300' },
  'Overdue': { bg: 'bg-red-50 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300' },
  'Active': { bg: 'bg-indigo-50 dark:bg-indigo-900/30', text: 'text-indigo-700 dark:text-indigo-300' },
  'Inactive': { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-600 dark:text-slate-300' },
  'In Review': { bg: 'bg-amber-50 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300' },
  'Approved': { bg: 'bg-indigo-50 dark:bg-indigo-900/30', text: 'text-indigo-700 dark:text-indigo-300' },
  'Rejected': { bg: 'bg-red-50 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300' },
  'Operational': { bg: 'bg-indigo-50 dark:bg-indigo-900/30', text: 'text-indigo-700 dark:text-indigo-300' },
  'Maintenance': { bg: 'bg-amber-50 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300' },
  'done': { bg: 'bg-indigo-50 dark:bg-indigo-900/30', text: 'text-indigo-700 dark:text-indigo-300' },
  'in-progress': { bg: 'bg-amber-50 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300' },
  'pending': { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-600 dark:text-slate-300' },
  'blocked': { bg: 'bg-red-50 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300' },
};

export function getStatusStyles(status: string) {
  return STATUS_STYLES[status] || { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-600 dark:text-slate-300' };
}

const PRIORITY_STYLES: Record<string, { dot: string; text: string }> = {
  'Low': { dot: 'bg-slate-400', text: 'text-slate-500' },
  'Normal': { dot: 'bg-indigo-500', text: 'text-indigo-600 dark:text-indigo-400' },
  'High': { dot: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' },
  'Urgent': { dot: 'bg-red-500', text: 'text-red-600 dark:text-red-400' },
};

export function getPriorityStyles(priority: string) {
  return PRIORITY_STYLES[priority] || { dot: 'bg-slate-400', text: 'text-slate-500' };
}

export const BREAKDOWN_COLORS = ['#42B883', '#00DC82', '#10B981', '#35495E', '#F59E0B', '#94A3B8'];

export function getStatusSeverity(status: string): 'secondary' | 'info' | 'success' | 'warn' | 'danger' | 'contrast' {
  switch (status) {
    case 'Ready':
    case 'Completed':
    case 'Paid':
    case 'Approved':
    case 'Operational':
      return 'success';
    case 'Review':
    case 'In Review':
    case 'Maintenance':
    case 'Pending':
      return 'warn';
    case 'Design':
    case 'Production':
    case 'In Progress':
      return 'info';
    case 'Cancelled':
    case 'Rejected':
    case 'Overdue':
    case 'Urgent':
      return 'danger';
    default:
      return 'secondary';
  }
}
