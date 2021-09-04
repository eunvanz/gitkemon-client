import React from "react";
import ExchangeCode from "./ExchangeCode.view";
import useExchangeCodeProps from "./useExchangeCodeProps";

const ExchangeCodePage: React.FC<void> = () => {
  useExchangeCodeProps();

  return <ExchangeCode />;
};

export default ExchangeCodePage;
