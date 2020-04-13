import React from 'react';
import {
  SearchkitComponent,
  NoHits,
  ViewSwitcherHits,
} from "searchkit";

import config from "../config.json";


const OrderHitsGridItem = (props) => {
  const {result, bemBlocks} = props;
  const source = result._source;
  const fields = config.samples.grid.fields;

  return(
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))}>
      <ul>
        <h3>Order Details:</h3>
          {
            fields.map((field, index) => {
              return(
                <li key={index} className={bemBlocks.item(field)}>{field}: {source[field]}</li>
              )
            })
          }
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
  const fields = config.samples.table.fields;

  return (
      <div className="table-container">
        <table className="table">
          <thead>
            <tr className="table-header">
              <th className="header">ORDER ID</th>
              <th className="header"><img src="img/calendar.png" className="CALENDAR"></img>Delivery Date</th>
              <th className="header">Shippingpoint ID</th>
              <th className="header">Delivery Type CD</th>
              <th className="header">Site City</th>
              <th className="header">Contact</th>
              <th className="header">Commercial Distance</th>
              <th className="header">Transport Distance</th>
              <th className="header">Transport duration</th>
              {/*
                fields.map((field, index) => {
                  return(<th className="header" key={index}>{field}</th>)
                })
              */}
            </tr>
          </thead>
          <tbody>
            {
              hits.map((hit) => {
                return (
                  <tr key={hit._id}>
                    {
                      fields.map((f) => {
                        return(                   
                          <td>{hit._source[f]}</td>                   
                        )
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
  )  
}

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


  