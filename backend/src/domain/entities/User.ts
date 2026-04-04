export class User {
  constructor(
    public readonly id: number | null,
    public name: string,
    public email: string,
    public password: string, 
    public createdAt?: Date
  ) {}

  public isValidEmail(): boolean {
    return this.email.includes('@');
  }
}