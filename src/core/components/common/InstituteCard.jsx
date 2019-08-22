import React from 'react';
export class InstituteCard extends React.Component {
    view = (id) => {
        this.props.view(id);
    }
    render() {
        return (
            <div onClick={() => this.view(this.props.item.id)} className={`${this.props.className || 'col-xl-3 col-md-6'}`}>
                <div className="card mini-stat bg-primary flot-chart-height">
                    <div className="card-body mini-stat-img">
                        <div className="text-white">
                            <h6 className="text-white mb-3">{this.props.title}</h6>
                            <p className="mb-3">
                                Acceptance {this.props.item.total_acceptance}<br />
                                Accepted {this.props.item.total_accepted}<br />
                                Declined {this.props.item.declined}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
