export interface TaskCounts {
  paymentTasks: number;
  storyTasks: number;
  completedPaymentTasks: number;
  completedStoryTasks: number;
}

export interface TaskCountsApiResponse {
  pending: {
    payments: number;
    stories: number;
  };
  completed: {
    payments: number;
    stories: number;
  };
}