import React, {useState, useEffect} from 'react';
import {
  SearchkitComponent,
  ViewSwitcherHits,
  NoHits
} from "searchkit";
import Popup from "reactjs-popup";
import config from "../config.json";
//import EditableTable from "./EditableTable";
//import { ReactTabulator } from "react-tabulator";
import {statusMigration} from '../utils/Utils';
import { Table } from 'antd';
import 'antd/dist/antd.css'


//VISTA DE LOS RESULTADOS EN FORMA DE TABLA
const OrderHitsTable = (props) => {  
  const {hits} = props;
  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      let arrayData = [];
      await hits.map(hit => {
        let row = {
          city: hit._source.LNF_SITE_CITY,
          orderNumber: hit._source.ORDER_NUMBER,
          sequentialNumber: hit._source.ORDER_NUMBER_FROM_SEQ_USAGE,
          shippingPoint: hit._source.SHIPPIINGPOINT_ID,
          ldsNumber: hit._source.LDS_DELIVERY_NOTE_NO,
          orderStatus: statusMigration(hit._source.ORDER_STATUS_CD),
          orderCreationSystem: hit._source.ORDER_CREATION_TYPE_CD,
          shipTo: hit._source.SHIPTO_SAP_BP_ID,
          soldTo: hit._source.SOLDTO_SAP_BP_ID,
          billTo: hit._source.BILLTO_SAP_BP_ID,
          payer: hit._source.PAYER_SAP_BP_ID,
          commercialCarrier: hit._source.COMM_CARRIER_ID,
          executingCarrier: hit._source.EXEC_CARRIER_ID,
          deliveryType: hit._source.DELIVERY_TYPE_CD,
          processType: hit._source.DISTRIBUTION_DEST_CD,
          deliveryFrom: hit._source.DELIVERY_FROM_DAT,
          deliveryTo: hit._source.DELIVERY_TO_DAT,
          createdBy: hit._source.CTL_CRE_UID
        }
        arrayData.push(row);      
      })
      setData(arrayData)
    }
    getData();

  }, [hits])

  const columns = [
    { 
      title: "City", 
      dataIndex: "city", 
      key:"city",
      /*sorter: (a, b) => a.city.localeCompare(b.city),
      sortDirections: ['descend','ascend']*/
    },
    { title: "Logon Order Number", dataIndex: "orderNumber", key:"orderNumber"},
    { title: "Sequential Number", dataIndex: "sequentialNumber", key:"sequentialNumber" },
    { title: "Shipping Point", dataIndex: "shippingPoint", key:"shippingPoint" },
    { title: "LDS Number", dataIndex: "ldsNumber", key:"ldsNumber" },
    { title: "Order Status", dataIndex: "orderStatus", key:"orderStatus" },
    { title: "Order Creation System", dataIndex: "orderCreationSystem", key:"orderCreationSystem" },
    { title: "Ship-to (Destination)", dataIndex: "shipTo", key:"shipTo" },
    { title: "Sold-to (Customer)", dataIndex: "soldTo", key:"soldTo" },
    { title: "Bill-to (Address invoice)", dataIndex: "billTo", key:"billTo" },
    { title: "Payer (credit check)", dataIndex: "payer", key:"payer" },
    { title: "Commercial Carrier", dataIndex: "commercialCarrier", key:"commercialCarrier" },
    { title: "Executing Carrier", dataIndex: "executingCarrier", key:"executingCarrier" },
    { title: "Delivery Type", dataIndex: "deliveryType", key:"deliveryType" },
    { title: "Process Type", dataIndex: "processType", key:"processType" },
    { title: "Delivery From", dataIndex: "deliveryFrom", key:"deliveryFrom"},
    { title: "Delivery To", dataIndex: "deliveryTo", key:"deliveryTo"},
    { title: "Created By", dataIndex: "createdBy", key:"createdBy" }
  ]

  return (
    <>
      {(data.length === 0) ? (<div>No hay data</div>) : (<Table columns={columns} dataSource={data} size="small" bordered/>)}
    </>
  )  
}

class Samples extends SearchkitComponent {
  render(){
    return (
      <div>
          <ViewSwitcherHits
            hitsPerPage={1000}
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


  