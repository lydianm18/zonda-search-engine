import React from "react";
import {
  SearchBox,
  HitsStats,
  SearchkitComponent,
  SelectedFilters,
  Pagination,
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
import config from "../config.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { dateRange } from "../queries/rangeDateQuery";


const searchkit = new SearchkitManager(config.endpoint);

class Main extends SearchkitComponent {
  state = {
    date: [new Date(), new Date()],
    cleanDate: false,
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
    this.setState(
      {
        startDate: event,
      },
      this.updateSearch
    );
  };

  handleChangeEnd = (event) => {
    //console.log(event);
    this.setState(
      {
        endDate: event,
      },
      this.updateSearch
    );
    //console.log(this.state.startDate);
  };

  updateSearch = () => {
    const { startDate, endDate } = this.state;

    if (!startDate || !endDate) {
      return;
    }

    const dateFrom = moment(startDate).format("YYYY-MM-DD");
    const dateTo = moment(endDate).format("YYYY-MM-DD");

    this.getData(dateFrom, dateTo);
  };

  //FUNCIÓN QUE RECIBE LOS DATOS DE LA QUERY A ELASTIC
  getData = (dateFrom, dateTo) => {
    dateRange(dateFrom, dateTo).then((res) => {
      console.log(res);
      this.setState({ arraydata: res.hits.hits });
      this.setState({ dateFilterOn: true })

      console.log(this.state.arraydata)
    });
  };

  /*SelectedFilter = (props) => {
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
  }*/

  turnFalseDateFilter = () => {
    this.setState({ cleanDate: false });
  };

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
            <SideBar className="sidebar">
              <img
                className="logo"
                src="lh_logo.png"
                widht="30"
                height="60"
              ></img>
              <div className="sk-panel filter--searches">
                <div className="sk-panel__header">Saved Searches</div>
                <div className="sk-panel__content">
                  <p>
                    <a
                      href="/?cities[0]=LILLE&event_date_filter[min]=1585692000000&event_date_filter[max]=1588197600000"
                      className="saved-search-link"
                    >
                      Last Search 1
                    </a>
                  </p>
                  <p>
                    <a href="/?person=jorge" className="saved-search-link">
                      Last Search 2
                    </a>
                  </p>
                  <p>
                    <a
                      href="/?event_date_filter[min]=1546297200000&event_date_filter[max]=1577746800000&sort=ACTUAL_DELIVERY_DAT_desc"
                      className="saved-search-link"
                    >
                      Last Search 3
                    </a>
                  </p>
                </div>
              </div>
              <div className="line"></div>
                <DatePicker
                  className="sk-input-filter__text"
                  placeholderText={config.dateFilter.startDatePlaceholder}
                  isClearable={true}
                  filterDate={this.isAfterEndDate}
                  selectsStart
                  selected={this.state.startDate}
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={this.handleChangeStart}
                />

                <DatePicker
                  className="sk-input-filter__text"
                  placeholderText={config.dateFilter.endDatePlaceholder}
                  isClearable={true}
                  filterDate={this.isBeforeStartDate}
                  selectsEnd
                  selected={this.state.endDate}
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={this.handleChangeEnd}
                />
              <div className="line"></div>
              <RefinementListFilter
                id={config.filters.cityCheckbox.id}
                title={config.filters.cityCheckbox.title}
                field={config.filters.cityCheckbox.fields}
                operator="OR"
                size={10}
              />

              <InputFilter
                id={config.filters.searchboxCity.id}
                title={config.filters.searchboxCity.title}
                placeholder={config.filters.searchboxCity.placeholder}
                searchOnChange={true}
                prefixQueryFields={config.filters.searchboxCity.fields}
              />
              <div className="line"></div>
              <InputFilter
                id={config.filters.searchboxPerson.id}
                title={config.filters.searchboxPerson.title}
                placeholder={config.filters.searchboxPerson.placeholder}
                searchOnChange={true}
                prefixQueryFields={config.filters.searchboxPerson.fields}
              />
            </SideBar>
            <LayoutResults className="layout">
              <ActionBar>
                <ActionBarRow>
                  <div>
                    <SearchBox
                      autofocus={true}
                      searchOnChange={true}
                      placeholder={config.searchbox.placeholder}
                      prefixQueryFields={config.searchbox.queryFields}
                    />
                  </div>
                  <div className="actions-2">
                    <ViewSwitcherToggle />
                    <SortingSelector options={config.sortingSelector.options} />
                  </div>
                </ActionBarRow>
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
              {/* <Hits
                hitsPerPage={10}
                highlightFields={["ORDER_ID"]}
                listComponent= {<OrderHitsTable dataDateFilter={this.state.arraydata} dateFilterOn={this.state.dateFilterOn}/>}
                hitComponents={[
                  {key: config.samples.table.key, title: config.samples.table.title}]}
                scrollTo="body"
              />
              <NoHits /> */}
              <Samples
                dataDateFilter={this.state.arraydata}
                dateFilterOn={this.state.dateFilterOn}
              />
              <div className="pagination">
                <Pagination showNumbers={true} />
              </div>
            </LayoutResults>
          </LayoutBody>
        </Layout>
      </SearchkitProvider>
    );
  }
}

export default Main;
