import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css';

import months from 'data/months.json';
import { addEvent } from 'redux/actions/eventActions';
import './modal.css';

class Modal extends React.Component {
    state = {
        instance: null,
        monthInput: null,
        yearInput: null,
        timePickers: {
            start: null,
            end: null
        },
        form: {
            month: this.props.month(),
            year: this.props.year(),
            day: String(this.props.day)
        }
    }
    static propTypes = {
        addEvent: PropTypes.func.isRequired
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
                timepickers: {
                    start: M.Timepicker.init(this.timepicker1, { onCloseStart: (_) => this.setFormTime('start') }),
                    end: M.Timepicker.init(this.timepicker2, { onCloseStart: (_) => this.setFormTime('end') })
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
            form: {
                ...this.state.form,
                [e.target.id]: e.target.value
            }
        });
    };

    setFormTime = (type) => {
        const { timepickers } = this.state
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [type]: timepickers[type].time
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { eventName, month, day, year, start, end, description } = this.state.form;

        const startTime = new Date(`${day} ${month} ${year} ${start} CST`);
        const endTime = new Date(`${day} ${month} ${year} ${end} CST`);

        this.props.addEvent({ eventName, startTime, endTime, description });
    }

    render() {
        return (
            <div className="modal" ref={ (e) => {this.modal = e} }>
                <form onSubmit={this.handleSubmit} className="col s12 event-form" autoComplete="off">
                    <div className="modal-content">
                        <div className="row">
                            <div className="input-field col s12">
                                <input 
                                    id="eventName" 
                                    type="text" 
                                    className="blue-text" 
                                    placeholder="New Event" 
                                    onChange={this.handleChange}
                                    style={{fontSize: '40px', paddingBottom: '10px'}} 
                                />
                            </div>
                        </div>
                        <div className="row">
                            {typeof this.state.month == 'string' && (
                                <div className="input-field col s3" key={this.state.month}>
                                    <input
                                        id="autocomplete-input"
                                        className="autocomplete" 
                                        type="text" 
                                        placeholder="Month" 
                                        onChange={this.handleChange}
                                        defaultValue={this.state.form.month} 
                                        ref={(e) => this.monthInput = e} 
                                    />
                                </div>
                            )}
                            <div className="input-field col s3">
                                <input 
                                    id="day" 
                                    type="text" 
                                    placeholder="Day" 
                                    onChange={this.handleChange}
                                    defaultValue={this.state.form.day} 
                                />
                            </div>
                            <div className="input-field col s3" key={this.state.year}>
                                <input 
                                    id="autocomplete-input"
                                    className="autocomplete" 
                                    type="text"
                                    placeholder="Year" 
                                    onChange={this.handleChange}
                                    defaultValue={this.state.form.year} 
                                    ref={(e) => this.yearInput = e} 
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input 
                                    id="startTime" 
                                    name="start" 
                                    type="text" 
                                    className="timepicker" 
                                    onChange={this.handleTimeChange}
                                    ref={(e) => this.timepicker1 = e} 
                                />
                                <label htmlFor="start">From</label>
                            </div>
                            <div className="input-field col s6">
                                <input 
                                    id="endTime" 
                                    name="end" 
                                    type="text" 
                                    className="timepicker" 
                                    onChange={this.handleChange}
                                    ref={(e) => this.timepicker2 = e} 
                                />
                                <label htmlFor="start">To</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea 
                                    id="description" 
                                    className="materialize-textarea"
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="description">Description</label>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="blue btn waves-effect waves-light" type="submit" name="action">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({ event }) => ({
    event
});

export default connect(mapStateToProps, { addEvent })(Modal);