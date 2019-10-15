/* Like That: 3d */

/* global THREE */

class Form {
  constructor(scene, appearance, behaviour) {
    this.scene = scene;
    this.behaviour = behaviour;
    // Are we active in the scene?
    this.active = false;
    const geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
    const colour = appearance.fill();
    const materialProperties = {
      color: new THREE.Color(colour.r, colour.g, colour.b)
    };
    if (colour.a < 1.0) {
      materialProperties.transparent = true;
      materialProperties.opacity = colour.a;
    }
    const material = new THREE.MeshStandardMaterial(materialProperties);
    this.mesh = new THREE.Mesh(geometry, material);
    //FIXME: CAMERA!!!!
    this.mesh.rotateX(Math.PI / 8.0);
    this.mesh.rotateY(Math.PI / 8.0);
  }

  setState(x, y, z, size, visible) {
    // Lazily add ourselves to the scene to avoid appearing as a unit cube.
    // Setting size zero doesn't seem to be working...
    if (! this.active) {
      this.scene.add(this.mesh);
      this.active = true;
    }
    this.mesh.position.set(x, y, z);
    this.mesh.scale.set(size, size, size);
  }

  update(now) {
    this.behaviour.apply(this, now);
  }

  dispose() {
    this.active = false;
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
    this.scene.remove(this.mesh);
  }
}
