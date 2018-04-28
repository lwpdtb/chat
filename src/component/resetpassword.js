import { Modal,  } from 'antd';
import { Button, message } from 'antd';
import React, { PropTypes } from 'react'
import { Input } from 'antd';


class Resetpassword extends React.Component {
  constructor(props){
      super()
      this.state = {
        ModalText: '验证码已经发送至您的邮箱，请查收',
        visible: props.visible,
        confirmLoading: false,
        current: 0,
      }
      this.handleOk=this.handleOk.bind(this)
  }
  
  componentWillReceiveProps(a,b){
      if(a.visible!==this.state.visible&&a.visible==true){
          this.setState({
            visible:a.visible
          })
      }
  }
  
  
  
  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }
  render() {
    const { visible, confirmLoading, ModalText  } = this.state;
    
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Open</Button>
        <Modal title="Title"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{ModalText}</p>
          <Input placeholder="6位随机验证码" />
        </Modal>
      </div>
    
    
    
    );
  }
}

export default Resetpassword;
