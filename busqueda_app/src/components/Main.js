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
import TableOrder from "./TableOrder";
import config from "../config.json";
import {
  statusMigration,
  orderCreationSystemMigration,
  notExist,
} from "../utils/Utils";
import InputFilterSection from "./InputFilterSection";

import Sidebar from "./Sidebar";

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
            <Sidebar></Sidebar>

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
              <TableOrder />
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
