import React from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';

import TextField from './fields/text';
import PasswordField from './fields/password';

export default class GenericForm extends React.Component
{
    constructor(props)
    {
        super(props);

        this.url = props.url;
        this.method = props.method;
        this.fields = props.fields;
        this.values = props.values;
        this.onSuccess = props.onSuccess;
        this.onForbidden = props.onForbidden;

        this.errors = {};
        this.errorMessage = null;

        this.state = {
            error: false,
            submitting: false,
        };
    }

    handleFieldChange(data)
    {
        this.values[data.id] = data.value;
    }

    async handleSubmit(e)
    {
        e.preventDefault();

        this.errorMessage = null;
        this.setState({
            error: false,
            submitting: true,
        });

        const response = await this.method(this.url, this.values);

        if(response.status === 422)
        {
            this.errorMessage = await response.json();
            this.setState({
                error: true,
                submitting: false,
            });
        }
        else if(response.status === 500)
        {
            this.errorMessage = 'Internal Server Error';
            this.setState({
                error: true,
                submitting: false,
            });
        }
        else if(response.status === 403)
        {
            this.errorMessage = await this.onForbidden();
            this.setState({
                error: true,
                submitting: false,
            });
        }
        else
        {
            if(await this.onSuccess(response.status, response))
            {
                this.setState({
                    submitting: false,
                });
            }
        }
    }

    render()
    {
        return (
            <Form onSubmit={ this.handleSubmit.bind(this) }>
                { this.errorMessage != null &&
                    <Alert variant="danger">
                        { JSON.stringify(this.errorMessage) }
                    </Alert>
                }
                { this.fields.map(field => {
                    return GenericForm.renderField(
                        field,
                        this.values[field.id],
                        this.errors[field.id],
                        this.handleFieldChange.bind(this),
                    );
                }) }
                <> { !this.state.submitting &&
                    <Button variant="primary" type="submit" block>
                        Submit
                    </Button>
                } { this.state.submitting &&
                    <Button variant="primary" disabled type="submit" block>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        &nbsp; Submitting
                    </Button>
                } </>
            </Form>
        );
    }

    static renderField(field, value, error, onChange)
    {
        switch(field.type)
        {
            case 'text-field':
                return (
                    <TextField
                        key={ field.id }
                        field={ field }
                        value={ value }
                        error={ error }
                        onChange={ onChange }
                    />
                );
            case 'password-field':
                return (
                    <PasswordField
                        key={ field.id }
                        field={ field }
                        value={ value }
                        error={ error }
                        onChange={ onChange }
                    />
                );
            default:
                return (
                    <div>
                        { field.type }
                    </div>
                );
        }
    }
}
