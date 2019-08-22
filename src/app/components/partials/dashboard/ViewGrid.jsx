import React from 'react';

class Grid extends React.Component {
    state = {
        msg: this.props.errMsg || ''
    }
    render() {
        return (
            <div>
                <div className="col-sm-5">{this.props.label}</div>
                <div className="col-sm-7"> {this.props.value}</div>
            </div>
        )
    }
}

export const ViewGrid = Grid;