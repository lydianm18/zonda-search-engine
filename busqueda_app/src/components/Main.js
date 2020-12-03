import React from "react";

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
import NoResults from "./NoResults";

//Configuración del json para filtros y endpoint
import config from "../config.json";

//Imports para las fechas
import { DatePicker } from "antd";
import moment from "moment";
import { dateRange } from "../queries/rangeDateQuery";

const { RangePicker } = DatePicker;

const searchkit = new SearchkitManager(config.endpoint);

class Main extends SearchkitComponent {
  state = {
    cleanDate: false,
    startDate: null,
    endDate: null,
    arraydata: [],
    value: null,
    noResults: false,
  };

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

  //FUNCIÓN QUE RECIBE LOS DATOS DE LA QUERY A ELASTIC
  getData = (dateFrom, dateTo) => {
    dateRange(dateFrom, dateTo).then((res) => {
      if (res.hits.hits.length < 1) {
        this.setState({
          value: null,
          noResults: true,
        });
      }
      this.setState({ arraydata: res.hits.hits });
      this.setState({ dateFilterOn: true });
      console.log(this.state.arraydata);
    });
  };

  formatDate = (date) => {
    return moment(date).format("YYYY-MM-DD");
  };

  onChangeAntd = (val) => {
    this.setState({ value: val, noResults: false });
    if (val === null) {
      //this.setState({ startDate: null, endDate: null });
      this.changeCleanDateStatus();
      return;
    } else {
      const formatedStartDate = this.formatDate(val[0]._d);
      const formatedEndDate = this.formatDate(val[1]._d);
      this.setState({
        startDate: formatedStartDate,
        endDate: formatedEndDate,
      });
      console.log(formatedStartDate, formatedEndDate);
      this.getData(formatedStartDate, formatedStartDate);
    }
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
                <RangePicker
                  value={this.state.value}
                  onChange={this.onChangeAntd}
                />
                <InputFilterSection></InputFilterSection>
                <ActionBarRow>
                  <SelectedFilters />
                  <div onClick={this.changeCleanDateStatus}>
                    <ResetFilters onClick={this.changeCleanDateStatus} />
                  </div>
                </ActionBarRow>
                <div className="hitStats-download-container">
                  <HitsStats component={this.CustomHitStats} />
                </div>
              </ActionBar>
              {this.state.noResults ? (
                <NoResults
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                />
              ) : (
                <Samples dataDateFilter={this.state.arraydata} />
              )}
            </LayoutResults>
          </LayoutBody>
        </Layout>
      </SearchkitProvider>
    );
  }
}

export default Main;
