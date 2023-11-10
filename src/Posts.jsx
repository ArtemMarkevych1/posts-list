import {Table, Spin, Button, notification} from 'antd';
import {observer} from 'mobx-react';
import {useEffect, useState} from 'react';
import {store} from './store';
import ModalComponent from "./Modal";

const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Body',
        dataIndex: 'body',
        key: 'body',
    },
];

const Posts = observer(() => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const onOk = () => {
        store.createPost(title, body)
            .then(() => {
                if (store.success) {
                    notification.success({
                        message: 'Post Created',
                        description: 'The post has been created successfully!',
                    });
                    setIsModalVisible(false);
                    setTitle("")
                    setBody("")
                }
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        store.fetchPosts();
        return () => store.abortRequest();
    }, []);

    return (
        <Spin spinning={store.loading}>
            <Table
                columns={columns}
                dataSource={store.posts}
                rowKey={(record) => record.id}
            />

            <Button onClick={() => setIsModalVisible(true)}>Add Post</Button>

            <ModalComponent
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                title={title}
                setTitle={setTitle}
                body={body}
                setBody={setBody}
                onOk={onOk}
            />
        </Spin>
    );
});

export default Posts;