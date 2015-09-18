/*global define document*/

document.noSelected=0;
			function makeLetter(letter){
			var span=document.createElement("SPAN");
			span.style.fontSize="xx-large";
			span.style.cursor="pointer";


			var t=document.createTextNode(letter);
			span.appendChild(t);

			span.onclick = 
				   function(){
					   if(span.style.color=="red"){
							 span.style.color = "black";
							 span.style.textDecoration="none";
							 document.noSelected-=1;
					   }
					   else{
							span.style.color="red";
							span.style.textDecoration="line-through";
							document.noSelected+=1;
					   }
			//          alert(document.noSelected);
				   };
			span.onselect="";
			var oldParagraph = document.getElementById("demo"); //mine
			//document.body.appendChild(span);
			oldParagraph.appendChild(span);
			//document.write.oldParagraph(span);
			};
			var my_string = "Lorem ipsum dolor sit \namet,  consectetur\n adipisicing elit,  \n sed do eiusmod\n tempor incididunt\n ut labore  \n et dolore magna\n aliqua. Ut enim ad  \n minim veniam,\n quis nostrud exercitation  \n ullamco laboris nisi\n ut aliquip ex \nea commodo consequat.  \n Duis aute irure\n dolor in reprehenderit in  \n voluptate velit \nesse cillum dolore eu  \n fugiat nulla\n pariatur. Excepteur sint  \n occaecat cupidatat\n non proident, sunt in\n culpa qui  \n officia deserunt \nmollit anim \nid est laborum.";

		for (var i=0;i<my_string.length;i++){ 
			makeLetter(my_string.charAt(i));
		}