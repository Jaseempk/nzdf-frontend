import React, { useState } from "react";
import { ConnectKitButton } from "connectkit";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X } from "lucide-react";
import { SwapInterface } from "./components/SwapInterface";
import { PoolInterface } from "./components/PoolInterface";
import { config } from "./main";
import { useAccount } from "wagmi";
import { writeContract, simulateContract, readContract } from "@wagmi/core";
import { parseEther } from "viem";
import { SwapButton } from "./components/SwapButton";
import { SuccessModal } from "./components/SuccessModal";
import { abi, routerAddress } from "../abis/routerAbi";
function App() {
  const [isVerified, setIsVerified] = useState(false);
  const [isHuman, setIsHuman] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<"swap" | "pool">("swap");
  const [amount, setAmount] = useState("");
  const [selectedToken1] = useState("ETH");
  const [selectedToken2] = useState("USDC");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastTxHash, setLastTxHash] = useState<string>();
  const [zeroForOne, setZeroForOne] = useState(true);

  const account = useAccount({ config });
  const address = account.address;

  const swapRouter = "0x96E3495b712c6589f1D2c50635FDE68CF17AC83c";

  const handleVerification = async () => {
    setIsVerifying(true);
    const response = await fetch(
      `https://api.talentprotocol.com/api/v2/passports/${address}`,
      {
        method: "GET",
        headers: {
          "x-api-key":
            "aa96ca991e7766834efe5e4caee803866a1c67dad2d11016b11d56f77a1a",
        },
      }
    );
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const data = await response?.json();
    const identityScore = data?.passport?.identity_score || 0;

    await new Promise((resolve) => setTimeout(resolve, 5000));
    setIsHuman(identityScore > 9);
    setIsModalOpen(true);
    setIsVerifying(false);
  };

  const handleSwap = async () => {
    if (!amount || !isHuman) return;

    setIsSwapping(true);
    try {
      const { request } = await simulateContract(config, {
        abi,
        address: routerAddress,
        functionName: "swap",
        args: [],
        value: parseEther(amount.toString()),
      });

      // Write to contract and wait for transaction
      const hash = await writeContract(config, request);
      // Here you would call your contract's swap function
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating transaction
      setLastTxHash(hash); // Replace with actual tx hash
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Swap failed:", error);
    } finally {
      setIsSwapping(false);
    }
  };

  const calculateFee = () => {
    return isHuman ? "0.3%" : "3%";
  };

  const renderActionButton = () => {
    if (activeTab === "pool") {
      return (
        <ConnectKitButton.Custom>
          {({ isConnected, show, truncatedAddress, ensName }) => (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={show}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-medium"
            >
              {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
            </motion.button>
          )}
        </ConnectKitButton.Custom>
      );
    }

    return account?.isConnected && isHuman ? (
      <SwapButton onSwap={handleSwap} isLoading={isSwapping} />
    ) : (
      <ConnectKitButton.Custom>
        {({ isConnected, show, truncatedAddress, ensName }) => (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={show}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-medium"
          >
            {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
          </motion.button>
        )}
      </ConnectKitButton.Custom>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-black/40 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("swap")}
              className={`px-4 py-2 rounded-xl ${
                activeTab === "swap"
                  ? "bg-pink-500 text-white"
                  : "text-gray-400"
              }`}
            >
              Swap
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("pool")}
              className={`px-4 py-2 rounded-xl ${
                activeTab === "pool"
                  ? "bg-pink-500 text-white"
                  : "text-gray-400"
              }`}
            >
              Pool
            </motion.button>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg hover:bg-white/10"
          >
            <Settings className="w-5 h-5 text-gray-400" />
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {activeTab === "swap" ? (
              <SwapInterface
                amount={amount}
                zeroForOne={zeroForOne}
                setAmount={setAmount}
                selectedToken1={selectedToken1}
                selectedToken2={selectedToken2}
                setZeroForOne={setZeroForOne}
              />
            ) : (
              <PoolInterface />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 space-y-4">
          {!isVerified && account?.isConnected && activeTab === "swap" && (
            <motion.button
              whileHover={isHuman || isVerifying ? {} : { scale: 1.02 }}
              whileTap={isHuman || isVerifying ? {} : { scale: 0.98 }}
              onClick={isHuman || isVerifying ? undefined : handleVerification}
              className={`w-full ${
                isHuman
                  ? "bg-green-500 cursor-default"
                  : isVerifying
                  ? "bg-blue-500 cursor-wait"
                  : "bg-blue-500 cursor-pointer"
              } text-white py-3 rounded-xl font-medium relative overflow-hidden`}
              disabled={isHuman === true || isVerifying}
            >
              {isHuman
                ? "Personhood Verified"
                : isVerifying
                ? "Verifying..."
                : "Verify Personhood"}
              {isVerifying && (
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>
          )}

          {renderActionButton()}
        </div>

        {amount && activeTab === "swap" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-white/5 rounded-xl"
          >
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Fee Rate</span>
              <span className="text-white">{calculateFee()}</span>
            </div>
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gradient-to-br from-purple-800 to-pink-600 p-6 rounded-2xl shadow-lg max-w-md w-full mx-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">
                  Verification Result
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="text-center">
                {isHuman === null ? (
                  <p className="text-white text-lg">Verifying...</p>
                ) : isHuman ? (
                  <div>
                    <p className="text-white text-lg mb-2">Congratulations!</p>
                    <p className="text-green-300">
                      You have been verified as human.
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-white text-lg mb-2">
                      Verification Failed
                    </p>
                    <p className="text-red-300">Unable to verify as human.</p>
                  </div>
                )}
              </div>
              <motion.div
                className="mt-6 h-2 bg-white/20 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2 }}
              >
                <motion.div
                  className="h-full bg-green-400"
                  initial={{ width: 0 }}
                  animate={{ width: isHuman ? "100%" : "0%" }}
                  transition={{ duration: 1, delay: 1 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccessModal && (
          <SuccessModal
            isOpen={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
            txHash={lastTxHash}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
