import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

class Orders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: []
        }

    }

    componentWillMount() {
        axios.get('/orders').then(
            response => {
                this.setState({
                    ...this.state,
                    orders: response.data.data,
                });
            }
        )
    }

    isEditable(dateOfDone) {
        let now = new Date();
        let done = new Date(dateOfDone);

        let days = Math.floor((done - now) / (1000*60*60*24));

        return days > 3;
    }

    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <Link to="/" className="btn btn-primary">Home</Link>
                            <Link to="/order" className="btn btn-primary float-right">Add order</Link>
                        </div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Order Id</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Customer</th>
                                    <th scope="col">Provider</th>
                                    <th scope="col">Date of create</th>
                                    <th scope="col">Date of done</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.orders.map((value, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index}</th>
                                        <td>{value.orderId}</td>
                                        <td>{value.type}</td>
                                        <td>{value.customer}</td>
                                        <td>{value.provider}</td>
                                        <td>{value.dateOfCreate}</td>
                                        <td>{value.dateOfDone}</td>
                                        <td>
                                            {this.isEditable(value.dateOfDone) &&
                                                <Link to={`/order/${value.id}`}>Edit</Link>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Orders;
