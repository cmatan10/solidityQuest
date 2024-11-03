import { createContext, useState, useEffect } from 'react';
import Web3 from 'web3';
import gameABI from '../interfaces/GameFactory.json';
import nftABI from '../interfaces/NFTbadge';

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [Chain, setChain] = useState('');
  const [factoryContract, setFactoryContract] = useState(null);
  const [nftContract, setNftContract] = useState(null);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      setWeb3(new Web3(window.ethereum));
    }
  }, []);
  const contractAddresses = {
    1440002: { // Xrp network
      gameAddress: '0xa7169fDC282c990b510E2d6428bBC0ED1F7f1EfE',
      nftAddress: '0x1319a2fff9189496b5420256a0b19bBD36aed6eB',
    },
    80002: { // Amoy network
      gameAddress: '0x41Ba2b107DF51e61519b7b975a25bC4DF7eD5D06',
      nftAddress: '0xdcc35Acb1E9947441010780f83d2b94Df622aC48',
    },
    11155111: { // Sepolia network
      gameAddress: '0x0f5841D53526aBdF15ef77c790aCd7839D86D9d0',
      nftAddress: '0x82FE6A93BA6EC6859e44aB30A7d7ff843e3e60ba',
    },
  };

  const switchChain = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${(11155111).toString(16)}` }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        console.log('This chain does not exist on the user wallet.');
      } else {
        console.error('Switch Chain Error:', switchError);
      }
    }
  };

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });
        const chainId = parseInt(window.ethereum.chainId, 16);
        setChain(chainId);
        setWalletAddress(accounts[0] || '');
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (Chain) {
      const addresses = contractAddresses[Chain];
      if (addresses) {
        const gameContract = new web3.eth.Contract(gameABI, addresses.gameAddress);
        const nftContractInstance = new web3.eth.Contract(nftABI, addresses.nftAddress);
        console.log('gameContract:', gameContract);
        console.log('nftContractInstance:', nftContractInstance);
        setFactoryContract(gameContract);
        setNftContract(nftContractInstance);
      } else {
        console.log(`No contract addresses available for chain ID: ${Chain}`);
      }
    }
  }, [Chain]);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });
        const chainId = parseInt(window.ethereum.chainId, 16);
        setChain(chainId);
        setWalletAddress(accounts[0] || '');
      }
    };
    init();
  }, []);

  useEffect(() => {
    const handleAccountsChanged = async (accounts) => {
      console.log(accounts);
      console.log(accounts[0]);
      setWalletAddress(accounts[0]);
    };

    const handleChainChanged = (chainId) => {
      const decimalChainId = parseInt(chainId, 16);
      setChain(decimalChainId);
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  useEffect(() => {
    if (walletAddress) {
      localStorage.setItem('walletAddress', walletAddress);
    }
  }, [walletAddress]);

  const requestAccount = async () => {
    console.log('Requesting account...');
    if (window.ethereum) {
      const chainId = parseInt(window.ethereum.chainId, 16);
      setChain(chainId);
      console.log(chainId);

      if (chainId !== 80002 && chainId !== 1440002 && chainId !== 11155111) {
        await switchChain();
      }

      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const finalMint = async () => {
    try {
      await nftContract.methods.finalMint().send({
        from: walletAddress,
      })
        .once('error', (err) => {
          console.log(err);
        })
        .once('receipt', async () => {
          const balance = await nftContract.methods.balanceOf(walletAddress, 18).call();
          console.log(balance);
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Web3Context.Provider value={{ Chain, walletAddress, factoryContract, nftContract, web3, requestAccount, finalMint }}>
      {children}
    </Web3Context.Provider>
  );
};
