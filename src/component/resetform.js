import React from 'react'
import { Form, Icon, Input, Button, Checkbox,notification } from 'antd';
import {ajax} from '../fatch';

const FormItem = Form.Item;

class Resetform extends React.Component {
    constructor(props){
        super()
        this.state = {
          okText:props.okText,
          ModalText:props.ModalText,          
          loading:false,
          do:props.do,
          checkVerification:false
        }
        this.hasErrors=this.hasErrors.bind(this)
    }

    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
      }


  componentDidMount() {
    this.props.form.validateFields();
  }

  componentWillReceiveProps(a,b){
    console.log(a)
    if(a.okText!==null&&a.okText!==''&&this.state.do==0){
      this.setState({
        okText:a.okText
      })
    }
    if(a.do===0&&this.state.do!==2){
      this.setState({
        do:a.do,
        checkVerification:false
      })
    }

  }

  

  handleSubmit = (e) => {
    
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let that=this;
        let callback=(data)=>{
          setTimeout(()=>{
            // if(data=='ok'){
            //   this.props.login()            
            // }else{
            //   const openNotificationWithIcon = (type) => {
            //     notification[type]({
            //       message: '无法登陆',
            //       description: '原因：'+data,
            //     });
            //   };
            //   openNotificationWithIcon('error')
            // }
            that.props.ModalText();
            that.setState({
              loading:false,
              okText:'Next',
              do:2,
              checkVerification:true
            },() => {
              this.props.form.validateFields(['Verification'], { force: true });
              this.props.form.validateFields(['new_password'], { force: true });
              
            })

          },1000)
        }
        let errorback=(data)=>{
          setTimeout(()=>{
            const openNotificationWithIcon = (type) => {
              notification[type]({
                message: 'wrong:',
                description: data,
              });
            };
            openNotificationWithIcon('error')
            that.setState({
              loading:false
            })
          },1000)
        }
        let befor=()=>{
          that.setState({
            loading:true
          })
        }
        let data=values;
      ajax('post','send',data,callback,errorback,befor)
      }
    });
  }



  handleSubmit2 = (e) => {
    
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let that=this;
        let callback=(data)=>{
          setTimeout(()=>{
            // if(data=='ok'){
            //   this.props.login()            
            // }else{
              const openNotificationWithIcon = (type) => {
                notification[type]({
                  message: 'success',
                  description: 'Use the new password to log in',
                });
              };
              openNotificationWithIcon('success')
            // }
            that.props.handleCancel();
            that.props.form.resetFields()
            that.setState({
              loading:false,
              // okText:'Next',
              do:'',

            })

          },1000)
        }
        let errorback=(data)=>{
          setTimeout(()=>{
            const openNotificationWithIcon = (type) => {
              notification[type]({
                message: 'wrong:',
                description: data,
              });
            };
            openNotificationWithIcon('error')
            that.setState({
              loading:false
            })
          },1000)
        }
        let befor=()=>{
          that.setState({
            loading:true
          })
        }
        let data=values;
      ajax('post','resetPassword',data,callback,errorback,befor)
      }
    });
  }
  render() {
    console.log(this.state)
    const { getFieldDecorator,getFieldsError } = this.props.form;
    
    let dom=<Form onSubmit={this.state.okText=='Next'?this.handleSubmit2:this.handleSubmit} className="reset-form">
    
    {this.state.okText=='Next'&&
    <FormItem
        >
          {getFieldDecorator('new_password', {
            rules: [{
              required: true, message: 'Can\'t be empty!Max length is 16',max:16
            }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Please input your new password!"/>
          )}
        </FormItem>
        
    }
    
    {this.state.okText=='Send'&&<FormItem>
    {getFieldDecorator('text_username', {
      rules: [{ required: true, message: 'Can\'t be empty!Max length is 16' ,max:16}],
    })(
      <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Please input your username" />
    )}
  </FormItem>}
    {<FormItem>
    {getFieldDecorator('Verification', {
      rules: [{
        required: this.state.checkVerification,
        message: 'Please input Verification code',
      }],
    })(
      <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} disabled={this.state.checkVerification?false:true} type="password" placeholder="" />
    )}
  </FormItem>}
    
    
    

    <div style={{display: 'flex','justifyContent': 'flex-end'}}>
    <Button loading={this.state.loading} type="primary" htmlType="submit" className="form-button ok" disabled={this.hasErrors(getFieldsError())}>
      {this.state.okText}
    </Button>
    
    </div>
    
     
    
  </Form>

    return (
        dom
    );
  }
}

const WrappedNormalLoginForm = Form.create()(Resetform);


export default WrappedNormalLoginForm

