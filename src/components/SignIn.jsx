import { Box, Button, Container, Stack,  } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongMsg, setWrongMsg] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(getAuth(), email, password)
      .then(() => setWrongMsg(false))
      .catch(() => setWrongMsg(true));
  };
  return (
    <Box sx={{ background: "#00CC99" }} height={"100vh"}>
      <Container>
        <Stack direction={"row"} justifyContent={"center"}>
          <Box
            width={"550px"}
            height={"360px"}
            sx={{
              background: "#00FFCC",
              mt: "100px",
              p: "10px 20px",
              borderRadius: "10px",
            }}
          >
            <Box mb={2} mt={1}>
              <Box
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "25px",
                }}
              >
                Sign In
              </Box>
             
            </Box>
            <form onSubmit={loginHandler}>
              <Box mb={5} mt={2}>
                <input
                  type="email"
                  placeholder='Enter your Username'
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </Box>
              <Box mt={2}>
                <input
                  type="password"
                  className="form-control"
                  placeholder='Enter your Password'
                  fontSize={14}
                  size={"sm"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </Box>
              {wrongMsg && (
                <Box mb={50} fontSize={50} color={"red"}>
                  Your email or password is Wrong
                </Box>
              )}

              
             <Box mt={5} >
              <Button
                  type="submit"
                  variant="contained"
                  size={"sm"}
                  fontSize={100}
                  sx={{ mt: "10px", width: "100%" }}
                >
                  Sign in
                </Button>
              </Box> 
              
              <Box mb={3} mt={3}  textAlign={"center"}>
                Don't have an account? <Link to={"/SignUp"}>Sign Up</Link>
              </Box>
            </form>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default SignIn;