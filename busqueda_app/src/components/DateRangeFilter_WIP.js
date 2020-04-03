import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import 'react-datepicker/dist/react-datepicker.css'

class DateRangeFilter extends Component {

  constructor (props) {
    super(props)
    this.state = {
      startDate: null,
      endDate: null,
      open: true,
      dateRange: {},
      initialDateRange: {
        startDate: "2020-03-31T22:00:00.000Z",
        endDate: "2020-04-03T22:00:00.000Z"
    }
    }
  }

  handleChange = (event) => {
    this.setState({
        dateRange: event,

    }, this.updateSearch)
  }

  updateSearch = () => {
    const [ startDate, endDate ] = this.state.dateRange ? this.state.dateRange : this.state.initialDateRange;
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
        initialDateRange = {this.state.initialDateRange}
         />
      {/* <DatePicker
        className="sk-input-filter"
        placeholderText="Select end date"
        isClearable={true}
        filterDate={this.isBeforeStartDate}
        selectsEnd
        selected={this.state.endDate}
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        onChange={this.handleChangeEnd} /> */}
    </div>)
  }
}

export default DateRangeFilter