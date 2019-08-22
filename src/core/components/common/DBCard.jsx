import React from 'react';
import { Link } from 'react-router-dom'

export const DBCard = (props) => {
    let icon = '';
    if (props.icon) {
        icon = (
            <div className={props.noBg ? "mini-stat-icon2" : "mini-stat-icon"}>
                <i className={`${props.icon} float-right`}></i>
            </div>
        )
    }

    let body = (
        typeof props.body === "object" ? props.body.map((content) => {
            return <p className="mb-0 d-block" key={content.toString()}>{content}</p>
        }) : <p style={style.string} className="mt-5">{props.body}</p>
    )


    const jsx = props.jsx ? props.jsx : body;

    let card_body = (
        <div className={`card ${props.noBg ? 'mini-stat2 bg-white' : 'mini-stat bg-primary '} flot-chart-height`}>
            <div className={`card-body mini-stat-img`}>
                {icon}
                <div className={`${props.noBg ? '' : 'text-white'}`}>
                    <h6 className={`${props.noBg ? '' : 'text-white'} mb-3 text-uppercase`}>{props.title}</h6>
                    {jsx}
                </div>
            </div>
        </div>
    )

    return (
        <div className={`${props.className || 'col-xl-3 col-md-6'}`}>
            {props.hasLink ?
                <Link to={props.hasLink}>
                    {card_body}
                </Link> : card_body
            }
        </div>
    )
}


const style =  {
    string: {
        position: 'absolute',
        left: 20,
        bottom: 10
    }
}