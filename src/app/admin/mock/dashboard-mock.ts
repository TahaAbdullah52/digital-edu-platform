import { CourseCountsApiResponse } from "../models/course-counts";
import { StatsApiResponse } from "../models/stat-card";
import { TaskCounts } from "../models/task-management";
import { TopCourse } from "../models/top-courses";

export const MOCK_STATS: StatsApiResponse = {
  totalUsers: 2847,
  totalCourses: 156,
  coursesEnrolled: 1234,
  premiumEnrolled: 567,
  successStories: 89
};

export const MOCK_TASK_COUNTS: TaskCounts = {
  paymentTasks: 5,
  storyTasks: 3,
  completedPaymentTasks: 2,
  completedStoryTasks: 2
};

export const MOCK_COURSE_COUNTS: CourseCountsApiResponse = {
  freeCoursesCount: 65,
  premiumCoursesCount: 91
};

export const MOCK_TOP_COURSES: TopCourse[] = [
  { course_name: 'Advanced JavaScript', enrollments: 1245, type: 'premium' },
  { course_name: 'React Fundamentals', enrollments: 892, type: 'free' },
  { course_name: 'Python for Beginners', enrollments: 756, type: 'premium' },
  { course_name: 'Data Science Basics', enrollments: 634, type: 'free' },
  { course_name: 'Web Development', enrollments: 512, type: 'premium' }
];
