import { Input } from "@chakra-ui/input";
import React, { ReactEventHandler, useState } from "react";
import { UserRegister } from "../utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
	const [name, setName] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const navigate = useNavigate();
	const handleRegister = (): void => {
		const payload: UserRegister = {
			name,
			password,
			email,
		};

		axios
			.post(`http://localhost:3001/users/register`, payload)
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					navigate("/login", { replace: true });
				} else if(res.status===201){
					alert(res.data.message);
				}
			})
			.catch((err) => {
				console.log(err);
			});
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
				placeholder="Enter Email"
				size="md"
				value={email}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setEmail(e.target.value)
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
