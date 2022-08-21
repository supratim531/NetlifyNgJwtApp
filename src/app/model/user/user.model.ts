import { Role } from "../role/role.model";

export class User {

  userId!: number;
  email!: string;
  username!: string;
	password!: string;
	firstName!: string;
	lastName!: string;
  role!: Role;

}
