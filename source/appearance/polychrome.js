class Appearance {
  constructor () {
    this.col = {
      r: Math.random(),
      g: Math.random(),
      b: Math.random(),
      a: 1.0
    };
  }
  
  fill () {
    return this.col;
  }

  stroke () {
    return false;
  }
}
