import { motion } from "framer-motion";

interface VerifyButtonProps {
  isHuman: boolean | null;
  isVerifying: boolean;
  onVerify: () => void;
}

export function VerifyButton({
  isHuman,
  isVerifying,
  onVerify,
}: VerifyButtonProps) {
  return (
    <motion.button
      whileHover={isHuman || isVerifying ? {} : { scale: 1.02 }}
      whileTap={isHuman || isVerifying ? {} : { scale: 0.98 }}
      onClick={isHuman || isVerifying ? undefined : onVerify}
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
  );
}
