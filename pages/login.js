import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Axios from "axios";

const loginSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Email is required"),
	password: Yup.string().required("Password is required"),
});

const Login = () => {
	return (
		<div className="page-wrap">
			<div className="login-block">
				<h2 className="login-title">Login</h2>
				<Formik
					initialValues={{ email: "", password: "" }}
					validationSchema={loginSchema}
					onSubmit={(values) => {
						//validate login
						Axios.post("https://hungree-surya.web.app/api/user/login", values)
							.then((res) => {
								if (res.data.token) {
									localStorage.clear();
									localStorage.setItem("token", res.data.token);
									window.location.href = "/";
								}
							})
							.catch((err) => {
								console.log(err);
							});
					}}
				>
					{({ errors, touched }) => (
						<Form autoComplete="off">
							<Field name="email" placeholder="Email" className="input" />
							{errors.email && touched.email ? <div>{errors.email}</div> : null}
							<Field
								placeholder="password"
								name="password"
								type="password"
								className="input"
							/>
							{errors.password && touched.password ? (
								<div>{errors.password}</div>
							) : null}
							<Button
								variant="contained"
								color="primary"
								className="login-button"
								fullWidth
								type="submit"
							>
								Login
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default Login;
