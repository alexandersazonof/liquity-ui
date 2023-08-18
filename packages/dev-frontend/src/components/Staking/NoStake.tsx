import { Card, Heading, Box, Flex, Button } from "theme-ui";

import { VE, GT } from "../../strings";

import { InfoMessage } from "../InfoMessage";
import { useStakingView } from "./context/StakingViewContext";

export const NoStake: React.FC = () => {
  const { dispatch } = useStakingView();

  return (
    <Card>
      <Heading>{VE}</Heading>
      <Box sx={{ p: [2, 3] }}>
        <InfoMessage title={`You haven't ${VE} yet.`}>
          Lock {GT} to earn a share of borrowing and redemption fees.
        </InfoMessage>

        <Flex variant="layout.actions">
          <Button onClick={() => dispatch({ type: "startAdjusting" })}>Start locking</Button>
        </Flex>
      </Box>
    </Card>
  );
};
