import React from 'react';
import { connect } from 'react-redux';
import {
    SelectBox,
    Loading,
    TextBox,
} from '../../../core/components/common';

class Popup extends React.Component {
    state = {
        authorApcReq: {},
        loading: false
    }

    onChangeHandler = (value) => {
        this.setState((prevState) => {
            return Object.assign(prevState.authorApcReq, value);
        })
    }

    submitAuthorApcFund = async (e) => {
        e.preventDefault();
        let data = this.state.authorApcReq;
        if (!this.state.authorApcReq.article) {
            data = Object.assign(this.state.authorApcReq, { article: this.props.article_id })
        } else {
            data = this.state.authorApcReq;
        }
        await this.props.createAuthorApcFund(data);
        if (typeof this.props.author_apc_fund_success.success !== 'undefined') {
            alert(this.props.author_apc_fund_success.message)
        } else {
            this.setState({
                loading: true
            })
            window.location.reload();
        }
    }

    ApcForm = (props) => {
        let articleObj = this.props.article_data;
        let dataArticle = [];
        articleObj.map((item) => {
            return dataArticle.push({
                id: item.id,
                name: item.title,
            });
        });
        let default_id = articleObj.find(x => x.id === this.props.article_id).id || null;
        return (
            <form>
                {this.state.loading && <Loading />}
                <div className="form-group row">
                    <SelectBox
                        label="Article"
                        onChange={this.onChangeHandler}
                        field='article'
                        className="col-sm-10"
                        data={dataArticle}
                        defaultValue={default_id}
                        isRequired={true}
                    />
                </div>
                {this.props.licence_list &&
                    <div className="form-group row">
                        <SelectBox
                            label="Licence"
                            onChange={this.onChangeHandler}
                            field='licence'
                            className="col-sm-10"
                            data={this.props.licence_list.results}
                            defaultValue={this.state.licence}
                            isRequired={true}
                        />
                    </div>
                }
                <div className="form-group row">
                    <TextBox
                        label="Note"
                        onChange={this.onChangeHandler}
                        field='note'
                        className="col-sm-10"
                        placeholder="Note"
                        defaultValue={this.state.name}
                    />
                </div>
                <div className="text-center">
                    <button onClick={this.submitAuthorApcFund} type="button" className="m-3 col-sm-3 btn btn-lg btn-primary waves-effect waves-light">Submit</button>
                    {!props.deleting && <button className={`m-3 col-sm-3 btn btn-lg btn-${props.NoBtnType || 'primary'}`} onClick={(e) => {
                        e.preventDefault();
                        props.onCancel ? props.onCancel() : props.ClearStatus();
                    }}>{props.NoText || 'OK'}</button>}
                    {props.waitingMsg && <p>{props.waitingMsg}</p>}
                </div>

            </form>
        )
    }
    async componentDidMount() {
        if (this.props.article_id) {
            await this.props.getLicenseList();
            await this.props.ArticleFull();
        }
    }
    render() {
        let props = this.props;
        let className = this.props.className ? this.props.className : 'col-sm-4';
        return (
            <div style={{ position: 'fixed', zIndex: 9, backgroundColor: 'rgba(0, 0, 0, 0.64)', width: '100%', height: '100%', overflow: 'hidden', top: 0, left: 0 }}>
                <div className={`${className} text-center bg-white alert`} style={{ position: "absolute", top: '50%', left: '50%', zIndex: 999999, transform: 'translate(-50%, -50%)' }}>
                    <h4>{props.title}</h4>
                    <div>
                        {props.msg}
                    </div>
                    <div>
                        {props.apcForm && this.ApcForm(props)}
                    </div>
                    <div className="text-center">
                        {!props.deleting && props.YesText && <button className={`m-3 col-sm-4 btn btn-lg btn-${props.type || 'primary'}`} onClick={(e) => {
                            e.preventDefault();
                            props.onPressOK()
                        }}>{props.YesText || 'Yes'}</button>
                        }

                        {!props.apcForm && !props.deleting && <button className={`m-3 col-sm-4 btn btn-lg btn-${props.NoBtnType || 'primary'}`} onClick={(e) => {
                            e.preventDefault();
                            props.onCancel ? props.onCancel() : props.ClearStatus();
                        }}>{props.NoText || 'OK'}</button>}
                        {props.waitingMsg && <p>{props.waitingMsg}</p>}
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    article_data: state.articles.article_full || false,
    licence_list: state.articles.licence_list || false,
    author_apc_fund_failed: state.articles.author_apc_fund_failed || false,
    author_apc_fund_success: state.articles.author_apc_fund_success || false,
})
const mapDispatchToProps = (dispatch) => ({

})

export const PopupBox = connect(mapStateToProps, mapDispatchToProps)(Popup);
