import React from "react";

import OrderStatus from "./OrderStatus/OrderStatus"
import CreationSystem from "./CreationSystem/CreationSystem"
import ProcessType from "./ProcessType/ProcessType"

const FilterSidebar = () => {
  return (
    <div>
      <OrderStatus></OrderStatus>
      <div className="line"></div>
      <CreationSystem></CreationSystem>
      <div className="line"></div>
      <ProcessType></ProcessType>
    </div>
  );
};

export default FilterSidebar;
