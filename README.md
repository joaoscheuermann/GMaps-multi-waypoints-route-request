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
            }
        })
   ```
   - The calcRoute method has 2 parameters and 1 callback:
      - The <strong>first</strong> should be the <strong>waypoints DATA</strong>, the DATA must be formatted in an <strong>array</strong> of <strong> objects {lat: xxx, lng: xxx}</strong> with a maximum of 500 waypoints **. 
      - The <strong>second</strong> is the maximum ammount of points per route request, in a free google API key is 10, including the start and end.
      - The callback has tow parameters <strong>result</strong> and <strong>status</strong>,
   
  - And done! The method should return an array with all the reponses in the correct order .
  
  

