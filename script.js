var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.fillStyle = "#FF0000";
ctx.fillRect(20, 40, 50, 50);
ctx.closePath();