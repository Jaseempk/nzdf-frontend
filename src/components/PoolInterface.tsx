import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export function PoolInterface() {
  return (
    <div className="bg-white/5 p-4 rounded-2xl space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-400">Your Liquidity</span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-1 bg-pink-500 px-3 py-1 rounded-xl text-white"
        >
          <Plus className="w-4 h-4" />
          <span>Add Liquidity</span>
        </motion.button>
      </div>
      <div className="text-center text-gray-500 py-8">
        No liquidity positions found
      </div>
    </div>
  );
}