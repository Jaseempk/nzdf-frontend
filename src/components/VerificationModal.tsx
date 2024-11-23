import { motion } from "framer-motion";
import { X } from "lucide-react";

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  isHuman: boolean | null;
}

export function VerificationModal({
  isOpen,
  onClose,
  isHuman,
}: VerificationModalProps) {
  if (!isOpen) return null;

  return (
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
          <h2 className="text-2xl font-bold text-white">Verification Result</h2>
          <button onClick={onClose} className="text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="text-center">
          {isHuman === null ? (
            <p className="text-white text-lg">Verifying...</p>
          ) : isHuman ? (
            <div>
              <p className="text-white text-lg mb-2">Congratulations!</p>
              <p className="text-green-300">You have been verified as human.</p>
            </div>
          ) : (
            <div>
              <p className="text-white text-lg mb-2">Verification Failed</p>
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
  );
}
