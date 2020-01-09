//Date method to get the date
let d = new Date();
var month = '';
if(d.getMonth() == 0){
  month = 1; //if month equals to zero then make it 1
}
else{
  month = d.getMonth(); // else as get.
}
let newDate = month+'/'+ d.getDate()+'/'+ d.getFullYear(); //make the string

//function to load the weather data from website to server
function loaddata() {
	var code = document.getElementById("zip").value; //get zip code from user
	var feelings = document.getElementById("feelings").value; //get feeling from user

  //if code and feelings fields are not empty then its part will execute.
	if( code != '' && feelings != ''){


//create the url for getting the information from openweathermap with the help zip code and api key
var url = 'https://api.openweathermap.org/data/2.5/weather?zip='+code+',us&appid=c781e31663708ff5a9180f470aef2230';


//Method to get the information from openweathermap with Get request.
var xhr  = new XMLHttpRequest()
xhr.open('GET', url, true)
xhr.onload = function () {

  //Getting data from site in json and change that in object.
  var obj = JSON.parse(xhr.responseText);


  //if status is 200 and readystate is 4 then send the data to server for storing. 
  if (xhr.readyState == 4 && xhr.status == "200") {

        //creating array of data for sending it to server.
        var array = {
            zipcode: code,
            feelings: feelings,
            date: newDate,
            temp: obj.main.temp
        };


      //Calling postdata method to post the data to server.
      postdata(array);

      //console the object in table view.
      console.table(obj);

  } 

  //if request gets false and 404 error then this will execute.
  else {
      //alert the 404 Error.
      alert(obj.cod + ' Error.');

      //empty the zip field and feelings.
      document.getElementById('zip').value = "";
      document.getElementById('feelings').value = "";

      //console the Error.
      console.error(obj);
  }
}

//Send request.
xhr.send(null);


}

//if code and feelings variable will empty this below statement will execute.
else{

  //alert message.
	alert('Please check the inputs');
}

// loaddata() function end
}


//Method to post the data to server with one parameter.
function postdata(data){

var xhr = new XMLHttpRequest();

//send request on /post url.
xhr.open("POST","/post", true);

//set the request header and data type
xhr.setRequestHeader('Content-Type', 'application/json');

//send the data to server in json format
xhr.send(JSON.stringify({
    body: data
}));

//calling the getdata function to get the data from server and print them.
getdata()


//Postdata() function end
}



//Function to get data from server and set that on particular place to display the data.
function getdata() {

// request will go on /get url.
var url = '/get';
  var xhttp = new XMLHttpRequest();

  //get request ready function to fetch the data from server. 
  xhttp.onreadystatechange = function() {

    //if readystate is 4 and status is 200 then execute the below code.
    if (this.readyState == 4 && this.status == 200) {

      //initialize the obj variable with server fetched data.
    	var obj = JSON.parse(this.responseText);

      //If no of them are empty then below code will execute.
    	if(obj.body.date != '' && obj.body.temp != '' && obj.body.feelings != ''){

        console.log(obj);

        //Initialize the variable to display the data.
    	 let date = document.getElementById('date');
        let temp = document.getElementById('temp');
        let cont = document.getElementById('content');

        date.innerHTML = obj.body.date;
        temp.innerHTML = obj.body.temp;
        cont.innerHTML = obj.body.feelings;
    }
    //if any data from server fetch empty then execute the below code.
    else{
      //alert message
      alert('Something went wrong with server.')
    }




    }
  };

  //empty the zip field and feelings.
  document.getElementById('zip').value = "";
 document.getElementById('feelings').value = "";

 
  xhttp.open("GET", url, true);
  xhttp.send();
}
