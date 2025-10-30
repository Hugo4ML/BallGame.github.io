"use strict"

export class Box {
  /*
  Rectangle drawn by using webgl element buffers.
  */
  gl;
  vao;
  ebo;
  x;
  y;
  width;
  height;
  color;
  constructor(gl, x, y, width, height) {
    /*
    Define position and dimensions and create webgl components.
    */
    this.gl = gl;//canvas.getContext("webgl2");
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = [0.0, 0.0, 0.0];
    
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
    this.gl.bindVertexArray(this.vao);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
      this.x,              this.y,               this.color[0], this.color[1], this.color[2],
      this.x + this.width, this.y,               this.color[0], this.color[1], this.color[2],
      this.x + this.width, this.y + this.height, this.color[0], this.color[1], this.color[2],
      this.x,              this.y + this.height, this.color[0], this.color[1], this.color[2]
    ]), this.gl.STATIC_DRAW);
    this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_INT, 0);
  }
}
