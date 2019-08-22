import React from 'react';

class DataTableContext extends React.Component {
  componentDidMount() {
    /*
   Template Name: Lexa - Responsive Bootstrap 4 Admin Dashboard
   Author: Themesbrand
   File: Datatable js
   */

    window.$(document).ready(function () {
      window.$('#datatable').DataTable();
      //Buttons examples
      var table = window.$('#datatable-buttons').DataTable({
        lengthChange: false,
        buttons: ['copy', 'excel', 'pdf', 'colvis']
      });

      table.buttons().container()
        .appendTo('#_wrapper .col-md-6:eq(0)');
    });
  }

}
export const TableContext = DataTableContext;