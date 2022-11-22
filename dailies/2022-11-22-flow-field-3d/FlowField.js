/***
 *
 *    88888888888  88           ,ad8888ba,   I8,        8        ,8I     88888888888  88  88888888888  88           88888888ba,
 *    88           88          d8"'    `"8b  `8b       d8b       d8'     88           88  88           88           88      `"8b
 *    88           88         d8'        `8b  "8,     ,8"8,     ,8"      88           88  88           88           88        `8b
 *    88aaaaa      88         88          88   Y8     8P Y8     8P       88aaaaa      88  88aaaaa      88           88         88
 *    88"""""      88         88          88   `8b   d8' `8b   d8'       88"""""      88  88"""""      88           88         88
 *    88           88         Y8,        ,8P    `8a a8'   `8a a8'        88           88  88           88           88         8P
 *    88           88          Y8a.    .a8P      `8a8'     `8a8'         88           88  88           88           88      .a8P
 *    88           88888888888  `"Y8888Y"'        `8'       `8'          88           88  88888888888  88888888888  88888888Y"'
 *
 *
 */
import * as THREE from "https://threejs.org/build/three.module.js";

export class FlowField {

  constructor({res, width, height, depth}) {
    this.resolution = res || 10;
    this.cols       = width / this.resolution;
    this.rows       = height / this.resolution;
    this.layers     = depth / this.resolution;
    this.field      = this.make2Darray(this.cols);
    this.init();
  }

  make2Darray(n) {
    let array = [];
    for (let i = 0; i < this.layers; i++) {
      array[i] = [];
      for (let j = 0; j < this.cols; j++) {
        array[i][j] = [];
      }
    }
    return array;
  }

  init() {

    let xoff = 0;
    for (let i = 0; i < this.cols; i++) {

      printProgress(i / this.cols * 100);

      let yoff = 0;
      for (let j = 0; j < this.rows; j++) {

        let zoff = 0;
        for (let k = 0; k < this.layers; k++) {

          let theta      = PerlinNoise.noise(xoff, yoff, 0) * Math.PI * 2;
          let zComponent = (PerlinNoise.noise(xoff, yoff, zoff + 10) * 2) - 1; // shift to be within (-1,1)

          // Polar to cartesian coordinate transformation to get x and y components of the vector
          // this.field[i][j][k] = new THREE.Vector3(Math.cos(theta), Math.sin(theta), zComponent);
          this.field[i][j][k] = [Math.cos(theta), Math.sin(theta), zComponent * 10];

          zoff += 0.1;
        }

        // Increment yoff
        yoff += 0.1;
      }

      // Increment xoff
      xoff += 0.1;
    }
  }

  lookup(lookup) {
    let column = Math.floor(constrain(lookup.x / this.resolution, 0, this.cols - 1));
    let row    = Math.floor(constrain(lookup.y / this.resolution, 0, this.rows - 1));
    let layer  = Math.floor(constrain(lookup.z / this.resolution, 0, this.layers - 1));
    let cell   = this.field[column][row][layer];
    return new THREE.Vector3(cell[0], cell[1], cell[2]);
  }
}


/**
 *
 * 88888888ba                                    88              88
 * 88      "8b                            ,d     ""              88
 * 88      ,8P                            88                     88
 * 88aaaaaa8P'  ,adPPYYba,  8b,dPPYba,  MM88MMM  88   ,adPPYba,  88   ,adPPYba,
 * 88""""""'    ""     `Y8  88P'   "Y8    88     88  a8"     ""  88  a8P_____88
 * 88           ,adPPPPP88  88            88     88  8b          88  8PP"""""""
 * 88           88,    ,88  88            88,    88  "8a,   ,aa  88  "8b,   ,aa
 * 88           `"8bbdP"Y8  88            "Y888  88   `"Ybbd8"'  88   `"Ybbd8"'
 *
 */
export class Particle {
  constructor({scene, geometry, x, y, z, ms, mf, color}) {
    this.acceleration = new THREE.Vector3();
    this.velocity     = new THREE.Vector3();
    this.r            = 4;
    this.maxSpeed     = ms || 4;
    this.maxForce     = mf || 0.1;

    // Create mesh
    this.color    = color || new THREE.Color(Math.random(), Math.random(), Math.random());
    this.material = new THREE.MeshPhongMaterial({color: this.color});
    this.mesh     = new THREE.Mesh(geometry, this.material);
    this.mesh.position.copy(new THREE.Vector3(x, y, z));
    scene.add(this.mesh);
  }

  follow(flow) {
    let desired = flow.lookup(this.mesh.position);
    desired.multiplyScalar(this.maxSpeed);
    desired.sub(this.velocity);
    desired.clampLength(0, this.maxForce);
    this.acceleration.add(desired);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.clampLength(0, this.maxSpeed);

    this.mesh.position.add(this.velocity);

    this.acceleration.multiplyScalar(0);
  }

  borders({xmin, xmax, ymin, ymax, zmin, zmax}) {
    if (this.mesh.position.x < xmin) this.mesh.position.x = xmax;
    if (this.mesh.position.y < ymin) this.mesh.position.y = ymax;
    if (this.mesh.position.z < zmin) this.mesh.position.z = zmax;

    if (this.mesh.position.x > xmax) this.mesh.position.x = xmin;
    if (this.mesh.position.y > ymax) this.mesh.position.y = ymin;
    if (this.mesh.position.z > zmax) this.mesh.position.z = zmin;
  }
}