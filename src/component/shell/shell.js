import React from 'react'
import { ENTER_CODE, COMMAND_API_URL, UP_CODE, DOWN_CODE } from '../../constant/template'
import axios from 'axios'
import './shell.styl'


export default class Shell extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            hostname: 'timzhou:',
            command: 'ls -al'
        }
        this.commandHistory = []
        this.currentComandIndex = 0

        this.style = this.props.style || {
            width: '100%',
            height: '50%'
        }
    }

    componentDidMount(){
     this.getHostName()
    }

    setContent(content){
        content = this.state.hostname + this.__getCurrentCommand() + '<br>' + content
        this.setState((prevState)=>{
            return {
                content: prevState.content + '<br>' + content
            }
        })
        this.__scrollToBottom()
    }

    getHostName(){
        const command = 'echo $HOSTNAME'
        axios.get(COMMAND_API_URL + command).then((res)=>{
            this.setState({
                hostname: res.data + ':'
            })
        })
    }

    sendCommand(){
        if(this.state.command){
            this.__addCurrentCommandToHistory()
            this.__clearCurrentCommand()
            axios.get(COMMAND_API_URL + this.state.command).then((res)=>{
                if(res.data){
                    this.setContent(res.data.replace(/\n/g,'<br>'))
                }
            }).catch(e=>{
            })
        }
    }

    handleOnKeyDown(e){
        const keyCode = e.keyCode
        if(ENTER_CODE === keyCode){
            this.sendCommand()
        }else if(UP_CODE === keyCode){
            this.getPrevCommand()
        }else if(DOWN_CODE === keyCode){
            this.getNextCommand()
        }
    }

    getPrevCommand(){
        if(this.currentComandIndex < this.commandHistory.length){
            this.setState({
                command: this.commandHistory[this.currentComandIndex++]
            })
        }
    }

    getNextCommand(){
        if(this.currentComandIndex > 0){
            this.setState({
                command: this.commandHistory[--this.currentComandIndex]
            })
        }
    }

    handleOnChange(e){
        const value = e.target.value
        this.setState({
            command: value
        })
    }

    focusOnCommand(){
        this.refs.command.focus()
    }

    render(){
        return (
            <div style={this.style} className="shell-wrapper" ref="shellwrapper">
                <div ref="shell" className="shell" onClick={this.focusOnCommand.bind(this)}>
                    <div className="content">
                        <p dangerouslySetInnerHTML={{__html: this.state.content}}>
                        </p>
                    </div>
                    <div className="command-wrapper">
                        <span className="hostname">{this.state.hostname}</span>
                        <span className="command">
                    <input ref="command"
                        onChange={this.handleOnChange.bind(this)}
                        type="command" value={this.state.command}
                        onKeyDown={this.handleOnKeyDown.bind(this)}
                    />
                </span>
                    </div>
                </div>
            </div>
        )
    }

    __getCurrentCommand(){
        return this.commandHistory[this.currentComandIndex]
    }

    __addCurrentCommandToHistory(){
        this.commandHistory.unshift(this.state.command)
        this.currentComandIndex = 0
    }

    __scrollToBottom(){
        this.refs.shellwrapper.scrollTop = this.refs.shellwrapper.scrollHeight
    }

    __clearCurrentCommand(){
        this.setState({
            command: ''
        })
    }
}
