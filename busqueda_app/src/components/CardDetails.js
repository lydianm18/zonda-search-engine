import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

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
                    console.log(result)
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
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>{item.newItem && item.newItem.CURRENCY_CD}</th>
                            <th>Encabezado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Info</td>
                            <td>Info</td>
                            <td>Info</td>
                        </tr>
                    </tbody>
                </table>
            </div>
    )

    
}



export default CardDetails;
