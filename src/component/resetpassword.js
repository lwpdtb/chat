import React from 'react'
import { Modal,Button, message,Input,Form, Icon, } from 'antd';
import Resetform from './resetform'
const FormItem = Form.Item;


class Resetpassword extends React.Component {
  constructor(props){
      super()
      this.state = {
        ModalText: 'you need get a identifying code',
        visible: props.visible,
        confirmLoading: false,
        // current: 0,
        okText:'Send',
        do:''
      }
      this.handleOk=this.handleOk.bind(this)
      this.ModalText=this.ModalText.bind(this)
  }

  
  componentWillReceiveProps(a,b){
      console.log(a)

      if(a.visible!==this.state.visible&&a.visible!==false){
        // console.log(a)
          this.setState({
            visible:a.visible
          })
      }
      if(a.visible==false){
        this.setState({
        okText:'Send',
        ModalText:'you need get a identifying code',
        do:0
        })
      }
  }

  ModalText(){
    this.setState({
      ModalText:'Code has been sent to your Email'
    })
  }
  

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  
  
  handleOk = () => {
    // if(this.state.current==0){
      // ajax('post')
      this.setState({
        confirmLoading: true,
        
      });
      setTimeout(() => {
        this.setState({
          // visible: false,
          confirmLoading: false,
          // current:1,//需要修改
          ModalText:'Code has been sent to your Email',
          okText:'Next'
        });
      }, 2000);

    // }else{


    // }
    
  }
  handleCancel = () => {
    // if(this.state.current==0){
      this.props.closevisible()
      this.setState({
        visible: false,
        
      });
    // }
    // else{
      // this.setState({
      //   visible: false,
      //   current:0
      // });
    // }
    
  }
  render() {
    const { visible, confirmLoading, ModalText  } = this.state;
    
    let dom=
    // this.state.current==0?
    <div>
    <Modal title="Title"
      visible={visible}
      onOk={this.handleOk}
      confirmLoading={confirmLoading}
      onCancel={this.handleCancel}
      // okText={this.state.okText}
      footer={null}
    >
      <p>{ModalText}</p>
      <Resetform ModalText={this.ModalText} okText={this.state.okText} do={this.state.do} handleCancel={this.handleCancel}/>
    </Modal>
    </div>
    // :
    // <div>
    // <Modal title="Title"
    // visible={visible}
    // onOk={this.handleOk}
    // confirmLoading={confirmLoading}
    // onCancel={this.handleCancel}
    // >
    // <p>{ModalText}</p>
    // <Input placeholder="新密码" />
    // <Input placeholder="新密码确认" />
    
    // </Modal>
    // </div>
    return (
      dom
    );
  }
}

export default Resetpassword;
