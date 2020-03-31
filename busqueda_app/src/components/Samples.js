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

/*const OrderHitsGridItem = (props) => {
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
          <th>ORDER_ID</th>
          <th>Shipping Point</th>
          <th>Transport Distance</th>
        </tr>
      </thead>
      <tbody>
        {hits.map((hit) => {
          return (
            <tr key={hit._id}>
              <td>{hit._source.ORDER_ID}</td>
              <td>{hit._source.SHIPPINGPOINT_ID}</td>
              <td>{hit._source.TRANSPORT_DISTANCE_M}</td>
            </tr>
          )
          })
        }
      </tbody>
    </table>
  </div>
)  
}*/

const HitItem = (props) => (
    <div className={props.bemBlocks.item().mix(props.bemBlocks.container("item"))}>
      <div className={props.bemBlocks.item("ORDER_ID")} dangerouslySetInnerHTML={{__html: get(props.result,"highlight.ORDER_ID",props.result._source.ORDER_ID)}}></div>
      <div className={props.bemBlocks.item("SHIPPINGPOINT_ID")} dangerouslySetInnerHTML={{__html: get(props.result, props.result._source.SHIPPINGPOINT_ID)}}></div>
    </div>
  )

class Samples extends SearchkitComponent {
  render(){
    return (
      <div>
          <Hits hitsPerPage={20} highlightFields={["ORDER_ID"]} sourceFilter={["ORDER_ID", "SHIPPINGPOINT_ID", "LNF_SITE_CITY"]}
                mod="sk-hits-grid" itemComponent={HitItem}>
              {/*<ViewSwitcherToggle/>
                  <ViewSwitcherHits
                      hitsPerPage={10}
                      sourceFilter={["ORDER_ID", "ORDER_NUMBER", "SHIPPINGPOINT_ID", "LNF_SITE_CITY"]}
                      hitComponents = {[
                          {key:"grid", title:"grid", itemComponent: OrderHitsGridItem, defaultOption:true},
                          {key:"list", title:"List", itemComponent: OrderHitsListItem},
                          {key:"table", title:"Table", listComponent: OrderHitsTable}
                      ]}
                      scrollTo="body"
                  />*/}
          </Hits>
          <NoHits />
      </div> 
    )
  } 
}

export default Samples;


  