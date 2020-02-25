import React from 'react';
import { Form } from 'react-bootstrap';

export default class TextField extends React.Component
{
    constructor(props)
    {
        super(props);

        this.id = props.field.id;
        this.label = props.field.label;
        this.required = props.field.required;
        this.placeholder = props.field.placeholder;

        this.onChange = props.onChange;
        this.error = props.error;
        this.init_value = props.value;

        this.state = {
            value: this.init_value != null ? this.init_value : '',
        };

        this.onChange({
            id: this.id,
            value: this.state.value,
        });
    }

    handleChange(e)
    {
        this.setState({
            value: e.target.value,
        });

        this.onChange({
            id: e.target.id,
            value: e.target.value,
        });
    }

    render()
    {
        return (
            <Form.Group controlId={ this.id }>
                <Form.Label>{ this.label }</Form.Label>
                <Form.Control
                    name={ this.id }
                    type="text"
                    placeholder={ this.placeholder }
                    required={ this.required }
                    onChange={ this.handleChange.bind(this) }
                    value={ this.state.value }
                    isInvalid={ this.error != null }
                />
            </Form.Group>
        );
    }
}
