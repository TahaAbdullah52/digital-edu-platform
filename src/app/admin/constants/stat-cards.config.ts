import { StatCardConfig } from "../models/stat-card";

export const STAT_CARDS_CONFIG: StatCardConfig[] = [
  { 
    id: 'totalUsers',           
    title: 'Total Users',      
    icon: 'people',            
    color: 'text-blue-600'    
  },
  { 
    id: 'totalCourses', 
    title: 'Total Courses', 
    icon: 'book', 
    color: 'text-green-600' 
  },
  { 
    id: 'coursesEnrolled', 
    title: 'Courses Enrolled', 
    icon: 'trending_up', 
    color: 'text-purple-600' 
  },
  { 
    id: 'premiumEnrolled', 
    title: 'Premium Enrolled', 
    icon: 'star', 
    color: 'text-orange-600' 
  },
  { 
    id: 'successStories', 
    title: 'Success Stories', 
    icon: 'emoji_events', 
    color: 'text-indigo-600' 
  }
];