import React, {useState, useEffect} from 'react'
import { statusMigration, orderCreationSystemMigration, notExist } from '../utils/Utils';
import { Table } from 'antd';
import 'antd/dist/antd.css'

const OrderHitsTable = ({hits, datos}) => {
  const [data, setData] = useState([])

  useEffect(() => {    
    
    const getData = async () => {
      const arrayData = [];   
        await hits.map(hit => {
            let row = {
            orderNumber: hit._source.ORDER_NUMBER,
            sequentialNumber: notExist(hit._source.ORDER_NUMBER_FROM_SEQ_USAGE),
            shippingPoint: hit._source.SHIPPINGPOINT_ID,
            ldsNumber: notExist(hit._source.LDS_DELIVERY_NOTE_NO),
            orderStatus: statusMigration(hit._source.ORDER_STATUS_CD),
            orderCreationSystem: orderCreationSystemMigration(hit._source.ORDER_CREATION_TYPE_CD),
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

export default OrderHitsTable
