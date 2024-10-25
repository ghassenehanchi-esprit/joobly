"use client";
import React, { useState } from "react";
import styles from "./register.module.scss";
import Button from "@/lib/components/button/button";
import Image from "next/image";
import google from "@/public/images/icons/googleIcon.svg";
import Divider from "@/lib/components/devider/divider";
import Input from "@/lib/components/input/input";
import { SubmitHandler, useForm } from "react-hook-form";
import Person from "@mui/icons-material/Person";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { Checkbox, FormControlLabel } from "@mui/material";
import { emailValidationRegexp } from "@/lib/constant/constants";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { signUp } from "@/lib/features/authSlice/authSlice";
import { AppDispatch } from "@/lib/store";
import { useAppSelector } from "@/lib/hooks";

interface Inputs {
	username: string;
	email: string;
	password: string;
}

const Register = () => {
	const [errorMessage, setErrorMessage] = useState<string>();
	const {
		handleSubmit,
		control,
		resetField,
		formState: { errors },
	} = useForm<Inputs>();
	const { push } = useRouter();

	const dispatch: AppDispatch = useDispatch();
	const loading = useAppSelector((state) => state.user.loading);

	const onSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
		const userBody: Inputs = {
			username: values.username,
			email: values.email,
			password: values.password,
		};
		dispatch(signUp(userBody))
			.unwrap()
			.then(() => push("/login"));
	};

	return (
		<section className={styles["login-page"]}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles["login-modal"]}>
					<div className={styles["login--modal-header"]}>
						<h1>Hi, Welcome to Prague Morning Jobs</h1>
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
					</div>
					<Button className={"btn-google-login-button"}>
						<Image src={google} alt='' width={25} height={25} />
						Sign in with Google
					</Button>
					<div className={styles["login-modal-email-login"]}>
						<Divider />
						<p>or Sign in with Email</p>
						<Divider />
					</div>
					<div className={styles["login-modal-form"]}>
						<Input
							control={control}
							startIcon={<Person className={styles["login-modal-form-icon"]} />}
							authInput
							errors={errors}
							name={"username"}
							label='Name'
							isRequired
							placeholder='John Doe'
						/>
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
							placeholder='johndoe@mail.com'
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
							placeholder='***********'
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
								"Register"
							)}
						</Button>
						<div className={styles["login-modal-form-create-account"]}>
							<p>
								Already have an account?{" "}
								<a href='/login'>
									<span>Log in</span>
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

export default Register;
