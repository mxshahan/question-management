import React from 'react';
import {HubContent} from '../../../../../core/components/hub/HubContent';

class Basic extends React.Component{
  render(){
    return (
      <React.Fragment>
        <HubContent className="no-pd">
          <div id="basic">
            <div className="title-box">
              <div className="title-heading">
              <i class="mdi mdi-view-list"></i> <h4 className="page-title"> Basic Question List</h4>
              </div>
              <ul className="history">
                <li><i class="mdi mdi-home"></i> /</li>
                <li>Question /</li>
                <li>Basic Question List</li>
              </ul>
            </div>
          </div>
          <div className="add-button">
            <a type="btn" href="###"><i class="mdi mdi-help-circle"></i> Add Question</a>
          </div>
          <section id="table-content">
           <div className="pad">
            <div className="opt">
              <div className="show">
                <p className="para">Show</p>
                <select name="" className="entry">
                  <option type="number" value="10">10</option>
                  <option type="number" value="25">25</option>
                  <option type="number" value="50">50</option>
                  <option type="number" value="100">100</option>
                </select>
                <p>entries</p>
              </div>
              <div className="search">
                <p>Search</p>
                <input type="text"/>
              </div>
            </div>
            <div className="ques-list">
              <table>
                <tr>
                  <th></th>
                  <th>
                    <select>
                      <option>Select Option</option>
                      <option>Objective</option>
                      <option>Subjective</option>
                    </select>
                  </th>
                  <th></th>
                </tr>
                <tr className="tble-heading">
                  <th>Question</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
                <tr>
                  <td>Centro comercial Moctezuma</td>
                  <td>Francisco Chang</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Ernst Handel</td>
                  <td>Roland Mendel</td>
                  <td>Austria</td>
                </tr>
                <tr>
                  <td>Island Trading</td>
                  <td>Helen Bennett</td>
                  <td>UK</td>
                </tr>
                <tr>
                  <td>Laughing Bacchus Winecellars</td>
                  <td>Yoshi Tannamuri</td>
                  <td>Canada</td>
                </tr>
                <tr>
                  <td>Magazzini Alimentari Riuniti</td>
                  <td>Giovanni Rovelli</td>
                  <td>Italy</td>
                </tr>
              </table>
            </div>
            <div className="go-page">
              <div className="num-of-entry">
                <p>Showing 1 to 5 of 5 entries</p>
              </div>
              <div className="next-prev">
                <a href="###">Previous</a>
              </div>
            </div>
            </div>
          </section>
        </HubContent>
      </React.Fragment>
    );
  }
}

export default Basic;