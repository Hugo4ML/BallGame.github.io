"use strict";

import * as input from "./input.js";

class Box {
  /*
  Rectangle drawn by using webgl element buffers.
  */
  position;
  dimensions;
  gl;
  vao;
  ebo;
  constructor(canvas, x, y, width, height) {
    /*
    Define position and dimensions and create webgl components.
    */
    this.gl = canvas.getContext("webgl2");
    this.position = {
      x: x,
      y: y
    };
    this.dimensions = {
      width: width,
      height: height
    }
    
    this.vao = this.gl.createVertexArray();
    this.gl.bindVertexArray(this.vao);
    this.gl.enableVertexAttribArray(0);
    this.gl.enableVertexAttribArray(1);
  
    this.vbo = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, 4 * 5 * 32 / 8, this.gl.STATIC_DRAW);
  
    this.ebo = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.ebo);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint32Array([
      0, 1, 2,
      0, 2, 3
    ]), this.gl.STATIC_DRAW);
    
    this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, 5 * 32 / 8, 0);
    this.gl.vertexAttribPointer(1, 3, this.gl.FLOAT, false, 5 * 32 / 8, 2 * 32 / 8);
  }
  
  draw() {
    /*
    Draw rectangle with webgl.
    */
    this.gl.bindVertexArray(this.vao)
    this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_INT, 0);
  }
}
/*Object.defineProperty(Box.prototype, "color", {
  get() {
    
  },
  set(color) {
    let data = new Float32Array([color[0], color[1], color[3], color[4]]);
    for(let vertex = 0; vertex < 4; ++vertex) {
      this.gl.bufferSubData(this.gl.ARRAY_BUFFER, vertex * 5 * 32 / 8 + 2 * 32 / 8, data);
    }
  }
})*/

async function main() {
  /*
  Main function. Declared as asynchronous to make better use of promises and read files.
  */
  window.document.title = "(0.1.22) Simple project";
  
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

  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.enableVertexAttribArray(0);
  gl.enableVertexAttribArray(1);
  
  const vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, 4 * 5 * 32 / 8, gl.STATIC_DRAW);
  
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 5 * 32 / 8, 0);
  gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 5 * 32 / 8, 2 * 32 / 8);
  let boxColor =  (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)? [1.0, 1.0, 1.0]: [0.0, 0.0, 0.0];
  let backgroundColor = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)? [0.0, 0.0, 0.0]: [1.0, 1.0, 1.0];
  
  let colors = [
    new Float32Array(boxColor),
    new Float32Array(boxColor),
    new Float32Array(boxColor),
    new Float32Array(boxColor)
  ];
  for(let vertex = 0; vertex < 4; ++vertex) {
    gl.bufferSubData(gl.ARRAY_BUFFER, vertex * 5 * 32 / 8 + 2 * 32 / 8, colors[vertex]);
  }
  
  const ebo = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array([
    0, 1, 2,
    0, 2, 3
  ]), gl.STATIC_DRAW);
  
  //let box = new Box(canvas, 0.0, 0.0, 0.2, 0.35);
  let box = new Box(canvas, -0.1, -0.825, 0.2, 0.0875);
  
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
    
    if(keyboard.ArrowRight.down) {
      box.position.x += 0.001 * deltaTime;
    }
    if(keyboard.ArrowLeft.down) {
      box.position.x -= 0.001 * deltaTime;
    }

    let positions = [
      new Float32Array([0.0, 0.0]),
      new Float32Array([0.2, 0.0]),
      new Float32Array([0.2, 0.35]),
      new Float32Array([0.0, 0.35])
    ];
    for(let vertex = 0; vertex < 4; ++vertex) {
      positions[vertex][0] += box.position.x;
      positions[vertex][1] += box.position.y;
      gl.bufferSubData(gl.ARRAY_BUFFER, vertex * 5 * 32 / 8, positions[vertex]);
    }
    
    gl.clearColor(backgroundColor[0], backgroundColor[1], backgroundColor[2], 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    gl.useProgram(await program);
    box.draw();
    //gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_INT, 0);
  }, 1000 / 60);
}

main();
