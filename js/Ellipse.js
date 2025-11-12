"use strict"

import {Shape} from "./Shape.js";

export class Ellipse extends Shape {
  radius;
  constructor(x, y, radius, canvas, color) {
    /*
    Creates a circle of a given radius.
    */
    super(x, y, [], canvas);
    this.radius = radius;
  }
}
