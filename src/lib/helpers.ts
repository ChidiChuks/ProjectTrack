
import { Alert, Project } from "@/types";

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString));
};

export const getStatusColor = (status: string): string => {
  switch(status) {
    case 'active':
    case 'completed':
      return 'bg-project-green';
    case 'planning':
      return 'bg-project-blue';
    case 'delayed':
      return 'bg-project-amber';
    default:
      return 'bg-muted';
  }
};

export const getMilestoneStatusColor = (status: string): string => {
  switch(status) {
    case 'completed':
      return 'bg-project-green';
    case 'pending':
      return 'bg-project-blue';
    case 'delayed':
      return 'bg-project-amber';
    default:
      return 'bg-muted';
  }
};

export const getAlertIcon = (type: Alert['type']) => {
  switch(type) {
    case 'delay':
      return 'clock';
    case 'budget':
      return 'dollar-sign';
    case 'general':
      return 'info';
    default:
      return 'bell';
  }
};

export const getAlertSeverityColor = (severity: Alert['severity']) => {
  switch(severity) {
    case 'low':
      return 'bg-project-blue text-white';
    case 'medium':
      return 'bg-project-amber text-black';
    case 'high':
      return 'bg-project-red text-white';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export const calculateProgressPercentage = (project: Project): number => {
  const total = project.budget;
  const current = project.currentSpend;
  return Math.round((current / total) * 100);
};

export const calculateTimeProgress = (project: Project): number => {
  const startTime = new Date(project.startDate).getTime();
  const endTime = new Date(project.endDate).getTime();
  const currentTime = new Date().getTime();
  
  // If the project hasn't started yet
  if (currentTime < startTime) return 0;
  
  // If the project is already complete
  if (currentTime > endTime) return 100;
  
  // Calculate percent of time elapsed
  const totalDuration = endTime - startTime;
  const elapsedDuration = currentTime - startTime;
  
  return Math.round((elapsedDuration / totalDuration) * 100);
};

export const isProjectBehindSchedule = (project: Project): boolean => {
  const timeProgress = calculateTimeProgress(project);
  const budgetProgress = calculateProgressPercentage(project);
  
  // If budget progress is significantly ahead of time progress
  return budgetProgress > timeProgress + 15;
};

export const isProjectOverBudget = (project: Project): boolean => {
  const timeProgress = calculateTimeProgress(project);
  const budgetProgress = calculateProgressPercentage(project);
  
  // If budget progress is significantly ahead of time progress
  return budgetProgress > timeProgress + 15;
};

export const getProjectProgress = (project: Project) => {
  const timeProgress = calculateTimeProgress(project);
  const budgetProgress = calculateProgressPercentage(project);
  
  if (project.status === 'completed') {
    return 100;
  }
  
  // Weighted average of time and budget progress
  return Math.round((timeProgress * 0.6) + (budgetProgress * 0.4));
};
