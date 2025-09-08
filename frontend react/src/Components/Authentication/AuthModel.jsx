import {
  Box,
  Button,

  Modal,
} from "@mui/material";
import SignupForm from "./SignupForm";
import SigninForm from "./SigninForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
  borderRadius: 2,
  outline: "none",
  overflow: "hidden"
};

const AuthModel = ({handleClose,isOpen}) => {
  
  const location=useLocation()
  const navigate=useNavigate();
  const {auth}=useSelector(store=>store);
  

  
  const handleNavigate=()=>{
    const path=location.pathname==="/signup"?"/signin":"/signup"
navigate(path)


  }



  useEffect(()=>{
    if(auth.user?.fullName){
      handleClose()
    }
  },[auth.user])
  
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {location.pathname === "/signup" ? <SignupForm /> : <SigninForm />}
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModel;
