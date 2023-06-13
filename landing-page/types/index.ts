export interface User {
  success: boolean;
  statusCode: number;
  message: string;
  access: string;
  refresh: string;
  username: string;
  email: string;
  is_organization: string;
  role: string;
  id: number;
}

export interface AuthenticatedUser {}
