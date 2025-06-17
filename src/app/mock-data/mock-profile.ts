// src/app/mock-data/profile-mock.ts
import { LeaderboardUser,ProfileData } from '../models/profile-model';

export const MOCK_PROFILE: ProfileData = {
  id:1,
  name: '',
  avatar:'',
  primaryNumber: '',
  alternativeNumber: '',
  email: '',
  joinDate:'',
  countryCode: '+880',
  age: 20,
  currentOccupation: 'Student',
  skillSector: 'Web Development',
  specificTopic: '',
  gender: 'Male',
  educationalBackground: 'BSc',
  subject: 'CSE'
};

export const MOCK_LEADERBOARD: LeaderboardUser[] = [
  { id:1, rank: 1, name: 'John Doe', points: 2000, avatar: 'assets/avatar1.jpg' },
  { id:2, rank: 2, name: 'Sarah Smith', points: 1500, avatar: 'assets/avatar2.jpg' },
  { id:3, rank: 3, name: 'Mike Johnson', points: 100, avatar: 'assets/avatar3.jpg' },
  { id:4, rank: 4, name: 'Emily Davis', points: 500, avatar: 'assets/avatar4.jpg' },
  { id:5, rank: 5, name: 'You', points: 0, avatar: 'assets/profile-placeholder.jpg' }
];
