import { Avatar, List } from 'antd';

// const data = [
//     {
//         title: 'Ant Design Title 1',
//     },
//     {
//         title: 'Ant Design Title 2',
//     },
//     {
//         title: 'Ant Design Title 3',
//     },
//     {
//         title: 'Ant Design Title 4',
//     },
// ];

const ListItems = ({ data }) => (

    <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
            <List.Item
                actions={[<a onClick={() => console.log(item.id)} key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">delete</a>]}
            >
                <List.Item.Meta
                    avatar={<Avatar src={item.imageURL} />}
                    title={<p>{item.date} | {item.title}</p>}
                    description={item.description}
                />
            </List.Item>
        )}
    />
);
export default ListItems;