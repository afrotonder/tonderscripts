function exportExcel(queryValues) {

  $.ajax({
    url: "project_path/conn/ajax/conn_file.php",
    type: "POST",
    data: {
     exportCSV: queryValues
    },
    success: function(resultArray) {
      let headerNames = ['Header1', 'Header2'] ;

      let res = resultArray;
      let size = Object.keys(res).length;

      let tableHeader, innerTable, filename= "" ;

      for(let names of headerNames) {
        tableHeader += "<th>" + names + "</th>";
      }
      for(let i = 0; i < size ; i++) {
        innerTable += `<tr>
                        <td>`+ res[i].prop1 +`</td>
                        <td>`+ res[i].prop2 +`</td></tr>`;
      }

    let tableExport = "<table><thead>"+ tableHeader + "</thead><tbody>" + innerTable + "</tbody></table>"  ;
    
    let dataType = 'application/vnd.ms-excel' ;
    filename =  "data.xls" ;
        
    let onClickDownloadExcel = document.createElement("a");
        
    document.body.appendChild(onClickDownloadExcel);
    
    onClickDownloadExcel.href = 'data:' + dataType + ', ' + encodeURIComponent(tableExport);
        
    onClickDownloadExcel.download = filename;
            
    onClickDownloadExcel.click();
    },
    error: function(err) {
      console.log("excel export error: ", err);
    }
  });
}
