#ecross-qualtrics
> Popular depletion paradigm for psyc research made for use with qualtrics

##Specifications Computerized E-Cross Task


- Participants must be able to click on a letter to “cross” it out, meaning a small x or slash should appear through the letter.
The program needs to prevent participants from using control+F to find the es.

-	Participants run through a shorter practice round with one paragraph, then the longer manipulation round with a different paragraph.
Need to be able to control how long participants are given to complete each paragraph.

-	Must have data on:
  -	Number of es successfully crossed out in practice round and low depletion
  - Number of other letters crossed out
  - Number of correct es in high depletion round crossed out (would be nice to have the specific es that participants shouldn’t cross out marked in the data to avoid having to return to the paragraph to determine which those are)-Total clicks made on page?

  - regex to find high depletion es that people should not cross out
     /(([aioue].|[aioue])e|e([aioue]|.[aioue]))/i


- NOTE:
  - You must include jquery in the survey in order for this function to work
    http://www.qualtrics.com/university/researchsuite/developer-tools/custom-programming/javascript-in-qualtrics/#InsertingJavaScriptIntoASurvey
  - This link will help you figure out where to go, essentially you need to follow these instructions and insert this tag into the header
    of the survey:
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
