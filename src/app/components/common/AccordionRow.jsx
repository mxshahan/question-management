import React from 'react';
import { connect } from 'react-redux';
import '../../../static/styles/index.scss'
export class AccordionRow extends React.Component {
    render() {
        if (this.props.price) {
            return (
                <tr>
                    <td>{this.props.name}</td>
                    <td>{this.props.sign}</td>
                    <td>{this.props.price}</td>
                </tr>
            )
        } else {
            return '';
        }
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(AccordionRow)