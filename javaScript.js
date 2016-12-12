/*

            MINI CAR RALY ---------------------- JavaScript

*/


var Canvas= document. getElementById( "Canvas");
var c2d= Canvas. getContext( "2d");

var playerCanvas= document. getElementById( "player");
var pc2d= playerCanvas. getContext( "2d");

c2d. canvas. width= window. innerWidth/ 4;
c2d. canvas. height= window. innerHeight* 7/ 10;

pc2d. canvas. width= window. innerWidth/ 8;
pc2d. canvas. height= window. innerHeight* 7/ 10;

Canvas. style. position= "fixed";
playerCanvas. style. position= "fixed";

Canvas. style. top= "15%";
playerCanvas. style. top= "15%";

Canvas. style. left= "31.5%";
playerCanvas. style. left= "57%";



var createHurdleSpeed= 2000;
var animationSpeed= 10;

var hurdle= [];

var _end= false;

var player= {x: 0, y: 0, b: 30, l: 30, speedX: 0, speedY: 0, accX: 1, accY: 1, lw: 3, fs: "red", ss: "blue"};


function createHurdle()
{
  var newHurdle= {x: 0, y: 0, b: 0, l: 0, speedY: 0, active: false, lw: 0, fs: "", ss: ""};

  hurdle. push( newHurdle);

  setTimeout( createHurdle, createHurdleSpeed);
}

function check()
{

}

function drawVehicle( x, y, b, l, lw, fs, ss)
{
  c2d. beginPath();

  c2d. lineWidth= lw;
  c2d. fillStyle= fs;
  c2d. strokeStyle= ss;

  c2d. rect( x, y, b, l);

  c2d. fill();
  c2d. stroke();
}

function animate()
{
  if( _end) return;

  c2d. clearRect( 0, 0, Canvas. width, Canvas. height);

  drawVehicle( player. x, player. y, player. b, player. l, player. lw, player. fs, player. ss);

  player. x+= player. speedX;
  player. y+= player. speedY;

  var sz= hurdle. length;

  for( var i= 0; i< sz; i++)
  {
    drawVehicle( hurdle[ i]. x, hurdle[ i]. y, hurdle[ i]. b, hurdle[ i]. l, hurdle[ i]. lw, hurdle[ i]. fs, hurdle[ i]. ss);

    hurdle[ i]. y+= hurdle[ i]. speedY;
    hurdle[ i]. y+= hurdle[ i]. speedY;
  }

  check();

  setTimeout( animate, animationSpeed);
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

function clean()
{
  var tmp= [];

  var sz= hurdle. length;

  for( var i= 0; i< sz; i++) if( hurdle[ i]. active) tmp. push( hurdle[ i]);

  hurdle. length= 0;

  sz= tmp. length;

  for( var i= 0; i< sz; i++) hurdle. push( tmp[ i]);
}

document. addEventListener( "keydown", move);
document. addEventListener( "keyup", release);

//createHurdle();

animate();

setInterval( clean, 5000);
