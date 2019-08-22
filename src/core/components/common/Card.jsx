import React from 'react';

// const styles = {
//     header: {
//         background: "#8d83c8 !important"
//     }
// }

export const Card = (props) => {
    const style = {
        minHeight: props.height || 'auto',
        overflow: 'hidden'
    }
    console.log("card props: ", props);

    return (
        <div className={`${props.className || 'col-xl-3 col-md-6'}`}>
            <div className="card " style={style}>
                <div className="card-header text-white text-center" style={{ backgroundColor: "#8d83c8 "}}>
                    <h6 className="text-white m-0 p-0">{props.title}</h6>
                </div>
                <div className="card-body p-0">
                    <div className="">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}


