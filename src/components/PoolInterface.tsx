import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { LiquidityModal } from "./LiquidityModal";
import { LiquidityPosition } from "./LiquidityPosition";

export function PoolInterface() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [positions, setPositions] = useState<
    Array<{
      tickLower: number;
      tickUpper: number;
      liquidityDelta: number;
      ethAmount: number;
      timestamp: number;
    }>
  >([]);

  const handleAddLiquidity = async (params: {
    tickLower: number;
    tickUpper: number;
    liquidityDelta: number;
    ethAmount: number;
  }) => {
    try {
      // Here you would call your contract function
      // modifyLiquidityRouter.modifyLiquidity{value: params.ethAmount * 1e18}(
      //   key,
      //   IPoolManager.ModifyLiquidityParams({
      //     tickLower: params.tickLower,
      //     tickUpper: params.tickUpper,
      //     liquidityDelta: params.liquidityDelta * 1e9,
      //     salt: 0
      //   }),
      //   new bytes(0)
      // );

      // For now, we'll just add it to our local state
      setPositions([
        ...positions,
        {
          ...params,
          timestamp: Date.now(),
        },
      ]);
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
          {positions.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No liquidity positions found
            </div>
          ) : (
            positions.map((position, index) => (
              <LiquidityPosition key={index} position={position} />
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
