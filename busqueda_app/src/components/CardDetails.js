import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';

function CardDetails() {
    let {order_id} = useParams();
    //console.log(order_id);

    const [item, setItem] = useState({});

    useEffect(() => {
        const getData = () => {
            try{
                fetch(`https://search-logon-order-search-qyhfl5jwmhiaatf23g3wafmjia.eu-west-1.es.amazonaws.com/tlgnc_order_item/_search?q=ORDER_ID:${order_id}`)
                .then(response => response.json())
                .then(result => {
                    //console.log(result)
                    //console.log(result.hits.hits[0]._source)
                    let newItem = result.hits.hits[0]._source;
                    console.log(newItem)

                    setItem({
                        newItem
                    });
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
                <table className="details-table">
                    <thead>
                        <tr>
                            <th>ORDER ID</th>
                            <th>ORDER ITEM ID</th>
                            <th>ORDERED QUANTITY</th>
                            <th>DELIVERED QUANTITY</th>
                            <th>CURRENCY CD</th>
                            <th>GROSS PRICE MAT</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{item.newItem && item.newItem.ORDER_ID}</td>
                            <td>{item.newItem && item.newItem.ORDER_ITEM_ID}</td>
                            <td>{item.newItem && item.newItem.ORDERED_QUANTITY}</td>
                            <td>{item.newItem && item.newItem.DELIVERED_QUANTITY}</td>
                            <td>{item.newItem && item.newItem.CURRENCY_CD}</td>
                            <td>{item.newItem && item.newItem.GROSS_PRICE_MAT}</td>
                        </tr>
                    </tbody>
                </table>
                <Link to="/" className="button-return">
                    Go back
                </Link>
            </div>
        </div>
    )

    
}



export default CardDetails;
