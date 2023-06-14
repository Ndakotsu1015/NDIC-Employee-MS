

export interface UserLogInDto {
  user: UserResource;
  access_token: string;
}

export interface UserResource {
  id: number;
  email: string;
  password: string;
  user_type: string;
  is_active: boolean;
  email_verified: boolean;
  email_verified_at: Date;
}




export interface loginrequest {
  email: string;
  password: string;
}

export interface ChangePasswordRequest {
  password: string;
  newpassword: string;
  confirmpassword: string;
}

export interface Message {
  severity?: string;
  summary?: string;
  detail?: string;
  id?: any;
  key?: string;
  life?: number;
  sticky?: boolean;
  closable?: boolean;
  data?: any;
  icon?: string;
  contentStyleClass?: string;
  styleClass?: string;
}

export interface ResendEmailRequestDto {
  full_name: string;
  email: string;
}
export interface VerifyEmailRequestDto {
  token: string;
}

export interface ResetPasswordResponseDto {
  token: string;
  email: string;
}

