import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const base = process.env.baseURL || "http://localhost:5000"

const Ticket = props => (
    <tr>
        <td>{props.ticket.category}</td>
        <td>{props.ticket.priority}</td>
        <td>{props.ticket.subject}</td>
        <td>{props.ticket.description}</td>
        <td>{props.ticket.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.ticket._id}>Edit</Link> | <a href="#" onClick={() => { props.deleteTicket(props.ticket._id) }}>Delete</a>
        </td>
    </tr>
)

export default class TicketsList extends Component {
    constructor(props) {
        super(props);

        this.deleteTicket = this.deleteTicket.bind(this);

        this.state = {tickets: []}
    }

    componentDidMount() {
        axios.get(base + '/tickets/')
            .then(response => {
                this.setState({ tickets: response.data })
            })
            .catch((error) => {
                console.log(error); 
            })
    }

    deleteTicket(id) {
        axios.delete(base + '/tickets/'+id)
            .then(res => console.log(res.data));
        this.setState({
            tickets: this.state.tickets.filter(el => el._id !== id)
        })
    }

    ticketList() {
        return this.state.tickets.map(selectedticket => {
            return <Ticket ticket={selectedticket} deleteTicket={this.deleteTicket} key={selectedticket._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>My Tickets</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Category</th>
                            <th>Priority</th>
                            <th>Subject</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.ticketList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
