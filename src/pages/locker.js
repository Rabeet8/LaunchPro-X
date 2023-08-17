import { Checkbox, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import LockerList from "../components/Modal/lockerList";
import * as s from "../styles/global";
import { utils } from "../utils";
import { getDatabase, ref, onValue } from "firebase/database";
import { database } from "../../src/firebase";

const  Locker = (props) => {
  const [address, setAddress] = useState("aasd");
  const contract = useSelector((state) => state.contract);
  const [showZero, setShowZero] = useState(0);

  if (!contract.web3) {
    return null;
  }

  const handleShowZero = (e) => {
    setShowZero(!showZero);
  };

  // const starCountRef = ref(database, "users/" );
  // onValue(starCountRef, (snapshot) => {
  //   const data = snapshot.val();
  // //  console.log(data['-Nc20uo2YnJAcg6zw3nY']);
  // console.log(data.id)
  // });

  const starCountRef = ref(database, "users/");
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();

  // `data` is an object containing user IDs as keys
  // You can iterate through the user IDs and access their data
  for (const userId in data) {
    const user = data[userId];
    console.log(`User ID: ${userId}`);
    console.log(`Name: ${user.name}`);
    console.log(`Amount: ${user.Amount}`);
    console.log(`Token: ${user.token}`);
    console.log("-----");
  }
});

  return (
    <s.Container ai="center">
      <s.TextTitle>Locker</s.TextTitle>
      <s.SpacerMedium />
      <s.Container fd="row">
        <s.Container flex={7}></s.Container>
        <s.Container flex={2} ai="center" fd="row" jc="center">
          show zero?
          <Checkbox value={showZero} onChange={handleShowZero} />
        </s.Container>
      </s.Container>
      <TextField
        fullWidth
        label={"Search by token address "}
        onChange={async (e) => {
          e.preventDefault();
          utils.typewatch(setAddress(e.target.value), 2000);
        }}
      />
      <LockerList showZero={showZero} tokenAddress={address} owner = {'abaasd'} showUserLockers={'asdasd'} />
    </s.Container>
  );
};

export default Locker;
