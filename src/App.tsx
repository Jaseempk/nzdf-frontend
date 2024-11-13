import React, { useState } from 'react';
import { ConnectKitButton } from 'connectkit';
import { IDKitWidget } from '@worldcoin/idkit';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings } from 'lucide-react';
import { SwapInterface } from './components/SwapInterface';
import { PoolInterface } from './components/PoolInterface';

function App() {
  const [isVerified, setIsVerified] = useState(false);
  const [activeTab, setActiveTab] = useState<'swap' | 'pool'>('swap');
  const [amount, setAmount] = useState('');
  const [selectedToken1] = useState('ETH');
  const [selectedToken2] = useState('USDC');

  const handleVerification = () => {
    setIsVerified(true);
  };

  const calculateFee = () => {
    return isVerified ? '0.3%' : '3%';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-black/40 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('swap')}
              className={`px-4 py-2 rounded-xl ${activeTab === 'swap' ? 'bg-pink-500 text-white' : 'text-gray-400'}`}
            >
              Swap
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('pool')}
              className={`px-4 py-2 rounded-xl ${activeTab === 'pool' ? 'bg-pink-500 text-white' : 'text-gray-400'}`}
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

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {activeTab === 'swap' ? (
              <SwapInterface
                amount={amount}
                setAmount={setAmount}
                selectedToken1={selectedToken1}
                selectedToken2={selectedToken2}
              />
            ) : (
              <PoolInterface />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 space-y-4">
          {!isVerified && (
            <IDKitWidget
              app_id="app_staging_0de98768469caa15048d3f7dd4c2c162"
              action="swap"
              onSuccess={handleVerification}
              handleVerify={handleVerification}
            >
              {({ open }) => (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={open}
                  className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium"
                >
                  Verify Personhood
                </motion.button>
              )}
            </IDKitWidget>
          )}

          <ConnectKitButton.Custom>
            {({ isConnected, show, truncatedAddress, ensName }) => (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={show}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-medium"
              >
                {isConnected ? (ensName ?? truncatedAddress) : "Connect Wallet"}
              </motion.button>
            )}
          </ConnectKitButton.Custom>
        </div>

        {amount && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-white/5 rounded-xl"
          >
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Fee Rate</span>
              <span className="text-white">{calculateFee()}</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default App;