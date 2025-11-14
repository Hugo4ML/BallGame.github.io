"use strict"

class Point {
  /*
  Acts a single point in 2D space.
  */
  position;
  constructor(x, y) {
    /*
    Store 2D point position.
    */
    this.position = {};
    this.position.x = x, this.position.x = y;
  }

  /*
  Provides easier access to position values.
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
}
