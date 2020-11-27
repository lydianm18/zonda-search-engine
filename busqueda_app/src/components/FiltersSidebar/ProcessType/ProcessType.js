import React from 'react';

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

const ProcessType = () => {
    return (
        <div className="dropdown-container">
        <input type="checkbox" id="drop_pt" />
        <label htmlFor="drop_pt">
          <FilterBase value="Process Type">
            <TruckIcon width="25px" height="24px" color="var(--greyish-brown)" />
          </FilterBase>
        </label>
        <div className="content"> 
        <RefinementListFilter
                id={config.filters.processType.id}
                title={config.filters.processType.title}
                field={config.filters.processType.fields}
                operator="AND"
                size={13}
                showCount={false}
                listComponent={Select}
                orderKey="_term"
                orderDirection="asc"
              />
        </div>
      </div>
    );
};

export default ProcessType;