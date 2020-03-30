import React from 'react';
import {
  SearchBox,
  RefinementListFilter,
  Hits,
  HitsStats,
  SearchkitComponent,
  SelectedFilters,
  MenuFilter,
  HierarchicalMenuFilter,
  Pagination,
  ResetFilters,
  SearchkitManager,
  SearchkitProvider
  } from "searchkit";
  
function App() {

  const searchkit = new SearchkitManager("https://search-pedidos-dev-4rtoq2jtrckjskj25rghj3t5fy.eu-west-1.es.amazonaws.com/orders");

  return (
    <div className="App">
      <SearchkitProvider searchkit={searchkit}>
        <Pagination />
      </SearchkitProvider>
    </div>
  );
}

export default App;
