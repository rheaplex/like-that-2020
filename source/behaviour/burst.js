class Behaviour {
  constructor(
    xx, yy, zz, siz, start_grow, stop_grow, start_shrink, stop_shrink
  ) {
    this.x = xx;
    this.y = yy;
    this.z = zz;
    this.size = siz;
    this.start_growing = start_grow;
    this.stop_growing = stop_grow;
    this.start_shrinking = start_shrink;
    this.stop_shrinking = stop_shrink;
    this.grow_factor = 1.0 / (stop_grow - start_grow);
    this.shrink_factor = 1.0 / (stop_shrink - start_shrink);
  }

  scaleFactor(t) {
    let scale = 0.0;
    // If we are after the end of the animation, the scale is 0.0
    if (t < this.stop_shrinking) {
      // If we are shrinking
      if (t > this.start_shrinking) {
        scale = 1.0 - (this.shrink_factor * (t - this.start_shrinking));
      // If we are grown
      } else if (t > this.stop_growing) {
        scale = 1.0;
      // If we are growing
      } else if (t > this.start_growing) {
        scale = this.grow_factor * (t - this.start_growing); 
      }
      // Otherwise we are before the start of our animation, so scale is 0.0
    }
    return scale;
  }

  apply(form, t) {
    const scale_factor = this.scaleFactor(t); 
    if (scale_factor === 0) {
      return; 
    }
    const side_length = this.size * scale_factor;
    if (side_length > this.size) {
      side_length = this.size;
    }
    form.setState(
      this.x * scale_factor,
      this.y * scale_factor,
      this.z * scale_factor,
      this.size * scale_factor
    );
  }

  finished(t) {
    return t > this.stop_shrinking;
  }
}
