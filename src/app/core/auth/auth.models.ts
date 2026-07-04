export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
}

export interface AuthSession {
  accessToken: string;
  /** Epoch ms — en producción vendría del JWT `exp`. */
  expiresAt: number;
  user: AuthUser;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}
