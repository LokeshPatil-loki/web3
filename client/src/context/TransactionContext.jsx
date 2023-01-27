import { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = createContext();

const { ethereum } = window;

const getEtheriumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({addressTo: '', amount: '', keyword: '', message: ''});
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevState) => ({...prevState, [name]: value}));
  }

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        // getAllTransaction();
      } else {
        console.log("No accounts found");
      }

      console.log(accounts);
    } catch (error) {
      console.log(error);
      throw new Error("No etherium Object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);


  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts);
    } catch (error) {
      console.log(error);
      throw new Error("No etherium Object");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const {addressTo, amount, keyword, message} = formData;
      const transactionContract = getEtheriumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: '0x5208', // 2100 GWEI
          value: parsedAmount._hex,
        }]
      });

      const transactionHash = await transactionContract.addToBlockchain(addressTo,parsedAmount,message,keyword);
      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      console.log(`Success - ${transactionHash.hash}`);
      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <TransactionContext.Provider value={{ connectWallet , currentAccount, formData, handleChange, sendTransaction}}>{children}</TransactionContext.Provider>
  );
};
