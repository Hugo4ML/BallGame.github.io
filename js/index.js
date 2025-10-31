"use strict";

import {Box} from "./box.js";
import * as input from "./input.js";

async function main() {
  /*
  Main function. Declared as asynchronous to make better use of promises and read files.
  */
  window.document.title = "(0.1.78) Simple project";
  
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
  
  let boxColor =  (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)? [1.0, 1.0, 1.0]: [0.0, 0.0, 0.0];
  let backgroundColor = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)? [0.0, 0.0, 0.0]: [1.0, 1.0, 1.0];
  
  let box = new Box(canvas, -0.1, -0.825, 0.2, 0.0875);
  let ball = new Box(canvas, -0.025, -0.04375, 0.05, 0.0875);
  //let sqr = new Box(canvas, 0.3, 0.3, 0.140625, 0.25);
  let targets = new Array(30);
  for(let target = 0; target < targets.length; ++target) targets[target] = new Box(canvas, (target * 0.25) % 1.875 + 0.017578125 - 1.0, /*1.0 - (0.03125 + 0.125) * ((target / 9.0) - (target / 9.0) % 1 + 1)*/1.0 - 0.125 - (target) * 0.02, 0.25 - 0.03515625, 0.125);
  //for(let target = 0; target < 8; ++target) targets[target] = new Box(canvas, target * 0.25 + 0.03515625 - 1.0, 1.0 - 0.0625 - 0.125, 0.25 - 0.0703125, 0.125);
  //for(let target = 8; target < 15; ++target) targets[target] = new Box(canvas, (target - 8) * 0.25 + 0.03515625 - 1.0, 0.65, 0.25 - 0.0703125, 0.125);
  //for(let target = 15; target < 23; ++target) targets[target] = new Box(canvas, (target - 15) * 0.25 + 0.03515625 - 1.0, 1.0 - (0.0625 - 0.125) * 3.0, 0.25 - 0.0703125, 0.125);
  //for(let target = 23; target < 30; ++target) targets[target] = new Box(canvas, (target - 23) * 0.25 + 0.03515625 - 1.0, 1.0 - (0.0625 - 0.125) * 4.0, 0.25 - 0.0703125, 0.125);
  
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
    box.color = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)? [1.0, 1.0, 1.0]: [0.0, 0.0, 0.0];
    backgroundColor = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)? [0.0, 0.0, 0.0]: [1.0, 1.0, 1.0];
    
    //Check input.
    if(keyboard.ArrowRight.down) {
      box.x += 0.001 * deltaTime;
    }
    if(keyboard.ArrowLeft.down) {
      box.x -= 0.001 * deltaTime;
    }
    
    gl.clearColor(backgroundColor[0], backgroundColor[1], backgroundColor[2], 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    gl.useProgram(await program);
    box.draw();
    ball.draw();
    for(let target = 0; target < targets.length; ++target) targets[target].draw();
  }, 1000 / 60);
}

main();
