import React from "react";
import LockTokenForm from "../lockTokenForm";
import * as s from "../../../styles/global";

const LockerCreation = () => {
  return (
    <s.Container ai="center">
      <s.TextTitle>Create Locker</s.TextTitle>
      <s.SpacerMedium />
      <LockTokenForm />
    </s.Container>
  );
};

export default LockerCreation;
