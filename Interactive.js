var world = document.getElementById('world');

var scale = 3;
var entries = graph_data.features;

// Checkbox
var check = document.getElementById('mapCheck');
var map = document.getElementById('map');

//var canvas = document.getElementById('myCanvas');
//var ctx = canvas.getContext('2d');

map.style.display='none'
check.addEventListener( 'change', function() {
  if(this.checked) {
      map.style.display='inline'
  } else {
      map.style.display='none'
  }
});


for (var i = 0; i < entries.length; ++i) {
  // Extract names and coordinates from the JavaScript Object
  var entry = entries[i];
  var coords = entry.geometry.coordinates;
  var lon = coords[0];
  var lat = coords[1];
  var x = scale * (180 + lon);
  var y = scale * (90 - lat);
  var name = entry.properties.Location;


  // Create a new HTML element for the cities
  var city = document.createElement('span');
  // Set positions for the symbols
  city.style.cssText = 'left:' + (x - 2) + 'px;top:' + (y - 2) + 'px';
  // Set a class for CSS
  city.setAttribute('class', 'city');
  // Get city's name as Tooltip
  city.setAttribute('title', name);
  city.setAttribute('lon', lon);

  // Add cities to the world div
  world.appendChild(city); 

  city.addEventListener('click',function(){
    this.classList.add('city_hover');
	var myWindow = window.open(document.createElement("CANVAS"));
	//var x = document.createElement("CANVAS");
	var ctx = myWindow.getContext('2d');
	drawDiagramFrame(ctx, 50, 50, 250, 400, "line diagram");
	document.body.appendChild(x);
	
  });

/*   city.addEventListener('click',function(){
    this.classList.remove('city_hover');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
  }); */

function drawDiagramFrame(ctx, offsetX, offsetY, height, width, title) {
		var canvas = document.getElementById('myCanvas');
		var ctx = canvas.getContext('2d');
        ctx.save();
        ctx.translate(offsetX, offsetY);

        // Draw Y-Axis
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -height);
        ctx.stroke();

        // Draw X-Axis
        ctx.moveTo(0, 0);
        ctx.lineTo(width, 0);
        ctx.stroke();

        // Draw Y-Axis Ticks
        ctx.textAlign="right";
        for (var i = 0; i < 5; i++)
        {
            ctx.beginPath();
            ctx.moveTo( 0, -height * (2000/8587) * i);
            ctx.lineTo(-5, -height * (2000/8587) * i);
            ctx.stroke();

            ctx.fillText(2000 * i ,-8, 3 - height * (2000/8587) * i);
        }

        // Draw X-Axis Ticks
        for (var i = 0; i < 10; i++)
        {
            ctx.beginPath();
            ctx.moveTo(width / 10 * i + 20, 0);
            ctx.lineTo(width / 10 * i + 20, 5);
            ctx.stroke();

            ctx.fillText(2003 + i ,width / 10 * i + 32,18);
        }

        // Draw Y-Label
        ctx.font="11px Arial"

        ctx.save();
        ctx.textAlign="center";
        ctx.translate(-40, 0 - height/2);
        ctx.rotate(-Math.PI/2);
        ctx.fillText("students",0,0);
        ctx.restore();

        // Draw X-Label
        ctx.textAlign="center";
        ctx.fillText("year", 0 + width/2, 0 + 35);

        ctx.restore();
}
}	