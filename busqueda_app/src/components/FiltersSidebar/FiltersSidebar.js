import React from "react";

import OrderStatus from "./OrderStatus/OrderStatus";
import CreationSystem from "./CreationSystem/CreationSystem";
import ProcessType from "./ProcessType/ProcessType";
import DeliveryType from "./DeliveryType/DeliveryType";
import OnHold from "./OnHold/OnHold";

const FilterSidebar = ({ showing }) => {
  return (
    <div>
      <OrderStatus showing={showing}></OrderStatus>
      {/* <div className="line"></div> */}
      <CreationSystem></CreationSystem>
      {/* <div className="line"></div> */}
      <ProcessType></ProcessType>
      {/* <div className="line"></div> */}
      <DeliveryType></DeliveryType>
      <OnHold></OnHold>
    </div>
  );
};

export default FilterSidebar;
