import { Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import { Color, ColorTone } from "../types/icolor";
import { IDeposit } from "../types/ideposit";

const DepositCard = ({ title = "deposito-prueba", users = [] }: IDeposit) => {
  const [depositBalance, setDepositBalance] = useState(20.5);
  const [depositTextStyle, setDepositTextStyle] = useState("");

  useEffect(() => {
    if (depositBalance >= 0)
      setDepositTextStyle(`text-${Color.green}-${ColorTone.dark}`);
    else setDepositTextStyle(`text-${Color.red}-${ColorTone.dark}`);
  });

  return (
    <div className={`rounded-md bg-${Color.purple}-${ColorTone.light} w-full`}>
      <p className={`font-bold text-center text-white`}>#{title}</p>
      <div className={`px-4 mb-4`}>
        {/* <FlatList
          data={users}
          renderItem={({ item }) => (
            <p className={`my-2 text-white`}>{item.alias}</p>
          )}
          keyExtractor={(item) => item.id}
        /> */}
        <div className={`flex-row mt-2`}>
          <p className={`text-white`}>Balance actual:</p>
          <p className={`${depositTextStyle} font-bold px-1`}>
            {depositBalance}$
          </p>
        </div>
      </div>
      <div
        className={`w-full bg-${Color.purple}-${ColorTone.dark} rounded-b-md py-2`}
      >
        {/* <Flex direction="row" justifyContent="space-evenly">
          <AntDesign name="pluscircle" size={24} color="white" />
          <FontAwesome name="handshake-o" size={24} color="white" />
          <FontAwesome name="user" size={24} color="white" />
        </Flex> */}
      </div>
    </div>
  );
};

export default DepositCard;
