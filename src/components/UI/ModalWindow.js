import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalWindow extends Component {

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render () {
        return (
            <Modal isOpen={this.props.show} toggle={this.props.toggle}>
                <ModalHeader>{this.props.modalHeader}</ModalHeader>
                <ModalBody>
                    {this.props.modalBody}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.props.toggle}>Ok</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default ModalWindow;
