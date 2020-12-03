import React, { useState } from "react";

//Librería de Searchkit
import {
  HitsStats,
  SearchkitComponent,
  SelectedFilters,
  ResetFilters,
  SearchkitManager,
  SearchkitProvider,
  Layout,
  TopBar,
  LayoutBody,
  LayoutResults,
  ActionBar,
  ActionBarRow,
} from "searchkit";

//Componentes manuales
import Samples from "./Samples";
import InputFilterSection from "./InputFilterSection";
import Sidebar from "./Sidebar";

//Configuración del json para filtros y endpoint
import config from "../config.json";

//Imports para las fechas
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { dateRange } from "../queries/rangeDateQuery";

import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

const searchkit = new SearchkitManager(config.endpoint);

class Main extends SearchkitComponent {
  state = {
    date: [new Date(), new Date()],
    cleanDate: false,
    searcher: true,
    startDate: null,
    endDate: null,
    arraydata: [],
    showDate: false,
    dates: [],
    hackValue: null,
    value: null,
  };

  onChange = (date) => this.setState({ date });

  DownloadButton(props) {
    const result = props.hits;
    if (result == 0) {
      return <></>;
    } else {
      return (
        <a
          href="/file/orders.csv"
          download="orders.csv"
          className="download-button-link"
        >
          CSV download
        </a>
      );
    }
  }

  CustomHitStats = (props) => {
    const { bemBlocks, hitsCount, timeTaken } = props;
    return (
      <>
        <div className={bemBlocks.container()} data-qa="hits-stats">
          <div className={bemBlocks.container("info")} data-qa="info">
            {hitsCount} results found in {timeTaken}ms
          </div>
        </div>
        <this.DownloadButton hits={hitsCount} />
      </>
    );
  };

  changeCleanDateStatus = () => {
    this.setState({ arraydata: null });
  };

  //AQUI EMPIEZAN LAS FUNCIONES RELACIONADAS CON LAS FECHAS
  /*handleChangeStart = (event) => {
    console.log(event);
    this.setState({ startDate: event, showDate: true }, this.updateSearch);
  };

  handleChangeEnd = (event) => {
    console.log(event);
    this.setState({ endDate: event, showDate: true }, this.updateSearch);
    console.log(this.state.startDate);
  };

  updateSearch = async () => {
    const { startDate, endDate } = this.state;
    if (!startDate || !endDate) {
      return;
    }
    const formatedStartDate = this.formatDate(startDate);
    const formatedEndDate = this.formatDate(endDate);

    this.getData(formatedStartDate, formatedEndDate);
    if (formatedStartDate && formatedEndDate) {
      this.datePill(formatedStartDate, formatedEndDate);
    }
  };*/

  //FUNCIÓN QUE RECIBE LOS DATOS DE LA QUERY A ELASTIC
  getData = (dateFrom, dateTo) => {
    dateRange(dateFrom, dateTo).then((res) => {
      console.log(res);
      this.setState({ arraydata: res.hits.hits });
      this.setState({ dateFilterOn: true });
      console.log(this.state.arraydata);
    });
  };

  formatDate = (date) => {
    return moment(date).format("YYYY-MM-DD");
  };

  /*datePill = (startDate, endDate) => {
    console.log(startDate, endDate);
    const stringStartDate = JSON.stringify(startDate);
    const stringEndDate = JSON.stringify(endDate);
    if (this.state.dateFilterOn) {
      console.log(stringStartDate, stringEndDate);
      return (
        <div>
          Delivery dates: {stringStartDate} - {stringEndDate}
        </div>
      );
    }
    return <></>;
  };*/

  /*onOpenChange = (open) => {
    if (open) {
      this.setState({ hackValue: [], dates: [] });
    } else {
      this.setState({ hackValue: undefined });
    }
  };*/

  onChangeAntd = (val) => {
    this.setState({ value: val });
    //console.log(this.state.value);
    const formatedStartDate = this.formatDate(val[0]._d);
    const formatedEndDate = this.formatDate(val[1]._d);
    this.setState({
      startDate: formatedStartDate,
      endDate: formatedEndDate,
    });
    console.log(formatedStartDate, formatedEndDate);
    this.getData(formatedStartDate, formatedStartDate);
  };

  /* SelectedFilter = (props) => {
    const {filterId, labelValue, labelKey, bemBlocks, removeFilter} = props;
    console.log(props)
    if (filterId === config.filters.dateFrom.id) {

      let firstDate = labelValue.slice(0, 10);
      let firstDateFormat = new Date(firstDate).toLocaleDateString('en-GB');

      let secondDate = labelValue.slice(-10);
      let secondDateFormat = new Date(secondDate).toLocaleDateString('en-GB');

      return (
        <div className={bemBlocks.option()}>
          <div className={bemBlocks.option("name")}>
            {labelKey} {firstDateFormat} - {secondDateFormat}
          </div>
          <div
            className={bemBlocks.option("remove-action")}
            onClick={() => {
                removeFilter()
                this.changeCleanDateStatus()
            }}>
            x
          </div>
        </div>
      );
    } else {
      return(<></>)
    }
  }; */

  // turnFalseDateFilter = () => {
  //     this.setState({cleanDate: false})
  // }

  render() {
    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout>
          <TopBar className="header">
            <div className="my-logo">
              <div className="zonda-logo">
                <img src="zonda.png"></img>
              </div>
            </div>
          </TopBar>
          <LayoutBody>
            <Sidebar></Sidebar>
            <LayoutResults className="layout">
              <ActionBar>
                <RangePicker
                  value={this.state.value}
                  onChange={this.onChangeAntd}
                />
                <InputFilterSection></InputFilterSection>
                <ActionBarRow>
                  <SelectedFilters itemComponent={this.SelectedFilter} />
                  <div onClick={this.changeCleanDateStatus}>
                    <ResetFilters
                      onClick={() => this.setState({ arraydata: null })}
                    />
                  </div>
                </ActionBarRow>
                <div className="hitStats-download-container">
                  <HitsStats component={this.CustomHitStats} />
                </div>
              </ActionBar>
              <Samples dataDateFilter={this.state.arraydata} />
            </LayoutResults>
          </LayoutBody>
        </Layout>
      </SearchkitProvider>
    );
  }
}

export default Main;
