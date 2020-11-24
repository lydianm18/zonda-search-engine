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
  RangeFilter,
  RefinementListFilter,
} from "searchkit";
import DateRangeFilter from "./DateRangeFilter";
import Samples from "./Samples";
import config from "../config.json";
//import EditableTable from "./EditableTable";

const searchkit = new SearchkitManager(config.endpoint);

class Main extends SearchkitComponent {
  state = {
    date: [new Date(), new Date()],
    cleanDate: false,
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
      this.setState({cleanDate: true})
  }

 /* SelectedFilter = (props) => {
    const {filterId, labelValue, labelKey, bemBlocks, removeFilter} = props;

    if (filterId === "event_date_filter") {

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
    }
  }; */

  turnFalseDateFilter = () => {
      this.setState({cleanDate: false})
  }

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
             {/*  <RangeFilter
                id={config.filters.dates.id}
                title={config.filters.dates.title}
                field={config.filters.dates.fields}
                rangeComponent={
                  <DateRangeFilter cleanDate={this.state.cleanDate} turnFalseDateFilter={this.turnFalseDateFilter} keepDates={this.state.keepDates}/>
                }
                min={946684800000}
                max={new Date().getTime()}
              /> */}
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
            </SideBar>
            <LayoutResults className="layout">
              <ActionBar>
                <ActionBarRow /* className="searchInput" */>
          
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
                  {/* </div> */}
                   {/* <InputFilter
                      id={config.filters.searchboxCity.id}
                      title={config.filters.searchboxCity.title}
                      placeholder={config.filters.searchboxCity.placeholder}
                      searchOnChange={true}
                      prefixQueryFields={config.filters.searchboxCity.fields}
              /> */}
                 {/*BOTONES DE GRID-TABLE Y LASTEST-EARLIEST  
                 <div className="actions-2">
                    <ViewSwitcherToggle />
                    <SortingSelector options={config.sortingSelector.options} />
                  </div> */}
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
              <Samples />
             {/* PAGINACION SEARCHKIT
              <div className="pagination">
                <Pagination showNumbers={true} />
              </div> */}
            </LayoutResults>
          </LayoutBody>
        </Layout>
      </SearchkitProvider>
      
    );
  }
}

export default Main;
