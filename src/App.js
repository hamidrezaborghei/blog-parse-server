import logo from "./logo.svg";
import "./App.css";
import Parse from "parse";
import {
  Box,
  Container,
  List,
  ListItem,
  Modal,
  Typography,
  Checkbox,
  Card,
} from "@material-ui/core";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Write from "./components/Write";
import moment from 'moment'



function App() {
  const [blogs, setBlogs] = useState([]);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openWrite, setOpenWrite] = useState(false);
  const [onlyMyPost, setOnlyMyPost] = useState(false);
  const [subsc , setSubsc] = useState()
  const currentUser = Parse.User.current();

  const Blog = Parse.Object.extend("Blog");

  useEffect(() => {
    const query = new Parse.Query(Blog);
    query.descending("createdAt");
    if(subsc)
    {
      subsc.unsubscribe();
    }
    async function fetchMyAPI() {
      let subs = await query.subscribe();
      setSubsc(subs);
    }
    if(onlyMyPost)
    {
      query.equalTo('user',currentUser._getId())
    }
    fetchMyAPI();
    query.find().then(datas => {
      setBlogs(datas);
    })
  },[onlyMyPost])

  useEffect(() => {
    if(subsc){
    subsc.on("create", obj => {
      setBlogs(value => [obj,...value])
    })
  }
  },[subsc])

  return (
    <Container>
      <Header
        setWrite={(value) => setOpenWrite(value)}
        setRegister={(value) => setOpenRegister(value)}
        setLogin={(value) => setOpenLogin(value)}
        hasUser={currentUser ? true : false}
      />
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {currentUser && blogs.length === 0 ? (
          <Typography>No Content</Typography>
        ) : currentUser ? (
          <>
          <Box
          style={{
            justifyContent: "flex-start",
            display: "flex",
            alignItems: "center",
            margin: "16px 0px",
            width: "100%",
          }}
        >
          <Checkbox
            color="primary"
            value={onlyMyPost}
            onClick={() => setOnlyMyPost((value) => !value)}
          />
          <Typography>Only my posts</Typography>
        </Box>
          <Box style={{ display: "flex", width: "100%" }}>
            <List style={{ flex: 1 }}>
              {blogs.map((item) => (
                <ListItem key={item.id}>
                  <Card
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      padding: 16,
                    }}
                  >
                    <Typography variant="h6">{item.get("text")}</Typography>
                    <Box style={{flex : 1,display : 'flex',justifyContent : 'space-between',alignItems : 'center'}}>
                    <Typography style={{color : 'GrayText'}} variant="subtitle1">{item.get("user")}</Typography>
                    <Typography style={{color : 'gray'}} variant="subtitle2">{moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Typography>
                    </Box>
                  </Card>
                </ListItem>
              ))}
            </List>
          </Box>
          </>
        ) : (
          <Typography>Please Login First</Typography>
        )}
      </Box>
      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={openLogin}
        onClose={() => {
          setOpenLogin(false);
        }}
      >
        <Login close={() => setOpenLogin(false)} />
      </Modal>
      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={openRegister}
        onClose={() => {
          setOpenRegister(false);
        }}
      >
        <Register close={() => setOpenRegister(false)} />
      </Modal>
      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={openWrite}
        onClose={() => {
          setOpenWrite(false);
        }}
      >
        <Write user={currentUser} close={() => setOpenWrite(false)} />
      </Modal>
    </Container>
  );
}

export default App;
