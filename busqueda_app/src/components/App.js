import React from 'react';
import {
  SearchBox,
  RefinementListFilter,
  HitsStats,
  SearchkitComponent,
  SelectedFilters,
  MenuFilter,
  HierarchicalMenuFilter,
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
  ViewSwitcherHits,
  ViewSwitcherToggle
} from "searchkit";
  
import Samples from './Samples';

const searchkit = new SearchkitManager("https://search-pedidos-dev-4rtoq2jtrckjskj25rghj3t5fy.eu-west-1.es.amazonaws.com/pedidos");

class App extends SearchkitComponent {
  render(){
    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout>
          <TopBar>
          <div className="my-logo">Orders Search Engine</div>
          <div>
            <SearchBox
            autofocus={true}
            searchOnChange={true}
            prefixQueryFields={["ORDER_ID","ORDER_NUMBER","LNF_SITE_CITY","POOL_ID"]}/>
          </div>
          </TopBar>
          <LayoutBody>
            <SideBar>
              <HierarchicalMenuFilter
                fields={["LNF_SITE_CITY.keyword", "SHIPPINGPOINT_ID"]}
                title="Cities"
                id="cities"/>
              <RefinementListFilter
                id="deliver_date"
                title="Deliver date"
                field="ACTUAL_DELIVERY_DAT"
                operator="AND"
                size={10}/>
            </SideBar>
            <LayoutResults>
              <ActionBar>
                <ActionBarRow>
                  <HitsStats/>
                  <ViewSwitcherToggle/>
                  <SortingSelector options={[
                    {label:"Latest Delivery Date", field:"ACTUAL_DELIVERY_DAT", order:"desc"},
                    {label:"Earliest Delivery Date", field:"ACTUAL_DELIVERY_DAT", order:"asc"}
                  ]}/>
                </ActionBarRow>
                <ActionBarRow>
                  <SelectedFilters/>
                  <ResetFilters/>
                </ActionBarRow>
              </ActionBar>
              <Samples />
              <Pagination showNumbers={true}/>
            </LayoutResults>
          </LayoutBody>
        </Layout>
      </SearchkitProvider>
    );
  }
}

export default App;



