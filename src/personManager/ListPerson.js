import React from "react";
import { Link } from 'react-router-dom';
import PersonService from "./PersonService";

class ListPerson extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            persons: [],
            message: null
        }
        this.refreshPersons = this.refreshPersons.bind(this)
        this.deletePersonClicked = this.deletePersonClicked.bind(this)
        this.addPersonClicked = this.addPersonClicked(this);
        // this.updatePersonClicked = this.updatePersonClicked(this);
    }

    componentDidMount() {
        this.refreshPersons();
        console.log(this.props.state);
        /* if(!this.props.location.state.message)
             this.setState({message: this.props.location.state.message });*/
    }

    refreshPersons() {
        PersonService.getAllPersons()
            .then(
                response => {
                    console.log(response)
                    this.setState({ persons: response.data });
                }
            )
    }

    deletePersonClicked(id) {
        PersonService.deletePerson(id)
            .then(
                response => {
                    this.setState({ message: 'Delete of person ' + id + ' successful.' })
                    this.refreshPersons()
                }
            )
    }
    addPersonClicked() {
        //this.props.history.render()
    }
    /*updatePersonClicked(id) {
        console.log('update ' + id)
        //this.props.history.push('/pessoa/details/'+id);
    }*/
    render() {
        return (
            <div className="container">
                <h3>All Persons</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Sobrenome</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.persons.map(person =>
                                    <tr key={person.id}>
                                        <td>{person.id}</td>
                                        <td>{person.nome}</td>
                                        <td>{person.sobrenome}</td>
                                        <td><Link to={`/pessoa/details/${person.id}`}><button className="btn btn-success">Update</button></Link></td>
                                        <td><button className="btn btn-danger" onClick={() => this.deletePersonClicked(person.id)}>Delete</button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <Link to={`/pessoa/details/-1`}><button className="btn btn-success" >Add</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListPerson;