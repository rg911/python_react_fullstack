import React from "react";
import { PageHeader } from "react-bootstrap";
import { Button, Label, DropdownButton, MenuItem, Form } from 'react-bootstrap'
import "../css/fullstack.css";
import $ from "jquery";
import Select from "react-select";
import { get, getJSON, post } from "jquery";
import 'react-select/dist/react-select.css';

const transparentBg = { background: 'transparent'}

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            voices:[],
            selectedVoice: '',
            text: ''
        };
        this.handleVoiceSelectChange = this.handleVoiceSelectChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.pollyRead = this.pollyRead.bind(this);
    }
    componentDidMount() {
        this.setState({player: player});
        getJSON(window.location.href +'polly/voices', (data)=> {

             this.setState({voices: data});
             console.log(data);
        });
    }
    handleVoiceSelectChange(selectedOption) {
        this.setState({ selectedVoice: selectedOption.value });
            // selectedOption can be null when the `x` (close) button is clicked
            if (selectedOption) {
            console.log(`Selected: ${selectedOption.label}`);
            }
      }
    handleTextChange(event) {
        this.setState({text: event.target.value});
        console.log(this.state.text);
    }
    pollyRead(){
        var player  = document.getElementById('player');
        player.src = window.location.href +'polly/read?voiceId='+this.state.selectedVoice+'&text='+this.state.text;
        player.play();
    }
    render () {
        const { selectedOption } = this.state.selectedVoice;
        return (
            <div className="App">
                <div className="page-header">
                    <h3> AWS Polly Demo </h3>
                    <h4> <small> Using React + Python3  </small> </h4>
                </div>
                
                <div className="jumbotron col-sm-10 col-sm-offset-1" style={transparentBg} >

                    <div className="panel panel-primary">
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-md-3">
                                    <form>
                                        <Select 
                                            clearable = {false}
                                            value = {this.state.selectedVoice}
                                            options = {this.state.voices}
                                            onChange={this.handleVoiceSelectChange}
                                        />
                                    </form>
                                    <Button bsSize="large" bsStyle="danger" onClick={this.pollyRead}>
                                    Polly Read!
                                    </Button>
                                    <audio id="player"></audio>
                                </div>
                                <div className="col-md-9">
                                    <textarea value={this.state.text} onChange={this.handleTextChange} id="text" maxlength="1000" minlength="1"  name="text" cols="100" rows="20" placeholder="Type some text here..."></textarea>
                                    <small>Copy text into the text area, click 'Read' to hear from AWS Polly</small>
                                </div>
                            </div>
                        </div>
                        <div className="panel-footer">
                
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}