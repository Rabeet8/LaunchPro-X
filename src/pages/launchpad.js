import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import IDOList from "../components/Modal/idoList";
import * as s from "../styles/global";
import { utils } from "../utils";
import { useNavigate, useLocation } from "react-router-dom";

const Launchpad = (props) => {
  const [address, setAddress] = useState("");
  const contract = useSelector((state) => state.contract);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') navigate('/launchpad');
  }, []);

  if (!contract.web3) {
    return null;
  }

  return (
    <s.Container ai="center">
      <s.TextTitle>Launchpad</s.TextTitle>
      <s.SpacerMedium />
      <TextField
        fullWidth
        color='secondary'
        // label = 'as'
        onChange={async (e) => {
          e.preventDefault();
          await utils.typewatch(2000);
          setAddress(e.target.value);
        }}
        InputLabelProps={{
          style: { color: "black" },
           // Adjust the label width as needed
      marginLeft: '5rem'
        }}
        InputProps={{
          style: {
            marginLeft: '5rem',
            width: '50rem',
                  color:'black',
              border: "1px solid black" 
              // Adding the border color property
          }
        }}
      />
      <IDOList tokenAddress={address} />
    </s.Container>
  );
};

export default Launchpad;
