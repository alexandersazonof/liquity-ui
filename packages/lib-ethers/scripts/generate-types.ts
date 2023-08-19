import fs from "fs-extra";
import path from "path";

import { Interface, ParamType } from "@ethersproject/abi";

import ActivePool from "../../../client/src/contracts/ActivePool.json";
import BorrowerOperations from "../../../client/src/contracts/BorrowerOperations.json";
import CollSurplusPool from "../../../client/src/contracts/CollSurplusPool.json";
import CommunityIssuance from "../../../client/src/contracts/CommunityIssuance.json";
import DefaultPool from "../../../client/src/contracts/DefaultPool.json";
import ERC20Mock from "../../../client/src/contracts/ERC20Mock.json";
import GasPool from "../../../client/src/contracts/GasPool.json";
import HintHelpers from "../../../client/src/contracts/HintHelpers.json";
import IERC20 from "../../../client/src/contracts/IERC20.json";
import LiquidityRewardsIssuance from "../../../client/src/contracts/LiquidityRewardsIssuance.json";
import LockupContractFactory from "../../../client/src/contracts/LockupContractFactory.json";
import MultiTroveGetter from "../../../client/src/contracts/MultiTroveGetter.json";
import PriceFeed from "../../../client/src/contracts/PriceFeed.json";
import PriceFeedTestnet from "../../../client/src/contracts/PriceFeedTestnet.json";
import SHADYToken from "../../../client/src/contracts/SHADYToken.json";
import SIMToken from "../../../client/src/contracts/SIMToken.json";
import SIMVeDistributor from "../../../client/src/contracts/VeDistributorLogic.json";
import SortedTroves from "../../../client/src/contracts/SortedTroves.json";
import StabilityPool from "../../../client/src/contracts/StabilityPool.json";
import TroveManager from "../../../client/src/contracts/TroveManager.json";
import Unipool from "../../../client/src/contracts/Unipool.json";
import Ve from "../../../client/src/contracts/Ve.json";
import VeDistributorLogic from "../../../client/src/contracts/VeDistributorLogic.json";
import VeLogic from "../../../client/src/contracts/VeLogic.json";
import VeLogo from "../../../client/src/contracts/VeLogo.json";
import WSTETHMock from "../../../client/src/contracts/WSTETHMock.json";
import WSTETHVeDistributor from "../../../client/src/contracts/VeDistributorLogic.json";

const getTupleType = (components: ParamType[], flexible: boolean) => {
  if (components.every(component => component.name)) {
    return (
      "{ " +
      components.map(component => `${component.name}: ${getType(component, flexible)}`).join("; ") +
      " }"
    );
  } else {
    return `[${components.map(component => getType(component, flexible)).join(", ")}]`;
  }
};

const getType = ({ baseType, components, arrayChildren }: ParamType, flexible: boolean): string => {
  switch (baseType) {
    case "address":
    case "string":
      return "string";

    case "bool":
      return "boolean";

    case "array":
      return `${getType(arrayChildren, flexible)}[]`;

    case "tuple":
      return getTupleType(components, flexible);
  }

  if (baseType.startsWith("bytes")) {
    return flexible ? "BytesLike" : "string";
  }

  const match = baseType.match(/^(u?int)([0-9]+)$/);
  if (match) {
    return flexible ? "BigNumberish" : parseInt(match[2]) >= 53 ? "BigNumber" : "number";
  }

  throw new Error(`unimplemented type ${baseType}`);
};

const declareInterface = ({
  contractName,
  interface: { events, functions }
}: {
  contractName: string;
  interface: Interface;
}) =>
  [
    `interface ${contractName}Calls {`,
    ...Object.values(functions)
      .filter(({ constant }) => constant)
      .map(({ name, inputs, outputs }) => {
        const params = [
          ...inputs.map((input, i) => `${input.name || "arg" + i}: ${getType(input, true)}`),
          `_overrides?: CallOverrides`
        ];

        let returnType: string;
        if (!outputs || outputs.length == 0) {
          returnType = "void";
        } else if (outputs.length === 1) {
          returnType = getType(outputs[0], false);
        } else {
          returnType = getTupleType(outputs, false);
        }

        return `  ${name}(${params.join(", ")}): Promise<${returnType}>;`;
      }),
    "}\n",

    `interface ${contractName}Transactions {`,
    ...Object.values(functions)
      .filter(({ constant }) => !constant)
      .map(({ name, payable, inputs, outputs }) => {
        const overridesType = payable ? "PayableOverrides" : "Overrides";

        const params = [
          ...inputs.map((input, i) => `${input.name || "arg" + i}: ${getType(input, true)}`),
          `_overrides?: ${overridesType}`
        ];

        let returnType: string;
        if (!outputs || outputs.length == 0) {
          returnType = "void";
        } else if (outputs.length === 1) {
          returnType = getType(outputs[0], false);
        } else {
          returnType = getTupleType(outputs, false);
        }

        return `  ${name}(${params.join(", ")}): Promise<${returnType}>;`;
      }),
    "}\n",

    `export interface ${contractName}`,
    `  extends _TypedSimContract<${contractName}Calls, ${contractName}Transactions> {`,

    "  readonly filters: {",
    ...Object.values(events).map(({ name, inputs }) => {
      const params = inputs.map(
        input => `${input.name}?: ${input.indexed ? `${getType(input, true)} | null` : "null"}`
      );

      return `    ${name}(${params.join(", ")}): EventFilter;`;
    }),
    "  };",

    ...Object.values(events).map(
      ({ name, inputs }) =>
        `  extractEvents(logs: Log[], name: "${name}"): _TypedLogDescription<${getTupleType(
          inputs,
          false
        )}>[];`
    ),

    "}"
  ].join("\n");

const contractArtifacts = [
  ActivePool,
  BorrowerOperations,
  CollSurplusPool,
  CommunityIssuance,
  DefaultPool,
  ERC20Mock,
  GasPool,
  HintHelpers,
  IERC20,
  LiquidityRewardsIssuance,
  LockupContractFactory,
  MultiTroveGetter,
  PriceFeed,
  PriceFeedTestnet,
  SHADYToken,
  SIMToken,
  SIMVeDistributor,
  SortedTroves,
  StabilityPool,
  TroveManager,
  Unipool,
  Ve,
  VeDistributorLogic,
  VeLogic,
  VeLogo,
  WSTETHMock,
  WSTETHVeDistributor
];

const contracts = contractArtifacts.map(({ contractName, abi }) => ({
  contractName,
  interface: new Interface(abi)
}));

const output = `
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { Log } from "@ethersproject/abstract-provider";
import { BytesLike } from "@ethersproject/bytes";
import {
  Overrides,
  CallOverrides,
  PayableOverrides,
  EventFilter
} from "@ethersproject/contracts";

import { _TypedSimContract, _TypedLogDescription } from "../src/contracts";

${contracts.map(declareInterface).join("\n\n")}
`;

fs.mkdirSync("types", { recursive: true });
fs.writeFileSync(path.join("types", "index.ts"), output);

fs.removeSync("abi");
fs.mkdirSync("abi", { recursive: true });
contractArtifacts.forEach(({ contractName, abi }) =>
  fs.writeFileSync(path.join("abi", `${contractName}.json`), JSON.stringify(abi, undefined, 2))
);
