import React from 'react';
import {
  SearchkitComponent,
  ViewSwitcherHits,
  NoHits
} from "searchkit";
import OrderHitsTable from './OrderHitsTable';
import config from "../config.json";

class Samples extends SearchkitComponent {

  state = {
    datos: []
  }

  componentDidUpdate(prevProps) {
    //console.log(this.props, prevProps)
    
    if(prevProps.dateFilterOn !== this.props.dateFilterOn){
      console.log('distinto')
      this.setState({datos: this.props.dataDateFilter})
    }
  }

  render(){
    return (
      <div>
          <ViewSwitcherHits
            hitsPerPage={1000}
            highlightFields={["ORDER_ID"]}
            hitComponents={[
              {key: config.samples.table.key, title: config.samples.table.title, listComponent: <OrderHitsTable dataDateFilter={this.state.datos}/>}]}
            scrollTo="body"
          />
          <NoHits />
      </div> 
    )
  } 
}

export default Samples;


  