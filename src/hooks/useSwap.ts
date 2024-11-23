import { useState } from "react";
import { writeContract, simulateContract } from "@wagmi/core";
import { parseEther } from "viem";
import { abi, routerAddress } from "../../abis/routerAbi";
import { Config } from "wagmi";

export function useSwap(config: Config) {
  const [isSwapping, setIsSwapping] = useState(false);
  const [lastTxHash, setLastTxHash] = useState<string>();

  const swap = async (amount: string) => {
    if (!amount) return;

    setIsSwapping(true);
    try {
      const { request } = await simulateContract(config, {
        abi,
        address: routerAddress,
        functionName: "swap",
        args: [],
        value: parseEther(amount.toString()),
      });

      const hash = await writeContract(config, request);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLastTxHash(hash);
      return hash;
    } catch (error) {
      console.error("Swap failed:", error);
      throw error;
    } finally {
      setIsSwapping(false);
    }
  };

  return {
    swap,
    isSwapping,
    lastTxHash,
  };
}
