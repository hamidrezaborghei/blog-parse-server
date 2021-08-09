import { Box, Button, Typography } from "@material-ui/core";
import React from "react";
import Parse from "parse";
const Header = (props) => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 8,
      }}
    >
      <Box>
        <Typography variant="h1">Blog</Typography>
      </Box>
      {props.hasUser ? (
        <Box
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Button color="primary" onClick={() => props.setWrite(true)}>
            <Typography>Write</Typography>
          </Button>
          <Button
            onClick={() => {
              Parse.User.logOut();
            }}
          >
            <Typography>LogOut</Typography>
          </Button>
        </Box>
      ) : (
        <Box
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Button onClick={() => props.setLogin(true)}>
            <Typography>Login</Typography>
          </Button>
          <Button onClick={() => props.setRegister(true)}>
            <Typography>Register</Typography>
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Header;
