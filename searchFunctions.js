<!-- <script src="dsearch/js/search.js"></script> -->

var Q = [] ; // this array will store all selected filters. it will be used to sort the filtered data
var searchKeys  = [] ;



// $.ajax({
//   type: 'POST',
//   url: '/dsearch/areas.php',
//   data: {area}
//
//
// }) ;

// ***********BIG SEARCH**************** ajax script that searches DB when user searches
$(document).on("click","#search",function(event){
      event.preventDefault();
      event.stopPropagation();


      var search = $("input[name='search']")[0].value ;

      // adding keywords to bigsearch
      //
      // if(searchKeys.length > 0){
      //   skeys
      // }

      $("#results").html('') ;
      $.ajax({
        type: 'POST' ,
        url: 'dsearch/bigSearch.php' ,
        data: {variable: search},
          success: function(data) {
            $("#results").html(data) ;
          }
      });
      $("#smsg").load(location.href+" #smsg>*");
    });




``

// *************FILTERS************** ajax script that gets checked boxes and loads/removes desired content
      function processForm(checkedId, filter){

        var checkedFilter = document.getElementById(checkedId) ;
        // alert(filter) ;

        if(checkedFilter.checked){
          Q.push(filter) ;

          $.ajax({
            type: 'POST',
            url: 'dsearch/filters.php',
            data: { checked_box : filter},
            success: function(data) {
              $(data).appendTo("#results") ;
            }
         }) ;
       } // if
       else{

         var sess = '<?php $sess = $_SESSION['numRows']; echo $sess ;?>' ;
         var n =  0 ;
         if(filter == 'projects'){

            for(var i=0; i< sess; i++){
              $("#resultSectionP").remove(document.getElementById("#resultSectionP"));
              n += 1 ;
            }

        }
        else if(filter == 'datasets'){

          for(var j=0; j<sess; j++){

            $("#resultSectionD").remove(document.getElementById("#resultSectionD"));
          }

        }
        // alert(n) ;

       } // else

     } // processForm function


     // *************************** this block will execute when a SORT is selected.
     function sortBy(x){

       $.ajax({
         type: 'POST',
         url: 'dsearch/sort.php',
         data: { sortData : x, array : Q },
         success: function(data) {
           alert(x) ;
           $('#results').html(data) ;
         }
      }) ;
    }


    // *************************** this block autogenerates the author names in the author search bar
    $(document).ready(function(){
      $('#author').keyup(function(){
        var query = $(this).val() ;
        // alert(query) ;
        if(query != ""){
          $.ajax({
            url: "dsearch/authors.php",
            method: "POST",
            data: {query : query},
            success: function(data){
              $('#authorList').fadeIn() ;
              $('#authorList').html(data) ;
            }
          })
        }
        else{
          document.getElementById('authorList').style.display = 'none' ;
        }
      }) ;

      //onclick author search

      $(document).on("click",'#au',function(event){
        // event.preventDefault();
        // event.stopPropagation();
        // var t = document.getElementById('au').innerHTML;
        // alert( t ) ;

      }) ;

    }) ;


    // ************************ this block autogenerates variable names

    // $(document).ready(function(){
    //   $('#author').keyup(function(){
    //     var query = $(this).val() ;
    //     // alert(query) ;
    //     if(query != ""){
    //       $.ajax({
    //         url: "dsearch/.php",
    //         method: "POST",
    //         data: {query : query},
    //         success: function(data){
    //           $('#authorList').fadeIn() ;
    //           $('#authorList').html(data) ;
    //         }
    //       })
    //     }
    //     else{
    //       document.getElementById('authorList').style.display = 'none' ;
    //     }
    //   }) ;
    // }) ;


// ***********KEYWORDS************* this block gets selected keywords, displays them under the keywords input/
                                // keywords will be used by the Big Search


                                $(document).ready(function(){

                                  $('#keywordInput').keyup(function(){
                                    var key = $(this).val() ;
                                    // alert(key) ;
                                    if(key != ""){
                                      $.ajax({
                                        url: "dsearch/keywords.php",
                                        method: "POST",
                                        data: {key : key},
                                        success: function(data){
                                          $('#keywordsDrop').fadeIn() ;
                                          $('#keywordsDrop').html(data) ;
                                        }
                                      })
                                    }
                                    else{
                                      document.getElementById('keywordsDrop').style.display = 'none' ;
                                    }
                                  }) ;
                                }) ;


                      // the function below adds a tagged keyword uner the keywords input
                                function addTag(tag){
                                     $("#keywordsDrop").hide() ; // hides suggestion dropdown when user selects a tag

                                     searchKeys.push(tag) ; // add keywords to global array to be used in search

                                     $.ajax({
                                       url: "dsearch/keywords.php",
                                       method: "POST",
                                       data: {keyBig : tag, array : searchKeys},
                                       success: function(data){
                                         $(data).appendTo('#keywordsResult') ;

                                       }
                                     })
                                     document.getElementById("keywordInput").value = '' ;

                                     // document.getElementById(tag).hide() ;

                               } // END addTag function

                      // the function below removes each tag uppon beign clicked
                            function removeTag(tag){

                              // removes key from global array
                              if(searchKeys.indexOf(tag) > -1) {
                                searchKeys.splice(searchKeys.indexOf(tag), 1) ;
                              }
                                // removes tag from bottom of keywords input
                              $(tag).remove(document.getElementById(tag)) ;

                            } // END removeTag function

