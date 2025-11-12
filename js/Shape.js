"use strict"

export class Shape {
  /*
  Shaped defined by a set of vertices to be drawn by using webgl element buffers.
  */
  position;
  vertices;
  color;
  gl;
  vao;
  vbo;
  ebo;
  constructor(x, y, vertices, canvas) {
    /*
    Define position and create webgl components.
    */
    this.position = {};
    this.position.x = x, this.position.y = y;
    if(canvas !== undefined) {
      this.gl = canvas.getContext("webgl2");
      
      const boundVao = this.gl.getParameter(this.gl.VERTEX_ARRAY_BINDING);
      const boundVbo = this.gl.getParameter(this.gl.ARRAY_BUFFER_BINDING);
      
      this.vao = this.gl.createVertexArray();
      this.gl.bindVertexArray(this.vao);
      
      this.vbo = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo);
      
      this.ebo = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.ebo);
      
      this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, 5 * 32 / 8, 0);
      this.gl.enableVertexAttribArray(0);
      this.gl.vertexAttribPointer(1, 3, this.gl.FLOAT, false, 5 * 32 / 8, 2 * 32 / 8);
      this.gl.enableVertexAttribArray(1);
      
      this.gl.bindVertexArray(boundVao);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, boundVbo);
      
      if(color !== undefined) this.color = color;
      else this.color = [0.0, 0.0, 0.0];
    } else {
      this.gl = undefined, this.vao = undefined, this.ebo = undefined;
    }
  }

  /*
  Provides easier access to certain properties.
  */
  get x() {
    return this.position.x;
  }
  set x(x) {
    this.position.x = x;
  }
  get y() {
    return this.position.y;
  }
  set y(y) {
    this.position.y = y;
  }
  
  draw() {
    /*
    Draw vertex array object.
    */
    if(this.gl !== undefined) {
      const boundVao = this.gl.getParameter(this.gl.VERTEX_ARRAY_BINDING);
      
      this.gl.bindVertexArray(this.vao);
      this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_INT, 0);
  
      this.gl.bindVertexArray(boundVao);
    }
  }
}
