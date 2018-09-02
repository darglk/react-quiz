import React, { Component } from 'react';
import { 
    FormGroup, 
    Form, 
    Input, 
    Button, 
    ListGroup, 
    ListGroupItem, 
    InputGroupAddon,
    InputGroupText,
    InputGroup
 } from 'reactstrap';
import PropTypes from 'prop-types';

class QuestionForm extends Component {
    render() {
        const answers = this.props.question.answers;
        const inputs = Object.keys(answers).map((key, index) => {
            return (
                <ListGroupItem key={key}>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <Input
                                    checked={index === 0 ? "checked": ""}
                                    addon
                                    type="radio" 
                                    name="question" 
                                    value={key} 
                                    onChange={this.props.handleChange}
                                    aria-label="Radio for following text input"
                                    />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder={key+ ": "+ answers[key]} disabled/>
                    </InputGroup>
                </ListGroupItem>
            );
        });
        return (
            <ListGroup>
                <Form onSubmit={this.props.handleSubmit}>
                    <h4>Now, <strong style={{color: "green"}}>{this.props.answering.name}</strong> is answering the question.</h4>
                    <FormGroup tag="fieldset">
                        <ListGroupItem active>{this.props.question.question}</ListGroupItem>
                        {inputs}
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </Form>
            </ListGroup>
        );
    }
}

QuestionForm.propTypes = {
    answering: PropTypes.object,
    question: PropTypes.object,
    handleSubmit: PropTypes.func,
    handleChange: PropTypes.func
};

export default QuestionForm;
