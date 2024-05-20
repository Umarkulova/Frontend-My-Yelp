import {Box,Button,Container,Stack,Typography,} from "@mui/material";
import Form from "./Form";
import { useEffect, useState } from "react";
import Table from "./Table";
import "../firebase/firebase";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../firebase/firebase";
import { getDocs, collection } from "firebase/firestore";

const Main = ({ accountList, getAccountList }) => {
  const [itemList, setItemList] = useState([]);
  const [userId, setUserId] = useState("");
  const currentEmail = getAuth().currentUser

  const userName = accountList.filter((acc) => acc.email === currentEmail.email )[0]?.userName

  const itemCollectionRef = collection(db, "restaurants");

  const getItemList = async () => {
    try {
      const data = await getDocs(itemCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        itemId: doc.itemId,
      }));

      setItemList(filteredData);
      setUserId(getAuth()?.currentUser?.uid);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getAccountList();
    getItemList();
  }, [accountList]);

  const logoutHandler = () => {
    signOut(getAuth())
  };

  return (
    <Box>
      <Container>
        <Stack
        mt={1}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Stack width={1000} ml={65} >
            <h1>My Yelp</h1>
          </Stack>
          <Stack direction={"row"} spacing={2} >
            <Typography variant="h4" pt={1.5}>
              {userName && userName}
            </Typography>
            
          </Stack>
        </Stack>
        
        <Box direction={"row"} spacing={10} mt={3}>
          <Stack
            sx={{
              background: "#00FFCC",
              borderRadius: "20px",
              width: "100%",
              height: "310px",
            }}
            
          >
            <Form
              itemCollectionRef={itemCollectionRef}
              getItemList={getItemList}
            />
          </Stack>
        </Box>
        <Stack
            mt={8}
            sx={{
              background: "#00FFCC",
              borderRadius: "10px",
              width: "100%",
              height: "250px",
            }}
          >
            <Table itemList={itemList} userId={userId} />
          </Stack>
        

        <Box mt={5} sx={{ mt: "50px", width: "100px" }} fontSize={20} size={"sm"}>
          <Button onClick={logoutHandler}  variant="contained" sx={{ width: "270px", background: "gren", fontWeight: "bold" }}>
            Sign In
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Main;
