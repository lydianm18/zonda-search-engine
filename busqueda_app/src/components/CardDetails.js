import React, {useState, useEffect} from 'react';
//import { useParams, Link } from 'react-router-dom';
import Samples from './Samples';
import config from "../config.json";

function CardDetails(props) {
    const id = props.order_id;
    const [item, setItem] = useState({});

    useEffect(() => {
        const getData = () => {
            try{
                fetch(`https://search-logon-order-search-qyhfl5jwmhiaatf23g3wafmjia.eu-west-1.es.amazonaws.com/tlgnc_order_item/_search?q=ORDER_ID:${id}`)
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
            <h2 className="details-table-title">Order Details:</h2>
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

export default CardDetails;
