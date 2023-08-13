import { useEffect, useState } from "react";
import { AddressZero } from "@ethersproject/constants";

import { SimStoreState } from "@sim/lib-base";
import { useSimSelector } from "@sim/lib-react";

import { useSim } from "../hooks/SimContext";

import { Dashboard } from "./Dashboard";
import { UnregisteredFrontend } from "./UnregisteredFrontend";
import { FrontendRegistration } from "./FrontendRegistration";
import { FrontendRegistrationSuccess } from "./FrontendRegistrationSuccess";

const selectFrontend = ({ frontend }: SimStoreState) => frontend;

export const PageSwitcher: React.FC = () => {
  const {
    account,
    config: { frontendTag }
  } = useSim();

  const frontend = useSimSelector(selectFrontend);
  const unregistered = frontendTag !== AddressZero && frontend.status === "unregistered";

  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    if (unregistered) {
      setRegistering(true);
    }
  }, [unregistered]);

  if (registering || unregistered) {
    if (frontend.status === "registered") {
      return <FrontendRegistrationSuccess onDismiss={() => setRegistering(false)} />;
    } else if (account === frontendTag) {
      return <FrontendRegistration />;
    } else {
      return <UnregisteredFrontend />;
    }
  } else {
    return <Dashboard />;
  }
};
