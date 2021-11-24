import React from 'react';
import { useDispatch } from 'react-redux';
import { addValue, removeValue, pendingData, removePendingData, completeData, removeCompleteData } from './app/Slices';

function PendingData(props) {
    const dispatch = useDispatch();

    function removeFunction1() {
        if (props.removeFunction === 'removePendingData') {
            dispatch(addValue(props.text));
            dispatch(removePendingData(props.number));
        } else if (props.removeFunction === 'removeCompleteData') {
            dispatch(addValue(props.text));
            dispatch(removeCompleteData(props.number));
        } else {
            dispatch(pendingData(props.text));
            dispatch(removeValue(props.number));
        }

    }

    function removePendingData1() {
        if (props.removeFunction === 'removePendingData') {
            dispatch(completeData(props.text));
            dispatch(removePendingData(props.number));
        } else if (props.removeFunction === 'removeCompleteData') {
            dispatch(pendingData(props.text));
            dispatch(removeCompleteData(props.number));
        } else {
            dispatch(completeData(props.text));
            dispatch(removeValue(props.number));
        }

    }

    function removeCompleteData1() {
        if (props.removeFunction === 'removePendingData') {
            dispatch(completeData(props.text));
            dispatch(removePendingData(props.number));
        } else if (props.removeFunction === 'removeCompleteData') {
            dispatch(addValue(props.text));
            dispatch(removeCompleteData(props.number));
        } else {
            dispatch(pendingData(props.text));
            dispatch(removeValue(props.number));
        }
    }

    return (
        <div className='h4 m-2 my-3 p-2'>
            <p>{ props.text }</p>

            <div>
                <span className='btn btn-outline-danger btn-warning mx-2 rounded-circle' onClick={ removeFunction1 }>&#10148;</span>
                <span className='btn btn-outline-warning btn-success mx-2 rounded-circle' onClick={ removePendingData1 }>&#10003;</span>
                <span className='btn btn-outline-secondary btn-light  mx-2 rounded-circle' onClick={ removeCompleteData1 }>&#8644;</span>
                { (props.completeRemove) ?
                    <span className='btn btn-warning btn-outline-danger ms-3 rounded-circle' onClick={ () => dispatch(removeCompleteData(props.number)) }> X </span> : null
                }

            </div>
        </div>
    );
};

export default PendingData;
