import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

interface LiquidityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (params: {
    tickLower: number;
    tickUpper: number;
    liquidityDelta: number;
    ethAmount: number;
  }) => void;
}

export function LiquidityModal({
  isOpen,
  onClose,
  onSubmit,
}: LiquidityModalProps) {
  const [params, setParams] = useState({
    tickLower: -120,
    tickUpper: 120,
    liquidityDelta: 0,
    ethAmount: 0.001,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(params);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-white/10"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">
                Add Liquidity
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

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Tick Lower
                </label>
                <input
                  type="number"
                  value={params.tickLower}
                  onChange={(e) =>
                    setParams({ ...params, tickLower: Number(e.target.value) })
                  }
                  className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Tick Upper
                </label>
                <input
                  type="number"
                  value={params.tickUpper}
                  onChange={(e) =>
                    setParams({ ...params, tickUpper: Number(e.target.value) })
                  }
                  className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Liquidity Delta
                </label>
                <input
                  type="number"
                  placeholder="Liquidity to add"
                  onChange={(e) =>
                    setParams({
                      ...params,
                      liquidityDelta: Number(e.target.value),
                    })
                  }
                  className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  ETH Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Call value"
                  onChange={(e) =>
                    setParams({ ...params, ethAmount: Number(e.target.value) })
                  }
                  className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-medium mt-6"
              >
                Confirm
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
