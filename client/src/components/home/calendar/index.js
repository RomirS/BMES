import React from "react";
import moment from "moment";
import M from 'materialize-css';

import Days from './Days';
import Modal from './modals/Modal';
import "./calendar.css";

class Calendar extends React.Component {
  state = {
    showDateTable: true,
    dateObject: moment(),
    allmonths: moment.months(),
    selectedDay: null,
    monthInstance: null,
    yearInstance: null
  };

  componentDidMount(){
    this.setState({
        monthInstance: M.Dropdown.init(this.monthDropdown),
        yearInstance: M.Dropdown.init(this.yearDropdown)
    });
  }

  weekdayshort = moment.weekdaysShort();

  year = () => {
    return this.state.dateObject.format("Y");
  };

  month = () => {
    return this.state.dateObject.format("MMMM");
  };

  closeModal = () => {
      this.setState({ selectedDay: null });
  }

  getMonthNo = (month) => this.state.allmonths.indexOf(month);

  setMonth = month => {
    let monthNo = this.getMonthNo(month);
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("month", monthNo);
    this.setState({
      dateObject: dateObject
    });
  };

  MonthList = ({ months }) => {
    let monthList = [];
    months.map(month => {
      monthList.push(
        <li
          key={month}
          className="calendar-month"
          onClick={() => {
            this.setMonth(month);
          }}
        >
          <a href="#!" className="black-text">{month}</a>
        </li>
      );
      return month;
    });

    return (
        <ul id='monthDropdown' className='dropdown-content'>{monthList}</ul>
    );
  };

  onPrev = () => {
    let curr = "month";
    this.setState({
      dateObject: this.state.dateObject.subtract(1, curr)
    });
  };

  onNext = () => {
    let curr = "month";
    this.setState({
      dateObject: this.state.dateObject.add(1, curr)
    });
  };

  setYear = year => {
    let dateObject = Object.assign({}, this.state.dateObject);
    dateObject = moment(dateObject).set("year", year);
    this.setState({
      dateObject: dateObject,
    });
  };

  onYearChange = e => {
    this.setYear(e.target.value);
  };

  getYears = (startDate, stopDate) => {
    var dateArray = [];
    var currentDate = moment(startDate);
    stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY"));
      currentDate = moment(currentDate).add(1, "year");
    }
    return dateArray;
  }

  YearTable = ({year}) => {
    let yearList = [];
    let nextFive = moment()
      .set("year", year)
      .add(4, "year")
      .format("Y");

    let fiveYear = this.getYears(year, nextFive);

    fiveYear.map(data => {
      var classNames = "calendar-year";
      if (data === year) {
        classNames += " current-year"
      }
      yearList.push(
        <li
          key={data}
          className={classNames}
          onClick={() => {
            this.setYear(data);
          }}
        >
          <a href="#!" className="black-text">{data}</a>
        </li>
      );
      return data;
    });

    return (
      <ul id='yearDropdown' className='dropdown-content'>{yearList}</ul>
    );
  };

  onDayClick = (e, d) => {
    this.setState({ selectedDay: d });
  };

  render() {
    const { user, events } = this.props;

    const weekdayshortname = this.weekdayshort.map(day => {
      return <th key={day}>{day}</th>;
    });

    return (
      <div className="tail-datetime-calendar"> 

       <div className="calendar-navi">
          <span className="button-prev">
            <i 
              className="material-icons grey-text text-darken-2"
              onClick={e => {
                this.onPrev();
              }}
            >navigate_before</i>
          </span>
          <span className="calendar-button button-next">
            <i 
              className="material-icons grey-text text-darken-2"
              onClick={e => {
                this.onNext();
              }}
            >navigate_next</i>
          </span>
          <a className='calendar-label dropdown-trigger btn' href='#!' data-target='monthDropdown' ref={ (e) => {this.monthDropdown = e} }>
            {this.month()}
            <i className="material-icons grey-text text-darken-2">keyboard_arrow_down</i>
          </a>
          <this.MonthList months={moment.months()} />
          <a className='calendar-label dropdown-trigger btn' href='#!' data-target='yearDropdown' ref={ (e) => {this.yearDropdown = e} }>
            {this.year()}
            <i className="material-icons grey-text text-darken-2">keyboard_arrow_down</i>
          </a>
          <this.YearTable year={moment().format("Y")} />
        </div>

        {this.state.showDateTable && (
          <div className="calendar-data">
            <table className="calendar-day">
              <thead>
                <tr>{weekdayshortname}</tr>
              </thead>
              {user && events && (
                  <Days dateObject={this.state.dateObject} onDayClick={this.onDayClick} events={events} user={user} />
                )}
            </table>
          </div>
        )}
        
        {this.state.selectedDay && <Modal year={() => this.year()} month={() => this.month()} day={this.state.selectedDay} closeModal={this.closeModal} />}

      </div>
    );
  }
}

export default Calendar;