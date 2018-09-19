import React from 'react'
import { ENTER_CODE, COMMAND_API_URL } from '../../constant/template'
import axios from 'axios'
import './command.styl'


export default class Command extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            path: 'timzhou',
            text: 'ls -al'
        }
    }

    sendCommand(){
        if(this.state.text){
            axios.get(COMMAND_API_URL + this.state.text).then((res)=>{
                if(res.data){
                    this.props.onKeyPress &&
                        this.props.onKeyPress(res.data.replace(/\n/g,'<br>'))
                }
            })
        }
    }

    handleOnKeyPress(e){
        const keyCode = e.charCode
        if(ENTER_CODE === keyCode){
            this.sendCommand()
        }
    }

    handleOnChange(e){
        const value = e.target.value
        this.setState({
            text: value
        })
    }

    render(){
        return (
            <div className="command-wrapper">
                <span className="path">{this.state.path}</span>
                <span className="command">
                    <input
                        onChange={this.handleOnChange.bind(this)}
                        type="text" value={this.state.text}
                        onKeyPress={this.handleOnKeyPress.bind(this)}
                    />
                </span>
            </div>
        )
    }

}
