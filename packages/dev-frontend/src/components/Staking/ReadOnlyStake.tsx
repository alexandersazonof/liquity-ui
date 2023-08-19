import { Heading, Box, Card, Flex, Button } from "theme-ui";

import { SimStoreState } from "@sim/lib-base";
import { useSimSelector } from "@sim/lib-react";

import {COIN, GT, VE} from "../../strings";

import { StaticRow } from "../Trove/Editor";
import { LoadingOverlay } from "../LoadingOverlay";
import { Icon } from "../Icon";

import { useStakingView } from "./context/StakingViewContext";
import {StakingGainswstETHAction} from "./StakingGainswstETHAction.tsx";
import {StakingGainsSIMAction} from "./StakingGainsSIMAction.tsx";

const select = ({ lqtyStake, totalStakedSHADY }: SimStoreState) => ({
  lqtyStake,
  totalStakedSHADY
});

export const ReadOnlyStake: React.FC = () => {
  const { changePending, dispatch } = useStakingView();
  const { lqtyStake } = useSimSelector(select);

  return (
    <Card>
      <Heading>{VE}</Heading>

      <Box sx={{
        p: [2, 3],
        display: "flex",
        flexDirection: "row",
        flexWrap: 'wrap',
      }}>
        {lqtyStake.ves.map(ve => (
          <div style={{flexDirection: 'column', margin: '0 20px'}} key={ve.tokenId}>
            <StaticRow
              label="TokenId"
              amount={ve.tokenId.toString()}
            />
            <StaticRow
              label="Locked"
              amount={ve.locked.prettify()}
              unit={GT}
            />
            <StaticRow
              label="Lock end"
              amount={new Date(+ve.lockEnd.toString() * 1000).toLocaleDateString("en-US")}
            />
            <StaticRow
              label="Redemption gain"
              amount={ve.earnedWSTETH.prettify()}
              unit="wstETH"
            />
            {ve.earnedWSTETH.gt(0) &&
                <>
                    <StakingGainswstETHAction tokenId={ve.tokenId} />
                    <br />
                </>
            }

            <StaticRow
              label="Issuance gain"
              amount={ve.earnedSIM.prettify()}
              unit={COIN}
            />
            {ve.earnedSIM.gt(0) &&
                <>
                    <StakingGainsSIMAction tokenId={ve.tokenId} />
                    <br />
                </>
            }

            <Button variant="outline" onClick={() => dispatch({ type: "startAdjusting", tokenId: ve.tokenId })}>
              <Icon name="pen" size="sm" />
              &nbsp;Adjust NFT
            </Button>

            <br />
          </div>
        ))}
      </Box>

      <Flex variant="layout.actions">
        <Button variant="outline" onClick={() => dispatch({ type: "startAdjusting", tokenId: undefined })}>
          &nbsp;Create new lock
        </Button>
      </Flex>

      {changePending && <LoadingOverlay />}
    </Card>
  );
};
