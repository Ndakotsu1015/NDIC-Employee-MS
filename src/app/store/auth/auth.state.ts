import { UserResource } from "./auth.model";


export interface AppAuthState {
  access_token: string | null;
  user: UserResource | null;
}
