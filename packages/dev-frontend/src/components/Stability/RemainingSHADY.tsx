import React from "react";
import { Flex } from "theme-ui";

import { SimStoreState } from "@sim/lib-base";
import { useSimSelector } from "@sim/lib-react";

const selector = ({ remainingStabilityPoolLQTYReward }: SimStoreState) => ({
  remainingStabilityPoolLQTYReward
});

export const RemainingSHADY: React.FC = () => {
  const { remainingStabilityPoolLQTYReward } = useSimSelector(selector);

  return (
    <Flex sx={{ mr: 2, fontSize: 2, fontWeight: "medium" }}>
      {remainingStabilityPoolLQTYReward.prettify(0)} SHADY remaining
    </Flex>
  );
};
