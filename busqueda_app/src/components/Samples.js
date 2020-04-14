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

  /*fields.map((field, index) => {
      return(
        <li key={index} className={bemBlocks.item(field)}>{field}: {source[field]}</li>
      )
    })
  */
  if(source.DELIVERY_TYPE_CD == 1){
    return(
      <div className="cards-wrapper">
        <div className="card">
          <div className="card-title">
            Order Details
          </div>
          <div className="left-side">
            <div className="order-id">
              <div>Order ID</div>
              <div>{source.ORDER_ID}</div>
            </div>
            <div className="shipping-point">
              <div>Shippingpoint ID</div>
              <div>{source.SHIPPINGPOINT_ID}</div>
            </div>
            <div className="delivery-date">
              <div className="calendar"></div>
              <div>{source.ACTUAL_DELIVERY_DAT}</div>
            </div>
          </div>
          <div className="right-side">
            <div className="delivery-type">
              <div>Delivery type CD</div> 
              <div className="Rectangle-value-1">{source.DELIVERY_TYPE_CD}</div>
            </div>
            <div className="city">
              <div className="location"></div>
              <div>{source.LNF_SITE_CITY}</div>
            </div>
            <div className="contact">
              <div className="user"></div>
              <div>{source.CONTACT_PERSON_SIGNATURE_TXT}</div>
            </div>
          </div>
          <div className="bottom-side">
            <div className="bottom-text">
              <div>Commercial distance</div>
              <div>{source.COMMERCIAL_DISTANCE_M}</div>
            </div>
            <div className="bottom-text">
              <div>Trasnport distance</div>
              <div>{source.TRANSPORT_DISTANCE_M}</div>
            </div>
            <div className="bottom-text">
              <div className="minutes">Transport duration</div>
              <div>{source.TRANSPORT_DURATION_MIN}</div>
            </div>
          </div>
        </div>
      </div>         
    )
  }else if(source.DELIVERY_TYPE_CD == 2){
    return(
      <div className="cards-wrapper">
        <div className="card">
          <div className="card-title">
            Order Details
          </div>
          <div className="left-side">
            <div className="order-id">
              <div>Order ID</div>
              <div>{source.ORDER_ID}</div>
            </div>
            <div className="shipping-point">
              <div>Shippingpoint ID</div>
              <div>{source.SHIPPINGPOINT_ID}</div>
            </div>
            <div className="delivery-date">
              <div className="calendar"></div>
              <div>{source.ACTUAL_DELIVERY_DAT}</div>
            </div>
          </div>
          <div className="right-side">
            <div className="delivery-type">
              <div>Delivery type CD</div> 
              <div className="Rectangle-value-2">{source.DELIVERY_TYPE_CD}</div>
            </div>
            <div className="city">
              <div className="location"></div>
              <div>{source.LNF_SITE_CITY}</div>
            </div>
            <div className="contact">
              <div className="user"></div>
              <div>{source.CONTACT_PERSON_SIGNATURE_TXT}</div>
            </div>
          </div>
          <div className="bottom-side">
            <div className="bottom-text">
              <div>Commercial distance</div>
              <div>{source.COMMERCIAL_DISTANCE_M}</div>
            </div>
            <div className="bottom-text">
              <div>Trasnport distance</div>
              <div>{source.TRANSPORT_DISTANCE_M}</div>
            </div>
            <div className="bottom-text">
              <div className="minutes">Transport duration</div>
              <div>{source.TRANSPORT_DURATION_MIN}</div>
            </div>
          </div>
        </div>
      </div>         
    )
  } else if(source.DELIVERY_TYPE_CD == 3){
    return(
      <div className="cards-wrapper">
        <div className="card">
          <div className="card-title">
            Order Details
          </div>
          <div className="left-side">
            <div className="order-id">
              <div>Order ID</div>
              <div>{source.ORDER_ID}</div>
            </div>
            <div className="shipping-point">
              <div>Shippingpoint ID</div>
              <div>{source.SHIPPINGPOINT_ID}</div>
            </div>
            <div className="delivery-date">
              <div className="calendar"></div>
              <div>{source.ACTUAL_DELIVERY_DAT}</div>
            </div>
          </div>
          <div className="right-side">
            <div className="delivery-type">
              <div>Delivery type CD</div> 
              <div className="Rectangle-value-3">{source.DELIVERY_TYPE_CD}</div>
            </div>
            <div className="city">
              <div className="location"></div>
              <div>{source.LNF_SITE_CITY}</div>
            </div>
            <div className="contact">
              <div className="user"></div>
              <div>{source.CONTACT_PERSON_SIGNATURE_TXT}</div>
            </div>
          </div>
          <div className="bottom-side">
            <div className="bottom-text">
              <div>Commercial distance</div>
              <div>{source.COMMERCIAL_DISTANCE_M}</div>
            </div>
            <div className="bottom-text">
              <div>Trasnport distance</div>
              <div>{source.TRANSPORT_DISTANCE_M}</div>
            </div>
            <div className="bottom-text">
              <div className="minutes">Transport duration</div>
              <div>{source.TRANSPORT_DURATION_MIN}</div>
            </div>
          </div>
        </div>
      </div>         
    )
  } else if(source.DELIVERY_TYPE_CD == 4){
    return(
      <div className="cards-wrapper">
        <div className="card">
          <div className="card-title">
            Order Details
          </div>
          <div className="left-side">
            <div className="order-id">
              <div>Order ID</div>
              <div>{source.ORDER_ID}</div>
            </div>
            <div className="shipping-point">
              <div>Shippingpoint ID</div>
              <div>{source.SHIPPINGPOINT_ID}</div>
            </div>
            <div className="delivery-date">
              <div className="calendar"></div>
              <div>{source.ACTUAL_DELIVERY_DAT}</div>
            </div>
          </div>
          <div className="right-side">
            <div className="delivery-type">
              <div>Delivery type CD</div> 
              <div className="Rectangle-value-4">{source.DELIVERY_TYPE_CD}</div>
            </div>
            <div className="city">
              <div className="location"></div>
              <div>{source.LNF_SITE_CITY}</div>
            </div>
            <div className="contact">
              <div className="user"></div>
              <div>{source.CONTACT_PERSON_SIGNATURE_TXT}</div>
            </div>
          </div>
          <div className="bottom-side">
            <div className="bottom-text">
              <div>Commercial distance</div>
              <div>{source.COMMERCIAL_DISTANCE_M}</div>
            </div>
            <div className="bottom-text">
              <div>Trasnport distance</div>
              <div>{source.TRANSPORT_DISTANCE_M}</div>
            </div>
            <div className="bottom-text">
              <div className="minutes">Transport duration</div>
              <div>{source.TRANSPORT_DURATION_MIN}</div>
            </div>
          </div>
        </div>
      </div>         
    )
  } else if(source.DELIVERY_TYPE_CD == 5){
    return(
      <div className="cards-wrapper">
        <div className="card">
          <div className="card-title">
            Order Details
          </div>
          <div className="left-side">
            <div className="order-id">
              <div>Order ID</div>
              <div>{source.ORDER_ID}</div>
            </div>
            <div className="shipping-point">
              <div>Shippingpoint ID</div>
              <div>{source.SHIPPINGPOINT_ID}</div>
            </div>
            <div className="delivery-date">
              <div className="calendar"></div>
              <div>{source.ACTUAL_DELIVERY_DAT}</div>
            </div>
          </div>
          <div className="right-side">
            <div className="delivery-type">
              <div>Delivery type CD</div> 
              <div className="Rectangle-value-5">{source.DELIVERY_TYPE_CD}</div>
            </div>
            <div className="city">
              <div className="location"></div>
              <div>{source.LNF_SITE_CITY}</div>
            </div>
            <div className="contact">
              <div className="user"></div>
              <div>{source.CONTACT_PERSON_SIGNATURE_TXT}</div>
            </div>
          </div>
          <div className="bottom-side">
            <div className="bottom-text">
              <div>Commercial distance</div>
              <div>{source.COMMERCIAL_DISTANCE_M}</div>
            </div>
            <div className="bottom-text">
              <div>Trasnport distance</div>
              <div>{source.TRANSPORT_DISTANCE_M}</div>
            </div>
            <div className="bottom-text">
              <div className="minutes">Transport duration</div>
              <div>{source.TRANSPORT_DURATION_MIN}</div>
            </div>
          </div>
        </div>
      </div>         
    )
  } else{
    return(
      <div className="cards-wrapper">
        <div className="card">
          <div className="card-title">
            Order Details
          </div>
          <div className="left-side">
            <div className="order-id">
              <div>Order ID</div>
              <div>{source.ORDER_ID}</div>
            </div>
            <div className="shipping-point">
              <div>Shippingpoint ID</div>
              <div>{source.SHIPPINGPOINT_ID}</div>
            </div>
            <div className="delivery-date">
              <div className="calendar"></div>
              <div>{source.ACTUAL_DELIVERY_DAT}</div>
            </div>
          </div>
          <div className="right-side">
            <div className="delivery-type">
              <div>Delivery type CD</div> 
              <div>{source.DELIVERY_TYPE_CD}</div>
            </div>
            <div className="city">
              <div className="location"></div>
              <div>-</div>
            </div>
            <div className="contact">
              <div className="user"></div>
              <div>-</div>
            </div>
          </div>
          <div className="bottom-side">
            <div className="bottom-text">
              <div>Commercial distance</div>
              <div>{source.COMMERCIAL_DISTANCE_M}</div>
            </div>
            <div className="bottom-text">
              <div>Trasnport distance</div>
              <div>{source.TRANSPORT_DISTANCE_M}</div>
            </div>
            <div className="bottom-text">
              <div className="minutes">Transport duration</div>
              <div>{source.TRANSPORT_DURATION_MIN}</div>
            </div>
          </div>
        </div>
      </div>         
    )
  }
  
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
              <th className="header">Order ID</th>
              <th className="header icon-text"><span className="CALENDAR"></span>Delivery Date</th>
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


  