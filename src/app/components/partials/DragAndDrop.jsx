import React, { Component } from 'react';
import Dropzone from "react-dropzone";
import classNames from 'classnames'

export class DragAndDrop extends Component {

    onDrop = (files) => {
        let data = new FormData();
        data.append('file', files[0]);
        console.log('droped')
    }

    render() {

        return (
            <div className={this.props.className && this.props.className}>
                <Dropzone onDrop={this.onDrop}>
                    {({ getRootProps, getInputProps, isDragActive }) => {
                        return (
                            <div
                                {...getRootProps()}
                                className={classNames('dropzone', { 'dropzone--isActive': isDragActive })}
                            >
                                <input {...getInputProps()} />
                                {
                                    isDragActive ?
                                        <p>Drop files here...</p> :
                                        <p>Try dropping some files here, or click to select files to upload.</p>
                                }
                            </div>
                        )
                    }}
                </Dropzone>
            </div>
        )
    }
}


export default DragAndDrop;
