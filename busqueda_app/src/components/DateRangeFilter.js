import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import config from '../config.json'
import 'react-datepicker/dist/react-datepicker.css'

class DateRangeFilter extends Component {
  
  constructor (props) {
    super(props)
    //console.log(props)
    this.state = {
      startDate: null,
      endDate: null,
      years: this.range(2000, new Date().getFullYear()),
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
    }
  }

  componentDidMount = () => {
    // 946684800000 es 01/01/2000 en ms que es la fecha más antigua para el calendario
    if(this.props.keepDates === true && this.props.minValue !== 946684800000){
      this.setState({startDate: this.props.minValue, endDate: this.props.maxValue})
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(this.props.cleanDate === true && prevProps.cleanDate !== this.props.cleanDate){
      this.setState({startDate: null, endDate: null})
    }
  }

  range = (startYear, endYear) => {
    let arrayYears = []
    while(startYear <= endYear){
      arrayYears.push(startYear)
      startYear += 1
    }
    return arrayYears;
  }

  handleChangeStart = (event) => {
    this.setState({
      startDate: event
    }, this.updateSearch)

    this.props.turnFalseDateFilter()
  }

  handleChangeEnd = (event) => {
      console.log(event);
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
    console.log(startDate);
    onFinished({
      min: moment(startDate).format('x'),
      max: moment(endDate).format('x')
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
            <DatePicker
              className="sk-input-filter__text"
              placeholderText={config.dateFilter.startDatePlaceholder}
              isClearable={true}
              filterDate={this.isAfterEndDate}
              selectsStart
              selected={this.state.startDate}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleChangeStart}
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth
              }) => (
                <div
                  style={{
                    margin: 10,
                    display: "flex",
                    justifyContent: "space-around"
                  }}
                >
                  <select
                    value={date.getFullYear()}
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {this.state.years.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <select
                    value={this.state.months[date.getMonth()]}
                    onChange={({ target: { value } }) =>
                      changeMonth(this.state.months.indexOf(value))
                    }
                  >
                    {this.state.months.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option> 
                       ))}
                  </select>
                </div>
              )}
               />    
            <DatePicker
              className="sk-input-filter__text"
              placeholderText={config.dateFilter.endDatePlaceholder}
              isClearable={true}
              filterDate={this.isBeforeStartDate}
              selectsEnd
              selected={this.state.endDate}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleChangeEnd}
              renderCustomHeader={({  date,
                changeYear,
                changeMonth
              }) => (
                <div
                  style={{
                    margin: 10,
                    display: "flex",
                    justifyContent: "space-around"
                  }}
                >
                  <select
                    value={date.getFullYear()}
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {this.state.years.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                   <select
                    value={this.state.months[date.getMonth()]}
                    onChange={({ target: { value } }) =>
                      changeMonth(this.state.months.indexOf(value))
                    }
                  >
                    {this.state.months.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            />
              <div className= "sk-input-filter__icon">
              </div>
          </form>
        </div>
        </div>
        </div>
    )
  }
}

export default DateRangeFilter