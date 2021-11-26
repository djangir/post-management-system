import React from 'react';
import { useDispatch } from 'react-redux';
import { addValue, removeValue, pendingData, removePendingData, completeData, removeCompleteData, updateCompleteData, updatePendingData, updateValue } from './app/Slices';

function PendingData(props) {
    const dispatch = useDispatch();
    const [updateData, setUpdateData] = React.useState(props.text);
    const [updateInputClass, setupdateInputClass] = React.useState('d-none');
    const [paragraphClass, setParagraphClass] = React.useState('d-block');
    const [pencilClass, setPencilClass] = React.useState('contents');

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

    function saveData() {
        if (props.removeFunction === 'removePendingData') {
            dispatch(updatePendingData([props.number, updateData]));
        } else if (props.removeFunction === 'removeCompleteData') {
            dispatch(updateCompleteData([props.number, updateData]));
        } else {
            dispatch(updateValue([props.number, updateData]));
        }
        
        setupdateInputClass('d-none')
        setParagraphClass('d-block')
        setPencilClass('contents')
    }

    function escapeUpdating(e) {
        if (e.keyCode === 27) {
            setupdateInputClass('d-none')
            setParagraphClass('d-block')
            setPencilClass('contents')
        }
    }

    return (
        <div className='h4 m-2 my-3 p-2'>
            <div className='row'>
                <div className='col-10'>
                    <div className={paragraphClass}>
                        <p style={{ textAlign: 'justify', wordBreak: 'break-all' }}> {props.text}</p>
                    </div>

                    <div className={updateInputClass}>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" onKeyDown={escapeUpdating}
                                placeholder={updateData} value={updateData} onChange={(e) => setUpdateData(e.target.value)} />
                            <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={saveData} > Save </span>
                        </div>
                    </div>
                </div>

                {(props.completeRemove) ? null :
                    <div style={{ display: pencilClass }}>
                        <h3 className='col-2 text-center h1' style={{ cursor: 'pointer', maxHeight: '65px', maxWidth: '75px' }} onClick={() => {
                            setupdateInputClass('d-block')
                            setParagraphClass('d-none')
                            setPencilClass('none')

                        }} > &#9998; </h3>
                    </div>
                }
            </div>

            <div>
                <span className='btn btn-outline-danger btn-warning mx-2 rounded-circle' onClick={removeFunction1}>&#10148;</span>
                <span className='btn btn-outline-warning btn-success mx-2 rounded-circle' onClick={removePendingData1}>&#10003;</span>
                <span className='btn btn-outline-secondary btn-light  mx-2 rounded-circle' onClick={removeCompleteData1}>&#8644;</span>

                {(props.completeRemove) ?
                    <span className='btn btn-warning btn-outline-danger ms-3 rounded-circle' onClick={() => dispatch(removeCompleteData(props.number))}> X </span> : null
                }

            </div>
        </div>
    );
};

export default PendingData;
