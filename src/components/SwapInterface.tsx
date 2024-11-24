import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";
import { TokenInput } from "./TokenInput";

interface SwapInterfaceProps {
  amount: string;
  setAmount: (value: string) => void;
  selectedToken1: string;
  selectedToken2: string;
  setZeroForOne: (value: boolean) => void;
}

export function SwapInterface({
  amount,
  setAmount,
  selectedToken1,
  selectedToken2,
  setZeroForOne,
}: SwapInterfaceProps) {
  const [isTopToken1, setIsTopToken1] = useState(true);
  const [topAmount, setTopAmount] = useState("");
  const [bottomAmount, setBottomAmount] = useState("");
  const [isExactInput, setIsExactInput] = useState(true);
  const [ethPrice, setEthPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );
        const data = await response.json();
        setEthPrice(data.ethereum.usd);
      } catch (error) {
        console.error("Failed to fetch ETH price:", error);
        setEthPrice(2000); // Fallback price if API fails
      }
    };

    fetchEthPrice();
    const interval = setInterval(fetchEthPrice, 60000); // Update price every minute

    return () => clearInterval(interval);
  }, []);

  const handleSwapToggle = () => {
    setIsTopToken1(!isTopToken1);
    setZeroForOne(!isTopToken1);
    // Reset both input fields
    setTopAmount("");
    setBottomAmount("");
    setAmount("");
  };

  const handleTopAmountChange = (value: string) => {
    setIsExactInput(true);
    setTopAmount(value);
    setAmount(value);

    if (value === "") {
      setBottomAmount("");
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue) || !ethPrice) return;

    const convertedAmount = isTopToken1
      ? (numValue * ethPrice).toFixed(2)
      : (numValue / ethPrice).toFixed(6);

    setBottomAmount(convertedAmount);
  };

  const handleBottomAmountChange = (value: string) => {
    setIsExactInput(false);
    setBottomAmount(value);
    setAmount(value);

    if (value === "") {
      setTopAmount("");
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue) || !ethPrice) return;

    const convertedAmount = isTopToken1
      ? (numValue / ethPrice).toFixed(6)
      : (numValue * ethPrice).toFixed(2);

    setTopAmount(convertedAmount);
  };

  // Update amounts when external amount prop changes
  useEffect(() => {
    if (amount !== topAmount && amount !== bottomAmount) {
      setTopAmount(amount);
      if (amount && ethPrice) {
        const numValue = parseFloat(amount);
        const convertedAmount = isTopToken1
          ? (numValue * ethPrice).toFixed(2)
          : (numValue / ethPrice).toFixed(6);
        setBottomAmount(convertedAmount);
      } else {
        setBottomAmount("");
      }
    }
  }, [amount, isTopToken1, ethPrice]);

  return (
    <>
      <TokenInput
        value={topAmount}
        onChange={handleTopAmountChange}
        token={isTopToken1 ? selectedToken1 : selectedToken2}
        tokenLogo={isTopToken1 ? "/images/ETH.png" : "/images/USDC.png"}
        isError={!isExactInput && topAmount !== ""}
      />

      <div className="flex justify-center -my-2 z-10">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          className="bg-pink-500 p-2 rounded-xl shadow-lg"
          onClick={handleSwapToggle}
        >
          <ArrowLeftRight className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      <TokenInput
        value={bottomAmount}
        onChange={handleBottomAmountChange}
        token={!isTopToken1 ? selectedToken1 : selectedToken2}
        tokenLogo={!isTopToken1 ? "/images/ETH.png" : "/images/USDC.png"}
      />

      {(topAmount || bottomAmount) && ethPrice && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 px-2 py-1 bg-white/5 rounded-lg"
        >
          <div className="text-sm text-gray-400 flex justify-between items-center">
            <span>Rate</span>
            <span>
              1 {isTopToken1 ? selectedToken1 : selectedToken2} ={" "}
              {ethPrice.toFixed(2)}{" "}
              {!isTopToken1 ? selectedToken1 : selectedToken2}
            </span>
          </div>
        </motion.div>
      )}
    </>
  );
}
