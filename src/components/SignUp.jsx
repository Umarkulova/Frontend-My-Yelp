import { Box, Button, Container, Grid, Stack,  } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import '../firebase/firebase'
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import { addDoc } from "firebase/firestore";

const SignUp = ({itemCollectionAccount}) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showConfirmMassage, setShowConfirmMassage] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)

  const confirmPass = () => {
    if (confirmPassword == password) {
      return true
    }
    return false
  }

  const submitForm = (e) => {
    e.preventDefault()
    const confirm = confirmPass()
    if (confirm) {
      createUserWithEmailAndPassword(getAuth(), email, password)
        .catch(() => setErrorMsg(true))
      addDoc(itemCollectionAccount, {
        userName,
        email,
      } )
    }else{
      setShowConfirmMassage(true)
    }
  }

  return (
    <Box sx={{ background: "#00CC99" }} height={"100vh"} >
      <Container>
        <Stack direction={"row"} justifyContent={"center"}>
          <Box
            width={"550px"}
            height={"510px"}
            sx={{
              background: "#00FFCC",
              mt: "100px",
              p: "10px 20px",
              borderRadius: "10px",
            }}
          >
            <Box mb={4} mt={2}>
              <Box
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "25px",
                }}
              >
                Sign Up 
              </Box>
              
            </Box>

            <form onSubmit={submitForm}>
              <Grid container spacing={2}>
                <Grid item xs={20}>
                  <Box mb={2}>
                    <input
                      type="text"
                      size={"sm"}
                      placeholder="Enter your Username"
                      className="form-control"
                      onChange={(e) => setUserName(e.target.value)}
                      value={userName}
                      required
                    />
                  </Box>
                </Grid>
                <Grid item xs={20}>
                  <Box mb={2}>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your Email"
                      className="form-control"
                      onChange={e => setEmail(e.target.value)}
                      value={email}
                      required
                    />
                  </Box>  
                </Grid>
                <Grid item xs={20}>
                  <Box mb={2}>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your Password"
                      className="form-control"
                      onChange={e => setPassword(e.target.value)}
                      value={password}
                      required
                    />
                  </Box>
                </Grid>
               
                <Grid item xs={20}>
                  <Box mb={2}>
                    <input
                      type="password"
                      name="password"
                      placeholder="Please confirm your Password"
                      className="form-control"
                      onChange={e => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                      required
                    />
                    {showConfirmMassage && <Box fontSize={14} color={'red'}>Please Confirm your password</Box>}
                  </Box>
                </Grid>
              </Grid>
              {errorMsg && <Box color={'red'} fontSize={14} >Change you Email or Password</Box>}
             
              <Box direction={"row"} justifyContent={"center"} mt={2}>
                <Button type="submit" variant="contained" sx={{ mt: "10px", width: "100%" }}>
                  Sign up
                </Button>
              </ Box>

              <Box mb={3} mt={5} textAlign={"center"}>
                You have an account? <Link to={"/SignIn"}>Sign In</Link>
              </Box>
            </form>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default SignUp;
