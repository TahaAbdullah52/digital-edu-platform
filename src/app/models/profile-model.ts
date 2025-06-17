export interface ProfileData {
  id: number;
  name: string;
  avatar:string,
  primaryNumber: string;
  alternativeNumber: string;
  email: string;
  countryCode: string;
  joinDate: string;
  currentOccupation: string;
  skillSector: string;
  specificTopic: string;
  gender: string;
  age?: number;
  educationalBackground: string;
  subject: string;
}

export interface LeaderboardUser {
  id:number,
  rank: number;
  name: string;
  points: number;
  avatar?: string;
}
