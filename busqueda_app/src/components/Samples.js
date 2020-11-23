import React, {useState, useEffect} from 'react';
import {
  SearchkitComponent,
  ViewSwitcherHits,
  NoHits
} from "searchkit";
import Popup from "reactjs-popup";
import CardDetails from './CardDetails';
import config from "../config.json";
//import EditableTable from "./EditableTable";
//import { ReactTabulator } from "react-tabulator";
import { Table } from 'antd';
import 'antd/dist/antd.css'


//VISTA DE LOS RESULTADOS EN FORMA DE TABLA
const OrderHitsTable = (props) => {  
  const {hits} = props;
  const [data, setData] = useState([])

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

  }, [hits])

  const columns = [
    { title: "Logon Order Number", dataIndex: "orderNumber", key:"orderNumber" },
    { title: "Sequential Number", dataIndex: "sequentialNumber", key:"sequentialNumber" },
    { title: "LDS Number", dataIndex: "ldsNumber", key:"ldsNumber" },
    { title: "Order Status", dataIndex: "orderStatus", key:"orderStatus" },
    { title: "Order Creation System", dataIndex: "orderCreationSystem", key:"orderCreationSystem" }    
  ]

  return (
    <>
      <p onClick={()=>console.log(data)}>INFO</p>
      {(data.length === 0) ? (<div>No hay data</div>) : (<Table columns={columns} dataSource={data}/>)}
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


  