<!--
    This script exports recieved database data to a simple, unformatted excel file using the PHP library Spout. It's purpose is to export LARGE data sets fast. 
     
    Other export functions such as phpSpreadSheet, fputscsv, the jQuery DataTable native excel export & a vanilla javascript function slow the browser down and sometimes even breaks it.
    
    This solution has barely any styles/formatting which makes it pretty incredibly fast. 

    This setup is made with the NEW version of Spout and is different from the examples in the documentation. 

    Links: 
        - Spout Documentation: https://www.diycode.cc/projects/box/spout  ;
        - Download Spout: https://github.com/box/spout ;
        - View changes between Spout v2 & Spout v3: https://github.com/box/spout/blob/master/UPGRADE-3.0.md ;
-->
<?php
// import all spout modules
require("path/to/your/assets/node_modules/spout-master/src/Spout/Autoloader/autoload.php"); 
use Box\Spout\Writer\Common\Creator\WriterEntityFactory;
use Box\Spout\Common\Type;
use Box\Spout\Writer\Common\Creator\Style\StyleBuilder;

// on click an input button inside a from, recieve data via POST 
if (isset($_REQUEST['exportExcel'])) {
    
    // using input button POST data as the rest of the stored procedure execution (its parameterts are a string and you concat it to the stored procedure call)
    $exportDataQuery = "exec your_stored_procedure ".$_REQUEST['exportExcel'] ;
    // optionally use a hardcoded query
    // $exportDataQuery =  "select * from your_db where 0 <> 0";

    // execute query & get results
    $execQuery = $auth_user->runQuery($exportDataQuery);
    $execQuery->execute();
    $exportData=$execQuery->fetchAll(PDO::FETCH_ASSOC);
    // table header
    $headerCellValues = ['header1', 
                         'header2',
                         'header3',
                         'header4',
                         'header5'] ;
    // set style for rows
    $rowStyle = (new StyleBuilder())
    // if you want a bold header you can copy the $rowStyle variable, change its name and uncomment this function. visit box/spout documentation for more styles.
    // ->setFontBold()  
    ->setFontSize(12)
    ->setShouldWrapText(true)
    ->build();

    $headerRow = WriterEntityFactory::createRowFromArray($headerCellValues, $rowStyle);
    
    $writer = WriterEntityFactory::createXLSXWriter(); 
    // file name with date concatenated for user benefit
    $fileName = "YOUR_FILE_NAME_".date("Y-m-d").".xlsx";
    // stream data directly to the browser
    $writer->openToBrowser($fileName); 
    // add header row to spout write stream
    $writer->addRow($headerRow) ;

    foreach($exportData as $data) {
        // collect data into in array
        $rowArray = [$data['data1'], 
                     $data['data2'],
                     $data['data3'], 
                     $data['data4'], 
                     $data['data5'] ];
        // create data array into spout row
        $rowToBeAdded = WriterEntityFactory::createRowFromArray($rowArray, $rowStyle);
        // add row to spout write stream
        $writer->addRow($rowToBeAdded);
    }
    // close writer so process will end & excel will succesfully download. will break if you forget to close. 
    $writer->close();
} // end export excel

?>
