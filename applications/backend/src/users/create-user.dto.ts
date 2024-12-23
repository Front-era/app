export class CreateUserDto {
    readonly userId: string;
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly fullName: string;
    readonly imageUrl?: string;
    readonly phoneNumber?: string;
    readonly state?: string;
    readonly country?: string;
    readonly colonyId?: string;
    readonly lastSigninAt?: Date;
  }
  