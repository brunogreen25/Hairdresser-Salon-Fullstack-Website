import React from 'react';
import './Popup.css';

export default class Popup extends React.Component {
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <h1>{this.props.text}</h1>
                    <h2>{this.props.text2}</h2>
                    <div className={'buttonGridPopup'}>
                        <div className={'yesButtonPopup'}>
                            <button onClick={this.props.saveButton}>Da</button>
                        </div>

                        <div className={'noButtonPopup'}>
                            <button onClick={this.props.exitButton}>Ne</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}