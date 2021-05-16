import React, { Component } from 'react';
import './FileZone.css';
import getMockText from '../text.service';
import SelectedText from './selected-text/SelectedText'

class FileZone extends Component {
    constructor() {
        super();

        this.addSelectedComponent = this.addSelectedComponent.bind(this);
    }

    state = {
        arrayOfWords: []
    };

    componentDidMount() {
        getMockText().then(text => {
            const textArray = text.split(" ");
            const newState = [];
            for (let word of textArray) {
                newState.push({
                    text: word,
                    active: false
                })
            }
            this.setState({
                arrayOfWords: newState
            });
        })
    }

    addSelectedComponent(id) {
        const oldState = this.state.arrayOfWords;
        const newState = oldState.map((word, idx) => {
            if (word && idx === id) word['active'] = !word['active'];
            return word;
        });

        this.setState({arrayOfWords: newState});
    }

    render() {
        const renderText = this.state.arrayOfWords ? this.state.arrayOfWords.map((word, idx) => {
           return (
                word && word.active ?
                    <SelectedText key={idx} elementClicked={() => this.addSelectedComponent(idx)}>{word.text} </SelectedText> :
                    <span key={idx}
                          onDoubleClick={() => this.addSelectedComponent(idx)}>{word.text} </span>
           )}) : null;

        return (
            <div id="file-zone">
                <div id="file">
                    {renderText}
                </div>
            </div>
        );
    }
}

export default FileZone;
