import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';

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
                <div className="details-title">Order Details</div>
            </div>
            <div className="details-content">
            {
                (!item.newItem) ? (<div>Loading...</div>) : (                 
                    <table className="details-table">
                        <thead>
                            <tr className="details-table-header">
                                <th>ORDER ID</th>
                                <th>ORDER ITEM ID</th>
                                <th>ORDERED QUANTITY</th>
                                <th>DELIVERED QUANTITY</th>
                                <th>CURRENCY CD</th>
                                <th>GROSS PRICE MAT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="details-table-content">
                                <td>{item.newItem.ORDER_ID}</td>
                                <td>{item.newItem.ORDER_ITEM_ID}</td>
                                <td>{item.newItem.ORDERED_QUANTITY}</td>
                                <td>{item.newItem.DELIVERED_QUANTITY}</td>
                                <td>{item.newItem.CURRENCY_CD}</td>
                                <td>{item.newItem.GROSS_PRICE_MAT}</td>
                            </tr>
                        </tbody>
                    </table>
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
