Qualtrics.SurveyEngine.addOnload(function (){
var qualtrics = this;

// IMPORTANT PAGE VARIABLES
var num_es_clicked = 0;
var num_non_es_clicked = 0;
var num_high_dep_es_clicked = 0;
var red_rgb_val = "rgb(255, 0, 0)";
var total_num_es = 0;
var total_num_high_depletion_es = 0;
var new_lower_e = '\u0435'; //lowercase e
var new_upper_e = '\u0395'; //uppercase e
// END IMPORTANT PAGE VARIABLES

// IMPORTANT SET UP FUNCTIONS
  var $j = jQuery.noConflict();
  qualtrics.disablePreviousButton();
  qualtrics.hideNextButton();

  // This function prevents someone from being able to press ctrl + F
  var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;
  var ctrlKey = isMac ? "metaKey" : "ctrlKey"; // Cmd-F on Macs, Ctrl-F on others
  $j(window).keydown(function(e){
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 70) {
      e.preventDefault();
    }
  });
// END IMPORTANT SET UP FUNCTIONS

// BEGIN CONTROL FLOW

  /* These two lines grab the text from the text area and then clear the text area.
   * We could have just made it a JS string variable, but to make it easier for
   * the end user they can just copy and paste into the text area.
   */
  var my_string = $j("#text-area").html();
  $j("#text-area").empty();


  /* This function uses the string attained in the line above and feeds it
   * to makeAndAppendEcrossLetter in order to make a valid ecross letter
   * and append it to the text-area.
   */
  var current_char;
  for (var i=0;i<my_string.length;i++){
    current_char = my_string.charAt(i);
    makeAndAppendEcrossLetter(current_char);
    if(current_char === "e"){
      total_num_es = total_num_es + 1;
    }
  }

  count_high_dep_es();

  var time_in_seconds = $j("#time_in_seconds").html();
  time_in_seconds = time_in_seconds.trim();
  var time_in_milliseconds = 1000 * Number(time_in_seconds);

  setTimeout(grade, time_in_milliseconds);

// --- CONTROL FLOW HELPER FUNCTIONS

  /* This function takes a character and makes it into a dynamic clickable
   * character that behaves according to the e-cross specs.
   */
  function makeAndAppendEcrossLetter(letter){
    var span=document.createElement("SPAN");
    span.style.fontSize="xx-large";
    span.style.cursor="pointer";
    span.className = span.className + "clickable-letter";

    if(letter == "e"){
      letter = new_lower_e; //lowercase e
    }
    if(letter == "E"){
      letter = new_upper_e; //uppercase e
    }

    var t=document.createTextNode(letter);

    span.appendChild(t);

    span.onclick =
      function(){
        if(span.style.color=="red"){
          span.style.color = "black";
          span.style.textDecoration="none";
        }
        else{
          span.style.color="red";
          span.style.textDecoration="line-through";
        }
      };
    span.onselect="";
    var oldParagraph = document.getElementById("text-area");
    oldParagraph.appendChild(span);
  };
  

   /*
    * This function simply deduces which (if any) of the e's (lower and upper case)
    * are "high depletion" which just means they are not within two characters of
    * a vowel (not including spaces and newlines). It then gives the span objects
    * that qualify a high depletion class (for grading) and increments the total
    * count of high depletion e's.
    */

  function count_high_dep_es( index) {
    $j( ".clickable-letter" ).each(function( index) {

      var curr_text = makeLowerCase($j(this).text());
      var next = makeLowerCase($j(this).next().css("class","clickable-letter").text());
      var next_next = makeLowerCase($j(this).next().next().css("class","clickable-letter").text());
      var prev = makeLowerCase($j(this).prev().css("class","clickable-letter").text());
      var prev_prev = makeLowerCase($j(this).prev().prev().css("class","clickable-letter").text());

      var is_high_depletion = true;
      if (curr_text == 'e'){
        /* cases, could be first second third letter, or alst letter, 2nd last, 3rd last.
         *
         */
        if(is_not_vowel(next) && is_not_vowel(prev)){
          //need to make sure that next and prev aren't spaces before we check nextnext and prevprev
          if(is_not_whitespace(next)){
            if(!is_not_vowel(next_next)){
              is_high_depletion = false;
            }
          }
          if(is_not_whitespace(prev)){
            if(!is_not_vowel(prev_prev)){
              is_high_depletion = false;
            }
          }
        } else {
          is_high_depletion = false;
        }

        if(is_high_depletion){
          $j(this).addClass("high-depletion-e");
          total_num_high_depletion_es = total_num_high_depletion_es + 1;
        }
      }// end of is e
    });
  };

  function is_not_whitespace(letter){
    letter = makeLowerCase(letter);
    if (/\s/.test(letter)){
      return false;
    } else {
      return true;
    }
  }

  function is_not_vowel(letter){
    letter = makeLowerCase(letter);
    if (/[aeiou]/i.test(letter)){
      return false;
    } else {
      return true;
    }
  }

  function makeLowerCase(letter){
    if(is_unicode_e(letter)){
      return "e";
    } else{
      var new_letter = letter.toLowerCase();
      return new_letter;
    }
  }

  function is_unicode_e(letter){
    if(letter === new_upper_e){
      return true; 
    } else if (letter === new_lower_e){
      return true;
    } else {
      return false;
    }
  }

// --- END CONTROL FLOW HELPER FUNCTIONS
// END CONTROL FLOW

// BEGIN EVENT DRIVEN FUNCTIONALITY

  /* This function handles the logic to keep track of the current count
   * of es that have been clicked and non-es that have been clicked.
   */
  $j( ".clickable-letter" ).click(function() {
    var element_color = $j( this ).css("color");

    var letter_val = makeLowerCase($j( this ).html());

    var is_high_depletion_class = $j( this).hasClass("high-depletion-e");
    var is_letter = false;
    if (/^[a-z]+$/.test(letter_val)){
      is_letter = true;
    }

    if (is_letter){
      if (letter_val == "e"){
        if (element_color == red_rgb_val){
          // inc es clicked
          num_es_clicked = num_es_clicked + 1;
          if (is_high_depletion_class){
            num_high_dep_es_clicked = num_high_dep_es_clicked + 1;
          }

        } else {
          // dec es clicked
          num_es_clicked = num_es_clicked - 1;
          if (is_high_depletion_class) {
            num_high_dep_es_clicked = num_high_dep_es_clicked - 1;
          }
        }
      } else {

        if (element_color == red_rgb_val){
          // inc non es
          num_non_es_clicked = num_non_es_clicked + 1;
        } else {
          //dec non es
          num_non_es_clicked = num_non_es_clicked - 1;
        }
      }
    }
  });

  /* When user is done with the page and they click the next button
   * we capture all of the relevant variables
   *
   * IN ORDER TO USE IN QUALTRICS:
   * these variables must be unique. Thus, if you are using this Javascript snippet
   * in your survey more than once, you will have to change the strings. Here is an
   * example with the first embedded data item:
   * Qualtrics.SurveyEngine.setEmbeddedData("total_num_high_depletion_es", total_num_high_depletion_es);
   * In the above line you will need to change "total_num_high_depletion_es" (only the one in quotations)
   * to something unique, I recommend something like "total_num_high_depletion_es_practice" or
   * "total_num_high_depletion_es_1" and if you are using this snippet again later in the survey
   * you would change the name in that snippet to "total_num_high_depletion_es_low_dep" or
   * "total_num_high_depletion_es_2". It has to be this way so that you can get unique IDs
   * in the "embedded data" block in the survey flow, check the README for an explanation.
   */
  function grade(){
    Qualtrics.SurveyEngine.setEmbeddedData("total_num_high_depletion_es", total_num_high_depletion_es);
    Qualtrics.SurveyEngine.setEmbeddedData("total_num_es", total_num_es);
    Qualtrics.SurveyEngine.setEmbeddedData("num_non_es_clicked", num_non_es_clicked);
    Qualtrics.SurveyEngine.setEmbeddedData("num_es_clicked", num_es_clicked);
    Qualtrics.SurveyEngine.setEmbeddedData("num_high_dep_es_clicked", num_high_dep_es_clicked);
    var copy_of_page = $j("#text-area").html();
    Qualtrics.SurveyEngine.setEmbeddedData("copy_of_user_data", "<p>" + copy_of_page + "</p>");
    qualtrics.clickNextButton();
  };

// END EVENT DRIVEN FUNCTIONALITY

}); // end doc ready
