import React from "react";
import moment from "moment";
import M from 'materialize-css';

import "./calendar.css";
import Modal from './Modal'

class Calendar extends React.Component {
  weekdayshort = moment.weekdaysShort();

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

  daysInMonth = () => {
    return this.state.dateObject.daysInMonth();
  };

  year = () => {
    return this.state.dateObject.format("Y");
  };

  month = () => {
    return this.state.dateObject.format("MMMM");
  };
  
  currentDay = () => {
    return this.state.dateObject.format("D");
  };

  compare = () => {
    return this.month() === moment().format("MMMM") && this.year() === moment().format("Y");
  }

  closeModal = () => {
      this.setState({ selectedDay: null });
  }

  firstDayOfMonth = () => {
    let dateObject = this.state.dateObject;
    let firstDay = moment(dateObject)
      .startOf("month")
      .format("d");
    return firstDay;
  };

  setMonth = month => {
    let monthNo = this.state.allmonths.indexOf(month);
    console.log(monthNo);
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
          onClick={e => {
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

  getDates(startDate, stopDate) {
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

    let fiveYear = this.getDates(year, nextFive);

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
    const { user } = this.props;

    let weekdayshortname = this.weekdayshort.map(day => {
      return <th key={day}>{day}</th>;
    });
    let daysInMonth = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      daysInMonth.push(<td className="calendar-day empty" key={'blank' + i}>{""}</td>);
    }
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let currentDay = (d === parseInt(this.currentDay()) && this.compare()) ? "today" : "";
      daysInMonth.push(
        <td 
            key={d} 
            className={`calendar-day ${currentDay}`} 
        >
          <div>{d}</div>
          {user.isAdmin && <div
            className="add_event"
            onClick={e => {
              this.onDayClick(e, d);
            }}
          >
            <i className="material-icons yellow-text text-darken-4" style={{fontSize: '16px'}}>add</i>
          </div>}
        </td>
      );
    }
    let remaining = 7 - (parseInt(this.firstDayOfMonth()) + parseInt(this.daysInMonth())) % 7;
    remaining = remaining === 7 ? 0 : remaining;
    for (let i = 0; i < remaining; i++) {
      daysInMonth.push(<td className="calendar-day empty" key={'blank' + i}>{""}</td>);
    }
    let rows = [];
    let cells = [];

    daysInMonth.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === daysInMonth.length - 1) {
        rows.push(cells);
      }
    });

    let daysinmonth = rows.map((d, i) => {
      return <tr key={'daysinmonth' + i}>{d}</tr>;
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
              <tbody>{daysinmonth}</tbody>
            </table>
          </div>
        )}
        
        <Modal year={() => this.year()} month={() => this.month()} day={this.state.selectedDay} closeModal={this.closeModal} />

      </div>
    );
  }
}

export default Calendar;