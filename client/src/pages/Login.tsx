import { Input } from "@chakra-ui/input";
import React, { ReactEventHandler, useState } from "react";
import { UserLogin, UserRegister } from "../utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
	const [password, setPassword] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const navigate = useNavigate();
	const handleLogin = (): void => {
		const payload: UserLogin = {
			password,
			email,
		};

		axios
			.post(`http://localhost:3001/users/login`, payload)
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					sessionStorage.setItem("username", res.data.data);
					navigate("/room", { replace: true });
				} else if (res.status === 201) {
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

			<button onClick={handleLogin}>Login</button>
		</div>
	);
};

export default Login;
