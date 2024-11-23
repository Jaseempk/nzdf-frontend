import { useState } from "react";
import { ConnectKitButton } from "connectkit";
import { motion, AnimatePresence } from "framer-motion";
import { SwapInterface } from "./components/SwapInterface";
import { PoolInterface } from "./components/PoolInterface";
import { config } from "./main";
import { useAccount } from "wagmi";
import { SwapButton } from "./components/SwapButton";
import { SuccessModal } from "./components/SuccessModal";
import { VerificationModal } from "./components/VerificationModal";
import { TabSelector } from "./components/TabSelector";
import { VerifyButton } from "./components/VerifyButton";
import { useSwap } from "./hooks/useSwap";
import { useVerification } from "./hooks/useVerification";

function App() {
  const [activeTab, setActiveTab] = useState<"swap" | "pool">("swap");
  const [amount, setAmount] = useState("");
  const [selectedToken1] = useState("ETH");
  const [selectedToken2] = useState("USDC");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [zeroForOne, setZeroForOne] = useState(true);
  const [isExactInput, setIsExactInput] = useState(true);

  const account = useAccount({ config });
  const { swap, isSwapping, lastTxHash } = useSwap(config);
  const { verify, isVerifying, isHuman } = useVerification();

  const handleVerification = async () => {
    if (!account.address) return;
    await verify(account.address);
    setIsModalOpen(true);
  };

  const handleSwap = async () => {
    if (!amount || !isHuman) return;
    try {
      await swap(amount, zeroForOne, isExactInput);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Swap failed:", error);
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
              className="w-full bg-gradient-to-r from-pink-700 to-purple-800 hover:from-pink-600 hover:to-purple-700 text-white py-3 rounded-xl font-medium"
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
            className="w-full bg-gradient-to-r from-pink-700 to-purple-800 hover:from-pink-600 hover:to-purple-700 text-white py-3 rounded-xl font-medium"
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
        <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />

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
                isExactInput={isExactInput}
                setAmount={setAmount}
                selectedToken1={selectedToken1}
                selectedToken2={selectedToken2}
                setZeroForOne={setZeroForOne}
                setIsExactInput={setIsExactInput}
              />
            ) : (
              <PoolInterface />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 space-y-4">
          {!isHuman && account?.isConnected && activeTab === "swap" && (
            <VerifyButton
              isHuman={isHuman}
              isVerifying={isVerifying}
              onVerify={handleVerification}
            />
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
          <VerificationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            isHuman={isHuman}
          />
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
