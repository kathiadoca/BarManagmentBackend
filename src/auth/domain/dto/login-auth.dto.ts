export class LoginAuthDto {
  username: string;
  password: string;
  token: string;
  constructor(username: string, password: string, token: string) {
    this.username = username;
    this.password = password;
    this.token = token;
  }
}
