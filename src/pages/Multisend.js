import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { useApplicationContext } from "../context/applicationContext";
import BigNumber from "bignumber.js";
import { useWeb3React } from "@web3-react/core";
import { useTokenContract } from "../hooks/useContract";




const steps = ['Add your Allocation', 'Confirmation'];

const StyledButton = styled.button`
  background-color: ${({ secondary }) => (secondary ? "inherit" : "var(--primary)")};
  border: ${({ secondary }) => (secondary ? "var(--secondary-color)" : "var(--primary)")} 0.125em solid;
  font-weight: 700;
  padding: 5px 20px;
  border-radius: 20px;
  color: ${({ secondary }) => (secondary ? "var(--secondary-color)" : "var(--card)")};
  
  ${({ fullWidth }) =>
    fullWidth ? 'width: 100%;' : ''
  }

  :disabled {
    background-color: transparent;
    box-shadow: none;
    color: var(--disable);
    border: var(--disable) 0.125em solid;
    text-shadow: none;
  }
  :hover {
    border: ${({ secondary }) => (secondary ? "var(--white)" : "none")} 0.125em solid;
    color: ${({ secondary }) => (secondary ? "var(--white)" : "none")};
  }
`;

const CustomBox = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [loading, setLoading] = useState(false);
  const [decimals, setDecimals] = useState(0);
  const [tokenAddress, setTokenAddress] = useState("");
  const [amountToApprove, setAmountToApprove] = useState(0);
  const [tokenApproved, setTokenApprove] = useState(false);
  const [recipients, setReceipients] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const tokenContractForChecking = useTokenContract(tokenAddress);
  const { account } = useWeb3React();

  useEffect(async () => {
    if (tokenContractForChecking) {
      const tokenDecimals = await tokenContractForChecking?.decimals();
      console.log(tokenDecimals.toString());
      if (tokenDecimals) {
        setDecimals(tokenDecimals.toString());
      }
    }
  }, [tokenContractForChecking])

  useEffect(async () => {
    const tokenAllowance = await tokenContractForChecking?.allowance(account, MultisendAddress);
    if (tokenAllowance < amountToApprove) {
      setAmountToApprove(amountToApprove - tokenAllowance);
      setTokenApprove(true);
    }
  }, [amountToApprove])

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const {
    triggerUpdateAccountData,
    baseCurrencySymbol,
    MultisendAddress,
    MultisendContract
  } = useApplicationContext();

  const handleReset = () => {
    setActiveStep(0);
  };



  // let [tokenContractForChecking, setTokenContractForChecking] = useState({});

  if (account == null) {
    return null;
  }

  const approveToken = async (amount) => {
    if (!tokenContractForChecking) {
      return;
    }
    setLoading(true);

    try {
      const tx = await tokenContractForChecking?.approve(MultisendAddress, amount, {
        from: account,
      });

      await tx.wait();

      // setTokenApprove(true);
      triggerUpdateAccountData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const multisendFunction = async () => {
    setLoading(true);
    try {
      const tx = await MultisendContract?.functions?.multiSend(
        recipients,
        amounts,
        tokenAddress,
        {
          from: account
        }
      );

      const receipt = await tx.wait();
      console.log("txData ==> ", tx);
      console.log("rcptData ==> ", receipt);
      triggerUpdateAccountData();
      const _multisend = receipt?.events?._multisend;
      // if (LockerCreatedIndex || LockerCreatedIndex === 0){
      //   navigate(`../locker/${receipt.events[LockerCreatedIndex].args.lockerAddress}`)
      // }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  function processInput(input) {
    const recipients_ = [];
    const amounts_ = [];
    let totalAmount = 0;
    const entries = input.split(',');

    entries.forEach(entry => {
      const parts = entry.trim().split(" ");
      if (parts.length >= 2) {
        recipients_.push(parts[0]);
        amounts_.push(
          // parts.slice(1).join(" ") + 10 ** decimals
          // (parseInt(parts.slice(1).join(" ")) * 10 ** decimals)
          BigNumber(parseInt(parts.slice(1).join(" ")))
            .times(10 ** decimals)
            .toFixed(0)
        )
        totalAmount += BigNumber(parseInt(parts.slice(1).join(" ")))
          .times(10 ** decimals)
          .toFixed(0)
      }
    });
    // parts.slice(1).join(" ")
    setAmountToApprove(totalAmount);
    setReceipients(recipients_);
    console.log(recipients_)
    setAmounts(amounts_);
    console.log(amounts_);
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'black',
          borderRadius: '20px',
          width: '45rem',
          height: '25rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: '60%',
          left: '50%',
          transform: 'translate(-50%, -50%)',

        }}
      >
        <Box sx={{ width: '100%', flexGrow: 1, marginTop: '2rem' }}>
          <Stepper alternativeLabel activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <p style={{ color: "white", marginTop: '1.5rem', marginLeft: '4.5rem' }}>Add Token Address</p>
          <TextField
            label="Ex : 0x....."
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={e => {
              e.preventDefault();
              setTokenAddress(e.target.value)
            }}
            sx={{ marginTop: '0.5rem', marginLeft: '4rem', width: '80%' }}
          />
          <p style={{ color: "white", marginTop: '1.5rem', marginLeft: '4.5rem' }}>Allocations</p>
          <TextField
            label="Insert allocation:"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={e => {
              e.preventDefault();
              processInput(e.target.value)
            }}
            sx={{ marginTop: '0.5rem', marginLeft: '4rem', width: '80%' }}
          />


        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <StyledButton
            style={{ margin: 10 }}
            disabled={activeStep === 0}
            onClick={handleBack}
            secondary

          >
            Back
          </StyledButton>
          {tokenApproved && (
            <StyledButton
              style={{ margin: 10 }}
              onClick={e => {approveToken(amountToApprove)}}
              secondary

            >
              Approve
            </StyledButton>
          )}
          <StyledButton
            style={{ margin: 10 }}
            onClick={e => { multisendFunction() }} secondary>
            {/* {activeStep === steps.length - 1 ? 'Finish' : 'Next'} */}
            Finish
          </StyledButton>
        </Box>
      </Box>
    </div>
  );
};

export default CustomBox;
