import { useState } from "react";
import { writeContract, simulateContract } from "@wagmi/core";
import { parseEther } from "viem";
import { abi, routerAddress } from "../../abis/routerAbi";
import { Config } from "wagmi";
import { usdcAbi, usdcAddress } from "../../abis/erc20Abi";

export function useSwap(config: Config) {
  const [isSwapping, setIsSwapping] = useState(false);
  const [lastTxHash, setLastTxHash] = useState<string>();

  const HOOK_ADDRESS = "0x9D8fEaDBdA9A0a87378C87eAB794151f3e7774c0";
  const TOKEN0_ADDRESS = "0x0000000000000000000000000000000000000000";
  const TOKEN1_ADDRESS = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
  const MIN_PRICE_LIMIT = BigInt("79228162514264337593543950337");

  const swap = async (
    amount: string,
    zeroForOne: boolean,
    isExactInput: boolean
  ) => {
    if (!amount) return;

    // Prepare swap parameters
    const poolKey = {
      currency0: TOKEN0_ADDRESS,
      currency1: TOKEN1_ADDRESS,
      fee: 0,
      tickSpacing: -120,
      hooks: HOOK_ADDRESS,
    };

    const testSettings = {
      takeClaims: true,
      settleUsingBurn: true,
    };

    const hookData = "0x";
    const swapParams = {
      zeroForOne: zeroForOne,
      amountSpecified: parseEther(amount.toString()), // -1e18
      sqrtPriceLimitX96: MIN_PRICE_LIMIT, // Since zeroForOne is true
    };
    console.log("amount:", amount);
    const precisionAdjustedAmount = Number(amount) * 1000000;

    if (!zeroForOne) {
      console.log("zeroFOrOne:", zeroForOne);
      const { request } = await simulateContract(config, {
        abi: usdcAbi,
        address: usdcAddress,
        functionName: "approve",
        args: [routerAddress, precisionAdjustedAmount],
      });

      const hash = await writeContract(config, request);

      console.log("hash:", hash);
    }

    setIsSwapping(true);
    try {
      const { request } = await simulateContract(config, {
        abi,
        address: routerAddress,
        functionName: "swap",
        args: [poolKey, swapParams, testSettings, hookData],
        value: zeroForOne ? parseEther(amount.toString()) : parseEther(""),
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
