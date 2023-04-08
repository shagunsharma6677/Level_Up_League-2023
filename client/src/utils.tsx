export interface UserRegister {
	name: string;
	password: string;
	email: string;
	isOnline:boolean
}

export interface UserLogin {
	password: string;
	email: string;
}
