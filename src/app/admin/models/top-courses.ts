export interface TopCourse {
  course_name: string;
  enrollments: number;
  type: 'free' | 'premium';
}

export interface TopCoursesApiResponse {
  topCourses: TopCourse[];
}