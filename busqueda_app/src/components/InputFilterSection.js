import React, { Component } from 'react';
import styled from "styled-components";
import variables from '../'

import {
    SearchBox,
    ActionBarRow,
    InputFilter,
    RangeFilter,
    
  } from "searchkit";
  import config from "../config.json";

  import DateRangeFilter from "./DateRangeFilter";

  const FlexInputs = styled.div`
  display: grid;
  grid-template-columns: 380px 380px 380px;
  grid-template-rows: 36px 36px;
  column-gap: 10px;
  row-gap: 10px;

width: auto;
height: 100px;
/* flex-wrap: wrap; */
 .sk-search-box, .sk-input-filter{
     width: 380px;
     height: 36px;
     /* padding: 10px 7px 7px 6px; */
  border-radius: 4px;
  border: solid 1px #c0dee2;
  background-color: #e9f2f4;
 }
`


class InputFilterSection extends Component {

    state = {
        date: [new Date(), new Date()],
        cleanDate: false,
      };

    turnFalseDateFilter = () => {
        this.setState({cleanDate: false})
    }

    render() {
        return (
            <ActionBarRow /* className="searchInput" */>
                <FlexInputs>
          
                    <SearchBox
                      autofocus={true}
                      searchOnChange={true}
                      placeholder={config.searchbox.placeholder}
                      prefixQueryFields={config.searchbox.queryFields}
                    />
                     <InputFilter
                      id={config.filters.searchboxBusiness.id}
                      title={config.filters.searchboxBusiness.title}
                      placeholder={config.filters.searchboxBusiness.placeholder}
                      searchOnChange={true}
                      prefixQueryFields={config.filters.searchboxBusiness.fields}
                     />
                     <InputFilter
                      id={config.filters.searchboxTransporter.id}
                      title={config.filters.searchboxTransporter.title}
                      placeholder={config.filters.searchboxTransporter.placeholder}
                      searchOnChange={true}
                      prefixQueryFields={config.filters.searchboxTransporter.fields}
                     />
                     <InputFilter
                      id={config.filters.searchboxCreatedBy.id}
                      title={config.filters.searchboxCreatedBy.title}
                      placeholder={config.filters.searchboxCreatedBy.placeholder}
                      searchOnChange={true}
                      prefixQueryFields={config.filters.searchboxCreatedBy.fields}
                     />



                    <RangeFilter
                      id={config.filters.dates.id}
                      title={config.filters.dates.title}
                      field={config.filters.dates.fields}
                      rangeComponent={
                   <DateRangeFilter cleanDate={this.state.cleanDate} turnFalseDateFilter={this.turnFalseDateFilter}/>
                      }
                      min={946684800000}
                      max={new Date().getTime()}
                    />
         </FlexInputs>
                </ActionBarRow>
        );
    }
}

export default InputFilterSection;