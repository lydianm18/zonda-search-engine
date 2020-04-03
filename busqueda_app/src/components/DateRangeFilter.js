import React, { Component } from 'react'
import moment from 'moment'
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import 'react-datepicker/dist/react-datepicker.css'

class DateRangeFilter extends Component {

  constructor (props) {
    super(props)
    this.state = {
      open: true,
      dateRange: [new Date(), new Date()],
      initialRange: [new Date(), new Date()],

    }
  }

  handleChange = (event) => {

    this.setState({
        dateRange: event? event: this.state.initialRange,

    }, this.updateSearch)
  }

  updateSearch = () => {
    const [ startDate, endDate ] = this.state.dateRange;
    const { onFinished } = this.props

    if (!startDate || !endDate) {
      return
    }
    onFinished({
      min: moment(startDate).format('x'),
      max: moment(endDate).format('x')
    })
  }


  render () {
    return (<div className="date-filter">
      <DateRangePicker
      open={this.state.open}
        onChange={this.handleChange}
        value={this.state.dateRange}
         />

    </div>)
  }
}

export default DateRangeFilter