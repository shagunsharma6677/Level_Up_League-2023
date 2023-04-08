import { Input } from "@chakra-ui/input";
import React, { ReactEventHandler, useState } from "react";

const Register = () => {
	const [name, setName] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const handleRegister = (): void => {
		const payload = {
			name,
			password,
		};

		console.log(payload);
	};
	return (
		<div>
			<Input
				type="text"
				placeholder="Enter Name"
				size="md"
				value={name}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setName(e.target.value)
				}
			/>
			<Input
				type="text"
				placeholder="Enter Password"
				size="md"
				value={password}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setPassword(e.target.value)
				}
			/>
			<button onClick={handleRegister}>Register</button>
		</div>
	);
};

export default Register;
