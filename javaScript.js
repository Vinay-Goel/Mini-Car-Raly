/*

            MINI CAR RALY ---------------------- JavaScript

*/


var Canvas= document. getElementById( "Canvas");
var c2d= Canvas. getContext( "2d");

var playerCanvas= document. getElementById( "player");
var pc2d= playerCanvas. getContext( "2d");

Canvas. width= window. innerWidth/ 6;
Canvas. height= window. innerHeight* 7/ 10;

playerCanvas. width= window. innerWidth/ 10;
playerCanvas. height= window. innerHeight* 7/ 10;

Canvas. style. position= "fixed";
playerCanvas. style. position= "fixed";

Canvas. style. top= "15%";
playerCanvas. style. top= "15%";

Canvas. style. left= "36.7%";
playerCanvas. style. left= "53.5%";



var createHurdleSpeed= 2000;
var createHurdleAcc= 250;
var animationSpeed= 10;

var hurdle= [];

var _end= false;

var maxFuel= 3000;

var player= {x: Canvas. width/ 2- 15, y: Canvas. height- 50, b: 30, l: 50, speedX: 0, speedY: 0, accX: 2, accY: 1.5, lw: 6, fs: "#ffe0e9", ss: "#4f0027", fuel: maxFuel};


var strip= {l: Canvas. height/ 5, b: Canvas. width* 1/ 100, y: -1* Canvas. height/ 5, speedY: Canvas. height/ 100};


var Rep= 28000;
var counter= 0;
var score= 0;



function generate( min, max)
{
  if( min< 1) min= 1;

  if( min> max) min= max;

  return Math. random()* (max- min+ 1)+ min;
}


function createHurdle()
{
  var newHurdle= {x: 0, y: 0, b: 0, l: 0, speedY: 0, active: false, lw: 0, fs: "", ss: "", fuel: false};

  var frm= Math. ceil( counter/ Rep* 50 );

  var type= Math. floor( generate( frm, 50) );

  newHurdle. speedY= 2+ score/ Rep/ 2;

  strip. speedY= Canvas. height/ 100+ score/ Rep/ 2;

  if( type== 50)
  {
    newHurdle. fuel= true;
    newHurdle. fs= "#c2ffdf";
    newHurdle. ss= "#005331";

    newHurdle. b= 25;
    newHurdle. l= 40;

    newHurdle. speedY*= 1.1;

    if( createHurdleSpeed> 900)
    {
      createHurdleSpeed-= createHurdleAcc;

      createHurdleAcc-= 30;
    }

    counter= 0;
  }

  if( type< 50)
  {
    newHurdle. fs= "#efefef";
    newHurdle. ss= "#464646";

    newHurdle. b= Math. floor( generate( 25, 50) );
    newHurdle. l= newHurdle. b+ Math. floor( generate( 30, 45) );
  }

  newHurdle. x= Math. floor( generate( player. x- newHurdle. b, player. x+ player. b- newHurdle. b));
  newHurdle. y= 0- newHurdle. l;

  newHurdle. lw= 6;
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
    if( !hurdle[ i]. active) continue;

    var x2= hurdle[ i]. x+ hurdle[ i]. b/ 2;
    var y2= hurdle[ i]. y+ hurdle[ i]. l/ 2;

    var keyX= false, keyY= false;

    if( x1>= x2) if( x1- x2<= player. b/ 2+ hurdle[ i]. b/ 2) keyX= true;
    if( y1>= y2) if( y1- y2<= player. l/ 2+ hurdle[ i]. l/ 2) keyY= true;

    if( x2> x1) if( x2- x1<= player. b/ 2+ hurdle[ i]. b/ 2) keyX= true;
    if( y2> y1) if( y2- y1<= player. l/ 2+ hurdle[ i]. l/ 2) keyY= true;

    if( keyX && keyY)
    {
      if( hurdle[ i]. fuel)
      {
        player. fuel= maxFuel;
        hurdle[ i]. active= false;
      }
      if( !hurdle[ i]. fuel) _end= true;
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
  pc2d. clearRect( 0, 0, playerCanvas. width, playerCanvas. height);

  pc2d. font= "15px Verdana";
  pc2d. fillStyle= "#ff0048";
  pc2d. textAlign= "center";

  pc2d. fillText( "--SCORE--", playerCanvas. width/ 2, 15);
  pc2d. fillText( score, playerCanvas. width/ 2, 30);
  pc2d. fillText( "--FUEL--", playerCanvas. width/ 2, playerCanvas. height- 20);

  draw( pc2d, playerCanvas. width/ 3, 50+ (maxFuel- player. fuel)/ maxFuel* (playerCanvas. height- 100), playerCanvas. width/ 3, player. fuel/ maxFuel* (playerCanvas. height- 100), 6, "#c2ffdf", "#005331");
}



function drawStrips()
{
  var y1= strip. y;

  while( y1<= Canvas. height)
  {
    draw( c2d, Canvas. width* 24.25/ 100, y1, strip. b, strip. l, 2, "white", "white");
    draw( c2d, Canvas. width* 49.5/ 100, y1, strip. b, strip. l, 2, "white", "white");
    draw( c2d, Canvas. width* 74.75/ 100, y1, strip. b, strip. l, 2, "white", "white");

    y1+= strip. l* 3/ 2;
  }

  strip. y+= strip. speedY;

  if( strip. y>= strip. l/ 2) strip. y= -1* strip. l;
}



function animate()
{
  if( _end)
  {
    c2d. font= "30px Verdana";
    c2d. fillStyle= "red";
    c2d. textAlign= "center";

    c2d. fillText( "GAME OVER!", Canvas. width/ 2, Canvas. height/ 2);

    return;
  }

  c2d. clearRect( 0, 0, Canvas. width, Canvas. height);

  drawStrips();

  draw( c2d, player. x, player. y, player. b, player. l, player. lw, player. fs, player. ss);

  player. x+= player. speedX;
  player. y+= player. speedY;

  player. fuel--;

  animateFuelMeter();

  if( player. fuel== 0) _end= true;

  var sz= hurdle. length;

  for( var i= 0; i< sz; i++)
  {
    if( !hurdle[ i]. active) continue;

    draw( c2d, hurdle[ i]. x, hurdle[ i]. y, hurdle[ i]. b, hurdle[ i]. l, hurdle[ i]. lw, hurdle[ i]. fs, hurdle[ i]. ss);

    hurdle[ i]. y+= hurdle[ i]. speedY;

    if( hurdle[ i]. y> Canvas. height) hurdle[ i]. active= false;
  }

  check();

  counter+= animationSpeed;

  score+= animationSpeed;

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
