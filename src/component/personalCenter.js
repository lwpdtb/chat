import React from 'react'
import { Collapse,Form, Input, Tooltip, Icon, Modal , Button, Upload,Spin} from 'antd';
import {ajax} from '../fatch.js'
const Panel = Collapse.Panel;
const FormItem = Form.Item;


const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const customPanelStyle = {
    background: 'rgba(1,1,1,0.7)',
    borderRadius: '4px',
    marginBottom: '12px',
    border: '0px',
    overflow: 'hidden',
    width: '95%',
    marginLeft: '2.5%',
    fontWeight: 'bold',
};


class personalEmail extends React.Component {
    state = {
      confirmDirty: false,
    };
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
    
    render() {
      const { getFieldDecorator } = this.props.form;
      const { autoCompleteResult } = this.state;
  
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
     
     
  
      
  
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="E-mail"
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input />
            )}
          </FormItem>
          
        </Form>
      );
    }
  }


  class personalInformation extends React.Component {
    constructor(props){
      super()
      this.state = {
        confirmDirty: false,
        edit:false,
        previewVisible: false,
        previewImage: '',
        fileList: [],
        baseData:''
      };
    }



    componentWillMount(){
      
    }
    

    componentDidMount(a,b){
      
        let fileList=this.state.fileList
        let file={
          uid: -1,
          name: 'xxx.png',
          status: 'done',
          url: 
          ''+this.props.baseData.Head_img+'',
        }
        fileList.push(file)
        this.props.form.setFieldsValue({
          base_username: `${this.props.baseData.username}`,
        });
        this.setState({
          fileList:fileList,
        })
      
    }

    
    

    componentWillUpdate (){
      console.log(this.props)
    // 
    }
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
      this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
      });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })

    normFile = (e) => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    }

    
    
    render() {
      const { getFieldDecorator } = this.props.form;
      const { autoCompleteResult } = this.state;
      const { previewVisible, previewImage, fileList } = this.state;
      const formItemLayout = {
        labelCol: {
          sm: { span: 6 },
        },
        wrapperCol: {
          sm: { span: 14 },
        },
      };
      const uploadButton = (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">Upload</div>
        </div>
      );

      // if(this.state.baseData!==''){
      //   this.props.form.setFieldsValue({
      //     base_username: `${this.state.baseData!==''? this.state.baseData.username : 'no name'}!`,
      //   });
      // }

      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem
              {...formItemLayout}
              label=""
            >
            <div className="clearfix">
              <Upload
                action="//localhost:4000/img"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
              {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </div>
          </FormItem>
          <FormItem
              {...formItemLayout}
              label="Username"
            >
              {getFieldDecorator('base_username', {
              })(
                <Input disabled/>//setFieldsValue
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Nickname"
          >
            {getFieldDecorator('base_nickname', {
              rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
            })(
              <Input disabled={this.state.edit}/>
            )}
          </FormItem>
          <FormItem
              {...formItemLayout}
              label="Password"
            >
              {getFieldDecorator('base_password', {
                rules: [{
                  required: true, message: 'Please input your password!',whitespace: true
                }],
              })(
                <Input type="password" disabled={this.state.edit}/>
              )}
          </FormItem>
         
          
        </Form>
      );
    }
  }
  
  const PersonalEmail = Form.create()(personalEmail);
  const PersonalInformation = Form.create()(personalInformation);
  


class PersonalCenter extends React.Component {
    constructor(props){
        super()
        this.state = {
          iconLoading:false,
          defaultKey:2,
          baseData:''
        }
        this.onChange=this.onChange.bind(this)
    }
    onChange(e){
      console.log(e)
    }

    componentDidMount(){
      let that=this;
      let callback=(data)=>{
        that.setState({
          baseData:data
        })
      }
      let errorback=()=>{
        
      }
      let befor=()=>{
        
      }
      ajax('get','getBaseinformation','',callback,errorback,befor)

    }

    
  render() {
    console.log(this.state)
    

    return (
        <Collapse accordion bordered={false} defaultActiveKey={['2']} onChange={this.onChange}>
    <Panel header="Associated mailbox" key="1" style={customPanelStyle}>
      <p>{'It is used to associate your account with a useful mailbox. When you retrieve the password, a verification code will be sent to this mailbox'}</p>
      <PersonalEmail/>
    </Panel>
    <Panel header="Base information" key="2" style={customPanelStyle}>
      {this.state.baseData!==''?<PersonalInformation baseData={this.state.baseData}/>:<Spin/>}
    </Panel>
    <Panel header="Log out" key="3" style={customPanelStyle}>
    <Button type="primary" icon="poweroff" loading={this.state.iconLoading} onClick={this.enterIconLoading} style={{width: '100%'}}>
      Log out!
    </Button>
    </Panel>
    
    
  </Collapse>
    );
  }
}




export default PersonalCenter



