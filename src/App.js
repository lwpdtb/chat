import React, { PropTypes } from 'react'
import {BrowserRouter as Router,Route,Link,Redirect,withRouter,Switch,} from 'react-router-dom'//导入的方式跟之前有点变化
import chat from './component/chat'


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
<li><Link to="/Lists">一个列表</Link></li>
<li><Link to="/chat">点我</Link></li>

</ul>
        <h2>我是第二页</h2>
    </div>
)

const Lists = ({ match }) => (
    <div>
        <h3>{match.params.ListsId}</h3>
    </div>
)

const List = ({ match }) => (
    <div>
    <ul>    
<li><Link to="/public">Public Page</Link></li>
<li><Link to="/protected">Protected Page</Link></li>
<li><Link to="/two">第二页</Link></li>
<li><Link to="/Lists">一个列表</Link></li>
<li><Link to="/chat">点我</Link></li>

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
        <Route path={`${match.url}/:ListsId`} component={Lists}/>
        <Route exact path={match.url} render={() => (
            <h3>点击上边的列表项此处显示与url地址一样的...</h3>
        )}/>
    </div>  
)

const AuthExample = () => (
  <Router>
    <div>

    <AuthButton/>
      
      <Route path="/login" component={Login}/>                  
      <PrivateRoute path="/public" component={Public}/>      
      <PrivateRoute path="/two" component={Two}/>
      <PrivateRoute path="/Lists" component={List}/>
      <PrivateRoute path="/protected" component={Protected}/>
      <PrivateRoute path="/chat" component={chat}/>
      
      
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
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const Public = () => 
<ul>
<li><Link to="/public">Public Page</Link></li>
<li><Link to="/protected">Protected Page</Link></li>
<li><Link to="/two">第二页</Link></li>
<li><Link to="/Lists">一个列表</Link></li>
<li><Link to="/chat">点我</Link></li>

</ul>
const Protected = () => <div>
<ul>
<li><Link to="/public">Public Page</Link></li>
<li><Link to="/protected">Protected Page</Link></li>
<li><Link to="/two">第二页</Link></li>
<li><Link to="/Lists">一个列表</Link></li>
<li><Link to="/chat">点我</Link></li>

</ul>
<h3>Protected</h3>
</div>

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
    
    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

const RouterList = () => (
  
    <Router>
    
        <div>
            <Route exact path="/" component={AuthExample}/>
        </div>
    </Router>
)
export default AuthExample
