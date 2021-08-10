import { Box, Button, Card, TextField, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import Parse from "parse";

const Login = (props) => {
  const LoginForm = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      Parse.User.logIn(values.username, values.password)
        .then((user) => {
          props.close();
        })
        .catch((error) => console.log(error));
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
        onChange={LoginForm.handleChange}
        value={LoginForm.values.username}
      />
      <TextField
      type="password"
        placeholder="password"
        name="password"
        onChange={LoginForm.handleChange}
        value={LoginForm.values.password}
      />
      <Button onClick={LoginForm.handleSubmit}>
        <Typography>Login</Typography>
      </Button>
    </Card>
  );
};

export default Login;
