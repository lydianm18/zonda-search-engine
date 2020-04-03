import React from 'react';
import {
    SearchkitManager,
    SearchkitComponent,
    SearchkitProvider,
    RangeQuery
} from "searchkit";
  
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

const searchkit = new SearchkitManager("https://search-pedidos-dev-4rtoq2jtrckjskj25rghj3t5fy.eu-west-1.es.amazonaws.com/pedidos");

//Esta es la variable en la que quiero guardar los resultados para luego usarlos en el render, pero no veo muy bien cómo hacerlo.
const rangos = () => {
    return (
        RangeQuery("ACTUAL_DELIVER_DAT", { gte: "01/01/2013", lte: "31/01/2013", })
    )
}

class DateFilter extends SearchkitComponent {
    state = {
        date: [new Date(), new Date()],
    }

    onChange = date => this.setState({ date })

    render() {
        return (
        <SearchkitProvider searchkit={searchkit}>
            
            <DateRangePicker
            onChange={this.onChange}
            value={this.state.date}
            />
        </SearchkitProvider>
        );
    }
}

export default DateFilter;