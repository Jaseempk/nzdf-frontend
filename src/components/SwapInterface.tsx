import { motion } from 'framer-motion';
import { ArrowLeftRight } from 'lucide-react';
import { TokenInput } from './TokenInput';

interface SwapInterfaceProps {
  amount: string;
  setAmount: (value: string) => void;
  selectedToken1: string;
  selectedToken2: string;
}

export function SwapInterface({ amount, setAmount, selectedToken1, selectedToken2 }: SwapInterfaceProps) {
  return (
    <>
      <TokenInput
        value={amount}
        onChange={setAmount}
        token={selectedToken1}
        tokenLogo="https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
      />

      <div className="flex justify-center -my-2 z-10">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          className="bg-pink-500 p-2 rounded-xl shadow-lg"
        >
          <ArrowLeftRight className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      <TokenInput
        token={selectedToken2}
        tokenLogo="https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
        readOnly
      />
    </>
  );
}