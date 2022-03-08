import {useCallback, useEffect, useState} from 'react';

import WalletsConfig from '../config/wallets.js';
import {ArgentHandler, MetaMaskHandler} from '../services';

const SUPPORTED_HANDLERS_REGISTRY = {
  metamask: MetaMaskHandler,
  argent: ArgentHandler
};

export const useWalletHandlerProvider = () => {
  const [handlers, setHandlers] = useState([]);
  useEffect(() => {
    const walletHandlers = [];
    WalletsConfig.forEach(walletConfig => {
      const {id} = walletConfig;
      const WalletHandler = SUPPORTED_HANDLERS_REGISTRY[id];
      if (WalletHandler) {
        walletHandlers.push(new WalletHandler(walletConfig));
      }
    });
    setHandlers(walletHandlers);
  }, []);
  return useCallback(
    type =>
      type ? handlers.filter(walletHandler => walletHandler.config.type === type) : handlers,
    [handlers]
  );
};
