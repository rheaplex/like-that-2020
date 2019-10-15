class Appearance {
  constructor() {
    this.col = {
      r: 0.0,
      g: 0.0,
      b: 0.0,
      a: 1.0
    };
    // Floor rounds down, so we use 4 to get max 3
    switch(Math.floor(Math.random() * 4)) {
    case 0:
      this.col.r = 1.0;
      break;
    case 1:     
      this.col.r = 1.0;
      this.col.g = 1.0;
      break;
    case 2:
      this.col.b = 1.0;
      break;
    case 3:
      // Black: do nothing.
      break;
    }
  }

  fill () {
    return this.col;
  }

  stroke () {
    return false;
  }
}
