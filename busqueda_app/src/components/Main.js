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
  RangeFilter,
  RefinementListFilter,
} from "searchkit";
import DateRangeFilter from "./DateRangeFilter";
import Samples from "./Samples";
import config from "../config.json";
import {
  statusMigration,
  orderCreationSystemMigration,
  notExist,
} from "../utils/Utils";
import InputFilterSection from "./InputFilterSection";
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
    this.setState({ cleanDate: true });
  };

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

  // turnFalseDateFilter = () => {
  //     this.setState({cleanDate: false})
  // }

  prueba = (props) => {
    console.log(props);
    return <></>;
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
              <div className="line"></div>
              <RefinementListFilter
                id={config.filters.orderStatus.id}
                title={config.filters.orderStatus.title}
                field={config.filters.orderStatus.fields}
                operator="AND"
                size={18}
                showCount={false}
                listComponent={Select}
                orderKey="_term"
                orderDirection="asc"
              />
              <div className="line"></div>
              <RefinementListFilter
                id={config.filters.creationSystem.id}
                title={config.filters.creationSystem.title}
                field={config.filters.creationSystem.fields}
                operator="AND"
                size={11}
                listComponent={Select}
                showCount={false}
                orderKey="_term"
                orderDirection="asc"
              />
              <div className="line"></div>
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
              <div className="line"></div>
              <RefinementListFilter
                id={config.filters.deliveryType.id}
                title={config.filters.deliveryType.title}
                field={config.filters.deliveryType.fields}
                operator="AND"
                size={12}
                showCount={false}
                listComponent={Select}
                orderKey="_term"
                orderDirection="asc"
              />
              <div className="line"></div>
            {/*  <NumericRefinementListFilter
                id={config.filters.onHold.id}
                title={config.filters.onHold.title}
                options= {[{title:"All"}, {title:"On Hold", from:0, to:1}]}
                field={config.filters.onHold.fields}
                listComponent={CheckboxItemList}
               />  */}
               <CheckboxFilter
                id={config.filters.onHold.id}
                title={config.filters.onHold.title}
                label="On hold"
                field={config.filters.onHold.fields}
               showCount={false} 
                orderDirection="desc"
                filter={TermQuery("ON_HOLD_ORDER_AND_LOCKED_FLAG", "1")}
              />
            </SideBar>
            <LayoutResults className="layout">
              <ActionBar>
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
