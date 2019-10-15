class Appearance {
  constructor () {
    this.col = {
      r: Math.random(),
      g: Math.random(),
      b: Math.random(),
      a: 0.5
    };
  }
  
  fill () {
    return this.col;
  }

  stroke () {
    return false;
  }
}
