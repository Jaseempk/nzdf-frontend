import { useState, useEffect } from "react";
import { supabase, LiquidityPosition } from "../lib/supabase";

export function useLiquidityPositions(address: string | undefined) {
  const [positions, setPositions] = useState<LiquidityPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) return;

    const fetchPositions = async () => {
      try {
        const { data, error } = await supabase
          .from("liquidity_positions")
          .select("*")
          .eq("address", address)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setPositions(data || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch positions"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();

    // Subscribe to changes
    const subscription = supabase
      .channel("liquidity_positions")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "liquidity_positions",
          filter: `address=eq.${address}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setPositions((prev) => [payload.new as LiquidityPosition, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [address]);

  const addPosition = async (
    params: Omit<LiquidityPosition, "id" | "created_at">
  ) => {
    try {
      const { error } = await supabase
        .from("liquidity_positions")
        .insert([params]);

      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add position");
      throw err;
    }
  };

  return { positions, loading, error, addPosition };
}
