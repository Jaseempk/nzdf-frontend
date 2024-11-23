import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";
import { TokenInput } from "./TokenInput";

interface SwapInterfaceProps {
  amount: string;
  zeroForOne: boolean;
  setAmount: (value: string) => void;
  selectedToken1: string;
  selectedToken2: string;
  setZeroForOne: (value: boolean) => void;
}

export function SwapInterface({
  amount,
  zeroForOne,
  setAmount,
  selectedToken1,
  selectedToken2,
  setZeroForOne,
}: SwapInterfaceProps) {
  const [isTopToken1, setIsTopToken1] = useState(true);

  const handleSwapToggle = () => {
    setIsTopToken1(!isTopToken1);
    setZeroForOne(!isTopToken1);
  };

  return (
    <>
      <TokenInput
        value={isTopToken1 ? amount : ""}
        onChange={isTopToken1 ? setAmount : undefined}
        token={isTopToken1 ? selectedToken1 : selectedToken2}
        tokenLogo={
          isTopToken1
            ? "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
            : "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
        }
        readOnly={!isTopToken1}
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
        value={!isTopToken1 ? amount : ""}
        onChange={!isTopToken1 ? setAmount : undefined}
        token={!isTopToken1 ? selectedToken1 : selectedToken2}
        tokenLogo={
          !isTopToken1
            ? "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
            : "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
        }
        readOnly={isTopToken1}
      />
    </>
  );
}
