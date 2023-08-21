import { withStyles } from "@material-ui/core/styles";
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField, InputAdornment } from "@mui/material";
import BigNumber from "bignumber.js";
import React, { useEffect, useRef, useState } from "react";
import { Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as s from "../../styles/global";
import { utils } from "../../utils";
import { useApplicationContext } from "../../context/applicationContext";
import { useWeb3React } from "@web3-react/core";
import { useTokenContract } from "../../hooks/useContract";
import Loader from "../Loader";
import { database } from '../../../src/firebase';
import { IconButton } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import { getDatabase, ref, onValue, child, set, push } from "firebase/database";

const styles = {
  root: {
    border: 0,
    borderRadius: 10,
    color: "white",
    padding: "20px",
  },
};

const LockTokenForm = () => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenAddressForChecking, setTokenAddressForChecking] = useState("");
  const [name, setName] = useState("");
  const [tokenApprove, setTokenApprove] = useState("0");
  const [tokenName, setTokenName] = useState("");
  const [fee, setFee] = useState("0");
  const [totalSupply, setTotalSupply] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [decimals, setDecimals] = useState(-1);
  const [withdrawer, setWithdrawer] = useState("");
  const [withdrawTime, setWithdrawTime] = useState(
    parseInt(Date.now() / 1000 + 60)
  );
  const [tokenDistributed, setTokenDistributed] = useState("0");
  const [tokenDistributedInput, setTokenDistributedInput] = useState(0);
  const [tokenLoading, setTokenLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const { account, chainId, library } = useWeb3React();

  const tokenContract = useTokenContract(tokenAddress);
  const tokenContractForChecking = useTokenContract(tokenAddressForChecking);

  const navigate = useNavigate();

  const {
    triggerUpdateAccountData,
    baseCurrencySymbol,
    TokenLockerFactoryContract,
    TokenLockerFactoryAddress,
  } = useApplicationContext();

  useEffect(() => {
    if (decimals > 0) {
      setDistributed();
    } else {
      setTokenDistributed("0");
    }
  }, [tokenDistributedInput, decimals]);

  useEffect(() => {
    const checkAndSetTokensDetails = async () => {
      setTokenLoading(true);
      try {
        const tokenDecimals = await tokenContractForChecking?.decimals();
        if (tokenDecimals) {
          setDecimals(tokenDecimals.toString());
          setTokenName(await tokenContractForChecking?.name());
          setTotalSupply(Number(await tokenContractForChecking?.totalSupply()));
          setTokenSymbol(await tokenContractForChecking?.symbol());
          setTokenApprove(Number(await tokenContractForChecking?.allowance(account, TokenLockerFactoryAddress)));

          setTokenAddress(tokenAddressForChecking);
          setDistributed();
        } else {
          setDecimals(-1);
          await utils.timeout(100);
        }
      } catch (error) {
        console.log('checkAndSetTokensDetails Error: ', error);
        setDecimals(-1);
      } finally {
        setTokenLoading(false)
      }
    };

    if (utils.isAddress(tokenAddressForChecking)) {
      checkAndSetTokensDetails()
    } else {
      setTokenAddress("");
      setTokenName("");
      setTotalSupply("");
      setTokenSymbol("");
      setTokenApprove("0");
      if (tokenAddressForChecking !== "") {
        // TODO: show user Error address is not correct
      }
    }
  }, [tokenContractForChecking])

  useEffect(() => {
    const fethcLockerFee = async () => {
      if (TokenLockerFactoryContract) {
        const lockerFee = await TokenLockerFactoryContract.fee();
        setFee(lockerFee.toString());
      } else {
        setFee("0");
      }
    }
    fethcLockerFee();
  }, [TokenLockerFactoryContract]);

  if (account == null) {
    return null;
  }

  const setDistributed = () => {
    if (decimals > 0) {
      setTokenDistributed(
        BigNumber(tokenDistributedInput)
          .times(10 ** decimals)
          .toFixed(0)
      );
    }
  };

  const approveToken = async (amount) => {
    if (!tokenContract) {
      return;
    }
    setLoading(true);

    try {
      const tx = await tokenContract.approve(TokenLockerFactoryAddress, amount, {
        from: account,
      });

      await tx.wait();

      setTokenApprove(amount);
      triggerUpdateAccountData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createLocker = async () => {
    setLoading(true);
    try {
      const tx = await TokenLockerFactoryContract.createLocker(
        tokenAddress,
        name,
        tokenDistributed,
        withdrawer,
        withdrawTime,
        {
          from: account,
          value: fee,
        }
      );
      //0x9c1A98c96F756B0dA5931d2d62945a94c336DF3f

      const receipt = await tx.wait();
      console.log("txData ==> ", tx);
      console.log("rcptData ==> ", receipt);
      triggerUpdateAccountData();
      // simple yahan se address record karo aur wahan jahan render horahy wahan get krlo
      const LockerCreatedIndex = receipt?.events?.findIndex?.((i) => i?.event === "LockerCreated");
      if (LockerCreatedIndex || LockerCreatedIndex === 0) {
        navigate(`../locker/${receipt.events[LockerCreatedIndex].args.lockerAddress}`)
        console.log("Locker Locked Details:", receipt.events[LockerCreatedIndex].args.lockerAddress);
        writeUserData(receipt.events[LockerCreatedIndex].args.lockerAddress, chainId);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  function writeUserData(lockerAddress, chainId) {
    try {
      // Create a reference to the user's data using their account address and chain ID
      const userRef = ref(database, `LockerData/${chainId}`);

      // Push the new data under the user's reference
      // const newUserDataRef = set(userRef); 
      // const starCountRef = ref(database, `${account}/${chainId}`);
      let data;
      onValue(userRef, (snapshot) => {
        data = snapshot.val();
      })
      console.log(data);
      if (data == null) {
        set(userRef,
          [
            lockerAddress
          ]
        );
      } else {
        if (Array.isArray(data)) {
          data.push(lockerAddress)
        };
        set(userRef, data);
      }
      console.log("done");
    } catch (e) {
      console.log(e)
    }
  }




  return (
    <s.Card
      fd="column"
      jc="space-evenly"
      style={{
        maxWidth: 1000,
      }}
    >
      {/* <s.TextTitle>Lock token</s.TextTitle> */}
      <s.SpacerSmall />
      <s.Container style={{ marginBottom: 20 }}>
        {tokenLoading ? (
          <Badge bg="dark">Token Address Checking...</Badge>
        ) : (decimals > 0 &&
          tokenName !== "" &&
          tokenSymbol !== "" &&
          totalSupply !== "") ? (
          <s.Container fd="row" style={{ flexWrap: "wrap" }}>
            <Badge bg="dark">{"Name: " + tokenName}</Badge>
            <s.SpacerXSmall />
            <Badge bg="dark">{"Decimal: " + decimals}</Badge>
            <s.SpacerXSmall />
            <Badge bg="dark">
              {"Total supply: " +
                BigNumber(totalSupply)
                  .dividedBy(10 ** decimals)
                  .toFormat()}
            </Badge>
            <s.SpacerXSmall />
            <Badge bg="dark">{"Symbol: " + tokenSymbol}</Badge>
          </s.Container>
        ) : (tokenAddress !== "" && (
          <Badge bg="danger">{"Contract not valid"}</Badge>
        ))
        }
      </s.Container>
      <TextField
        fullWidth
        id="name"
        label={"Locker name"}
        color="secondary"
        onChange={(e) => {
          e.preventDefault();
          setName(e.target.value);
        }}
        InputLabelProps={{
          style: { color: "black" }
        }}
        InputProps={{
          style: {
                  color:'black',}
        }}
      ></TextField>
      <s.SpacerSmall />
      <TextField
        fullWidth
        id="address"
        color="secondary"

        label={"Token address"}
        onChange={(e) => {
          e.preventDefault();
          setTokenAddressForChecking(e.target.value);
        }}
        InputLabelProps={{
          style: { color: "black" }
        }}
        InputProps={{
          style: {
                  color:'black',}
        }}
      
      ></TextField>
      <s.SpacerSmall />
      <TextField
        fullWidth
        id="amount"
        label="Lock amount"
        color="secondary"

        InputProps={{
          style: {color:'black'},
          endAdornment: <InputAdornment position="end">{tokenSymbol || ''}</InputAdornment>,
        }}
        onWheel={(e) => {
          e.target.blur();
        }}
        InputLabelProps={{
          style: { color: "black" }
        }}
        
        type={"number"}
        onChange={async (e) => {
          e.preventDefault();
          const val = BigNumber(e.target.value).absoluteValue();
          if (!isNaN(val)) {
            setTokenDistributedInput(val);
          } else {
            setTokenDistributedInput("0");
          }
        }}
      />

      <s.SpacerSmall />
      <TextField
        fullWidth
        id="contract-address"
        label="Withdrawer"
        color="secondary"

        onWheel={(e) => {
          e.target.blur();
        }}
        onChange={async (e) => {
          e.preventDefault();
          setWithdrawer(e.target.value);
        }}
        InputLabelProps={{
          style: { color: "black" }
        }}
        InputProps={{
          style: {
                  color:'black'}
        }}

      />
      <s.SpacerMedium />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(props) => <TextField fullWidth {...props}  InputLabelProps={{
            style: { color: "black" }
          }} color="secondary"/>}
          InputProps={{
            className: "MuiInputBase-root", // Apply styles to the input text
            style: { color: "black" }, // Set text color to black
           
          }}
          id={"address"}
          label="Withdraw Date"
         
          style={{color:'black'}}
          value={new Date(withdrawTime * 1000)}
          onChange={(e) => {
            setWithdrawTime(Math.floor(new Date(e).getTime() / 1000));
          }}
         
          
        />

      </LocalizationProvider>

      <s.Container ai="center">
        {BigNumber(tokenApprove) >= BigNumber(tokenDistributed) &&
          tokenDistributed !== "0" ? (
          <s.button
            disabled={
              loading ||
              !utils.isAddress(withdrawer) ||
              !utils.isAddress(tokenAddress) ||
              !(BigNumber(tokenDistributed) > 0) ||
              withdrawTime <= Date.now() / 1000
            }
            style={{ marginTop: 20 }}
            onClick={(e) => {
              e.preventDefault();
              createLocker();
            }}
          >
            {loading ? <Loader /> : "LOCK"}
          </s.button>
        ) : (
          <s.button
            disabled={
              loading ||
              !tokenAddress ||
              tokenDistributed <= 0 ||
              decimals <= 0
            }
            style={{ marginTop: 20 }}
            onClick={(e) => {
              e.preventDefault();
              approveToken(tokenDistributed);
            }}
          >
            {loading ? <Loader /> : "APPROVE TOKEN"}
          </s.button>
        )}
      </s.Container>
      {"Fee : " +
        library?.web3?.utils?.fromWei?.(fee) +
        " " +
        baseCurrencySymbol}
    </s.Card>
  );
};
export default withStyles(styles)(LockTokenForm);
