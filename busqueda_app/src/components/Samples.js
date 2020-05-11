import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {
  SearchkitComponent,
  NoHits,
  ViewSwitcherHits,
} from "searchkit";
import Popup from "reactjs-popup";
import CardDetails from './CardDetails';
import config from "../config.json";


//VISTA DE LOS RESULTADOS EN FORMA DE CARTAS
const OrderHitsGridItem = (props) => {
  const {result} = props;
  const source = result._source;

  const DeliveryType = () => {
    if(source.DELIVERY_TYPE_CD == 1){
      return(
        <div className="Rectangle-value-1">{source.DELIVERY_TYPE_CD}</div>
      )
    } else if(source.DELIVERY_TYPE_CD == 2){
      return(
        <div className="Rectangle-value-2">{source.DELIVERY_TYPE_CD}</div>
      )
    } else if(source.DELIVERY_TYPE_CD == 3){
      return(
        <div className="Rectangle-value-3">{source.DELIVERY_TYPE_CD}</div>
      )
    } else if(source.DELIVERY_TYPE_CD == 4){
      return(
        <div className="Rectangle-value-4">{source.DELIVERY_TYPE_CD}</div>
      )
    } else if(source.DELIVERY_TYPE_CD == 5){
      return(
        <div className="Rectangle-value-5">{source.DELIVERY_TYPE_CD}</div>
      )
    } else{
      return(
        <div className="Rectangle-value-4">{source.DELIVERY_TYPE_CD}</div>
      )
    }
  }

  const CardDetails = () => {

    const [item, setItem] = useState({});

    useEffect(() => {
        const getData = () => {
            try{
                fetch(`https://search-logon-order-search-qyhfl5jwmhiaatf23g3wafmjia.eu-west-1.es.amazonaws.com/tlgnc_order_item/_search?q=ORDER_ID:${source.ORDER_ID}`)
                .then(response => response.json())
                .then(result => {
                    let newItem = result.hits.hits[0]._source;
                    console.log(newItem)

                    setItem({newItem});
                })
            }
            catch(error){
                console.log(error)
            }
        }
        console.log(getData())
    }, [])

    return(
      <div className="details-content">
          {
              (!item.newItem) ? (<div className="loading">Loading...</div>) : (                                       
                  <div className="details-table">
                      <div className="details-table-row">
                          <div className="details-data">
                              <div className="details-data-position">ORDER ID</div>
                          </div>
                          <div className="details-data-content">
                              <div className="details-data-position">{item.newItem.ORDER_ID}</div>
                          </div>
                      </div>
                      <div className="details-table-row">
                          <div className="details-data">
                              <div className="details-data-position">ORDER ITEM ID</div>
                          </div>
                          <div className="details-data-content">
                              <div className="details-data-position">{item.newItem.ORDER_ITEM_ID}</div>
                          </div>
                      </div>  
                      <div className="details-table-row">
                          <div className="details-data">
                              <div className="details-data-position">ORDERED QUANTITY</div>
                          </div>
                          <div className="details-data-content">
                              <div className="details-data-position">{item.newItem.ORDERED_QUANTITY}</div>
                          </div>
                      </div>  
                      <div className="details-table-row">
                          <div className="details-data">
                              <div className="details-data-position">DELIVERED QUANTITY</div>
                          </div>
                          <div className="details-data-content">
                              <div className="details-data-position">{item.newItem.DELIVERED_QUANTITY}</div>
                          </div>
                      </div>  
                      <div className="details-table-row">
                          <div className="details-data">
                              <div className="details-data-position">CURRENCY CD</div>
                          </div>
                          <div className="details-data-content">
                              <div className="details-data-position">{item.newItem.CURRENCY_CD}</div>
                          </div>
                      </div>  
                      <div className="details-table-row">
                          <div className="details-data">
                              <div className="details-data-position">GROSS PRICE MAT</div>
                          </div>
                          <div className="details-data-content">
                              <div className="details-data-position">{item.newItem.GROSS_PRICE_MAT}</div>
                          </div>
                      </div>  
                  </div>            
              )   
          }
      </div>
    )
}

  return(
      
      <div className="cards-wrapper">
        <div className="card">
          <Popup trigger={<div className="card-title">Order Details</div>} modal>
            <CardDetails/>
          </Popup>
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
              <DeliveryType />
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
              <div>Transport duration</div>
              <div className="minutes">{source.TRANSPORT_DURATION_MIN}</div>
            </div>
          </div>
        </div>
      </div>
  )
}


//VISTA DE LOS RESULTADOS EN FORMA DE TABLA
const OrderHitsTable = (props) => {  
  const {hits} = props;

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
          </tr>
        </thead>
        <tbody>
          {
            hits.map((hit) => {
              const DeliveryType = () => {
                  if(hit._source.DELIVERY_TYPE_CD == 1){
                    return(
                      <div className="Rectangle-value-1">{hit._source.DELIVERY_TYPE_CD}</div>
                    )
                  } else if(hit._source.DELIVERY_TYPE_CD == 2){
                    return(
                      <div className="Rectangle-value-2">{hit._source.DELIVERY_TYPE_CD}</div>
                    )
                  } else if(hit._source.DELIVERY_TYPE_CD == 3){
                    return(
                      <div className="Rectangle-value-3">{hit._source.DELIVERY_TYPE_CD}</div>
                    )
                  } else if(hit._source.DELIVERY_TYPE_CD == 4){
                    return(
                      <div className="Rectangle-value-4">{hit._source.DELIVERY_TYPE_CD}</div>
                    )
                  } else if(hit._source.DELIVERY_TYPE_CD == 5){
                    return(
                      <div className="Rectangle-value-5">{hit._source.DELIVERY_TYPE_CD}</div>
                    )
                  } else{
                    return(
                      <div className="Rectangle-value-4">{hit._source.DELIVERY_TYPE_CD}</div>
                    )
                  }
                }

              return (
                <tr key={hit._id} className="table-header">
                  <td>
                    <Link to={`card-details/${hit._source.ORDER_ID}`} className="table-link">
                      {hit._source.ORDER_ID}
                    </Link>
                  </td>
                  
                  <td>{hit._source.ACTUAL_DELIVERY_DAT}</td>              
                  <td>{hit._source.SHIPPINGPOINT_ID}</td>
                  <td><DeliveryType /></td>
                  <td>{hit._source.LNF_SITE_CITY}</td>
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

class Samples extends SearchkitComponent {
  render(){
    return (
      <div>
          <ViewSwitcherHits
            hitsPerPage={12}
            highlightFields={["ORDER_ID"]}
            hitComponents={[
              {key: config.samples.grid.key, title: config.samples.grid.title, itemComponent: OrderHitsGridItem, defaultOption:true},
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


  