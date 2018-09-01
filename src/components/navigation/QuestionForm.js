import React, { Component } from 'react';
import { FormGroup, Form, Label, Input, Button } from 'reactstrap';


class QuestionForm extends Component {
    render() {
        const answers = this.props.question.answers;
        const inputs = Object.keys(answers).map(key => {
            return (
                <FormGroup key={key}>
                    <Label check>
                        <Input 
                        type="radio" 
                        name="question" 
                        value={key} 
                        onChange={this.props.handleChange}/>{' '}
                        {key}: {answers[key]}
                    </Label>
                </FormGroup>
            );
        });
        return (
            <Form onSubmit={this.props.handleSubmit}>
                <h6>Now, {this.props.answering.name} is answering the question.</h6>
                <FormGroup tag="fieldset">
                    <legend>{this.props.question.question}</legend>
                    {inputs}
                </FormGroup>
                <Button type="submit">Submit</Button>
            </Form>
        );
    }
}



export default QuestionForm;
