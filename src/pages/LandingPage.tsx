import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FeatureIcon } from "../components/FeatureIcon";

type Feature = {
  icon: "dynamic-fee" | "bot-protection" | "optimized-returns";
  title: string;
  description: string;
};

export function Landing() {
  const features: Feature[] = [
    {
      icon: "dynamic-fee",
      title: "Dynamic Fee System",
      description:
        "Automatically adjusts fees based on market volatility and trader behavior, protecting LPs while ensuring fair pricing for regular traders",
    },
    {
      icon: "bot-protection",
      title: "Bot Protection",
      description:
        "Implements higher fees for detected bot activity while maintaining low fees for verified human traders",
    },
    {
      icon: "optimized-returns",
      title: "Optimized Returns",
      description:
        "Maximizes LP returns through smart fee distribution and protection against toxic order flow",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 px-4 py-16">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto text-center mb-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-8 font-space gradient-text"
        >
          NezlobinDEX
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Experience DeFi trading with dynamic fees, bot protection, and
          optimized returns for liquidity providers
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            to="/app"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl text-white font-medium hover:from-pink-600 hover:to-purple-600 transition-all duration-200"
          >
            Launch App
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto mb-20">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-bold text-center mb-12 text-white"
        >
          Revolutionary Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
              className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10"
            >
              <div className="flex justify-center mb-4">
                <FeatureIcon type={feature.icon} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-6xl mx-auto mb-20">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-bold text-center mb-12 text-white"
        >
          How It Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              For Traders
            </h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Connect your wallet and verify your personhood
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Enjoy lower fees as a verified human trader
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Access deep liquidity and optimal pricing
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              For Liquidity Providers
            </h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Provide liquidity with enhanced protection
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Earn higher fees from bot transactions
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Benefit from optimized returns and reduced impermanent loss
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-bold mb-6 text-white"
        >
          Experience dex built for Humans, not for Bots!
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/app"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl text-white font-medium hover:from-pink-600 hover:to-purple-600 transition-all duration-200"
          >
            Start Trading
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
