import React, {Fragment} from 'react';

const TextTooltip = (props) => {
    return (
           <Fragment>
               <button
                   className={"format-action" + (props.boldActive ? 'active' : '')}
                   onClick={() => props.changeProperty('bold')} type="button"><b>B</b></button>
               <button
                   className={"format-action" + (props.italicActive ? 'active' : '')}
                   onClick={() => props.changeProperty('italic')} type="button"><i>I</i></button>
               <button
                   className={"format-action" + (props.underlineActive ? 'active' : '')}
                   onClick={() => props.changeProperty('underline')} type="button"><u>U</u></button>
               <ul>Synonymous: {props.children.map((el, idx) => {
                   return (<li key={idx} style={{cursor: 'pointer'}} onClick={() => props.changeWord(el.word)}>{el.word}</li>)
               })}</ul>
           </Fragment>
    );
};

export default TextTooltip;