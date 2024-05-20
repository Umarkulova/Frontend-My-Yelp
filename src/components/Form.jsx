import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Form = ({ itemCollectionRef, getItemList }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");

  let auth = getAuth();

  const onSubmitItem = async (e) => {
    e.preventDefault();
    try {
      await addDoc(itemCollectionRef, {
        name,
        description,
        city,
        userId: auth?.currentUser?.uid
      });
      setName('')
      setDescription('')
      setCity('')

      getItemList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack p={1} >
      <Typography textAlign={"center"} fontWeight={"bold"} fontSize={20} >
        Add Cafe
      </Typography>
      <form onSubmit={onSubmitItem}>
        <Box mb={1}>
          <h6 className="form-label">Name</h6>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Box>
        <Box mb={1}>
          <h6 className="form-label">Description</h6>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <h6 className="form-label">City</h6>
          <input
            type="text"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            max={5}
          />
        </Box>
        <Stack direction={"row"} justifyContent={"end"}>
          <Button type="submit" variant="contained" sx={{ width: "270px", 
          background: "gren", fontWeight: "bold" }}>
            Submit
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default Form;
