import React, { Component } from 'react'
import Colors from '../logic/color'

class PlayNumber extends Component {
    render() {
        return (
            <button
                className="number"
                style={{ backgroundColor: Colors[this.props.status] }}
                onClick={() => { this.props.onClick(this.props.number, this.props.status) }}
            >
                {this.props.number}
            </button>
        );
    }
};

export default PlayNumber;