import React, {Component} from "react";
import Main from "./Main";
import Header from "./Header";

class App extends Component {
    render() {
        return (
            <div style={{margin: '0 auto', width: 1200}}>
                <Header />
                <Main />
            </div>
        );
    }
}

export default App;
