import React from "react";
import { BondViewContext } from "./BondViewContext";

export const EXAMPLE_NFT = "./bonds/egg-nft.png";

export const BondViewProvider: React.FC = props => {
  const { children } = props;
  const provider: any = {};

  return <BondViewContext.Provider value={provider}>{children}</BondViewContext.Provider>;
};
