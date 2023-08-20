import { useState, useEffect } from 'react';
import { useWeb3React } from "@web3-react/core";
import { getCurrentDomain } from '../utils/utils';
import { useStorageContract } from './useContract';
import { networks } from '../constants/networksInfo';
import { STORAGE_APP_KEY, ZERO_ADDRESS } from '../constants';

const isValidArray = (arr) => Array.isArray(arr) && !!arr.length

const defaultSettings = () => ({
  contracts: {},
  networks: {},

  ipfsInfuraDedicatedGateway: '',
  ipfsInfuraProjectId: '',
  ipfsInfuraProjectSecret: '',

  admin: '',
  projectName: '',
  logoUrl: '',
  socialLinks: [],
  disableSourceCopyright: false,
  isLockerEnabled: true,
});

const initialSettings = defaultSettings();

const parseSettings = (settings) => {
  const appSettings = initialSettings;

  try {
    const settingsJSON = JSON.parse(settings);

    if (!settingsJSON?.[STORAGE_APP_KEY]) {
      settingsJSON[STORAGE_APP_KEY] = {};
    }
    if (!settingsJSON[STORAGE_APP_KEY]?.contracts) {
      settingsJSON[STORAGE_APP_KEY].contracts = {};
    }
    if (!settingsJSON[STORAGE_APP_KEY]?.networks) {
      settingsJSON[STORAGE_APP_KEY].networks = {};
    }

    const { [STORAGE_APP_KEY]: parsedSettings } = settingsJSON;

    const {
      contracts,
      networks,

      ipfsInfuraDedicatedGateway,
      ipfsInfuraProjectId,
      ipfsInfuraProjectSecret,

      projectName,
      logoUrl,
      socialLinks,
      disableSourceCopyright,
      isLockerEnabled,
    } = parsedSettings;

    appSettings.contracts = contracts
    appSettings.networks = networks

    if (ipfsInfuraDedicatedGateway) appSettings.ipfsInfuraDedicatedGateway = ipfsInfuraDedicatedGateway;
    if (ipfsInfuraProjectId) appSettings.ipfsInfuraProjectId = ipfsInfuraProjectId;
    if (ipfsInfuraProjectSecret) appSettings.ipfsInfuraProjectSecret = ipfsInfuraProjectSecret;

    if (projectName) appSettings.projectName = projectName;
    if (logoUrl) appSettings.logoUrl = logoUrl
    if (isValidArray(socialLinks)) appSettings.socialLinks = socialLinks;
    if (typeof disableSourceCopyright === "boolean") appSettings.disableSourceCopyright = disableSourceCopyright;
    if (typeof isLockerEnabled === "boolean") appSettings.isLockerEnabled = isLockerEnabled;

  } catch (error) {
    console.group('%c Storage settings', 'color: red')
    console.error(error)
    console.log('source settings: ', settings)
    console.groupEnd()
  }

  return appSettings
};

export default function useDomainData() {
  const { account, chainId } = useWeb3React();

  const [isAdmin, setIsAdmin] = useState(false);
  const [domainSettings, setDomainSettings] = useState(initialSettings);
  const [isDomainDataFetching, setIsDomainDataFetching] = useState(false);
  const [isDomainDataFetched, setIsDomainDataFetched] = useState(false);
  const [domainDataTrigger, setDomainDataTrigger] = useState(false);
  const triggerDomainData = () => setDomainDataTrigger(!domainDataTrigger);

  // const storageContract = useStorageContract();

  const domain = getCurrentDomain();

  //   {
  //     "contracts": {
  //         "5": {
  //             "FeeTokenAddress": "0x550E526e0787ddB7F64C0E0354ABE1d4F0efb73B",
  //             "IDOFactoryAddress": "0xBdf917b7f06F5436E2981E26A34069B2224964Ac",
  //             "TokenLockerFactoryAddress": "0xaA4076B21D863dEA2f7862879650dD54061cFe01"
  //         }
  //     },
  //     "networks": {
  //         "5": {
  //             "webSocketRPC": "https://goerli.infura.io/v3/"
  //         }
  //     },
  //     "ipfsInfuraDedicatedGateway": "https://swapverse.infura-ipfs.io",
  //     "ipfsInfuraProjectId": "2U4rGAZxnuSMX5OYGJHKhEZQ8qE",
  //     "ipfsInfuraProjectSecret": "c87777ed61adfb004878ce266467ca6d",
  //     "admin": "",
  //     "projectName": "hello",
  //     "logoUrl": "",
  //     "socialLinks": [],
  //     "disableSourceCopyright": false,
  //     "isLockerEnabled": true
  // }

  useEffect(() => {
    const fetchDomainData = async () => {
      setIsDomainDataFetching(true);
      try {
        // const { info, owner } = await storageContract.methods.getData(domain).call();

        const settings = {
          "contracts": {
            chainId: {
              "FeeTokenAddress": networks?.[chainId]?.FeeTokenAddress,
              "IDOFactoryAddress": networks?.[chainId]?.IDOFactoryAddress,
              "TokenLockerFactoryAddress": networks?.[chainId]?.TokenLockerFactoryAddress
            }
          },
          "networks": {
            chainId: {
              "webSocketRPC": networks?.[chainId]?.webSocketRPC
            }
          },
          "ipfsInfuraDedicatedGateway": "https://swapverse.infura-ipfs.io",
          "ipfsInfuraProjectId": "2U4rGAZxnuSMX5OYGJHKhEZQ8qE",
          "ipfsInfuraProjectSecret": "c87777ed61adfb004878ce266467ca6d",
          "admin": "",
          "projectName": "hello",
          "logoUrl": "",
          "socialLinks": [],
          "disableSourceCopyright": false,
          "isLockerEnabled": true
        };
        console.log(settings);

        // const admin = owner === ZERO_ADDRESS ? '' : owner;


        setDomainSettings(settings);

        setIsDomainDataFetched(true);
      } catch (error) {
        console.log('fetchDomainData Error: ', error)
      } finally {
        setIsDomainDataFetching(false);
      }
    }

    if (domain && chainId) {
      fetchDomainData();
    }
  }, [domainDataTrigger, chainId]);

  useEffect(() => {
    if (domainSettings?.admin && account) {
      setIsAdmin(account.toLowerCase() === domainSettings.admin.toLowerCase());
    }

  }, [account, domainSettings]);

  return {
    domain,
    isAdmin,
    domainSettings,
    isDomainDataFetching,
    isDomainDataFetched,

    triggerDomainData,
  };
}
