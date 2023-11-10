import { Modal, Spin, Form, Input } from 'antd';
import {store} from "./store";

const ModalComponent = ({
                            isModalVisible,
                            setIsModalVisible,
                            title,
                            setTitle,
                            body,
                            setBody,
                            onOk
                        }) => {

    return (
        <Modal
            closeIcon={null}
            open={isModalVisible}
            onOk={onOk}
            onCancel={() => setIsModalVisible(false)}
        >
            <Spin spinning={store.loading}>
                <Form>
                    <Form.Item label="Title">
                        <Input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item label="Body">
                        <Input.TextArea
                            value={body}
                            onChange={e => setBody(e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    );
}

export default ModalComponent;