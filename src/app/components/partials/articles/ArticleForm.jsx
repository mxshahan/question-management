import React from 'react';
import { connect } from 'react-redux';
import DragAndDrop from '../DragAndDrop';
import validator from 'validator';
import { CoAuthor } from './CoAuthor';
import moment from 'moment';
import { Badge, InputBox, SelectBox, OaDatePicker, TextBox, PopupBox } from '../../../../core/components/common';

const BtnText = "Add Article";

class Form extends React.Component {
    state = {
        article: {},
        SubmitBtnText: BtnText,
        errMsg: false,
        isCoAuthor: false,
        isAuthor: false,
        edit_modal: false,
        co_authors: [],
        author: null,
        editing: false,
        loaded: false
    }

    componentDidMount() {
        this.props.article && !this.state.loaded && this.setState({
            article: this.props.article,
            co_authors: this.props.article.co_authors || [],
            author: this.props.article.author || {},
            loaded: true,
            SubmitBtnText: 'Update'
        })
    }

    componentWillReceiveProps() {
        this.props.article && !this.state.loaded &&  this.setState({
            article: this.props.article,
            co_authors: this.props.article.co_authors || [],
            author: this.props.article.author || {},
            loaded:true
        })
    }


    onChangeHandler = value => this.setState((prevState) => Object.assign(prevState.article, value))
    

    onChangeDate = date => this.setState({submission_date: date})

    // async shouldComponentUpdate(){
    //     this.props.status && this.setState({
    //         SubmitBtnText: BtnText
    //     })
    // }

    onSubmitHandler = async (e) => {
        e.preventDefault();
        this.setState({
            SubmitBtnText: "Creating..."
        })
        
        let data = this.state.article;
        this.state.author && Object.assign(data, { author: this.state.author })

        if (data.acceptance_date){
            Object.assign(data, { 
                acceptance_date: moment(this.state.article.acceptance_date).format('YYYY-MM-DD')
            })
        } else {
            Object.assign(data, {
                acceptance_date: moment().format('YYYY-MM-DD')
            })
        }
        
        if (data.submission_date) {
            Object.assign(data, {
                submission_date: moment(this.state.article.submission_date).format('YYYY-MM-DD')
            })
        } else {
            Object.assign(data, {
                acceptance_date: moment().format('YYYY-MM-DD')
            })
        }

        Object.assign(data, { co_authors: this.state.co_authors })
       
        if ( !data.title || !data.content_type) {
            this.setState({
                errMsg: <div>
                    {!data.title && <p>Title cannot be empty!</p>}
                    {!data.content_type && <p>Content name cannot be empty</p>}
                    {data.doi && !validator.isURL(data.doi) && <p>URL format is not correct</p>}
                    {data.author && data.author.email && !validator.isEmail(data.author.email) && <p>Email format is not correct</p>}
                </div>
            })
        } else {
            this.setState({
                errMsg: false
            })
            this.props.onSubmitHandler(data);
        }
    }

    cancelLoader = async () => {
        this.setState({
            SubmitBtnText: BtnText,
            errMsg: false
        })
    }

    AddNewAuthor = (e) => {
        e.preventDefault();
        this.setState({
            isAuthor: true
        })
    }

    AddNewCoAuthor = (e) => {
        e.preventDefault();
        this.setState({
            isCoAuthor: true
        })
    }

    onCloseAuthor = () => {
        this.setState({
            isCoAuthor: false,
            isAuthor: false
        })
    }

    onSaveCoAuthorHander = (author_info) => {
        this.setState((prevState) => {
            if (prevState.editing) {
                prevState.co_authors[prevState.editing] = author_info;
                prevState.editing = false
            } else {
                prevState.co_authors.push(author_info)
            }
            prevState.isCoAuthor = false;
            return prevState;
        })
    }

    onSaveAuthorHander = (author_info) => {
        this.setState((prevState) => {
            prevState.author = author_info;
            prevState.isAuthor = false;
            return prevState;
        })
    }

    onEditAuthor = () => {
        this.setState({
            isAuthor: true
        })
    }

    onDeleteAuthor = () => {
        this.setState({
            author: null
        })
    }

    onEditCoAuthor = (id) => {
        this.setState({
            editing: id.toString(),
            isCoAuthor: true
        })
    }

    onDeleteCoAuthor = (id) => {
        this.setState((prevState) => {
            prevState.co_authors.splice(id, 1)
            return prevState
        })
    }

    render() {
        let { article } = this.state;
        let {
            is_author_affiliation_match,
            is_eissn_match,
            is_pissn_match,
            is_publisher_name_match,
            is_funder_name_match,

        } = article;
        console.log(article)
        return (
            <div className="tab-content">
                {/* Error Messages */}

                {this.state.errMsg && <PopupBox
                    Title="Following field cannot be empty"
                    msg={this.state.errMsg}
                    onCancel={this.cancelLoader}
                />}
                {/* End Error Messages */}


                <div className="tab-pane active p-3" id="home-1" role="tabpanel">
                    {/* <h4 className="mt-0 header-title"></h4> */}
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <h6>Basic Info</h6>
                        </div>
                        <s style={{ borderBottom: '1px solid #7a6fbe', width: '100%' }}></s>
                    </div>

                    <div className="form-group row">
                        <InputBox
                            label="Article title"
                            onChange={this.onChangeHandler}
                            field='title'
                            className="col-sm-10"
                            placeholder="Article title"
                            isRequired={true}
                            defaultValue={article.title}
                        />
                    </div>

                    <div className="form-group row">
                        <InputBox
                            label="Article id"
                            onChange={this.onChangeHandler}
                            field='article_id'
                            className="col-sm-4"
                            placeholder="Article or document id"
                            defaultValue={article.article_id}
                        />

                        <SelectBox
                            label="Content type"
                            onChange={this.onChangeHandler}
                            field='content_type'
                            data={this.props.content_type}
                            isRequired={true}
                            defaultValue={article.content_type}
                        />
                    </div>

                    <div className="form-group row">
                        <InputBox
                            label="Article DOI"
                            onChange={this.onChangeHandler}
                            field='doi'
                            className="col-sm-10"
                            placeholder="doi"
                            InputType="url"
                            defaultValue={article.doi}
                        />
                    </div>

                    <div className="form-group row mt-4">
                        <div className="col-sm-12">
                            <div className="float-left">
                                <h6>Author Info</h6>
                            </div>
                            <div className="float-right">
                                <button className="btn btn-light btn-o-light"
                                    onClick={this.AddNewAuthor}
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                ><i className="mdi mdi-plus"></i> Add Author</button>
                            </div>
                        </div>
                        <s style={{ borderBottom: '1px solid #7a6fbe', width: '100%' }}></s>
                    </div>


                    {/* Co Author Form Modal */}

                    {this.state.isAuthor && <CoAuthor
                        isShow={this.state.isAuthor} // if true modal will show up else it will be hidden
                        onClose={this.onCloseAuthor} // Handle Close
                        onSaveAuthor={this.onSaveAuthorHander}
                        value={this.state.author}
                        is_author_affiliation_match={is_author_affiliation_match}
                    />}
                    {/* Co Author Form Modal End */}

                    <div className="form-group row">
                        {this.state.author && <Badge
                            label={
                                (!this.state.author.first_name && !this.state.author.last_name) ? "No Name" :
                                    ((this.state.author.first_name || "") + " " + (this.state.author.last_name || ""))
                            }
                            onEdit={this.onEditAuthor}
                            onDelete={this.onDeleteAuthor}
                            style={is_author_affiliation_match === false ? styles.error : {}}
                        />}
                    </div>
                    {/* Author Information End */}

                    {/* Article Information */}
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <h6>Publication Info</h6>
                        </div>
                        <s style={{ borderBottom: '1px solid #7a6fbe', width: '100%' }}></s>
                    </div>

                    <div className="form-group row">
                        <InputBox
                            label="Journal name"
                            onChange={this.onChangeHandler}
                            field='journal_name'
                            className="col-sm-10"
                            placeholder="Journal name"
                            defaultValue={article.journal_name}
                        />
                    </div>

                    <div className="form-group row">
                        <InputBox
                            label="Journal acronym"
                            onChange={this.onChangeHandler}
                            field='journal_acronym'
                            className="col-sm-4"
                            placeholder="Journal acronym"
                            defaultValue={article.journal_acronym}
                        />

                        <InputBox
                            label="Sub sys acroynm"
                            onChange={this.onChangeHandler}
                            field='sub_system_acronym'
                            className="col-sm-4"
                            placeholder="sub sys acroynm"
                            defaultValue={article.sub_system_acronym}
                        />
                    </div>

                    <div className="form-group row">
                        <InputBox
                            label="pISSN"
                            onChange={this.onChangeHandler}
                            field='pissn'
                            className="col-sm-4"
                            placeholder="pISSN"
                            defaultValue={article.pissn}
                            style={is_pissn_match === false ? styles.error : {}}

                        />
                        <InputBox
                            label="eISSN"
                            onChange={this.onChangeHandler}
                            field='eissn'
                            className="col-sm-4"
                            placeholder="eISSN"
                            defaultValue={article.eissn}
                            style={is_eissn_match === false ? styles.error : {}}

                        />
                    </div>


                    <div className="form-group row">

                        <InputBox
                            label="Publisher Name"
                            onChange={this.onChangeHandler}
                            field='publisher_name'
                            className="col-sm-4"
                            placeholder="Publisher Name"
                            style={is_publisher_name_match === false ? styles.error : {}}
                            defaultValue={article.publisher_name}
                        />

                        <InputBox
                            label="Funder"
                            onChange={this.onChangeHandler}
                            field='funder_name'
                            className="col-sm-4"
                            defaultValue={article.funder_name}                            
                            placeholder="Funder"
                            style={is_funder_name_match === false ? styles.error : {}}

                        />
                    </div>

                    <div className="form-group row">
                        <InputBox
                            label="Fund acknowledgement"
                            onChange={this.onChangeHandler}
                            field='fund_acknowledgement'
                            placeholder="fund acknowledgement"
                            defaultValue={article.fund_acknowledgement} 
                        />
                        <InputBox
                            label="Grant number"
                            onChange={this.onChangeHandler}
                            field='grant_number'
                            placeholder="grant number"
                            defaultValue={article.grant_number}  
                        />
                    </div>
                    

                    <div className="form-group row">
                        <OaDatePicker
                            label="Submission date"
                            onChange={this.onChangeHandler}
                            field='submission_date'
                            placeholder="submission date"
                            defaultValue={moment(moment(article.submission_date).format()) || moment()}  
                        />
                        <OaDatePicker
                            label="Acceptance date"
                            onChange={this.onChangeHandler}
                            field='acceptance_date'
                            placeholder="Acceptance date"
                            defaultValue={moment(moment(article.acceptance_date).format()) || moment()}  
                        />
                    </div>
                    {/* Article Information End */}


                    <div className="form-group row mt-4">
                        <div className="col-sm-12">
                            <div className="float-left">
                            <h6>Co Author Info</h6>
                            </div>
                            <div className="float-right">
                                <button className="btn btn-light btn-o-light"
                                    onClick={this.AddNewCoAuthor}
                                    data-toggle="modal" 
                                    data-target="#exampleModal"
                                ><i className="mdi mdi-plus"></i> Add New</button>
                            </div>
                        </div>
                        <s style={{ borderBottom: '1px solid #7a6fbe', width: '100%' }}></s>
                    </div>

                    {/* Co Author Form Modal */}
                    {this.state.isCoAuthor&& <CoAuthor
                        isShow={this.state.isCoAuthor} // if true modal will show up else it will be hidden
                        onClose={this.onCloseAuthor} // Handle Close
                        onSaveAuthor={this.onSaveCoAuthorHander}
                        value={this.state.co_authors[this.state.editing]}
                    />}
                    {/* Co Author Form Modal End */}
                    
                    <div className="form-group row">
                        {this.state.co_authors.length > 0 && this.state.co_authors.map((co_author, id) => {
                            return <Badge
                                label={
                                    (!co_author.first_name && !co_author.last_name) ? "No Name" : 
                                    ((co_author.first_name || "") + " " + (co_author.last_name || ""))
                                }
                                onEdit={() => this.onEditCoAuthor(id)}
                                onDelete={() => this.onDeleteCoAuthor(id)}
                                key={id}
                            />
                        })}                    
                    </div>


                    <div className="form-group row">
                        <div className="col-sm-12">
                            <h6>Additional Info</h6>
                        </div>
                        <s style={{ borderBottom: '1px solid #7a6fbe', width: '100%' }}></s>
                    </div>
                    <div className="form-group row">
                        <TextBox
                            label="Note"
                            onChange={this.onChangeHandler}
                            field='note'
                            className="col-sm-10"
                            placeholder="Note"
                        />
                    </div>

                    <div className="text-right m-t-15">
                        <button
                            type="button"
                            className="btn btn-primary btn-lg w-25 waves-effect waves-light"
                            onClick={this.onSubmitHandler}
                        >{ this.state.SubmitBtnText }</button>
                    </div>

                </div>
                <div className="tab-pane p-3" id="profile-1" role="tabpanel">
                    <h4 className="mt-0 header-title">Publishier information</h4>
                    <p className="text-muted m-b-30">Please drop your file. The sequense of columns will be Publisher name, address line 1, address line 2, City/Town, County/State, Post or zip code, Country, website, VAT, Note
                                                </p>

                    <div className="m-b-30">
                        <DragAndDrop />
                    </div>

                    <div className="text-center m-t-15">
                        <button
                            type="submit"
                            className="btn btn-primary waves-effect waves-light"
                            onClick={this.onSubmitHandler}
                        >Upload</button>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    content_type: state.journals.content_type || null,
    publication_type: state.journals.publication_type || null,
    article_status: state.articles.article_status || null,
    status: state.articles.article_status ? state.articles.article_status.status : null,
    // article: state.articles.article_single || false
})

const mapDispatchToProps = (dispatch) => ({

})

const styles = {
    error: { border: '1px solid red' }
}

export const ArticleForm = connect(mapStateToProps, mapDispatchToProps)(Form);