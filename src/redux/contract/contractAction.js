// log
import Web3 from "web3";
import IDOFactory from "../../contracts/IDOFactory.json";
import { networks } from "../../constants/networksInfo";
import TokenLockerFactory from "../../contracts/TokenLockerFactory.json";

const fetchContractRequest = () => {
  return {
    type: "CHECK_CONTRACT_REQUEST",
  };
};

const fetchContractSuccess = (payload) => {
  return {
    type: "CHECK_CONTRACT_SUCCESS",
    payload: payload,
  };
};

const fetchContractFailed = (payload) => {
  return {
    type: "CHECK_CONTRACT_FAILED",
    payload: payload,
  };
};

export const fetchContract = (webSocketRPC_, IDOFactoryAddress_, TokenLockerFactoryAddress_) => {
  return (dispatch) => {
    dispatch(fetchContractRequest());

    const webSocketRPC = webSocketRPC_;
    const IDOFactoryAddress = IDOFactoryAddress_;
    const TokenLockerFactoryAddress = TokenLockerFactoryAddress_;

    try {
      if (!webSocketRPC || !IDOFactoryAddress || !TokenLockerFactoryAddress) throw Error("Network is not configured");

      const web3 = new Web3(webSocketRPC);

      const IDOFactoryContract = new web3.eth.Contract(
        IDOFactory.abi,
        IDOFactoryAddress
      );
      const LockerFactoryContract = new web3.eth.Contract(
        TokenLockerFactory.abi,
        TokenLockerFactoryAddress
      );
      dispatch(
        fetchContractSuccess({
          IDOFactory: IDOFactoryContract,
          TokenLockerFactory: LockerFactoryContract,
          web3,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchContractFailed("Could not load data from contract."));
    }
  };
};
