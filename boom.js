// connect, prepare to meet your  t a k 0   m a k e r

/* For my last semester of college, I had to take Biology I class. Taking the class required submitting assignments and studying from 
   an online platform called Connect, hosted by the McGraw-Hill Company. 
    
   Studying and turning in assingments using this platform was a total drag, so I thought about making a script that answers my assignments. 
   Its not cheating if I work hard and learn something related to my field of study(computer science). :P
   
   Long story short, it never fully worked. I managed to answer questions that were simple such as the ones that had only two options to choose from,
   like true or false. The other questions required choosing from 4 to 6 options and some questions required a whole div be moved and draged
   to another container in the same page, something I wasnt going to be able to pull off with only 7 days to deliver 10 missing/late assingments.
   
   This is what i coded. Lotsa object management in here. 

*/


function pressOK(OK) {

  let oklist = document.getElementsByClassName('accessButton') ;

  for(let i of oklist) {
    if(OK.test(JSON.stringify(i.outerHTML))) {
      i.click();
    }
  }
}

function clickIDK(list, idk) {
  for(let i of list) {
      if(idk.test(JSON.stringify(i.outerHTML))) {
        i.click();
      }
  }
}

function pressIK(ik) {
  for(let i of list) {
    if(ik.test(JSON.stringify(i.outerHTML))) {
      i.click();
    }
  }
}

function getAnswers(miss) {
  // guardar answer y question en objeto
  let after = document.getElementsByTagName('p') ;
  // if type of question CHOOSE N QUESTIONS
  for(let i in after) { 
      if(miss.test(after[i].outerHTML)) {
          let c = Number(i) + 1 ;
          let miniq = {}
          var answ = after[c] ;
          miniq.question = answ ;
          superq.push(miniq) ;
      }
    }
    /* if type of question CHOOSE ORDER

    let correctAnswer = document.getElementsByTagName('p')[7].outerText ;

    if(correctAnswer = "The correct answer is shown.") {
      
      let miniChoose = {} ; // temp object that stores object of question:orderObject and will be pushed to global array with these types of questions
      let orderObject = {} ; // temp object that stores object of number:correspondingAnswer
      let numList = [1, 2 , 3, 4, 5, 6] ; // max number of questions is 6
    
      for(let i in after) {
        let keyNumber = Number(after[i].outerText) ; 
        if(numList.includes(keyNumber)) { // if type of Number(outerText) == int
          
          orderObject.keyNumber = getConcatPtags(after, keyNumber) ;
          miniChoose.
        }
        //document.getElementsByTagName('p')[19] ; THIS IS CHALLENGE, which tells us its the end of the answers        
      }
    }
  
    
    miniChoose.question = 

     // if document.getElementsByTagName('p')[7].outerText ==  "The correct answer is shown."
     // let delim = 9 ;
     // logic that adds ptag.outerText of each ptag in between numbers
     // first ptag with index 9 is part of first answer
     // check if next one is number. 
        // if not number, add outerText to first element in answer array, which is  
     document.getElementsByTagName('p')[19] ; THIS IS CHALLENGE, which tells us its the end of the answers


     // get first p after p tag 7, which is The correct answer is shown
     // set first p tag after ptag[7] as key of the next set of ptags before the ptag with 

<p>​Challenge​</p>​ 
    */
    pressOK(OK) ;

}

// function that gets and sets order questions
function getConcatPtags(after, keyNumber) {
  let ans ;
  
    for(let i in after) {
      if(after[i].outerText == keyValue) {
        ans = after[i+1].outerText ;
        if(after[i+2].outerText.length > 1) {
          // this means that next ptag is part of answer
          ans += after[i+2] ;
        }
        return ans ;  
      }
    }
} 

function boom() {

    let OK = new RegExp('OK') ;
    let question = document.getElementsByTagName('p')[3] ;
    // check if multiple choice, skip for now if it is
    let list = document.getElementsByClassName('accessButton') ;
    let idk = new RegExp('No idea') ;
    let ik = new RegExp('I know it') ;
    let miss = new RegExp('Missed!') ;
    let superq = [] ; // array that stores QUESTIONS AND ANSWERS

    let superChoose = [] // array that stores QUESTIONS AND ORDER THEY GO IN

    let d = 9 ; // first two answers always list[8] and list[9]
    let arr = [] ; // store answers
    let flag = true ;
    arr[0] = document.getElementsByClassName('accessButton')[7] ; // store answ1
    arr[1] = document.getElementsByClassName('accessButton')[8] ; // store answ2
    // get all possible answers
    while(flag){
        if(ik.test(list[d].outerHTML) ){
            flag = false ;
           }
        else { arr.push(list[d]) ;
               d++ ;
             }
    }
    // CHECK IF QUESTION SEEN. IF SEEN GET ANSWER AND PRESS OK, ELSE PRESS IDK AND SAVE ANSWER
    for(let i of superq) {
      if(i.question == question) { // if question in queue of all questions, get answer
        for(j of arr) { // for each possible answer in array
          if(j == i.ans) {
            j.click() ;
            // 
            pressIK(ik) ;
             // click ok
            pressOK(OK) ;
          }
        }
      }
      else { // else idk to get answer
            // this clicks random, although idk what tets is... ->> let clickr = arr[Math.floor(Math.random() * Object.keys(tets).length)];
          clickIDK(list, idk) ;
          getAnswers(miss) ;
      }
    }

} // end boom 

document.onload(boom()) ;
