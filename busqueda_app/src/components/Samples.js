import React from 'react';
import {
  SearchkitComponent,
  NoHits,
  ViewSwitcherHits,
} from "searchkit";

import config from "../config.json";

const OrderHitsGridItem = (props) => {
  const {result, bemBlocks} = props
  const source = result._source
  const fields = config.samples.grid.fields;

  return(
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))}>
      <ul>
        <h3>Order Details:</h3>
        {fields.map((field, index) => {
          return(
            <li key={index} className={bemBlocks.item(field)}>{field}: {source[field]}</li>
          )
        })}
      </ul>
    </div>
  )
}

const OrderHitsListItem = (props)=> {
  const {bemBlocks, result} = props  
  const source = result._source
  const fields = config.samples.list.fields;

  return(
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
      <div className={bemBlocks.item("details")}>
        <ul>
          <h3>Order Details:</h3>
          {fields.map((field, index) => {
            return(
              <li key={index} className={bemBlocks.item(field)}>{field}: {source[field]}</li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

const OrderHitsTable = (props) => {  
  const {hits} = props;
  return (
    <div style={{width: '100%', boxSizing: 'border-box', padding: 8}}>
      <table className="sk-table sk-table-striped" style={{width: '100%', boxSizing: 'border-box'}}>
        <thead>
          <tr>
            <th>Actual Delivery Date</th>
            <th>ORDER_ID</th>
            <th>City</th>
            <th>Shipping Point</th>
            <th>Delivery Type</th>
            <th>Contact Person Signature</th>
            <th>Commercial Distance</th>
            <th>Transport Distance</th>
            <th>Transport Duration Minutes</th>
          </tr>
        </thead>
        <tbody>
          {hits.map((hit) => {
            return (
              <tr key={hit._id}>
                <td>{hit._source.ACTUAL_DELIVERY_DAT}</td>
                <td>{hit._source.ORDER_ID}</td>
                <td>{hit._source.LNF_SITE_CITY}</td>
                <td>{hit._source.SHIPPINGPOINT_ID}</td>
                <td>{hit._source.DELIVERY_TYPE_CD}</td>
                <td>{hit._source.CONTACT_PERSON_SIGNATURE_TXT}</td>
                <td>{hit._source.COMMERCIAL_DISTANCE_M}</td>
                <td>{hit._source.TRANSPORT_DISTANCE_M}</td>
                <td>{hit._source.TRANSPORT_DURATION_MIN}</td>
              </tr>
            )
            })
          }
        </tbody>
      </table>
    </div>
  )  
  }
/*const OrderHitsTable = (props) => {  
  const {hits} = props;
  const fields = config.samples.table.fields;
  const table = []
  const body = fields.map((f) => {
    hits.map((hit) => {
      table.push(<td key={hit._id}>{hit._source[f]}</td>)
    })
    console.log(table)
    return(
      <tr>
        {table}
      </tr>
    );
  })

  return (  
    <div style={{width: '100%', boxSizing: 'border-box', padding: 8}}>
      <table className="sk-table sk-table-striped" style={{width: '100%', boxSizing: 'border-box'}}>
        <thead>
          <tr>
            {
              fields.map((field, index) => {
                return(<th key={index}>{field}</th>)
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            body
          }
        </tbody>
      </table> 
    </div>
  )  
}*/

class Samples extends SearchkitComponent {
  render(){
    return (
      <div>
          <ViewSwitcherHits
            hitsPerPage={16} 
            hitComponents={[
              {key: config.samples.grid.key, title: config.samples.grid.title, itemComponent: OrderHitsGridItem, defaultOption:true},
              {key: config.samples.list.key, title: config.samples.list.title, itemComponent: OrderHitsListItem},
              {key: config.samples.table.key, title: config.samples.table.title, listComponent: OrderHitsTable}
            ]}
            scrollTo="body"
          />
          <NoHits 
            translations={config.samples.noResults}
          />
      </div> 
    )
  } 
}

export default Samples;


  