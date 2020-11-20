import React, {useState, useEffect} from 'react';
import {
  SearchkitComponent,
  ViewSwitcherHits,
  NoHits
} from "searchkit";
import Popup from "reactjs-popup";
import CardDetails from './CardDetails';
import config from "../config.json";
import EditableTable from "./EditableTable";
import { ReactTabulator } from "react-tabulator";

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
  const [data, setData] = useState([])
  const [header, setHeader] = useState([])

  /*const getColumnas = async () => {
    const fields = Object.getOwnPropertyNames(hits[0]._source)
    await fields.map(field => {
      //console.log(field)
      let column = {
        title: "aa",
        field: field,
        hozAlign: "center",
        width: 150
      }
      setHeader(header => [...header, column])
    })
    console.log(header)
  }*/

  useEffect(() => {
    const getData = async () => {
      await hits.map(hit => {
        //console.log(hit._source)
        let row = {
          orderNumber: hit._source.ORDER_NUMBER,
          sequentialNumber: hit._source.ORDER_NUMBER_FROM_SEQ_USAGE,
          ldsNumber: hit._source.LDS_DELIVERY_NOTE_NO,
          orderStatus: hit._source.ORDER_STATUS_CD,
          orderCreationSystem: hit._source.ORDER_CREATION_TYPE_CD
        }
        setData(data => [...data, row])
      })
    }
    getData();
    //getColumnas();
  }, [hits])

  const columns = [
    { title: "Logon Order Number", field: "orderNumber", hozAlign: "center", width: 150 },
    { title: "Sequential Number", field: "sequentialNumber", hozAlign: "center" },
    { title: "LDS Number", field: "ldsNumber", hozAlign: "center" },
    { title: "Order Status", field: "orderStatus", hozAlign: "center" },
    { title: "Order Creation System", field: "orderCreationSystem", hozAlign: "center" }    
  ]

  const options = {
    movableColumns: true
  }

  return (
    <>
      <p onClick={columns}>INFO</p>
      {(data.length === 0) ? (<div>No hay data</div>) : (<ReactTabulator columns={columns} data={data} options={options}/>)}
    </>
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


  