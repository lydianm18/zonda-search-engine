import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import config from '../config.json'
import { dateRange } from '../queries/rangeDateQuery'
import 'react-datepicker/dist/react-datepicker.css'

class DateTest extends Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: null,
      endDate: null,
      arraydata: []
    }
  }
  
  componentDidUpdate = (prevProps, prevState) => {
      console.log(this.props)
    if(this.props.cleanDate === true && prevProps.cleanDate != this.props.cleanDate){
      this.setState({startDate: null, endDate: null})
    }
  }
  
  handleChangeStart = (event) => {
    //console.log(event)
    this.setState({
      startDate: event
    }, this.updateSearch)
    console.log(this.state.startDate)
    //this.props.turnFalseDateFilter()
  }

  handleChangeEnd = (event) => {
    //console.log(event)
    this.setState({
      endDate: event 
    }, this.updateSearch)
    console.log(this.state.startDate)
  }

  updateSearch = () => {
    const { startDate, endDate } = this.state

    if (!startDate || !endDate) {
      return
    }

    const dateFrom = moment(startDate).format('YYYY-MM-DD');
    const dateTo = moment(endDate).format('YYYY-MM-DD')

    this.getData(dateFrom, dateTo)
  }

  getData = (dateFrom, dateTo) => {
    dateRange(dateFrom, dateTo).then(res => {
      console.log(res)
      const data = res.hits.hits
      /*this.setState({
        filterDateSelected: true
      })*/
      this.setState({arraydata: data})
    })
  }

  /*isBeforeStartDate = (date) => {
    if (!this.state.startDate) {
      return true
    }

    return this.state.startDate <= date
  }

  isAfterEndDate = (date) => {
    if (!this.state.endDate) {
      return true
    }

    return date <= this.state.endDate
  }*/

  render () {
    return (
      <div className="sk-panel filter--dates">
        <div className="fecha-espacio">
          <div className="sk-input-filter">
            <form>
              <div className= "sk-input-filter__icon">
              </div>
            <DatePicker
              className="sk-input-filter__text"
              placeholderText={config.dateFilter.startDatePlaceholder}
              isClearable={true}
              filterDate={this.isAfterEndDate}
              selectsStart
              selected={this.state.startDate}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleChangeStart} />

              <DatePicker
              className="sk-input-filter__text"
              placeholderText={config.dateFilter.endDatePlaceholder}
              isClearable={true}
              filterDate={this.isBeforeStartDate}
              selectsEnd
              selected={this.state.endDate}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleChangeEnd} />
            </form>
          </div>
        </div>    
      </div>
    )
  }
}

export default DateTest