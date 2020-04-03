import React from 'react';
import {
  SearchBox,
  RefinementListFilter,
  HitsStats,
  SearchkitComponent,
  SelectedFilters,
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
  InputFilter,
  ViewSwitcherToggle,
  RangeFilter
} from "searchkit";
import DateRangeFilter from './DateRangeFilter'
import Samples from './Samples';


const searchkit = new SearchkitManager("https://search-pedidos-dev-4rtoq2jtrckjskj25rghj3t5fy.eu-west-1.es.amazonaws.com/pedidos");

class App extends SearchkitComponent {

  state = {
    date: [new Date(), new Date()]
  }

  onChange = date => this.setState({ date })

  render(){
    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout>
          <TopBar>
            <img className="logo" src="lh_logo.png" widht="30" height="60"></img>
            <div className="my-logo">Orders Search Engine</div>
            <div>
            <SearchBox
            autofocus={true}
            searchOnChange={true}
            placeholder="Order ID or Shipping Point"
             queryFields={["ORDER_ID","SHIPPINGPOINT_ID","ORDER_NUMBER","LNF_SITE_CITY","POOL_ID"]}/>
           </div>
          </TopBar>
          <LayoutBody>
            <SideBar>
              <HierarchicalMenuFilter
                fields={["LNF_SITE_CITY.keyword", "SHIPPINGPOINT_ID"]}
                title="Cities"
                id="cities"
                size={10}/>
              <InputFilter
                id="more_cities"
                title="More cities"
                placeholder="Search cities"
                searchOnChange={true}
                prefixQueryFields={["LNF_SITE_CITY"]}
                queryFields={["LNF_SITE_CITY"]}
               />
               <InputFilter
                id="person"
                title="Contact Person Signature"
                placeholder="Contact person"
                searchOnChange={true}
                prefixQueryFields={["CONTACT_PERSON_SIGNATURE_TXT"]}
                queryFields={["CONTACT_PERSON_SIGNATURE_TXT"]}
               />
                <RangeFilter
                  id='event_date_filter'
                  title='Delivery Dates:'
                  field={ 'ACTUAL_DELIVERY_DAT' }
                  rangeComponent={ DateRangeFilter }
                  min={ 946684800000 }
                  max={ new Date().getTime() }
                />
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



