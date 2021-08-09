import { Box, Button, Card, TextField, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import Parse from "parse";

const Write = (props) => {
  const WriteForm = useFormik({
    initialValues: {
      text: "",
    },
    onSubmit: (values) => {
      const Blog = Parse.Object.extend("Blog");
      const blog = new Blog();
      blog.set("text", values.text);
      blog.set("user", props.user._getId());
      blog.save();
      props.close();
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
        placeholder="text"
        name="text"
        onChange={WriteForm.handleChange}
        value={WriteForm.values.text}
      />
      <Button onClick={WriteForm.handleSubmit}>
        <Typography>Write</Typography>
      </Button>
    </Card>
  );
};

export default Write;
