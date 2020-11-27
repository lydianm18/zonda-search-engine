import React from "react";
import styled from "styled-components";

import config from "../../../config.json";

// components
import FilterBase from "../FilterBase/FilterBase";

import {
    Select,
    RefinementListFilter,
    SearchkitManager,
  } from "searchkit";

// images
import TruckIcon from "../../../img/truck";

const searchkit = new SearchkitManager(config.endpoint);

const FilterExample = () => {
  return (
    <div className="dropdown-container">
      <input type="checkbox" id="drop_os" />
      <label htmlFor="drop_os">
        <FilterBase value="ORDER STATUS">
          <TruckIcon width="25px" height="24px" color="var(--greyish-brown)" />
        </FilterBase>
      </label>
      <div className="content">
      <RefinementListFilter
                id={config.filters.orderStatus.id}
                field={config.filters.orderStatus.fields}
                operator="AND"
                size={18}
                showCount={false}
                listComponent={Select}
                orderKey="_term"
                orderDirection="asc"
              />
      </div>
    </div>
  );
};

export default FilterExample;
