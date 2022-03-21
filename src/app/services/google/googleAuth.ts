export interface GoogleAuthResponse {
    email: string;
    familyName: string;
    givenName: string;
    id: string;
    imageUrl: string;
    name: string;
    authentication: Authentication;
  }
  
  export interface Authentication {
    accessToken: string;
    idToken: string;
    refreshToken: string;
  }