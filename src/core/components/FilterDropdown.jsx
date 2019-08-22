import React from 'react';

class Filter extends React.Component {
    render() {
        const props = this.props;
        return (
            <div className={props.className ? props.className : "col-sm-4"}>
                <div className="page-title-box">
                    <select className="form-control select2" defaultValue="all">
                        <option value="all">All</option>
                        {props.data && props.data.map((option, key) => {
                            return <option key={key} value={option.id}>{option.name}</option>
                        })}
                    </select>
                </div>
            </div>
        )
    }
}

export const FilterDropdown = Filter;