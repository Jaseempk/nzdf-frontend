import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  txHash?: string;
}

export function SuccessModal({ isOpen, onClose, txHash }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-black/40 backdrop-blur-md rounded-2xl p-6 w-full max-w-md border border-white/10 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">
            Transaction Successful
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5 text-gray-400" />
          </motion.button>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center"
          >
            <Check className="w-8 h-8 text-white" />
          </motion.div>

          <p className="text-white text-center">
            Your swap has been completed successfully!
          </p>

          {txHash && (
            <a
              href={`https://etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-400 text-sm underline"
            >
              View on Etherscan
            </a>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-medium mt-6"
        >
          Close
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
