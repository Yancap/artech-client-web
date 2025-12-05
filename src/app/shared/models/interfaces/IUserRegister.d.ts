declare interface IUserRegister {
  name: string;
  email: string;
  imageBlob: string | null ;
  password: string;
  confirmPassword: string | null | undefined ;
}
