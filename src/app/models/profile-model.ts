export interface ProfileData {
  fullName: string;
  primaryNumber: string;
  alternativeEmail: string;
  alternativeNumber: string;
  countryCode: string;
  currentOccupation: string;
  skillSector: string;
  specificTopic: string;
  gender: string;
  age?: number;
  educationalBackground: string;
  subject: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  points: number;
  avatar?: string;
}

export interface DropdownOptions {
  occupations: string[];
  skillSectors: string[];
  specificTopics: string[];
  genders: string[];
  educationLevels: string[];
  subjects: string[];
}
