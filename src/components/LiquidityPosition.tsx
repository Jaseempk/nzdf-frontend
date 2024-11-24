import { motion } from "framer-motion";
import type { LiquidityPosition as LiquidityPositionType } from "../lib/supabase";

interface LiquidityPositionProps {
  position: LiquidityPositionType;
}

export function LiquidityPosition({ position }: LiquidityPositionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors duration-200"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-sm text-gray-400">Tick Range</span>
          <p className="text-white font-medium">
            {position.tickLower} → {position.tickUpper}
          </p>
        </div>
        <div>
          <span className="text-sm text-gray-400">Liquidity</span>
          <p className="text-white font-medium">
            {position.liquidityDelta.toExponential(2)}
          </p>
        </div>
        <div>
          <span className="text-sm text-gray-400">ETH Amount</span>
          <p className="text-white font-medium">{position.ethAmount} ETH</p>
        </div>
        <div>
          <span className="text-sm text-gray-400">Added</span>
          <p className="text-white font-medium">
            {new Date(position.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
