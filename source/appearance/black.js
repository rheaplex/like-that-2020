class Appearance {
  fill () {
    // Not actually black, otherwise 3d shapes are featureless
    return {
      r: 0.2,
      g: 0.2,
      b: 0.2,
      a: 1.0
    };
  }

  stroke () {
    return false;
  }
}
