import React, {Component, Fragment} from 'react';
import TextTooltip from "./text-tooltip/TextTooltip";
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import axios from 'axios';

export default class SelectedText extends Component {
    constructor(props) {
        super(props);

        this.changeStateProperty = this.changeStateProperty.bind(this);
        this.showTooltip = this.showTooltip.bind(this);
        this.changeWord = this.changeWord.bind(this);
    }

    state = {
        bold: false,
        italic: false,
        underline: false,
        tooltipShown: false,
        selectedWord: String(this.props.children).replace(/[^\w\s]/gi, ''),
        previousWord: '',
        synonymous: []
    };

    componentDidMount() {
        axios.get(`https://api.datamuse.com/words?rel_syn=${this.state.selectedWord}`)
            .then(result => {
                this.setState({
                    synonymous: result['data']
                })
            });
    }

    changeStateProperty(property) {
        this.setState({[property]: !this.state[property]});
    }

    changeWord(selectedWord) {
        let oldState = this.state;
        oldState.previousWord = oldState.selectedWord;
        oldState.selectedWord = selectedWord + '';
        const newState = oldState;

        this.setState({...newState});
    }

    showTooltip() {
        this.setState({tooltipShown: !this.state.tooltipShown})
    }

    render() {
        const state = this.state;
        const classNames = (state.bold ? 'bold ' : '') + (state.italic ? 'italic ' : '') + (state.underline ? 'underline ' : '');

        return (
            <Fragment>
                <Tooltip trigger={['hover']}
                         mouseEnterDelay={0}
                         mouseLeaveDelay={0.1}
                         destroyTooltipOnHide={this.state.tooltipShown}
                         animation="zoom"

                         overlay={
                             <TextTooltip
                             boldActive={this.state.bold}
                             italicActive={this.state.italic}
                             underlineActive={this.state.underline}
                             changeProperty={this.changeStateProperty}
                             changeWord={this.changeWord}>{this.state.synonymous}</TextTooltip>
                         }>
                    <span className={classNames}
                        onDoubleClick={() => this.props.elementClicked()}
                        style={{cursor: 'pointer'}}
                        >{this.state.selectedWord}&nbsp;</span>
                </Tooltip>
            </Fragment>
        )
    }

};