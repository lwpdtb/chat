import React, {Component} from 'react';

class Chatlist extends Component {//左侧组件
    constructor(props) {
        super();
        this.state = {
          data:props.data
        }
        
    }

    componentWillReceiveProps(a){
        if(a.data!==this.state.data&&a.data!==null){
            this.setState({
                data:a.data
            })
        }
    }

    componentDidMount(){
 
   }


    render() {
        let dom=this.state.data.map((n,i)=>{
            return <li>{n}</li>
        })
        return (
            dom
        )
    }
}
export default Chatlist;


