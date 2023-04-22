import { Button, Modal } from 'antd';
import { useState } from 'react';

const ModalDynamic = (props) => {
   

    return (

        <>
            {/* <Button type="primary" onClick={showModal}>
                Open Modal
            </Button> */}
            <Modal title={props.title} open={props.isModalOpen} onOk={props.handleOk} onCancel={props.handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
};
export default ModalDynamic;