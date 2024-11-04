"use client";
import React, { useState } from "react";
import styles from "./login.module.scss";
import Button from "@/lib/components/button/button";
import Image from "next/image";
import google from "@/public/images/icons/googleIcon.svg";
import Input from "@/lib/components/input/input";
import { SubmitHandler, useForm } from "react-hook-form";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { Checkbox, Divider, FormControlLabel } from "@mui/material";
import { emailValidationRegexp } from "@/lib/constant/constants";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { signIn } from "@/lib/features/authSlice/authSlice";
import { AppDispatch } from "@/lib/store";
import { useAppSelector } from "@/lib/hooks";

interface Inputs {
	email: string;
	password: string;
}

const Login = () => {
	const [errorMessage, setErrorMessage] = useState<string>();
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<Inputs>();
	const { push } = useRouter();

	const dispatch: AppDispatch = useDispatch();
	const loading = useAppSelector((state) => state.user.loading);

	const onSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
		const userBody: Inputs = {
			email: values.email,
			password: values.password,
		};

		dispatch(signIn(userBody))
			.unwrap()
			.then(() => push("/"));
	};

	return (
		<section className={styles["login-page"]}>
			<form 
			onSubmit={handleSubmit(onSubmit)}
			className="mx-auto"
			>
				<div className={styles["login-modal"]}>
					<div className={styles["login--modal-header"]}>
						<h1>Hi, Welcome to Prague Morning Jobs</h1>
						<p>Find your dream job in Prague Morning! We&apos;ll help you connect with top employers and take the first step toward a successful career.</p>
					</div>
					<Button className={"btn-google-login-button"}>
						<Image src={google} alt='' width={25} height={25} />
						Sign in with Google
					</Button>
					<div className={styles["login-modal-email-login"]}>
					<Divider>
					<p className="mx-auto">or Sign in with Email</p>
					</Divider>	
					</div>
					<div className={styles["login-modal-form"]}>
						<Input
							control={control}
							pattern={{
								value: emailValidationRegexp,
								message: "Invalid email address",
							}}
							startIcon={<MailOutlineIcon className={styles["login-modal-form-icon"]} />}
							authInput
							errors={errors}
							name={"email"}
							label='Email address'
							isRequired
							placeholder='Enter email'
						/>
						<Input
							control={control}
							minLength={{
								value: 8,
								message: "Password must have at least 8 characters",
							}}
							startIcon={<LockOutlinedIcon className={styles["login-modal-form-icon"]} />}
							type='password'
							authInput
							errors={errors}
							name={"password"}
							label='Password'
							isRequired
							placeholder='Enter password'
						/>
						<div className={styles["login-modal-form-remember-me"]}>
							<div className={styles["login-modal-form-remember-checkbox"]}>
								<FormControlLabel
									control={
										<Checkbox
											sx={{
												color: "#009C77",
												"&.Mui-checked": {
													color: "#009C77",
												},
											}}
											defaultChecked
										/>
									}
									label='Remember me'
								/>
							</div>
							<p className={styles["login-modal-form-forgot-password"]}>Forgot your password?</p>
						</div>
						<Button style={{ width: "100%" }} className={"btn-primary"}>
							{errorMessage ? (
								<span className={styles["error-message"]}>{errorMessage}</span>
							) : loading ? (
								<CircularProgress />
							) : (
								"Login"
							)}
						</Button>
						<div className={styles["login-modal-form-create-account"]}>
							<p>
								Not registered yet?{" "}
								<a href='/register'>
									<span>Create an Account</span>
								</a>
							</p>
						</div>
					</div>
					<div className={styles["login-modal-footer"]}>
						<p>Prague Morning Jobs. All rights reserved.</p>
					</div>
				</div>
			</form>
		</section>
	);
};

export default Login;
