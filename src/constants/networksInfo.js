export const networks = {
  // 1: {
  //   name: "Ethereum",
  //   rpc: 'https://rpc.ankr.com/eth',
  //   chainId: 1,
  //   explorer: "https://etherscan.io",
  //   color: "#627EEA",
  //   // storage: "0x5Ae9C7682d42807b01959E52C61CCB8E513a2eaD", // Addition Needs to be done on other chains
  //   multicall: "0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441",
  //   ENSRegistry: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
  //   multiSend: "0xB8906491dba9DFc9fC52758d16C1a70d6A8F71ca", // dummy Address
  //   FeeTokenAddress: "",
  //   IDOFactoryAddress: "",
  //   TokenLockerFactoryAddress: "",
  //   fromBlock: 16669000,
  //   baseCurrency: {
  //     decimals: 18,
  //     name: "ETH",
  //     symbol: "ETH"
  //   },
  //   wrappedToken: {
  //     address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  //     name: "Wrapped Etherer",
  //     symbol: "WETH"
  //   }
  // },
  8453: {
    name: "Base",
    rpc: 'https://developer-access-mainnet.base.org',
    chainId: 8453,
    explorer: "https://basescan.org",
    color: "#627EEA",
    multicall: "0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441",
    ENSRegistry: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e", 
    multiSend: "0xB8906491dba9DFc9fC52758d16C1a70d6A8F71ca", // dummy Address
    FeeTokenAddress: "",
    IDOFactoryAddress: "",
    TokenLockerFactoryAddress: "",
    webSocketRPC: "",
    fromBlock: 0,
    baseCurrency: {
      decimals: 18,
      name: "ETH",
      symbol: "ETH"
    },
    wrappedToken: {
      address: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
      name: "Wrapped Etherer",
      symbol: "WETH"
    }
  },
  84531: {
    name: "Base Testnet",
    rpc: 'https://base-goerli.blockscout.com',
    chainId: 84531,
    explorer: "https://goerli.base.org",
    color: "#627EEA",
    multicall: "0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441",
    ENSRegistry: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    multiSend: "0xB8906491dba9DFc9fC52758d16C1a70d6A8F71ca", // dummy Address
    FeeTokenAddress: "",
    IDOFactoryAddress: "",
    TokenLockerFactoryAddress: "",
    webSocketRPC: "",
    fromBlock: 0,
    baseCurrency: {
      decimals: 18,
      name: "ETH",
      symbol: "ETH"
    },
    wrappedToken: {
      address: "0x4200000000000000000000000000000000000006",
      name: "Wrapped Etherer",
      symbol: "WETH"
    }
  },
  59144: {
    name: "Linea",
    rpc: 'https://rpc.linea.build',
    chainId: 59144,
    explorer: "https://lineascan.build",
    color: "#627EEA",
    multicall: "0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441", // Tampering Needed
    ENSRegistry: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    multiSend: "0xB8906491dba9DFc9fC52758d16C1a70d6A8F71ca", // dummy Address
    FeeTokenAddress: "",
    IDOFactoryAddress: "",
    TokenLockerFactoryAddress: "",
    webSocketRPC: "",
    fromBlock: 0,
    baseCurrency: {
      decimals: 18,
      name: "ETH",
      symbol: "ETH"
    },
    wrappedToken: {
      address: "0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f",
      name: "Wrapped Etherer",
      symbol: "WETH"
    }
  },
  59140: {
    name: "Linea Testnet",
    rpc: 'https://rpc.goerli.linea.build',
    chainId: 59140,
    explorer: "https://goerli.lineascan.build",
    color: "#627EEA",
    multicall: "0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441", // Tampering Needed
    ENSRegistry: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    multiSend: "0xB8906491dba9DFc9fC52758d16C1a70d6A8F71ca", // dummy Address
    FeeTokenAddress: "",
    IDOFactoryAddress: "",
    TokenLockerFactoryAddress: "",
    webSocketRPC: "",
    fromBlock: 0,
    baseCurrency: {
      decimals: 18,
      name: "ETH",
      symbol: "ETH"
    },
    wrappedToken: {
      address: "0x2C1b868d6596a18e32E61B901E4060C872647b6C",
      name: "Wrapped Etherer",
      symbol: "WETH"
    }
  },
  534353: {
    name: "Scroll Alpha Testnet",
    rpc: 'https://alpha-rpc.scroll.io/l2',
    chainId: 534353,
    explorer: "https://alpha-blockscout.scroll.io",
    color: "#627EEA",
    multicall: "0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441", // Tampering Needed
    ENSRegistry: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    multiSend: "0xB8906491dba9DFc9fC52758d16C1a70d6A8F71ca", // dummy Address
    FeeTokenAddress: "",
    IDOFactoryAddress: "",
    TokenLockerFactoryAddress: "",
    webSocketRPC: "",
    fromBlock: 0,
    baseCurrency: {
      decimals: 18,
      name: "ETH",
      symbol: "ETH"
    },
    wrappedToken: {
      address: "0xa1EA0B2354F5A344110af2b6AD68e75545009a03",
      name: "Wrapped Etherer",
      symbol: "WETH"
    }
  },
  // 11155111: {
  //   name: "Sepolia",
  //   rpc: 'https://sepolia.infura.io/v3/',
  //   chainId: 11155111,
  //   explorer: "https://sepolia.etherscan.io",
  //   color: "#627EEA",
  //   storage: "0xF7Dbd865569332dee5ec3d43AC4e9989988cb50e", // Addition Needs to be done on other chains
  //   multicall: "0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441", // Tampering Needed
  //   ENSRegistry: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e", // Tampering Needed
  //   fromBlock: 0,
  //   baseCurrency: {
  //     decimals: 18,
  //     name: "ETH",
  //     symbol: "ETH"
  //   },
  //   wrappedToken: {
  //     address: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
  //     name: "Wrapped Etherer",
  //     symbol: "WETH"
  //   }
  // },
  5: {
    name: "Görli",
    rpc: "https://rpc.ankr.com/eth_goerli",
    chainId: 5,
    explorer: "https://goerli.etherscan.io",
    color: "#f6c343",
    storage: "0x5Ae9C7682d42807b01959E52C61CCB8E513a2eaD", // Addition Needs to be done on other chains
    multicall: "0xFD4e092227e876dD8F2d036FA8fEB23F8A7F94ca",
    ENSRegistry: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    multiSend: "0x0019A5B90308A6f0ccC9fA1Bd113bB8257231a7b",
    FeeTokenAddress: "0x550E526e0787ddB7F64C0E0354ABE1d4F0efb73B",
    IDOFactoryAddress: "0xBdf917b7f06F5436E2981E26A34069B2224964Ac",
    TokenLockerFactoryAddress: "0xaA4076B21D863dEA2f7862879650dD54061cFe01",
    webSocketRPC: "https://ethereum-goerli.publicnode.com",
    fromBlock: 8385000,
    baseCurrency: {
      decimals: 18,
      name: "ETH",
      symbol: "ETH"
    },
    wrappedToken: {
      address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
      name: "Wrapped Ether",
      symbol: "WETH"
    }
  },
  // 56: {
  //   name: "BSC",
  //   rpc: "https://bscrpc.com/",
  //   chainId: 56,
  //   explorer: "https://bscscan.com",
  //   color: "#CC9B00",
  //   storage: "0xa7472f384339D37EfE505a1A71619212495A973A",
  //   multicall: "0x41263cBA59EB80dC200F3E2544eda4ed6A90E76C",
  //   fromBlock: 25825000,
  //   baseCurrency: {
  //     decimals: 18,
  //     name: "BNB",
  //     symbol: "BNB"
  //   },
  //   wrappedToken: {
  //     address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  //     name: "Wrapped BNB",
  //     symbol: "WBNB"
  //   }
  // },
  // 97: {
  //   name: "BSC Testnet",
  //   rpc: "https://data-seed-prebsc-2-s3.binance.org:8545",
  //   chainId: 97,
  //   explorer: "https://testnet.bscscan.com/",
  //   color: "#CC9B00",
  //   multicall: "0x6e5BB1a5Ad6F68A8D7D6A5e47750eC15773d6042",
  //   fromBlock: 27113000,
  //   baseCurrency: {
  //     decimals: 18,
  //     name: "BNB",
  //     symbol: "BNB"
  //   },
  //   wrappedToken: {
  //     address: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
  //     name: "Wrapped BNB",
  //     symbol: "WBNB"
  //   }
  // },
}

export const chainRouter = {
  1: [
    {
      name: "Uniswap",
      FACTORY: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
      WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      ROUTER: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    },
  ],
  5: [
    {
      name: "Uniswap",
      FACTORY: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
      WETH: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
      ROUTER: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    },
  ],
  11155111: [
    {
      name: "Uniswap",
      FACTORY: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
      WETH: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
      ROUTER: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    },
  ],
  56: [
    {
      name: "PancakeSwap",
      FACTORY: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
      WETH: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      ROUTER: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
    },
  ],
  97: [
    {
      name: "PancakeSwap",
      FACTORY: "0x6725F303b657a9451d8BA641348b6761A6CC7a17",
      WETH: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
      ROUTER: "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
    },
  ],
};


export default {
  chainRouter,
  networks,
}
