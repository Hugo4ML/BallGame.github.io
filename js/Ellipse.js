"use strict"

export class Ellipse {
  x;
  y;
  radius;
  gl;
  vao;
  vbo;
  ebo;
  constructor(x, y, radius, canvas, color) {
    /*
    Creates a circle of a given radius.
    */
    this.x = x;
    this.y = y;
    this.radius = radius;
    if(canvas !== undefined) {
      radius * (2.0 ** 0.5);
    }
  }
}
