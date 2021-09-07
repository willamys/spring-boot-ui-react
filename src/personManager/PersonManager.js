import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListPerson from "./ListPerson";

class PersonManager extends React.Component {

    render() {
        return (<div>
            <h1>Person Application</h1>
            <ListPerson />
        </div>);
    }
}
export default PersonManager;