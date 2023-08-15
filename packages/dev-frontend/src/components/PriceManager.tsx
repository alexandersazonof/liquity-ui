import React, { useState, useEffect } from "react";
import { Card, Box, Heading, Flex, Button, Label, Input } from "theme-ui";

import { Decimal, SimStoreState } from "@sim/lib-base";
import { useSimSelector } from "@sim/lib-react";

import { useSim } from "../hooks/SimContext";

import { Icon } from "./Icon";
import { Transaction } from "./Transaction";

const selectPrice = ({ price }: SimStoreState) => price;

export const PriceManager: React.FC = () => {
  const {
    sim: {
      send: sim,
      connection: { _priceFeedIsTestnet: canSetPrice }
    }
  } = useSim();

  const price = useSimSelector(selectPrice);
  const [editedPrice, setEditedPrice] = useState(price.toString(2));

  useEffect(() => {
    setEditedPrice(price.toString(2));
  }, [price]);

  return (
    <Card>
      <Heading>Price feed</Heading>

      <Box sx={{ p: [2, 3] }}>
        <Flex sx={{ alignItems: "stretch" }}>
          <Label>ETH</Label>

          <Label variant="unit">$</Label>

          <Input
            type={canSetPrice ? "number" : "text"}
            step="any"
            value={editedPrice}
            onChange={e => setEditedPrice(e.target.value)}
            disabled={!canSetPrice}
          />

          {canSetPrice && (
            <Flex sx={{ ml: 2, alignItems: "center" }}>
              <Transaction
                id="set-price"
                tooltip="Set"
                tooltipPlacement="bottom"
                send={overrides => {
                  if (!editedPrice) {
                    throw new Error("Invalid price");
                  }
                  return sim.setPrice(Decimal.from(editedPrice), overrides);
                }}
              >
                <Button variant="icon">
                  <Icon name="chart-line" size="lg" />
                </Button>
              </Transaction>
            </Flex>
          )}
        </Flex>
      </Box>
    </Card>
  );
};
