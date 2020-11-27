import React from 'react';
import {
  SearchkitComponent,
  ViewSwitcherHits,
  NoHits
} from "searchkit";
import OrderHitsTable from './OrderHitsTable';
import config from "../config.json";

/*const Samples = () => {
  return (
    <div>
        <ViewSwitcherHits
          hitsPerPage={1000}
          highlightFields={["ORDER_ID"]}
          hitComponents={[
            {key: config.samples.table.key, title: config.samples.table.title, listComponent: <OrderHitsTable {...props}/>}
          ]}
          scrollTo="body"
        />
        <NoHits />
    </div> 
  )
}

export default Samples*/

class Samples extends SearchkitComponent {

  render(){
    console.log(this.props)
    return (
      <div>
          <ViewSwitcherHits
            hitsPerPage={1000}
            highlightFields={["ORDER_ID"]}
            hitComponents={[
              {key: config.samples.table.key, title: config.samples.table.title, listComponent: <OrderHitsTable {...this.props}/>}
            ]}
            scrollTo="body"
          />
          <NoHits />
      </div> 
    )
  } 
}

export default Samples;


  