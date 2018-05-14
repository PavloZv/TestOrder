import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

class Order extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showMessage: false,
            message: '',
            color: '',
            form: {
                customer: '',
                provider: '',
                type: 'wholesale',
                dateOfCreate: '',
                dateOfDone: '',
            }
        };

        this.handleForm = this.handleForm.bind(this);
        this.handleUpdateForm = this.handleUpdateForm.bind(this);
        this.handleCustomer = this.handleCustomer.bind(this);
        this.handleProvider = this.handleProvider.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleDateOfCreate = this.handleDateOfCreate.bind(this);
        this.handleDateOfDone = this.handleDateOfDone.bind(this);
    }

    componentWillMount() {
        let id = this.props.match.params.id;

        if (id !== undefined) {
            axios.get(`/order/${id}`)
                .then(response => {
                   this.setState({
                       ...this.state,
                       form: this.prepareDate(response.data.order),
                       id: id,
                   });
                });
        }
    }

    prepareDate(data) {

        data.dateOfCreate = data.dateOfCreate.split(' ')[0];
        data.dateOfDone = data.dateOfDone.split(' ')[0];

        return data;
    }

    handleCustomer(e) {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                customer: e.target.value,
            }
        });
    }

    handleProvider(e) {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                provider: e.target.value,
            }
        });
    }

    handleType(e) {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                type: e.target.value,
            }
        });
    }

    handleDateOfCreate(e) {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                dateOfCreate: e.target.value,
            }
        });
    }

    handleDateOfDone(e) {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                dateOfDone: e.target.value,
            }
        });
    }

    handleForm(e) {
        e.preventDefault();

        axios.post('/order', this.state.form)
            .then(response => {
                if (response.data.status === 'ok') {
                    this.setState({
                        ...this.state,
                        showMessage: false,
                        form: {
                            customer: '',
                            provider: '',
                            type: 'wholesale',
                            dateOfCreate: '',
                            dateOfDone: '',
                        }
                    })
                }
            })
            .catch(error => {
                if (error.response.status === 422) {
                    this.setState({
                        ...this.state,
                        showMessage: true,
                        message: 'Fill in all fields',
                        color: 'red',
                    });
                }
            });
    }

    handleUpdateForm(e) {
        e.preventDefault();

        axios.post(`/order/${this.state.id}`, this.state.form)
            .then(response => {
                if (response.data.status === 'ok') {
                    this.setState({
                        ...this.state,
                        showMessage: true,
                        message: 'Order updated success',
                        color: 'green',
                    });
                }
            })
            .catch(error => {
                if (error.response.status === 422) {
                    this.setState({
                        ...this.state,
                        showMessage: true,
                        message: 'Fill in all fields',
                        color: 'red',
                    });
                }
            });
    }


    render() {
        return (
            <div className="card">
                <div
                    style={{display: this.state.showMessage ? 'block' : 'none', color: this.state.color, textAlign: 'center'}}
                    className="card-header"
                >
                    <h5>{this.state.message}</h5>
                </div>
                <div className="card-body">
                    <div className="card-title">
                        <Link to="/" className="btn btn-primary">Home</Link>
                        <Link to="/list" className="btn btn-primary float-right">List</Link>
                    </div>

                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Customer</label>
                                <input type="text"
                                       className="form-control"
                                       onChange={this.handleCustomer}
                                       value={this.state.form.customer}
                                       placeholder="Customer"
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Provider</label>
                                <input type="text"
                                       className="form-control"
                                       placeholder="Provider"
                                       onChange={this.handleProvider}
                                       value={this.state.form.provider}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Type</label>
                            <select className="form-control"
                                    value={this.state.form.type}
                                    onChange={this.handleType}
                            >
                                <option value="wholesale">Wholesale</option>
                                <option value="retail">Retail</option>
                            </select>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Date of create</label>
                                <input type="date"
                                       className="form-control"
                                       placeholder="Date of create"
                                       value={this.state.form.dateOfCreate}
                                       onChange={this.handleDateOfCreate}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Date of done</label>
                                <input type="date"
                                       className="form-control"
                                       placeholder="Date of done"
                                       value={this.state.form.dateOfDone}
                                       onChange={this.handleDateOfDone}
                                />
                            </div>
                        </div>
                        {this.state.id
                            ? <button type="submit" onClick={this.handleUpdateForm} className="btn btn-primary">
                                    Update
                                </button>
                            : <button type="submit" onClick={this.handleForm} className="btn btn-primary">
                                    Add new order
                                </button>
                        }
                    </form>

                </div>
            </div>
        );
    }
}

export default Order;
