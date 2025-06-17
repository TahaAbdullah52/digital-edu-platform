export interface StatCard {
  id: string;         
  title: string;      
  value: number; 
  icon: string;        
  color: string;       
}

export interface StatCardConfig {
  id: string;          
  title: string;      
  icon: string;        
  color: string;       
}

export interface StatsApiResponse {
  totalUsers: number;
  totalCourses: number;
  coursesEnrolled: number;
  premiumEnrolled: number;
  successStories: number;
}