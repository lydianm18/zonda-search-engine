import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import config from '../config.json'
import 'react-datepicker/dist/react-datepicker.css'

class DateRangeFilter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: null,
      endDate: null
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(this.props.cleanDate === true && prevProps.cleanDate != this.props.cleanDate){
      this.setState({startDate: null, endDate: null})
    }
  }
  
  handleChangeStart = (event) => {
    this.setState({
      startDate: event
    }, this.updateSearch)

    this.props.turnFalseDateFilter()
  }

  handleChangeEnd = (event) => {
      //console.log(event)
    this.setState({
      endDate: event 
    }, this.updateSearch)
  }

  updateSearch = () => {
    const { startDate, endDate } = this.state
    const { onFinished } = this.props

    if (!startDate || !endDate) {
      return
    }
    //console.log(startDate);
    onFinished({
      min: moment(startDate).format('YYYY-MM-DD'),
      max: moment(endDate).format('YYYY-MM-DD')
    })
  }

  isBeforeStartDate = (date) => {
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
  }


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
            </form>
          </div>
        </div>
        <div className="sk-input-filter">
          <form>
            <div className= "sk-input-filter__icon">
            </div>
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
    )
  }
}

export default DateRangeFilter