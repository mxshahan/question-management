import React from 'react';
import { Badge, ActionButton } from '../../../../core/components/common';
import { ViewCoAuthor } from './ViewCoAuthor';
import { history } from '../../../route';
import moment from 'moment'
import { Card } from 'antd';

class ArticleFull extends React.Component {
  state = {
    view_co_author: false,
    error: null,
    errorInfo: null
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  onDeleteHandler = () => history.push('/article/')
  onEditHandler = () => this.props.onEdit && this.props.onEdit(this.props.article.id)

  onClickHander = (e) => {
    e.preventDefault();
    history.push('/request-apc-fund/' + this.props.article.id)
  }


  render() {
    let { article, /* index */ } = this.props;
    let {
      author,
      actions,
      publication,
      publisher,
      co_authors,
      licence,
      is_apc_requested,
      requested_licence
    } = article;

    let author_name = author && (`${author.salutaion || ''} ${author.first_name || ''} ${author.last_name || ''}`);
    let action_btn = '';
    action_btn = (
      <div className="col-sm-2">
        {actions.map((data, key) => {
          return <ActionButton
            key={key}
            text={data.label}
            action={data.action}
            onClickHander={() => this.props.onActionHandler && this.props.onActionHandler(data.action)}
          />
        })}
      </div>
    )
    

    return (
      this.state.error ? <Card className="bg-danger text-white">Something is wrong...!</Card> :
      <div className="card mb-1">
        {/* Article Heading */}
        <div className=" p-3" id="heading">
          {/* Title Part */}
          <div className="row">
            <div className="col-sm-12">
              <div className="page-title-box  pt-0 pb-3">
                <h4 className="page-title">
                  <a
                    className="article_open_arrow"
                    href={`#collapse_${article.id}`}
                    data-toggle="collapse"
                    aria-expanded="true"
                    aria-controls={`collapse_${article.id}`}
                    style={{ color: '#5874ab', fontWeight: 500 }}
                  >
                    {article.title || 'Untitled'}
                    <i className="ion-arrow-down-b float-right" />
                  </a>
                </h4>
              </div>
            </div>
          </div>
          {/*End Of Title*/}

          {/* Author Info */}
          <div className="row">
            <div className="col-sm-5">
              <p className="m-0">
                <strong>Corresponding author  : </strong>
                {author_name}
              </p>
              <p className="m-0">
                <strong>Email : </strong> {author && author.email}
              </p>
              <p className="m-0">
                <strong>License selected : </strong>
                {article && licence ? licence.name : ''}
              </p>
              {is_apc_requested && requested_licence &&
                <p className="m-0">
                  <strong>Requested license : </strong>
                  {requested_licence.name}
                </p>
              }
            </div>
            <div className="col-sm-5">
              <p className="m-0">
                <strong>Affiliation :</strong>{' '}
                {author && author.affiliation}
              </p>
              <p className="m-0">
                <strong>Department :</strong>{' '}
                {author &&
                  author.department &&
                  author.department.name}
              </p>
              <p className="m-0">
                <strong>Approval date :</strong>{' '}
                {article.approved_date
                  ? moment(article.approved_date).format('DD-MM-YYYY')
                  : '-'
                }
              </p>
            </div>
            {/* Action Button */}
            {/* <div className="col-sm-2">
                            <p className="m-1">
                                {this.props.isAction && actions && actions.map((action) => {
                                    if (action.action === 'delete') {
                                        return <button
                                            key={action.action}
                                            type="button"
                                            className="btn btn-danger btn-sm ml-2 waves-effect"
                                            onClick={this.onDeleteHandler}
                                        >{action.label}</button>
                                    } else if (action.action === 'update') {
                                        return <button
                                            key={action.action}
                                            type="button"
                                            className="btn btn-primary btn-sm  ml-2 waves-effect"
                                            onClick={this.onEditHandler}
                                        >{action.label}</button>
                                    } else return ''
                                })}

                            </p>
                        </div> */}

            {action_btn}

            {/* End of Action Button */}
          </div>
          {/* End Author Info */}
        </div>
        {/* End Article Heading */}

        <div
          id={`collapse_${article.id}`}
          className="collapse"
          aria-labelledby="headingOne"
          data-parent="#accordion"
        >
          <div className="container-fluid">
            <div className="row info_border_top">
              <div className="col-sm-8">
                <ul
                  className="nav nav-tabs nav-tabs-custom nav-justified"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href={`#main-info_${article.id}`}
                      role="tab"
                    >
                      Main info
                        </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href={`#other-info_${article.id}`}
                      role="tab"
                    >
                      Other info
                        </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div
                    className="tab-pane active p-3"
                    id={`main-info_${article.id}`}
                    role="tabpanel"
                  >
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="m-1">
                          <strong>Article type</strong>
                        </p>
                      </div>
                      <div className="col-sm-9">
                        <p className="m-1">
                          <strong className="info_seperator">
                            :{' '}
                          </strong>{' '}
                          {article.content_type_name}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="m-1">
                          <strong>Journal</strong>
                        </p>
                      </div>
                      <div className="col-sm-9">
                        <p className="m-1">
                          <strong className="info_seperator">
                            {' '}
                            :{' '}
                          </strong>
                          {publication && publication.name}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="m-1">
                          <strong>Funder Name</strong>
                        </p>
                      </div>
                      <div className="col-sm-9">
                        <p className="m-1">
                          <strong className="info_seperator">
                            {' '}
                            :{' '}
                          </strong>
                          {article.funder_name}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="m-1">
                          <strong>Grant number </strong>
                        </p>
                      </div>
                      <div className="col-sm-9">
                        <p className="m-1">
                          <strong className="info_seperator">
                            {' '}
                            :{' '}
                          </strong>
                          {article.grant_number}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="m-1">
                          <strong>Publisher</strong>
                        </p>
                      </div>
                      <div className="col-sm-9">
                        <p className="m-1">
                          <strong className="info_seperator">
                            {' '}
                            :{' '}
                          </strong>
                          {publisher && publisher.name}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="m-1">
                          <strong>Submission date</strong>
                        </p>
                      </div>
                      <div className="col-sm-9">
                        <p className="m-1">
                          <strong className="info_seperator">
                            {' '}
                            :{' '}
                          </strong>
                          {article.submission_date}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="m-1">
                          <strong>Acceptance date</strong>
                        </p>
                      </div>
                      <div className="col-sm-9">
                        <p className="m-1">
                          <strong className="info_seperator">
                            {' '}
                            :{' '}
                          </strong>
                          {article.acceptance_date}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="m-1">
                          <strong>Pub date</strong>
                        </p>
                      </div>
                      <div className="col-sm-9">
                        <p className="m-1">
                          <strong className="info_seperator">
                            {' '}
                            :{' '}
                          </strong>
                          {article.pub_date}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="m-1">
                          <strong>Article ID</strong>
                        </p>
                      </div>
                      <div className="col-sm-9">
                        <p className="m-1">
                          <strong className="info_seperator">
                            {' '}
                            :{' '}
                          </strong>
                          {article.article_id}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane p-3"
                    id={`other-info_${article.id}`}
                    role="tabpanel"
                  >
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="m-1">
                          <strong>Department</strong>
                        </p>
                      </div>
                      <div className="col-sm-9">
                        <p className="m-1">
                          <strong className="info_seperator">
                            {' '}
                            :{' '}
                          </strong>
                          {author &&
                            author.department &&
                            author.department.name}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="m-1">
                          <strong>Orcid id</strong>
                        </p>
                      </div>
                      <div className="col-sm-9">
                        <p className="m-1">
                          <strong className="info_seperator">
                            {' '}
                            :{' '}
                          </strong>
                          {author && author.orcid_id}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="m-1">
                          <strong>PMC id</strong>
                        </p>
                      </div>
                      <div className="col-sm-9">
                        <p className="m-1">
                          <strong className="info_seperator">
                            {' '}
                            :{' '}
                          </strong>
                          {author && author.pmc_id}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="m-1">
                          <strong>pISSN</strong>
                        </p>
                      </div>
                      <div className="col-sm-9">
                        <p className="m-1">
                          <strong className="info_seperator">
                            {' '}
                            :{' '}
                          </strong>
                          {publication && publication.pissn}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="m-1">
                          <strong>eISSN</strong>
                        </p>
                      </div>
                      <div className="col-sm-9">
                        <p className="m-1">
                          <strong className="info_seperator">
                            {' '}
                            :{' '}
                          </strong>
                          {publication && publication.eissn}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="m-1">
                          <strong>Volume number</strong>
                        </p>
                      </div>
                      <div className="col-sm-9">
                        <p className="m-1">
                          <strong className="info_seperator">
                            {' '}
                            :{' '}
                          </strong>
                          {article.vol_number}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="m-1">
                          <strong>Issue number</strong>
                        </p>
                      </div>
                      <div className="col-sm-9">
                        <p className="m-1">
                          <strong className="info_seperator">
                            {' '}
                            :{' '}
                          </strong>
                          {article.issue_number}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="m-1">
                          <strong>Page number</strong>
                        </p>
                      </div>
                      <div className="col-sm-9">
                        <p className="m-1">
                          <strong className="info_seperator">
                            {' '}
                            :{' '}
                          </strong>
                          {article.page_no_from} -{' '}
                          {article.page_no_to}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="m-1">
                          <strong>Subsystem Acronym</strong>
                        </p>
                      </div>
                      <div className="col-sm-9">
                        <p className="m-1">
                          <strong className="info_seperator">
                            {' '}
                            :{' '}
                          </strong>
                          {publication &&
                            publication.sub_sys_acronym}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="m-1">
                          <strong>Journal Acronym</strong>
                        </p>
                      </div>
                      <div className="col-sm-9">
                        <p className="m-1">
                          <strong className="info_seperator">
                            {' '}
                            :{' '}
                          </strong>
                          {publication &&
                            publication.pub_acronym}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prices Section */}
              <div className="col-sm-4">
                <ul
                  className="nav nav-tabs nav-tabs-custom nav-justified"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href={`#price-gbp_${article.id}`}
                      role="tab"
                    >
                      Price GBP
                        </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href={`#price-usd_${article.id}`}
                      role="tab"
                    >
                      Price USD
                        </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href={`#price-eur_${article.id}`}
                      role="tab"
                    >
                      Price EUR
                        </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div
                    className="tab-pane active p-3"
                    id={`price-gbp_${article.id}`}
                    role="tabpanel"
                  >
                    <table className="table ">
                      <tbody>
                        <tr>
                          <td>APC</td>
                          <td>£</td>
                          <td>{article.pub_fee_gbp}</td>
                        </tr>
                        <tr>
                          <td>Submission fee</td>
                          <td>£</td>
                          <td>{article.submission_fee_gbp}</td>
                        </tr>
                        <tr>
                          <td>Colour charge</td>
                          <td>£</td>
                          <td>{article.colour_charge_gbp}</td>
                        </tr>
                        <tr>
                          <td>Page and other charge</td>
                          <td>£</td>
                          <td>{article.page_charge_gbp}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    className="tab-pane p-3"
                    id={`price-usd_${article.id}`}
                    role="tabpanel"
                  >
                    <table className="table ">
                      <tbody>
                        <tr>
                          <td>APC</td>
                          <td>$</td>
                          <td>{article.pub_fee_usd}</td>
                        </tr>
                        <tr>
                          <td>Submission fee</td>
                          <td>$</td>
                          <td>{article.submission_fee_usd}</td>
                        </tr>
                        <tr>
                          <td>Colour charge</td>
                          <td>$</td>
                          <td>{article.colour_charge_usd}</td>
                        </tr>
                        <tr>
                          <td>Page and other charge</td>
                          <td>$</td>
                          <td>{article.page_charge_usd}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    className="tab-pane p-3"
                    id={`price-eur_${article.id}`}
                    role="tabpanel"
                  >
                    <table className="table ">
                      <tbody>
                        <tr>
                          <td>APC</td>
                          <td>€</td>
                          <td>{article.pub_fee_eur}</td>
                        </tr>
                        <tr>
                          <td>Submission fee</td>
                          <td>€</td>
                          <td>{article.submission_fee_eur}</td>
                        </tr>
                        <tr>
                          <td>Colour charge</td>
                          <td>€</td>
                          <td>{article.colour_charge_eur}</td>
                        </tr>
                        <tr>
                          <td>Page and other charge</td>
                          <td>€</td>
                          <td>{article.page_charge_eur}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* End Prices Section */}
            </div>
          </div>

          {/* Tab panes */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <p className="m-0">
                  <strong>DOI : </strong>
                  {article.doi}
                </p>
                <p>
                  <strong>Acknowledgements : </strong>
                  {article.fund_acknowledgement}
                </p>
              </div>
            </div>
          </div>

          {/* Tab panes */}
          <div className="container-fluid">
            <div className="col-md-12">
              <div className="row">
                {co_authors.map(info => {
                  let Name =
                    info &&
                    `${info.salutaion || ''} ${info.first_name ||
                    ''} ${info.last_name || ''}`
                  return (
                    <Badge
                      key={info.id}
                      label={Name}
                      onView={() =>
                        this.setState({ view_co_author: info.id })
                      }
                    />
                  )
                })}
              </div>
            </div>
          </div>

          {this.state.view_co_author && (
            <ViewCoAuthor
              onClose={() =>
                this.setState({ view_co_author: false })
              }
              value={co_authors.find(co_author => {
                return (
                  co_author.id === this.state.view_co_author &&
                  co_author
                )
              })}
            />
          )}
        </div>
      </div>
    )
  }
}

export const ArticleFullSingle = ArticleFull;