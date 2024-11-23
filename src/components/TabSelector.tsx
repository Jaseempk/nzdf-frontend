import { motion } from "framer-motion";
import { Settings } from "lucide-react";

interface TabSelectorProps {
  activeTab: "swap" | "pool";
  onTabChange: (tab: "swap" | "pool") => void;
}

export function TabSelector({ activeTab, onTabChange }: TabSelectorProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTabChange("swap")}
          className={`px-4 py-2 rounded-xl ${
            activeTab === "swap" ? "bg-pink-500 text-white" : "text-gray-400"
          }`}
        >
          Swap
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTabChange("pool")}
          className={`px-4 py-2 rounded-xl ${
            activeTab === "pool" ? "bg-pink-500 text-white" : "text-gray-400"
          }`}
        >
          Pool
        </motion.button>
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-2 rounded-lg hover:bg-white/10"
      >
        <Settings className="w-5 h-5 text-gray-400" />
      </motion.button>
    </div>
  );
}
