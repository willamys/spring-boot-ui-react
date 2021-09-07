import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PersonService from "./PersonService";
import {withRouter} from 'react-router-dom';

class PersonComponent  extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            nome: '',
            sobrenome: ''
        }
    }

    componentDidMount() {

        console.log(this.state.id)

        // eslint-disable-next-line
        if (this.state.id == -1) {
            return
        }

        PersonService.retrievePerson(this.state.id)
            .then(response => this.setState({
                nome: response.data.nome,
                sobrenome: response.data.sobrenome
            }));
    }

    validate(values) {
        let errors = {}
        if (!values.nome) {
            errors.nome = 'Enter a Nome';
        }
        if(!values.sobrenome){
            errors.sobrenome = 'Enter a Sobrenome';
        }
        return errors
    }
    onSubmit = (values) => {
        let person = {
            id: values.id,
            nome: values.nome,
            sobrenome: values.sobrenome
        }

        if (values.id == -1) {
            PersonService.createPerson(person)
                .then(() => {
                        this.props.history.push({ pathname:'/pessoa/all/',
                            state: { message: 'Add  person ' + person.nome+ ' Successful'} }
                        )}
                    )
        } else {
            PersonService.updatePerson(values.id, person)
                .then(() => this.props.history.push('/pessoa/all/'));
        }
    }
    render() {
        let {nome, sobrenome, id} = this.state;
        return (<div className="container">
                <h1>Person Application</h1>
                <h3>Person</h3>
                <Formik
                    initialValues={{ id, nome, sobrenome }}
                    onSubmit={this.onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}
                >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="nome" component="div"
                                              className="alert alert-warning" />
                                <ErrorMessage name="sobrenome" component="div"
                                              className="alert alert-warning" />
                                <fieldset className="form-group">
                                    <label>Id</label>
                                    <Field className="form-control" type="text" name="id" disabled />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Nome</label>
                                    <Field className="form-control" type="text" name="nome" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Sobrenome</label>
                                    <Field className="form-control" type="text" name="sobrenome" />
                                </fieldset>
                                <button className="btn btn-success" type="submit">Save</button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        );
    }
}

export default PersonComponent;