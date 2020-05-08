import React from 'react'
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
import { useParams } from 'react-router-dom';

//const searchkit = new SearchkitManager('https://search-logon-order-search-qyhfl5jwmhiaatf23g3wafmjia.eu-west-1.es.amazonaws.com/tlgnc_order_item');

function CardDetails() {
    let {order_id} = useParams();
    //console.log(order_id);

    const getData = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({"query":{"term":{"ORDER_ID":{"value":`${order_id}`}}}});

    let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://search-logon-order-search-qyhfl5jwmhiaatf23g3wafmjia.eu-west-1.es.amazonaws.com/tlgnc_order_item/_search?pretty", requestOptions)
    .then(response => response.text())
    .then(result => {
        //console.log(typeof(result))
        let resultJson = JSON.parse(result);
        //console.log(resultJson.hits.hits[0]._source)
        let item = resultJson.hits.hits[0]._source;
        console.log(item)
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>{item.ORDER_ID}</th>
                            <th>Encabezado</th>
                            <th>Encabezado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Info</td>
                            <td>Info</td>
                            <td>Info</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    })
    .catch(error => console.log('error', error));
    }
    

    return(
        <div>
            {getData()}
        </div>
    )

    
}

export default CardDetails;
