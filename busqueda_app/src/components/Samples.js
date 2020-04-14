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
              <th className="header"><span className="CALENDAR"></span>Delivery Date</th>
              <th className="header">Shippingpoint ID</th>
              <th className="header">Delivery Type CD</th>
              <th className="header"><span className="LOCATION"></span>Site City</th>
              <th className="header"><span className="user-copy"></span>Contact</th>
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
                if(hit._source.DELIVERY_TYPE_CD == 1){
                  return (
                    <tr key={hit._id} className="table-header">
                      <td>{hit._source.ORDER_ID}</td>
                      <td>{hit._source.ACTUAL_DELIVERY_DAT}</td>              
                      <td>{hit._source.SHIPPINGPOINT_ID}</td>
                      <td><div className="Rectangle-value-1">{hit._source.DELIVERY_TYPE_CD}</div></td>
                      <td>{hit._source.LNF_SITE_CITY}</td>
                      <td>{hit._source.CONTACT_PERSON_SIGNATURE_TXT}</td>
                      <td>{hit._source.COMMERCIAL_DISTANCE_M}</td>
                      <td>{hit._source.TRANSPORT_DISTANCE_M}</td>
                      <td>{hit._source.TRANSPORT_DURATION_MIN}</td>
                    </tr>
                  )
                } else if(hit._source.DELIVERY_TYPE_CD == 2){
                  return (
                    <tr key={hit._id} className="table-header">
                      <td>{hit._source.ORDER_ID}</td>
                      <td>{hit._source.ACTUAL_DELIVERY_DAT}</td>              
                      <td>{hit._source.SHIPPINGPOINT_ID}</td>
                      <td><div className="Rectangle-value-2">{hit._source.DELIVERY_TYPE_CD}</div></td>
                      <td>{hit._source.LNF_SITE_CITY}</td>
                      <td>{hit._source.CONTACT_PERSON_SIGNATURE_TXT}</td>
                      <td>{hit._source.COMMERCIAL_DISTANCE_M}</td>
                      <td>{hit._source.TRANSPORT_DISTANCE_M}</td>
                      <td>{hit._source.TRANSPORT_DURATION_MIN}</td>
                    </tr>
                  )
                } else if(hit._source.DELIVERY_TYPE_CD == 3){
                  return (
                    <tr key={hit._id} className="table-header">
                      <td>{hit._source.ORDER_ID}</td>
                      <td>{hit._source.ACTUAL_DELIVERY_DAT}</td>              
                      <td>{hit._source.SHIPPINGPOINT_ID}</td>
                      <td><div className="Rectangle-value-3">{hit._source.DELIVERY_TYPE_CD}</div></td>
                      <td>{hit._source.LNF_SITE_CITY}</td>
                      <td>{hit._source.CONTACT_PERSON_SIGNATURE_TXT}</td>
                      <td>{hit._source.COMMERCIAL_DISTANCE_M}</td>
                      <td>{hit._source.TRANSPORT_DISTANCE_M}</td>
                      <td>{hit._source.TRANSPORT_DURATION_MIN}</td>
                    </tr>
                  )
                } else if(hit._source.DELIVERY_TYPE_CD == 4){
                  return (
                    <tr key={hit._id} className="table-header">
                      <td>{hit._source.ORDER_ID}</td>
                      <td>{hit._source.ACTUAL_DELIVERY_DAT}</td>              
                      <td>{hit._source.SHIPPINGPOINT_ID}</td>
                      <td><div className="Rectangle-value-4">{hit._source.DELIVERY_TYPE_CD}</div></td>
                      <td>{hit._source.LNF_SITE_CITY}</td>
                      <td>{hit._source.CONTACT_PERSON_SIGNATURE_TXT}</td>
                      <td>{hit._source.COMMERCIAL_DISTANCE_M}</td>
                      <td>{hit._source.TRANSPORT_DISTANCE_M}</td>
                      <td>{hit._source.TRANSPORT_DURATION_MIN}</td>
                    </tr>
                  )
                } else if(hit._source.DELIVERY_TYPE_CD == 5){
                  return (
                    <tr key={hit._id} className="table-header">
                      <td>{hit._source.ORDER_ID}</td>
                      <td>{hit._source.ACTUAL_DELIVERY_DAT}</td>              
                      <td>{hit._source.SHIPPINGPOINT_ID}</td>
                      <td><div className="Rectangle-value-5">{hit._source.DELIVERY_TYPE_CD}</div></td>
                      <td>{hit._source.LNF_SITE_CITY}</td>
                      <td>{hit._source.CONTACT_PERSON_SIGNATURE_TXT}</td>
                      <td>{hit._source.COMMERCIAL_DISTANCE_M}</td>
                      <td>{hit._source.TRANSPORT_DISTANCE_M}</td>
                      <td>{hit._source.TRANSPORT_DURATION_MIN}</td>
                    </tr>
                  )
                } else {
                  return (
                    <tr key={hit._id} className="table-header">
                      <td>{hit._source.ORDER_ID}</td>
                      <td>{hit._source.ACTUAL_DELIVERY_DAT}</td>              
                      <td>{hit._source.SHIPPINGPOINT_ID}</td>
                      <td>{hit._source.DELIVERY_TYPE_CD}</td>
                      <td>{hit._source.LNF_SITE_CITY}</td>
                      <td>{hit._source.CONTACT_PERSON_SIGNATURE_TXT}</td>
                      <td>{hit._source.COMMERCIAL_DISTANCE_M}</td>
                      <td>{hit._source.TRANSPORT_DISTANCE_M}</td>
                      <td>{hit._source.TRANSPORT_DURATION_MIN}</td>
                    </tr>
                  )
                }
                
                /*return (
                  <tr key={hit._id} className="table-header">
                    {
                      fields.map((f) => {                  
                        console.log(hit._source.DELIVERY_TYPE_CD)
                        if(hit._source.DELIVERY_TYPE_CD === 1){
                          return(                   
                            <td><div className="Rectangle-value-1">{hit._source[f]}</div></td>                   
                          )
                        } else if(hit._source.DELIVERY_TYPE_CD === 2){
                          return(                   
                            <td><div className="Rectangle-value-2">{hit._source[f]}</div></td>                   
                          )
                        } else if(hit._source.DELIVERY_TYPE_CD === 3){
                          return(                   
                            <td><div className="Rectangle-value-3">{hit._source[f]}</div></td>                   
                          )
                        } else if(hit._source.DELIVERY_TYPE_CD === 4){
                          return(                   
                            <td><div className="Rectangle-value-4">{hit._source[f]}</div></td>                   
                          )
                        } else if(hit._source.DELIVERY_TYPE_CD === 5){
                          return(                   
                            <td><div className="Rectangle-value-5">{hit._source[f]}</div></td>                   
                          )
                        } else {
                          return(                   
                            <td>{hit._source[f]}</td>                   
                          )
                        }
                        {return(                   
                          <td>{hit._source[f]}</td>                   
                        )}
                      })
                    }
                  </tr>
                )*/
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
            hitsPerPage={12} 
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


  