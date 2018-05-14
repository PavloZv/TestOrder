import React, {Component} from "react";
import {Link} from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="card-title">
                        <Link to="/list" className="btn btn-primary">List</Link>
                        <Link to="/order" className="btn btn-primary float-right">Add order</Link>
                    </div>
                    <p className="card-text text-justify">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias assumenda non omnis praesentium totam! Accusamus consequuntur cumque earum et harum iste iure, laborum nam perspiciatis possimus quaerat, quo ratione similique.
                    </p>
                </div>
            </div>
        )
    }
}

export default Home;
