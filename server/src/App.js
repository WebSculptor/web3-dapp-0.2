import React, { useState } from "react";
import { ethers } from "ethers";

import CONTRACT_ABI from "./abi.json";
import toast from "react-hot-toast";

const CONTRACT_ADDRESS = "0xeD802ee96c58141D744865301A7145D882C4254D";
const SIMPLE_REGISTRY = "0x48F99db81f3f75E3a856D71bd38Afc745881eb00";

export default function App() {
  const { Contract, BrowserProvider } = ethers;

  // connectWallet
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isConnectionLoading, setIsConnectionLoading] = useState(false);

  // updateName
  const [userName, setUserName] = useState("");
  const [isUploadingName, setIsUploadingName] = useState(false);

  // updateAge
  const [userAge, setUserAge] = useState("");
  const [isUploadingAge, setIsUploadingAge] = useState(false);

  // getEntity
  const [fetchedName, setFetchedName] = useState("");
  const [fetchedAge, setFetchedAge] = useState("");
  const [isFetchingEntity, setisFetchingEntity] = useState(false);

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function connectWallet() {
    setIsConnectionLoading(true);
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      try {
        await requestAccount();
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        setIsWalletConnected(true);
        toast.success("Connected successfully");
      } catch (error) {
        toast.error("Could not connect wallet");
        setIsWalletConnected(false);
      } finally {
        setIsConnectionLoading(false);
      }
    } else {
      toast.error("Please install MetaMask!");
      setIsConnectionLoading(false);
    }
  }

  async function updateName() {
    try {
      setIsUploadingName(true);

      await requestAccount();
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const transaction = await contract.updateName(userName);
      await transaction.wait();
      toast.success("Uploaded successfully");
      setUserName("");
    } catch (error) {
      toast.error("Could not upload name");
    } finally {
      setIsUploadingName(false);
    }
  }

  async function updateAge() {
    try {
      setIsUploadingAge(true);

      await requestAccount();
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const transaction = await contract.updateName(userAge);
      await transaction.wait();
      toast.success("Uploaded successfully");
      setUserAge("");
    } catch (error) {
      toast.error("Could not upload age");
    } finally {
      setIsUploadingAge(false);
    }
  }

  async function getEntityDetails() {
    try {
      setisFetchingEntity(true);

      await requestAccount();
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(SIMPLE_REGISTRY, CONTRACT_ABI, signer);

      const { name, age } = await contract.getEntityDetails();
      setFetchedName(name);
      setFetchedAge(age);
      toast.success("Uploaded successfully");
    } catch (error) {
      console.error("Error in getEntityDetails:", error); // Added error logging
      toast.error("Could not get details");
    } finally {
      setisFetchingEntity(false);
    }
  }

  return (
    <div className="p-6">
      {!isWalletConnected ? (
        <button
          className="middle none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-light="true"
          onClick={connectWallet}
          disabled={isConnectionLoading}>
          {isConnectionLoading ? "Connecting..." : "Connect Wallet"}
        </button>
      ) : (
        <div className="max-w-lg w-full p-6 rounded-lg bg-white">
          <div className="flex flex-col">
            <div className="flex items-center justify-center">
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  placeholder=""
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  autoComplete="false"
                  className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                />
                <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[13px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Enter your Name
                </label>
              </div>
            </div>
            <button
              className="middle none mt-6 rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
              onClick={updateName}
              disabled={isUploadingName}>
              {isUploadingName ? "Uploading..." : "Upload Name"}
            </button>
          </div>
          <div className="flex flex-col mt-6">
            <div className="flex items-center justify-center">
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  placeholder=""
                  value={userAge}
                  onChange={(e) => setUserAge(e.target.value)}
                  autoComplete="false"
                  className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                />
                <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[13px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Enter your Age
                </label>
              </div>
            </div>
            <button
              className="middle none mt-6 rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
              onClick={updateAge}
              disabled={isUploadingAge}>
              {isUploadingAge ? "Uploading..." : "Upload Age"}
            </button>
          </div>
          <div className="flex flex-col mt-6">
            <button
              className="middle none mt-6 rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
              onClick={getEntityDetails}
              disabled={isFetchingEntity}>
              {isFetchingEntity ? "Please Wait..." : "Get Entity"}
            </button>
          </div>

          {fetchedName && fetchedAge && (
            <div className="mt-6">
              <p>{fetchedName}</p> is {fetchedAge} years old
            </div>
          )}
        </div>
      )}
    </div>
  );
}
