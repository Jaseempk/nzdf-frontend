import { motion } from "framer-motion";

interface SwapButtonProps {
  onSwap: () => void;
  isLoading?: boolean;
}

export function SwapButton({ onSwap, isLoading }: SwapButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSwap}
      disabled={isLoading}
      className="w-full bg-gradient-to-r from-pink-700 to-purple-800 hover:from-pink-600 hover:to-purple-700 text-white py-3 rounded-xl font-medium relative overflow-hidden transition-all duration-200"
    >
      <div className="flex items-center justify-center space-x-2">
        <span>{isLoading ? "Swapping..." : "Swap Tokens"}</span>
      </div>
      {isLoading && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-white"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
}
