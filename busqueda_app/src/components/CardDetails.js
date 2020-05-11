import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import config from "../config.json";

function CardDetails() {
    let {order_id} = useParams();
    const [item, setItem] = useState({});

    useEffect(() => {
        const getData = () => {
            try{
                fetch(`https://search-logon-order-search-qyhfl5jwmhiaatf23g3wafmjia.eu-west-1.es.amazonaws.com/tlgnc_order_item/_search?q=ORDER_ID:${order_id}`)
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
        <div className="details-wrapper">
            <div className="details-header">         
                <div className="details-title">{config.title}</div>
            </div>
            <div className="details-content">
                <h2 className="details-table-title">Order Details:</h2>
                {
                    (!item.newItem) ? (<div className="loading">Loading...</div>) : (                                       
                        <div className="details-table">
                            <div className="details-table-row">
                                <div className="details-data">
                                    <div className="details-data-position">Order ID</div>
                                </div>
                                <div className="details-data-content">
                                    <div className="details-data-position">{item.newItem.ORDER_ID}</div>
                                </div>
                            </div>
                            <div className="details-table-row">
                                <div className="details-data">
                                    <div className="details-data-position">Order item ID</div>
                                </div>
                                <div className="details-data-content">
                                    <div className="details-data-position">{item.newItem.ORDER_ITEM_ID}</div>
                                </div>
                            </div>  
                            <div className="details-table-row">
                                <div className="details-data">
                                    <div className="details-data-position">Ordered Quantity</div>
                                </div>
                                <div className="details-data-content">
                                    <div className="details-data-position">{item.newItem.ORDERED_QUANTITY}</div>
                                </div>
                            </div>  
                            <div className="details-table-row">
                                <div className="details-data">
                                    <div className="details-data-position">Delivered Quantity</div>
                                </div>
                                <div className="details-data-content">
                                    <div className="details-data-position">{item.newItem.DELIVERED_QUANTITY}</div>
                                </div>
                            </div>  
                            <div className="details-table-row">
                                <div className="details-data">
                                    <div className="details-data-position">Currency CD</div>
                                </div>
                                <div className="details-data-content">
                                    <div className="details-data-position">{item.newItem.CURRENCY_CD}</div>
                                </div>
                            </div>  
                            <div className="details-table-row">
                                <div className="details-data">
                                    <div className="details-data-position">Gross Price MAT</div>
                                </div>
                                <div className="details-data-content">
                                    <div className="details-data-position">{item.newItem.GROSS_PRICE_MAT}</div>
                                </div>
                            </div>  
                        </div>            
                    )   
                }
                <Link to="/" className="button-return">
                    Back
                </Link>
            </div>
        </div>
    )
}

export default CardDetails;
