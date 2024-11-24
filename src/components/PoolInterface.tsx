import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { LiquidityModal } from "./LiquidityModal";
import { LiquidityPosition as Position } from "./LiquidityPosition";
import { useLiquidityPositions } from "../hooks/userLiquidityPositions";
import { useAccount } from "wagmi";

export function PoolInterface() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { address } = useAccount();
  const { positions, loading, error, addPosition } =
    useLiquidityPositions(address);

  const handleAddLiquidity = async (params: {
    tickLower: number;
    tickUpper: number;
    liquidityDelta: number;
    ethAmount: number;
  }) => {
    try {
      if (!address) throw new Error("Wallet not connected");

      // Here you would call your contract function
      // await modifyLiquidityRouter.modifyLiquidity...

      // Store in Supabase
      await addPosition({
        address,
        ...params,
      });
    } catch (error) {
      console.error("Failed to add liquidity:", error);
    }
  };

  return (
    <>
      <div className="bg-white/5 p-4 rounded-2xl space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Your Liquidity</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-1 bg-pink-500 px-3 py-1 rounded-xl text-white"
          >
            <Plus className="w-4 h-4" />
            <span>Add Liquidity</span>
          </motion.button>
        </div>

        <div className="space-y-3">
          {loading ? (
            <div className="text-center text-gray-500 py-8">
              Loading positions...
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : positions.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No liquidity positions found
            </div>
          ) : (
            positions.map((position) => (
              <Position key={position.id} position={position} />
            ))
          )}
        </div>
      </div>

      <LiquidityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddLiquidity}
      />
    </>
  );
}
