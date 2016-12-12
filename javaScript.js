/*

            MINI CAR RALY ---------------------- JavaScript

*/


var Canvas= document. getElementById( "Canvas");
var c2d= Canvas. getContext( "2d");

var playerCanvas= document. getElementById( "player");
var pc2d= playerCanvas. getContext( "2d");

c2d. canvas. width= window. innerWidth/ 6;
c2d. canvas. height= window. innerHeight* 7/ 10;

pc2d. canvas. width= window. innerWidth/ 10;
pc2d. canvas. height= window. innerHeight* 7/ 10;

Canvas. style. position= "fixed";
playerCanvas. style. position= "fixed";

Canvas. style. top= "15%";
playerCanvas. style. top= "15%";

Canvas. style. left= "36.7%";
playerCanvas. style. left= "53.5%";



var createHurdleSpeed= 2000;
var animationSpeed= 10;

var hurdle= [];

var _end= false;

var maxFuel= 300;

var player= {x: Canvas. width/ 2- 15, y: Canvas. height- 50, b: 30, l: 50, speedX: 0, speedY: 0, accX: 2, accY: 1.5, lw: 3, fs: "cyan", ss: "blue", fuel: maxFuel};



function generate( min, max)
{
  return Math. random()* (max- min+ 1)+ min;
}


function createHurdle()
{
  var newHurdle= {x: 0, y: 0, b: 0, l: 0, speedY: 0, active: false, lw: 0, fs: "", ss: "", fuel: false};

  var type= Math. floor( generate( 1, 50));

  if( type== 50)
  {
    newHurdle. fuel= true;
    newHurdle. fs= "green";
    newHurdle. ss= "green";

    newHurdle. b= 25;
    newHurdle. l= 40;
  }

  if( type< 50)
  {
    newHurdle. fs= "red";
    newHurdle. ss= "yellow";

    newHurdle. b= Math. floor( generate( 25, 35));
    newHurdle. l= Math. floor( generate( 40, 60));
  }

  newHurdle. x= Math. floor( generate( 1, Canvas. width- newHurdle. b));
  newHurdle. y= 0- newHurdle. l;

  newHurdle. speedY= 1;
  newHurdle. lw= 3;
  newHurdle. active= true;

  hurdle. push( newHurdle);

  setTimeout( createHurdle, createHurdleSpeed);
}



function check()
{
  if( player. x< 0 || (player. x+ player. b> Canvas. width) || (player. y< 0) || (player. y+ player. l> Canvas. height)) _end= true;

  var sz= hurdle. length;

  var x1= player. x+ player. b/ 2;
  var y1= player. y+ player. l/ 2;

  for( var i= 0; i< sz; i++)
  {
    var x2= hurdle[ i]. x+ hurdle[ i]. b/ 2;
    var y2= hurdle[ i]. y+ hurdle[ i]. l/ 2;

    var key= false;

    if( x1>= x2) if( x1- x2<= player. b/ 2+ hurdle[ i]. b/ 2) key= true;
    if( y1>= y2) if( y1- y2<= player. l/ 2+ hurdle[ i]. l/ 2) key= true;

    if( x2> x1) if( x2- x1<= player. b/ 2+ hurdle[ i]. b/ 2) key= true;
    if( y2> y1) if( y2- y1<= player. l/ 2+ hurdle[ i]. l/ 2) key= true;

    if( key)
    {
      if( hurdle[ i]. fuel)
      {
        player. fuel= maxFuel;
        continue;
      }

      _end= true;
    }
  }
}



function draw( canv, x, y, b, l, lw, fs, ss)
{
  canv. beginPath();

  canv. lineWidth= lw;
  canv. fillStyle= fs;
  canv. strokeStyle= ss;

  canv. rect( x, y, b, l);

  canv. fill();
  canv. stroke();
}



function animateFuelMeter()
{
  if( player. fuel>= 0) draw( pc2d, 45, 50, 40, player. fuel* (playerCanvas. height- 100)/ maxFuel, 2, "green", "green");
}



function animate()
{
  //if( _end) return;

  c2d. clearRect( 0, 0, Canvas. width, Canvas. height);

  draw( c2d, player. x, player. y, player. b, player. l, player. lw, player. fs, player. ss);

  player. x+= player. speedX;
  player. y+= player. speedY;

  player. fuel--;

  animateFuelMeter();

  if( player. fuel== 0) _end= true;

  var sz= hurdle. length;

  for( var i= 0; i< sz; i++)
  {
    draw( c2d, hurdle[ i]. x, hurdle[ i]. y, hurdle[ i]. b, hurdle[ i]. l, hurdle[ i]. lw, hurdle[ i]. fs, hurdle[ i]. ss);

    hurdle[ i]. y+= hurdle[ i]. speedY;

    if( hurdle[ i]. y> Canvas. height) hurdle[ i]. active= false;
  }

  check();

  setTimeout( animate, animationSpeed);
}



function clean()
{
  var tmp= [];

  var sz= hurdle. length;

  for( var i= 0; i< sz; i++) if( hurdle[ i]. active) tmp. push( hurdle[ i]);

  hurdle. length= 0;

  sz= tmp. length;

  for( var i= 0; i< sz; i++) hurdle. push( tmp[ i]);
}



function move( event)
{
  var key= event. which;

  if( key== 37 && player. speedX>= 0) player. speedX-= player. accX;
  if( key== 38 && player. speedY>= 0) player. speedY-= player. accY;
  if( key== 39 && player. speedX<= 0) player. speedX+= player. accX;
  if( key== 40 && player. speedY<= 0) player. speedY+= 2* player. accY;
}

function release( event)
{
  var key= event. which;

  if( key== 37) player. speedX+= player. accX;
  if( key== 38) player. speedY+= player. accY;
  if( key== 39) player. speedX-= player. accX;
  if( key== 40) player. speedY-= 2* player. accY;
}



document. addEventListener( "keydown", move);
document. addEventListener( "keyup", release);

createHurdle();

animate();

setInterval( clean, 15000);
