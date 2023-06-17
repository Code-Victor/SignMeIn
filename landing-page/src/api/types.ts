export interface GetWorkersResponse {
  id: number;
  organization_workers: OrganizationWorker[];
  name: string;
  description: string;
  number_of_workers: number;
  company_address: string;
  user: number;
}
export type GetWorkerAttendanceHistoryResponse = {
  date: string;
  clock_in: string;
  clock_out: string;
}[];
export interface OrganizationWorker {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  age: number;
  house_address: string;
  user: number;
  organization: number;
}
export type AttendanceRecord = {
  name: string;
  date: string;
  clock_in: string;
  clock_out: string;
}[];