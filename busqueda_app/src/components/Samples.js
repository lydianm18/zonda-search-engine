import React from 'react';
import {
  SearchkitComponent,
  Hits,
  NoHits
} from "searchkit";
import OrderHitsTable from './OrderHitsTable';
import config from "../config.json";

class Samples extends SearchkitComponent {

  /*state = {
    datos: []
  }

  componentDidUpdate(prevProps) {
    //console.log(this.props, prevProps) 
    if(prevProps.dateFilterOn !== this.props.dateFilterOn){
      console.log('distinto')
      this.setState({datos: this.props.dataDateFilter})
    }
  }*/

  render(){
    console.log('SAMPLES', this.props.dataDateFilter)
    return (
      <div>
          <Hits
            hitsPerPage={1000}
            highlightFields={["ORDER_ID"]}
            listComponent= {<OrderHitsTable dataDateFilter={this.props.dataDateFilter}/>}
            hitComponents={[
              {key: config.samples.table.key, title: config.samples.table.title}]}
            scrollTo="body"
          />
          <NoHits />
      </div> 
    )
  } 
}

export default Samples;


  