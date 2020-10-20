import React from 'react';
import {
  SearchkitComponent,
  ViewSwitcherHits,
  NoHits
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

  const ActualDate = () => {
    if(source.ACTUAL_DELIVERY_DAT){
      return(
        <div>{source.ACTUAL_DELIVERY_DAT.split("T")[0]} {source.ACTUAL_DELIVERY_DAT.split("T")[1].slice(1,-1)}</div>
      )
    }
    return(<div>{source.ACTUAL_DELIVERY_DAT}</div>)  
  }

  return( 
    <div className="cards-wrapper">
      <div className="card">
        <Popup trigger={<div className="card-title">Order Details</div>} modal>
          <CardDetails order_id={source.ORDER_ID}/>
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
            {/* <div>{source.ACTUAL_DELIVERY_DAT.split("T")[0]} {source.ACTUAL_DELIVERY_DAT.split("T")[1].slice(1,-1)}</div> */}
            <ActualDate />
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
          {/* TABLA FILTROS NUEVOS */}
            <th className="header">Logon Order Number</th>
            <th className="header">Sequential Number</th>
            <th className="header">LDS Number</th>
            <th className="header">Order Status</th>
            <th className="header">Order Creation System</th>
            <th className="header">Ship-to (Destination)</th>
            <th className="header">Sold-to (Customer)</th>
            <th className="header">Bill-to (Address invoice)</th>
            <th className="header">Payer (credit check)</th>
            <th className="header">Commercial Carrier</th>
            <th className="header">Executing Carrier</th>
            <th className="header">Delivery Type</th>
            <th className="header">Process Type</th>
            <th className="header">Delivery From</th>
            <th className="header">Delivery To</th>
            <th className="header">Created By</th>
            <th className="header">On Hold</th>

            {/* TABLA DEMO
            <th className="header">Order ID</th>
            <th className="header icon-text"><span className="CALENDAR"></span>Delivery Date</th>
            <th className="header">Shippingpoint ID</th>
            <th className="header">Delivery Type CD</th>
            <th className="header"><span className="LOCATION"></span>Site City</th>
            <th className="header"><span className="user-copy"></span>Contact</th>
            <th className="header">Commercial Distance</th>
            <th className="header">Transport Distance</th>
            <th className="header">Transport duration</th> */}
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
                  }}
                  {/* TABLA FILTROS NUEVOS */}
                  const OrderStatus = () => {
                  if(hit._source.ORDER_STATUS_CD == 1){
                    return(
                      <div className="Rectangle-value-6">New</div>
                    )
                  } else if(hit._source.ORDER_STATUS_CD == 6){
                    return(
                      <div className="Rectangle-value-7">Dispatched</div>
                    )
                  } else if(hit._source.ORDER_STATUS_CD == 15){
                    return(
                      <div className="Rectangle-value-8">Delivered</div>
                    )
                  } else if(hit._source.ORDER_STATUS_CD == 16){
                    return(
                      <div className="Rectangle-value-9">Finished</div>
                    )
                  } else if(hit._source.ORDER_STATUS_CD == 17){
                    return(
                      <div className="Rectangle-value-10">Deleted</div>
                    )
                  } else{
                    return(
                      <div className="Rectangle-value-11">{hit._source.ORDER_STATUS_CD}</div>
                    )
                  }
                }
                {/* TABLA FILTROS NUEVOS */}
                const OrderCreation = () => {
                  if(hit._source.ORDER_CREATION_TYPE_CD == 1){
                    return(
                      <div className="Rectangle-value-6">Call Center</div>
                    )
                  } else if(hit._source.ORDER_CREATION_TYPE_CD == 2){
                    return(
                      <div className="Rectangle-value-7">Web Order</div>
                    )
                  } else if(hit._source.ORDER_CREATION_TYPE_CD == 3){
                    return(
                      <div className="Rectangle-value-8">Generated by Logon</div>
                    )
                  } else if(hit._source.ORDER_CREATION_TYPE_CD == 4){
                    return(
                      <div className="Rectangle-value-9">Dummy</div>
                    )
                  } else if(hit._source.ORDER_STATUS_CD == 5){
                    return(
                      <div className="Rectangle-value-10">Pickup Terminal</div>
                    )
                  } else{
                    return(
                      <div className="Rectangle-value-11">{hit._source.ORDER_STATUS_CD}</div>
                    )
                  }
                }


              return (
                <tr key={hit._id} className="table-header">
                {/* TABLA FILTROS NUEVOS */}
                   <td>{hit._source.ORDER_NUMBER}</td>
                   <td>{hit._source.ORDER_NUMBER_FROM_SEQ_USAGE}</td>
                   <td>{hit._source.LDS_DELIVERY_NOTE_NO}</td>
                   <td><OrderStatus/></td>
                   <td><OrderCreation/></td>
                   <td>{hit._source.SHIPTO_SAP_BP_ID}</td>
                   <td>{hit._source.SOLDTO_SAP_BP_ID}</td>
                   <td>{hit._source.BILLTO_SAP_BP_ID}</td>
                   <td>{hit._source.PAYER_SAP_BP_ID}</td>
                   <td>{hit._source.COMM_CARRIER_ID}</td>
                   <td>{hit._source.EXEC_CARRIER_ID}</td>
                   <td><DeliveryType/></td>
                   <td>{hit._source.DISTRIBUTION_DEST_CD}</td>
                   <td>{hit._source.DELIVERY_FROM_DAT.split("T")[0]} {hit._source.DELIVERY_FROM_DAT.split("T")[1].slice(1,-1) }</td>
                   <td>{hit._source.DELIVERY_TO_DAT.split("T")[0]} {hit._source.DELIVERY_TO_DAT.split("T")[1].slice(1,-1) }</td>
                   <td>{hit._source.CTL_CRE_UID}</td>
                   <td>{hit._source.ON_HOLD_ORDER_AND_LOCKED_FLAG}</td>

                 {/* TABLA DEMO
                  <td>
                    <Popup trigger={<div>{hit._source.ORDER_ID}</div>} modal>
                      <CardDetails order_id={hit._source.ORDER_ID} />
                    </Popup>
                  </td>              
                  <td>{hit._source.ACTUAL_DELIVERY_DAT.split("T")[0]} {hit._source.ACTUAL_DELIVERY_DAT.split("T")[1].slice(1,-1)}</td>              
                  <td>{hit._source.SHIPPINGPOINT_ID}</td>
                  <td><DeliveryType /></td>
                  <td>{hit._source.LNF_SITE_CITY}</td>
                  <td>{hit._source.CONTACT_PERSON_SIGNATURE_TXT}</td>
                  <td>{hit._source.COMMERCIAL_DISTANCE_M}</td>
                  <td>{hit._source.TRANSPORT_DISTANCE_M}</td>
                  <td>{hit._source.TRANSPORT_DURATION_MIN}</td> */}
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
          <NoHits />
      </div> 
    )
  } 
}

export default Samples;


  