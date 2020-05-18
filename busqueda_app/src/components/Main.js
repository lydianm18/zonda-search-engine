import React from 'react';
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
  RefinementListFilter
} from "searchkit";
import DateRangeFilter from './DateRangeFilter';
import Samples from './Samples';
import config from "../config.json";


const searchkit = new SearchkitManager(config.endpoint);

class Main extends SearchkitComponent {

  state = {
    date: [new Date(), new Date()]
  }

  onChange = date => this.setState({ date })

  render(){
    return (
        <SearchkitProvider searchkit={searchkit}>
            <Layout>
            <TopBar className="header">
            <div className="my-logo">{config.title}</div>
            </TopBar>
            <LayoutBody>
                <SideBar className="sidebar">
                <img className="logo" src="lh_logo.png" widht="30" height="60"></img>
                <div className="sk-panel filter--searches">
                    <div className="sk-panel__header">Saved Searches</div>
                    <div className="sk-panel__content">
                        <p><a href="http://localhost:3000/?cities[0]=LILLE" className="saved-search-link">Last Search 1</a></p>
                        <p><a href="http://localhost:3000/?person=jorge" className="saved-search-link">Last Search 2</a></p>
                        <p><a href="#" className="saved-search-link">Last Search 3</a></p>
                    </div>
                </div>

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
                <div className="line"></div>
                <RangeFilter
                    id={config.filters.dates.id}
                    title={config.filters.dates.title}
                    field={config.filters.dates.fields}
                    rangeComponent={ DateRangeFilter }
                    min={ 946684800000 }
                    max={ new Date().getTime() }
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
                    <ViewSwitcherToggle/>
                    <SortingSelector options={config.sortingSelector.options}
                    />
                    </div>
                    </ActionBarRow>
                    <ActionBarRow>
                    <SelectedFilters/>
                    <ResetFilters/>
                    </ActionBarRow>
                    <HitsStats/>
                </ActionBar>
                <Samples />
                <div className="pagination">
                    <Pagination showNumbers={true}/>
                </div>
                </LayoutResults>
            </LayoutBody>
            </Layout>
        </SearchkitProvider>
    );
  }
}

export default Main;



