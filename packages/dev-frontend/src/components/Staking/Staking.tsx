import { useStakingView } from "./context/StakingViewContext";
import { ReadOnlyStake } from "./ReadOnlyStake";
import { StakingManager } from "./StakingManager";
import { NoStake } from "./NoStake";

export const Staking: React.FC = () => {
  const { view, tokenId } = useStakingView();

  switch (view) {
    case "ACTIVE":
      return <ReadOnlyStake />;

    case "ADJUSTING":
      return <StakingManager tokenId={tokenId}/>;

    case "NONE":
      return <NoStake />;
  }
};
