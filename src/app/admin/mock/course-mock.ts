import { course_item } from "../../models/course-item";

export const MOCK_ADMIN_COURSES: course_item[] = [
    {
      id: 1,
      course_id: 'PROG102',
      course_name: 'Angular Fundamentals',
      category: 'Programming',
      course_desc: 'Learn the fundamentals of Angular.',
      no_of_seat: 30,
      isPremium: true,
      course_fee: 1500,
      img_url: 'https://img.youtube.com/vi/tVzUXW6siu0/hqdefault.jpg',
      batch_nO: 2,
      rem_days: 10,
      no_of_class: 5,
      playlistId: 'PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w',
      isEnrolled: false
    },
    {
      id: 2,
      course_id: 'DES101',
      course_name: 'Graphic Design Basics',
      category: 'Design',
      course_desc: 'Introductory course to graphic design.',
      no_of_seat: 20,
      isPremium: false,
      course_fee: 0,
      img_url: 'https://img.youtube.com/vi/tVzUXW6siu0/hqdefault.jpg"',
      batch_nO: 2,
      rem_days: 10,
      no_of_class: 20,
      playlistId: 'PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w',
      isEnrolled: false
    },
]