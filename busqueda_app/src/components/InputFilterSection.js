import React, { useState } from "react";
import styled from "styled-components";

import { SearchBox, ActionBarRow, InputFilter, RangeFilter } from "searchkit";
import config from "../config.json";

// components
import ButtonPrimary from "./GenericComponents/ButtonPrimary";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { dateRange } from '../queries/rangeDateQuery';
import moment from 'moment';

const FlexBox = styled.div`
  display: flex;
`;
const GridInputs = styled.div`
  display: grid;
  grid-template-columns: 248px 248px 248px;
  grid-template-rows: 36px 36px;
  column-gap: 10px;
  row-gap: 10px;
  width: auto;

  /* flex-wrap: wrap; */
  .sk-search-box,
  .sk-input-filter {
    font-size: 14px;
    width: 248px;
    height: 36px;
    border-radius: 4px;
    border: solid 1px #c0dee2;
    background-color: #e9f2f4;

    .sk-input-filter__icon,
    .sk-search-box__icon {
      display: none;
    }
  }
  .sk-input-filter__text::placeholder {
    color: #959595;
  }

  .sk-input-filter__text {
    padding-top: 8px;
  }
  .sk-input-filter__text::placeholder {
    color: #959595;
  }
`;

const InputFilterSection = () => {
  // state
  const [date, setDate] = useState([new Date(), new Date()]);
  const [cleanDate, setcleanDate] = useState(false);
  const [searcher, setSearcher] = useState(true);
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [arraydata, setArrayData] = useState([])
  const [dateFilterOn, setDateFilterOn] = useState(false)

  const OnSearch = () => {
    setSearcher(false);
  };

  const turnFalseDateFilter = () => {
    setcleanDate(false);
  };

  //AQUI EMPIEZAN LAS FUNCIONES RELACIONADA CON LAS FECHAS
  const handleChangeStart = (event) => {
    //console.log(event);
    setStartDate(event) 
    updateSearch();
  };

  const handleChangeEnd = (event) => {
    //console.log(event);
    setEndDate(event) 
    updateSearch();
    //console.log(this.state.startDate);
  };

  const updateSearch = () => {
    //const { startDate, endDate } = this.state;
    if (!startDate || !endDate) {
      return;
    }
    getData(formatDate(startDate), formatDate(endDate));
  };

  //FUNCIÓN QUE RECIBE LOS DATOS DE LA QUERY A ELASTIC
  const getData = (dateFrom, dateTo) => {
    dateRange(dateFrom, dateTo).then((res) => {
      //console.log(res);
      setArrayData(res.hits.hits);
      setDateFilterOn(true)
      //console.log(this.state.arraydata)
    });
  };

  const formatDate = (date) => {
    return moment(date).format("YYYY-MM-DD")
  }

  return (
    <>
      <ActionBarRow>
        <FlexBox>
          <GridInputs>
            <SearchBox
              autofocus={true}
              searchOnChange={false}
              placeholder={config.searchbox.placeholder}
              prefixQueryFields={config.searchbox.queryFields}
              blurAction="search"
            />
            <InputFilter
              id={config.filters.searchboxBusiness.id}
              title={config.filters.searchboxBusiness.title}
              placeholder={config.filters.searchboxBusiness.placeholder}
              searchOnChange={false}
              prefixQueryFields={config.filters.searchboxBusiness.fields}
              blurAction="search"
            />
            <InputFilter
              id={config.filters.searchboxTransporter.id}
              title={config.filters.searchboxTransporter.title}
              placeholder={config.filters.searchboxTransporter.placeholder}
              searchOnChange={false}
              prefixQueryFields={config.filters.searchboxTransporter.fields}
              blurAction="search"
            />
            <InputFilter
              id={config.filters.searchboxCreatedBy.id}
              title={config.filters.searchboxCreatedBy.title}
              placeholder={config.filters.searchboxCreatedBy.placeholder}
              searchOnChange={false}
              prefixQueryFields={config.filters.searchboxCreatedBy.fields}
              blurAction="search"
            />
            <DatePicker
              className="sk-input-filter__text"
              placeholderText={config.dateFilter.startDatePlaceholder}
              isClearable={true}
              //filterDate={isAfterEndDate}
              selectsStart
              selected={startDate}
              startDate={startDate}
              endDate={endDate}
              onChange={handleChangeStart}
            />
            <DatePicker
              className="sk-input-filter__text"
              placeholderText={config.dateFilter.endDatePlaceholder}
              isClearable={true}
              //filterDate={isBeforeStartDate}
              selectsEnd
              selected={endDate}
              startDate={startDate}
              endDate={endDate}
              onChange={handleChangeEnd}
            />
            {/* <RangeFilter
              id={config.filters.dates.id}
              title={config.filters.dates.title}
              field={config.filters.dates.fields}
              classProps="filter-date"
              rangeComponent={
                <DateRangeFilter
                  cleanDate={cleanDate}
                  turnFalseDateFilter={turnFalseDateFilter}
                />
              }
              min={946684800000}
              max={new Date().getTime()}
            /> */}
          </GridInputs>

          <ButtonPrimary
            classProps="button-input-filters"
            text="Search"
            onClick={OnSearch}
          />
        </FlexBox>
      </ActionBarRow>
    </>
  );
};

export default InputFilterSection;
