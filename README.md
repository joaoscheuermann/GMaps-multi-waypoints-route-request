#Google Maps route request with only the waypoints

###INTRO:

### HOW TO USE: 

  - Add the code to your HTML: ``` <script type="text/javascript" src="route_generation.js"></script> ```.
  - Start an instance in your main code:  ``` const foo = new MWRQ(); ```.
  - Call the calcRoute method: 
   ```
   foo.calcRoute(DATA, 10, (result, status) => {
            if (status == 'READY') {
              console.log(result);
            } else {
              console.log('HUE BR!');
            }
        })
   ```
   - The calcRoute method has 2 parameters and 1 callback:
      - The <strong>first</strong> should be the <strong>waypoints DATA</strong>, the DATA must be formatted in an <strong>array</strong> of <strong> objects {lat: xxx, lng: xxx}</strong> with a maximum of 500 waypoints **. 
      - The <strong>second</strong> is the maximum ammount of points per route request, in a free google API key is 10, including the start and end.
      - For each response received the <strong>callback</strong> will be called passing the parameters <strong>RESULT</strong> and <strong>STATUS</strong>, if the number of responses still not equal to the number of requests,he pass the result equal to NULL and a string with the value of "WAIT" in the status param, when the response are equal to the requests the STATUS change to "READY" and a array with all the responses will be pass to the RESULT.
   
  - And done! The method should return an array with all the reponses in the correct order .

### OBSERVATIONS:

 - <strong>RESPONSE:</strong>
    - The response returned by the calcRoute callback is just an array of all responses recived from the Google's routes service, you are free to process the data as you wish. 
 - <strong>RENDERING THE ROUTE:</strong> 
    - In order to render the route recieved, you'll need to do this manualy, extracting the data from the array of responses. 
  
  

