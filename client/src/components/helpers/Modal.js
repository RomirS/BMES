import React from 'react';
import M from 'materialize-css';

import TimePicker from './TimePicker';
import months from 'data/months.json';
import './modal.css';

class Modal extends React.Component {
    state = {
        month: this.props.month(),
        year: this.props.year(),
        instance: null,
        monthInput: null,
        yearInput: null,
        timePicker: {
            1: null,
            2: null
        }
    }

    componentDidMount(){
        const createData = new Promise((resolve) => {
            let years = {};
            for (var i = 0; i < 5; i++) {
                let addYear = (parseInt(this.props.year()) + i).toString();
                years[addYear] = null;
            }
            resolve(years)
        });

        createData.then(years => {
            this.setState({
                instance: M.Modal.init(this.modal, { onCloseStart: this.props.closeModal }),
                month: M.Autocomplete.init(this.monthInput, { data: months }),
                year: M.Autocomplete.init(this.yearInput, { data: years }),
                timepicker: {
                    1: M.Timepicker.init(this.timepicker1),
                    2: M.Timepicker.init(this.timepicker2)
                }
            });
        });
    }

    componentDidUpdate() {
        if (this.props.day && !this.state.instance.isOpen) this.state.instance.open();
        if (this.state.month !== this.props.month()) {
            this.setState({
                month: this.props.month()
            });
        };
        if (this.state.year !== this.props.year()) {
            this.setState({
                year: this.props.year()
            });
        };
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        });
    };

    render() {
        return (
            <div className="modal" ref={ (e) => {this.modal = e} }>
                <div className="modal-content">
                    <form action="" className="col s12 event-form" autoComplete="off">
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="eventName" type="text" className="blue-text" placeholder="New Event" style={{fontSize: '40px', paddingBottom: '10px'}} />
                            </div>
                        </div>
                        <div className="row">
                            {typeof this.state.month == 'string' && (
                                <div className="input-field col s3" key={this.state.month}>
                                    <input id="month" className="autocomplete" type="text" placeholder="Month" defaultValue={this.state.month} ref={(e) => this.monthInput = e} />
                                </div>
                            )}
                            <div className="input-field col s3">
                                <input id="day" type="text" placeholder="Day" defaultValue={this.props.day} />
                            </div>
                            <div className="input-field col s3" key={this.state.year}>
                                <input id="year" type="text" placeholder="Year" defaultValue={this.state.year} ref={(e) => this.yearInput = e} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="start" name="start" type="text" className="timepicker" ref={(e) => this.timepicker1 = e} />
                                <label htmlFor="start">From</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="end" name="end" type="text" className="timepicker" ref={(e) => this.timepicker2 = e} />
                                <label htmlFor="start">To</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea id="description" className="materialize-textarea"></textarea>
                                <label htmlFor="description">Description</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close btn-flat waves-effect waves-yellow">Submit</a>
                </div>
            </div>
        )
    }
}

export default Modal;