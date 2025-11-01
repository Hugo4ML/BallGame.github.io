"use strict";

import {Box} from "./box.js";
import * as input from "./input.js";

async function main() {
  /*
  Main function. Declared as asynchronous to make better use of promises and read files.
  */
  window.document.title = "(0.1.88) Simple project";
  
  const keyboard = new input.Keyboard();
  window.addEventListener("keydown", event => keyboard.keydown(event));
  window.addEventListener("keyup", event => keyboard.keyup(event));
  
  const canvas = window.document.getElementById("canvas");
  const gl = canvas.getContext("webgl2");
  if(!gl) {
    return;
  }

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, await (await fetch("../glsl/vertexShader.glvs")).text());
  gl.compileShader(await vertexShader);
  
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, await (await fetch("../glsl/fragmentShader.glfs")).text());
  gl.compileShader(await fragmentShader);
  
  const program = gl.createProgram();
  gl.attachShader(program, await vertexShader);
  gl.attachShader(program, await fragmentShader);
  gl.linkProgram(await program);

  let ballXSpeed = 0.0005625;
  let ballYSpeed = 0.001;
  
  let box = new Box(canvas, -0.1, -0.86875, 0.028125 * 8, 0.05, (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)? [1.0, 1.0, 1.0]: [0.0, 0.0, 0.0]);
  let ball = new Box(canvas, Math.random() - 0.5140625, -0.025, 0.028125, 0.05, (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)? [1.0, 1.0, 1.0]: [0.0, 0.0, 0.0]);
  let targets = new Array(30);
  for(let target = 0; target < targets.length; ++target) targets[target] = new Box(canvas, (target * 0.25) % 1.875 - 0.982421875, 1.03125 - 0.1875 * ((target / 7.5) - (target / 7.5) % 1 + 1), 0.21484375, 0.125, (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)? [1.0, 1.0, 1.0]: [0.0, 0.0, 0.0]);
  let backgroundColor = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)? [0.0, 0.0, 0.0]: [1.0, 1.0, 1.0];
  
  let time = Date.now();
  let deltaInnerWidth = undefined, deltaInnerHeight = undefined;
  setInterval(async function() {
    //Calculate delta time.
    let deltaTime = Date.now() - time;
    time = Date.now();
    
    if(deltaInnerWidth !== window.innerWidth || deltaInnerHeight !== window.innerHeight) {
      //Resize page.
      let minimum = window.innerWidth / 16 <= window.innerHeight / 9? window.innerWidth / 16: window.innerHeight / 9;
      canvas.width = minimum * 16, canvas.height = minimum * 9;
      canvas.style.left = (window.innerWidth - canvas.width) / 2 + "px", canvas.style.top = (window.innerHeight - canvas.height) / 2 + "px";
      canvas.style.borderWidth = minimum / 32 + "px";
      deltaInnerWidth = window.innerWidth, deltaInnerHeight = window.innerHeight;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    };
    //Reassign background and box colors.
    if(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      box.color = [1.0, 1.0, 1.0];
      ball.color = [1.0, 1.0, 1.0];
      for(let target = 0; target < targets.length; ++target) targets[target].color = [1.0, 1.0, 1.0];
      backgroundColor = [0.0, 0.0, 0.0];
    } else {
      box.color = [0.0, 0.0, 0.0];
      ball.color = [0.0, 0.0, 0.0];
      for(let target = 0; target < targets.length; ++target) targets[target].color = [0.0, 0.0, 0.0];
      backgroundColor = [1.0, 1.0, 1.0];
    }
    
    //Check input.
    if(keyboard.ArrowRight.down) {
      box.x += 0.001125 * deltaTime;
    }
    if(keyboard.ArrowLeft.down) {
      box.x -= 0.001125 * deltaTime;
    }

    //Move ball.
    let movementTime = deltaTime;
    while(movementTime > 0.0) {
      if(ball.x + ball.width + ballXSpeed * movementTime > 1.0) {
        ball.x = 1.0 - ball.width;
        movementTime -= (1.0 - ball.x - ball.width) / ballXSpeed;
        ballXSpeed *= -1.0;
      } else if(ball.x + ballXSpeed * movementTime < -1.0) {
        ball.x = -1.0;
        movementTime -= (-1.0 - ball.x) / ballXSpeed;
        ballXSpeed *= -1.0;
      } else {
        ball.x += ballXSpeed * movementTime;
        movementTime = 0.0;
      }
    }
    
    gl.clearColor(backgroundColor[0], backgroundColor[1], backgroundColor[2], 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    gl.useProgram(await program);
    box.draw();
    ball.draw();
    //for(let target = 0; target < targets.length; ++target) targets[target].draw();
  }, 1000 / 60);
}

main();
