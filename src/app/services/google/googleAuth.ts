export interface GoogleAuthResponse {
    email: string;
    familyName: string;
    givenName: string;
    id: string;
    imageUrl: string;
    name: string;
    authentication: GoogleAuth2;
  }
  
  export interface GoogleAuth2 {
    accessToken: string;
    idToken: string;
    refreshToken: string;
  }

export interface Authentication {
  accessToken: string;
  refreshToken: string;
  isAuth: boolean;
  message: string;
  status_code: number;
}