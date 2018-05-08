import React, { PropTypes } from 'react'

import {BrowserRouter as Router,Route,Link,Redirect,withRouter,Switch,} from 'react-router-dom'//导入的方式跟之前有点变化
import { Modal,notification,Form, Icon, Input, Tooltip,Button,Cascader,Row, Col, AutoComplete, Checkbox,Tabs, Select,Menu,Avatar,List,Spin } from 'antd';
import Chat from './component/chat';
import Room from './component/room';
import Resetpassword from './component/resetpassword';
import PersonalCenter from './component/personalCenter';



import 'antd/dist/antd.css';
import './App.css';
import {ajax} from './fatch';


// import {anim} from './canvas';


const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;





// socket.emit('connection');


const One = () => (
    <div>
        <h2>首页</h2>
    </div>
)

const Two = () => ( 
    <div>
    <ul>
<li><Link to="/public">Public Page</Link></li>
<li><Link to="/protected">Protected Page</Link></li>
<li><Link to="/two">第二页</Link></li>
<li><Link to="/ists">一个列表</Link></li>
<li><Link to="/chat">点我</Link></li>

</ul>
        <h2>我是第二页</h2>
        <button onClick={() => {
          fakeAuth.signout(() => window.location.reload())
        }}>Sign out</button>
    </div>
)

const ists = ({ match }) => (
    <div>
        <h3>{match.params.ListsId}</h3>
    </div>
)

const ist = ({ match }) => (
    <div>
    <ul>    
<li><Link to="/public">Public Page</Link></li>
<li><Link to="/protected">Protected Page</Link></li>
<li><Link to="/two">第二页</Link></li>
<li><Link to="/ists">一个列表</Link></li>
<li><Link to="/chat">点我</Link></li>
<li><Link to="/room">点我</Link></li>


</ul>
        <h2>我是一个列表</h2>
        <ul>
            <li>
                <Link to={`${match.url}/我是第一个哈哈`}>
                    列表下边的第一个
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/我是第二个呵呵`}>
                    列表下边的第二个
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/我是第三个嘿嘿`}>
                    列表下边的第三个
                </Link>
            </li>
        </ul>
        <Route path={`${match.url}/:ListsId`} component={ists}/>
        <Route exact path={match.url} render={() => (
            <h3>点击上边的列表项此处显示与url地址一样的...</h3>
        )}/>
    </div>  
)

const AuthExample = () => (
  <Router>
    <div>
      <Route path="/" component={Login}/>                  
      <PrivateRoute path="/public" component={Public}/>      
      <PrivateRoute path="/two" component={Two}/>
      <PrivateRoute path="/ists" component={ist}/>
      <PrivateRoute path="/protected" component={Protected}/>
      <PrivateRoute path="/chat" component={Chat}/>
      <Route path="/room" component={Room}/>
      
      
      
    </div>
    
  </Router>
)

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }

}

const AuthButton = withRouter(({ history }) => (
  // console.log(history),
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <Redirect to={{
      pathname: '/login',
      state: { from: '/public' }
    }}/>
    
  )
))

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    // console.log(props)
    fakeAuth.isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: '/public' }
      }}/>
    )
  )}/>
)


class Public extends React.Component {
  constructor(props){
    super()
    this.state={
      current: '1',
      chating:false
    }
    this.changeindex=this.changeindex.bind(this);
  }
 
  changeindex(i){
    console.log(i)
    if(i==4){
      console.log('now is 4')
    }
    this.setState({
      current:i
    })
  }
  render() {
    console.log(this.state)
    let dom=''
    let data1 = [
      {
        title: 'Ant Design Title 1',
        description:'测试描述1'
      },
      {
        title: 'Ant Design Title 2',
        description:'测试描述2'        
      },
      {
        title: 'Ant Design Title 3',
        description:'测试描述3'        
      },
    ];
    let data2 = [
      {
        title: 'Ant Design Title 2',
      },
    ];
    let data3 = [
      {
        title: 'Ant Design Title 3',
      },
    ];
    let data4 = [
      {
        title: 'Ant Design Title 4',
      },
    ];
    switch(this.state.current){
      case '1':dom=<List
      itemLayout="horizontal"
      dataSource={data1}
      renderItem={item => (
        <Link to={{pathname:"/chat",state:{item:item,from:'/chat'}}}>
        <List.Item onClick={()=>{}}>
          <List.Item.Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={item.title}
            description={item.description}
          />
        </List.Item>
        </Link>
      )}
      />;break;
      case '2':dom=<List
      itemLayout="horizontal"
      dataSource={data2}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={<a href="https://ant.design">{item.title}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </List.Item>
      )}
      />;break;
      case '3':dom=<List
      itemLayout="horizontal"
      dataSource={data3}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={<a href="https://ant.design">{item.title}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </List.Item>
      )}
      />;break;
      case '4':dom=<PersonalCenter/>;break;
      default:break;
    }
    return (
      <div className="publicBox">
      <div className="content">
      {dom}
      </div>
      {this.state.chating?<chat/>:null}

      
      <BottomNav changeindex={this.changeindex}/>
      </div>
    );
  }
}


class BottomNav extends React.Component {
  state = {
    current: '1',
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.props.changeindex(e.key)
    this.setState({
      current: e.key,
    });

  }
  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        className="nav"
      >
        <Menu.Item key="1">
          <Icon type="mail" />Nav0
        </Menu.Item>
        <Menu.Item key="2">
        <Icon type="user" />Nav1
      </Menu.Item>
      <Menu.Item key="3">
      <Icon type="star" />Nav2
        </Menu.Item>
        <Menu.Item key="4">
        <Icon type="setting" />Nav3
        </Menu.Item>
      </Menu>
    );
  }
}

const Protected = () => <div>
<ul>
<li><Link to="/public">Public Page</Link></li>
<li><Link to="/protected">Protected Page</Link></li>
<li><Link to="/two">第二页</Link></li>
<li><Link to="/ists">一个列表</Link></li>
<li><Link to="/chat">点我</Link></li>

</ul>
<h3>Protected</h3>
</div>

class Login extends React.Component {
  constructor(props){
    super()
    this.state = {
      redirectToReferrer: false,
      init:0
    }
    this.login=this.login.bind(this);
    this.signout=this.signout.bind(this);
  }
  


  

  login(){
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }
  signout(){
    fakeAuth.signout(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  componentDidMount(){
    

  }

  render() {
    console.log( this.props.location.state)
    let dom=''
    if(this.props.location.state!==undefined){
      const { from } =
     this.props.location.state 
    //  { from: { pathname: '/public' } }
    const { redirectToReferrer } = this.state
    
    if (redirectToReferrer) {
      console.log('this');
      return (
        
        dom=<Redirect to={from}/>
      )
    }else{
      dom= <WrappedNormalLoginForm login={this.login}/>
      
    }

    }else if(!this.state.redirectToReferrer){
      const { from } ={ from: { pathname: '/public' } }
      dom=<Redirect to={from}/>      
    }
    

    
    return (
      dom
      // <div>
      //   <p>You must log in to view the page at {from.pathname}</p>
      //   <button onClick={this.login}>Log in</button>
      // </div>
    )
  }
}



class NormalLoginForm extends React.Component {
  constructor(props){
    super()
    this.state = {
      index:1,
      confirmDirty:false,
      loading:false,
      visible:false
    }
    this.handleSubmit=this.handleSubmit.bind(this)
    this.handleSubmit2=this.handleSubmit2.bind(this)
    this.register=this.register.bind(this)
    this.canvas=this.canvas.bind(this);
    this.handleConfirmBlur=this.handleConfirmBlur.bind(this)
    this.compareToFirstPassword=this.compareToFirstPassword.bind(this)
    this.validateToNextPassword=this.validateToNextPassword.bind(this)
    this.showModal=this.showModal.bind(this);
    this.closevisible=this.closevisible.bind(this);

    
  }//
  closevisible(){
    this.setState({
      visible:false
    })
  }
  showModal(){
    console.log('ds')
    this.setState({
      visible: true,
    });
  }
  handleConfirmBlur(e){
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword(rule, value, callback){
    const form = this.props.form;
    if (value && value !== form.getFieldValue('_password')) {
      callback('Two passwords is different!');
    } else {
      callback();
    }
  }
  validateToNextPassword(rule, value, callback){
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }


  handleSubmit(e){
    if(!this.state.visible){
      let that=this;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err&&!this.state.loading) {
        // console.log('Received values of form: ', values);
          let callback=(data)=>{
            setTimeout(()=>{
              if(data=='ok'){
                this.props.login()            
              }else{
                const openNotificationWithIcon = (type) => {
                  notification[type]({
                    message: 'Unable to login',
                    description: data,
                  });
                };
                openNotificationWithIcon('error')
              }
              that.setState({
                loading:false
              })

            },1000)
          }
          let errorback=(data)=>{
            setTimeout(()=>{
              const openNotificationWithIcon = (type) => {
                notification[type]({
                  message: 'error',
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
        ajax('post','login',data,callback,errorback,befor)
      }
    });

    }
    
  }


  handleSubmit2(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err&&!this.state.loading) {
          let callback=(data)=>{
            setTimeout(()=>{
              const openNotificationWithIcon = (type) => {
                notification[type]({
                  message: 'Success',
                  description: 'Have try',
                });
              };
              openNotificationWithIcon('success')
              this.register(1)
              this.setState({
                loading:false
              })
            },1000)
          }
          let errorback=(data)=>{
            setTimeout(()=>{
              const openNotificationWithIcon = (type) => {
                notification[type]({
                  message: 'error:',
                  description: data,
                });
              };
              openNotificationWithIcon('error')
              this.setState({
                loading:false
              })
            },1000)            
          }
          let befor=()=>{
            this.setState({
              loading:true
            })
          }
          let data=values;
        ajax('post','register',data,callback,errorback,befor)
      }
    });
  }

  register(i){
    this.setState({
      index:i,
      visible:false
    })
  }
  canvas(e){
  
    if(e!==null){
      var w = e.width = window.innerWidth,
      h = e.height = window.innerHeight,
      ctx = e.getContext('2d'),
      
      count = (w*h/3000)|0,
      speed = 2,
      range = 80,
      lineAlpha = .05,
      
      particles = [],
      huePart = 360/count;

      for(var i = 0; i < count; ++i)
        particles.push(new Particle((huePart*i)|0));

      function Particle(hue){
        this.x = Math.random()*w;
        this.y = Math.random()*h;
        this.vx = (Math.random()-.5)*speed;
        this.vy = (Math.random()-.5)*speed;
        
        this.hue = hue;
      }
      Particle.prototype.update = function(){
        this.x += this.vx;
        this.y += this.vy;
        
        if(this.x < 0 || this.x > w) this.vx *= -1;
        if(this.y < 0 || this.y > h) this.vy *= -1;
      }

      function checkDist(a, b, dist){
        var x = a.x - b.x,
            y = a.y - b.y;
        
        return x*x + y*y <= dist*dist;
      }

      function anim(){
        window.requestAnimationFrame(anim);
        
        ctx.fillStyle = 'rgba(0, 0, 0, .05)';
        ctx.fillRect(0, 0, w, h);
        
        for(var i = 0; i < particles.length; ++i){
          var p1 = particles[i];
          p1.update();
          
          for(var j = i+1; j < particles.length; ++j){
            var p2 = particles[j];
            if(checkDist(p1, p2, range)){
              ctx.strokeStyle = 'hsla(hue, 80%, 50%, alp)'
                .replace('hue', ((p1.hue  + p2.hue + 3)/2) % 360)
                .replace('alp', lineAlpha);
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }
      anim()

    }
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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
      </Select>
    );
    let dom=''
    this.state.index==1?
    dom=
    <Form id='1' onSubmit={this.handleSubmit} className="login-form">
    <canvas id='c' ref={this.canvas} className="loginBg"></canvas>
    <FormItem>
      {getFieldDecorator('userName', {
        rules: [{ required: true, message: 'Please input your username!Max length is 16' ,max:16}],
      })(
        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
      )}
    </FormItem>
    <FormItem>
      {getFieldDecorator('password', {
        rules: [{ required: true, message: 'Please input your Password!Max length is 16' ,max:16}],
      })(
        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
      )}
    </FormItem>
    <FormItem>
      {getFieldDecorator('remember', {
        valuePropName: 'checked',
        initialValue: true,
      })(
        <Checkbox >Remember me</Checkbox>
      )}
      
      <Button loading={this.state.loading} type="primary" htmlType="submit" className="login-form-button" >
      Log in
      </Button>
      
      <span className="login-form-forgot" onClick={
        this.showModal
        // this.info
      }>Forgot password  </span>
      Or <span className="login-form-register" onClick={this.register.bind(this,2)}>register now!</span>
    </FormItem>
    <Resetpassword visible={this.state.visible} closevisible={this.closevisible}/>
  </Form>:
  dom=<Form id='2' onSubmit={this.handleSubmit2} className="login-form">
  <canvas id='c' className="loginBg"></canvas>
  
        <FormItem
          {...formItemLayout}
          label="Username"
        >
          {getFieldDecorator('username', {
            rules: [{
              required: true, message: 'Please input your Username!Max length is 16',whitespace: true,max:16
            },
            // {
            //   type: 'email', message: 'The input is not valid E-mail!',
            // }
          ],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Password"
        >
          {getFieldDecorator('_password', {
            rules: [{
              required: true, message: 'Please input your password!Max length is 16',max:16,whitespace: true,
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',max:16,whitespace: true,
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your nickname!Max length is 16', whitespace: true,max:16 }],
          })(
            <Input />
          )}
        </FormItem>
        
        <FormItem
          {...formItemLayout}
          label="Phone Number"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' ,max:11,whitespace: true,}],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </FormItem>
        
        <FormItem {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
            rules: [{ required: true, message: 'Must agree!' }],
          })(
            <Checkbox>I have read the <a href="">agreement</a></Checkbox>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button loading={this.state.loading} type="primary" htmlType="submit">Register</Button>
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" onClick={this.register.bind(this,1)}>back</Button>
        </FormItem>
      </Form>
    return (
      dom
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const RouterList = () => (
  
    <Router>
    
        <div>
            <Route exact path="/" component={AuthExample}/>
        </div>
    </Router>
)
export default AuthExample
