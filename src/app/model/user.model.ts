export interface userLoginInfo {
  email: string,
  password: string
}

export interface userInfo {
  id: number,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  gender: string,
  image: string,
  accessToken: string, 
  refreshToken: string  
}

export interface tableUserInfo {
  No: number,
  username: string;
  age: number,
  gender: string,
  email: string,
  phone: string,
}