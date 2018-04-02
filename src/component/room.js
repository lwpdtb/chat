import React, {Component} from 'react';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

class Room extends Component {//左侧组件
    constructor(props) {
        super();
        this.state = {
        
        }
        
    }

    componentWillReceiveProps(a){
       
    }

    componentDidMount(){
 
   }


    render() {
        return (
            <Layout>
            <Header>Header</Header>
            <Content>Content</Content>
            <Footer>Footer</Footer>
            </Layout>
        )
    }
}
export default Room;


