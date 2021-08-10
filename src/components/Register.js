import { Box, Button, Card, TextField, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import Parse from "parse";

const RegisterUser = async (user) => {
  await user.signUp();
};

const Register = (props) => {
  const RegisterForm = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    onSubmit: (values) => {
      const user = new Parse.User();
      user.set("username", values.username);
      user.set("password", values.password);
      user.set("email", values.email);
      try {
        RegisterUser(user);
        props.close();
      } catch (e) {
        alert("Error: " + e.code + " " + e.message);
      }
    },
  });
  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        height: 200,
        padding: 8,
      }}
    >
      <TextField
        placeholder="username"
        name="username"
        onChange={RegisterForm.handleChange}
        value={RegisterForm.values.username}
      />
      <TextField
        type="password"
        placeholder="password"
        name="password"
        onChange={RegisterForm.handleChange}
        value={RegisterForm.values.password}
      />
      <TextField
        placeholder="email"
        name="email"
        onChange={RegisterForm.handleChange}
        value={RegisterForm.values.email}
      />
      <Button onClick={RegisterForm.handleSubmit}>
        <Typography>Register</Typography>
      </Button>
    </Card>
  );
};

export default Register;
