import React from 'react'
import {
    SearchkitComponent,
    SearchkitManager,
    SearchkitProvider,
    RefinementListFilter
  } from "searchkit";
import config from '../config.json'

const searchkit = new SearchkitManager(config.endpoints)

class CurrencyCheckbox extends SearchkitComponent {
    render(){
        return(
            <SearchkitProvider searchkit={searchkit}>
                <RefinementListFilter
                    id={config.filters.currencyCheckbox.id}
                    title={config.filters.currencyCheckbox.title}
                    field={config.filters.currencyCheckbox.fields}
                    operator="OR"
                    size={10}
                />
            </SearchkitProvider>
        )
    } 
}

export default CurrencyCheckbox
