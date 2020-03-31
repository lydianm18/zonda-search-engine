import React from 'react';
import { get } from "lodash";
import {
  Hits,
  HitItemProps,
  SearchkitComponent,
  SearchkitManager,
  NoHits,
  ViewSwitcherHits,
  ViewSwitcherToggle 
} from "searchkit";

const OrderHitsGridItem = (props) => {
const {result, bemBlocks} = props
return (
  <div className={bemBlocks.item().mix(bemBlocks.container("item"))}>
    <div className={bemBlocks.item("ORDER_ID")}>Order ID: {result._source.ORDER_ID}</div>
    <div className={bemBlocks.item("SHIPPINGPOINT_ID")}>Shipping Point: {result._source.SHIPPINGPOINT_ID}</div>
  </div>
)
}

const OrderHitsListItem = (props)=> {
const {bemBlocks, result} = props  
const source = result._source
return (
  <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
    <div className={bemBlocks.item("details")}>
      <h2 className={bemBlocks.item("ORDER_ID")}>Order ID: {source.ORDER_ID}</h2>       
      <h3 className={bemBlocks.item("SHIPPINGPOINT_ID")}>Shipping Point: {source.SHIPPINGPOINT_ID}</h3>        
    </div>
  </div>
)
}

const OrderHitsTable = (props) => {  
const {hits} = props;
return (
  <div style={{width: '100%', boxSizing: 'border-box', padding: 8}}>
    <table className="sk-table sk-table-striped" style={{width: '100%', boxSizing: 'border-box'}}>
      <thead>
        <tr>
          <th>Actual Delivery Date</th>
          <th>ORDER_ID</th>
          <th>Shipping Point</th>
        </tr>
      </thead>
      <tbody>
        {hits.map((hit) => {
          return (
            <tr key={hit._id}>
               <td>{hit._source.ACTUAL_DELIVERY_DAT}</td>
              <td>{hit._source.ORDER_ID}</td>
              <td>{hit._source.SHIPPINGPOINT_ID}</td>
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
                hitsPerPage={20} 
                hitComponents={[
                  {key:"grid", title:"Grid", itemComponent: OrderHitsGridItem, defaultOption:true},
                  {key:"list", title:"List", itemComponent: OrderHitsListItem},
                  {key:"table", title:"Table", listComponent: OrderHitsTable}
                ]}
                scrollTo="body"
            />

          <NoHits />
      </div> 
    )
  } 
}

export default Samples;


  