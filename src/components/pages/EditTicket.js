import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

const base = process.env.baseURL || "http://localhost:5000"

export default class EditTicket extends Component {
    constructor(props) {
        super(props);

        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            displayName: "",
            category: "",
            priority: "",
            subject: "",
            description: "",
            date: new Date(),
            categoryList: [],
            priorityList: []
        }
    }

    componentDidMount() {
        axios.get(base + '/tickets/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    category: response.data.category,
                    priority: response.data.priority,
                    subject: response.data.subject,
                    description: response.data.description,
                    date: new Date(response.data.date)
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        this.setState({
            categoryList: ['General', 'Billing', 'Login', 'Abuse', 'Website'],
            category: 'General',
            priorityList: ['Low', 'Medium', 'High'],
            priority: 'Low'
        });
    }

    onChangeCategory(e) {
        this.setState({
            category: e.target.value
        });
    }

    onChangePriority(e) {
        this.setState({
            priority: e.target.value
        });
    }

    onChangeSubject(e) {
        this.setState({
            subject: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const ticket = {
            displayName: this.state.displayName,
            category: this.state.category,
            priority: this.state.priority,
            subject: this.state.subject,
            description: this.state.description,
            date: this.state.date
        }

        console.log(ticket);

        axios.post(base + '/tickets/update/' + this.props.match.params.id, ticket)
            .then(res => console.log(res.data));

        window.location = "/";
    }

    render() {
        return (
            <div>
                <h3>Edit Ticket</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Category: </label>
                        <select ref="categoryInput"
                            required
                            className="form-control"
                            value={this.state.category}
                            onChange={this.onChangeCategory}>
                                {
                                this.state.categoryList.map(function(category) {
                                    return <option
                                            key={category}
                                            value={category}>{category}
                                        </option>;
                                    })
                                }
                            </select>
                    </div>
                    <div className="form-group">
                        <label>Priority: </label>
                        <select ref="categoryInput"
                            required
                            className="form-control"
                            value={this.state.priority}
                            onChange={this.onChangePriority}>
                                {
                                this.state.priorityList.map(function(priority) {
                                    return <option
                                            key={priority}
                                            value={priority}>{priority}
                                        </option>;
                                    })
                                }
                            </select>
                    </div>
                    <div className="form-group">
                        <label>Subject: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.subject}
                            onChange={this.onChangeSubject}
                            />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit Ticket" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}