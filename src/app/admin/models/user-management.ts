import { ProfileData } from "../../models/profile-model";

export interface UserManagementData extends ProfileData {
  coursesEnrolled: number;
  totalSpent: number;
}

export interface UserManagementApiResponse {
  users: UserManagementData[];
}