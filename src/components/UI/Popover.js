import React from 'react';
import { Popover, PopoverHeader, PopoverBody, Button } from 'reactstrap';
import Aux from '../../hoc/Aux';

const popover = (props) => {
    return (
        <Aux>
            {'  '}<Button id="Popover1" size="sm" color="info" onClick={props.toggle}>Explaination</Button> 
            <Popover placement="bottom" isOpen={props.popoverOpen} target="Popover1" toggle={props.toggle}>
                <PopoverHeader>Question Explaination</PopoverHeader>
                <PopoverBody>{props.question.explaination}</PopoverBody>
            </Popover>
        </Aux>
    );
};


export default popover;