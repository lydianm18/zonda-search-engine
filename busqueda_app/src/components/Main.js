import React from "react";
import {
  SearchBox,
  Select,
  CheckboxFilter,
  TermQuery,
  TermsQuery,
  NumericRefinementListFilter,
  CheckboxItemList,
  HitsStats,
  SearchkitComponent,
  SelectedFilters,
  ResetFilters,
  SearchkitManager,
  SearchkitProvider,
  Layout,
  TopBar,
  LayoutBody,
  SideBar,
  LayoutResults,
  ActionBar,
  ActionBarRow,
  SortingSelector,
  InputFilter,
  ViewSwitcherToggle,
  RefinementListFilter
} from "searchkit";
import Samples from "./Samples";
import TableOrder from "./TableOrder";
import config from "../config.json";
import InputFilterSection from "./InputFilterSection";

import Sidebar from "./Sidebar";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { dateRange } from "../queries/rangeDateQuery";


const searchkit = new SearchkitManager(config.endpoint);

class Main extends SearchkitComponent {
  state = {
    date: [new Date(), new Date()],
    cleanDate: false,
    searcher: true,
    startDate: null,
    endDate: null,
    arraydata: [],
    dateFilterOn: false,
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
    this.setState({ cleanDate: true });
  };

  //AQUI EMPIEZAN LAS FUNCIONES RELACIONADA CON LAS FECHAS
  handleChangeStart = (event) => {
    //console.log(event);
    this.setState({startDate: event}, this.updateSearch);
  };

  handleChangeEnd = (event) => {
    //console.log(event);
    this.setState({endDate: event}, this.updateSearch);
    //console.log(this.state.startDate);
  };

  updateSearch = () => {
    const { startDate, endDate } = this.state;
    if (!startDate || !endDate) {
      return;
    }
    this.getData(this.formatDate(startDate), this.formatDate(endDate));
  };

  //FUNCIÓN QUE RECIBE LOS DATOS DE LA QUERY A ELASTIC
  getData = (dateFrom, dateTo) => {
    dateRange(dateFrom, dateTo).then((res) => {
      //console.log(res);
      this.setState({ arraydata: res.hits.hits });
      this.setState({ dateFilterOn: true })
      //console.log(this.state.arraydata)
    });
  };

  formatDate = (date) => {
    return moment(date).format("YYYY-MM-DD")
  }

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
              <DatePicker
              className="sk-input-filter__text"
              placeholderText={config.dateFilter.startDatePlaceholder}
              isClearable={true}
              filterDate={this.isAfterEndDate}
              selectsStart
              selected={this.startDate}
              startDate={this.startDate}
              endDate={this.endDate}
              onChange={this.handleChangeStart}
            />
            <DatePicker
              className="sk-input-filter__text"
              placeholderText={config.dateFilter.endDatePlaceholder}
              isClearable={true}
              filterDate={this.isBeforeStartDate}
              selectsEnd
              selected={this.endDate}
              startDate={this.startDate}
              endDate={this.endDate}
              onChange={this.handleChangeEnd}
            />
                <InputFilterSection></InputFilterSection>
                <ActionBarRow>
                  <SelectedFilters itemComponent={this.SelectedFilter} />
                  <div onClick={this.changeCleanDateStatus}>
                    <ResetFilters />
                  </div>
                </ActionBarRow>
                <div className="hitStats-download-container">
                  <HitsStats component={this.CustomHitStats} />
                </div>
              </ActionBar>
              <Samples
                dataDateFilter={this.state.arraydata}
                dateFilterOn={this.state.dateFilterOn}
              />
            </LayoutResults>
          </LayoutBody>
        </Layout>
      </SearchkitProvider>
    );
  }
}

export default Main;
