/* global Appearance Behaviour Form randomFloat randomInt */

class Sequence {
  constructor (scene, now) {
    this.scene = scene;
    this.min_objects = 4;
    this.max_objects = 24;
    // t == 0..1
    this.min_object_start_t = 0.0;
    this.max_object_start_t = 0.5;
     // In world units
    this.min_object_size = 0.05;
    this.max_object_size = 2.0;
    this.min_object_x = -this.max_object_size * 0.5;
    this.max_object_x = this.max_object_size * 0.5;
    this.min_object_y = -this.max_object_size * 0.5;
    this.max_object_y = this.max_object_size * 0.5;
    this.min_object_z = -this.max_object_size * 0.5;
    this.max_object_z = this.max_object_size * 0.5;
    // In seconds
    this.min_duration = 1.0;
    this.max_duration = 10.0;
    this.end_of_current_sequence = 0;
    // In radians
    this.rotation = 0;
    this.genObjects(now);
  }

  randomDuration () {
    return randomFloat(this.min_duration, this.max_duration) * 1000; 
  }

  genObjects (start_growing) {
    this.rotation = Math.random() * (Math.PI / 2.0);
    const num_objects = randomInt(this.max_objects, this.min_objects);
    this.forms = new Array(num_objects); 
    const growing_range = this.randomDuration();
    const stop_growing = start_growing + growing_range;
    const start_shrinking = stop_growing + this.randomDuration();
    const shrinking_range = this.randomDuration();
    const stop_shrinking = start_shrinking + shrinking_range;
    this.end_of_current_sequence = stop_shrinking;
    for (let i = 0; i < num_objects; i++) {
	  const t_factor = randomFloat(
        this.min_object_start_t,
        this.max_object_start_t
      );
      this.forms[i] = new Form(
        this.scene,
	    new Appearance(),
	    new Behaviour(
   	      randomFloat(this.min_object_x, this.max_object_x),
   	      randomFloat(this.min_object_y, this.max_object_y), 
   	      0.0, //randomFloat(this.min_object_z, this.max_object_z), 
   	      randomFloat(this.min_object_size, this.max_object_size), 
	      start_growing + (growing_range * t_factor),
	      stop_growing,
	      start_shrinking,
	      start_shrinking + (shrinking_range * t_factor)
        )
      );
    }
  }

  disposeObjects () {
    // Every item should have been disposed of, but just in case...
    if (this.forms.length > 0) {
      console.log("Forms list not empty after animation finished.");
      this.forms.forEach(form => form.dispose());
    }
    delete this.forms;
  }

  updateObjects (now) {
    if (now >= this.end_of_current_sequence) {
      this.disposeObjects();
      this.genObjects(now);
    }
    this.forms.forEach((form, index) => {
      if (!form.behaviour.finished(now)) {
        form.update(now);
      } else {
        // Rather than set size to zero and waste resources continue to
        // update/render unseen objects (and upset three.js), dispose of
        // finished items and remove them from the forms list.
        form.dispose();
        this.forms.splice(index, 1);
      }
    });
  }
}
