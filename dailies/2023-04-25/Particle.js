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
import * as THREE from "https://threejs.org/build/three.module.js";

export class Particle {

    constructor({scene, geometry, radius, color, startingVel, speedMult, x = 0, y = 0, z = 0}) {

        // Physical properties
        this.pos      = [x, y, z];
        this.color    = color || new THREE.Color(Math.random(), Math.random(), Math.random());
        this.material = new THREE.MeshPhongMaterial({color: this.color});
        this.mesh     = new THREE.Mesh(geometry, this.material);
        this.setMeshPos();
        this.geometry = geometry;
        this.scene    = scene;
        scene.add(this.mesh);

        // Physics properties
        this.vel       = startingVel || [1, 1, 0];
        this.speedMult = [speedMult, speedMult, speedMult] || [1, 1, 1];
        this.radius    = radius || 0;

        // Start them with some random vel

        this.max = {
            x: 150,
            y: 150,
            z: 0
        };
        this.min = {
            x: 0,
            y: 0,
            z: 0
        };

        this.trail = [];

    }

    checkCollision() {

        // Top or bot
        if (this.pos[1] >= this.max.y || this.pos[1] <= this.min.y) {
            this.vel[1] *= -1;
        }

        // Left or right
        if (this.pos[0] >= this.max.x || this.pos[0] <= this.min.x) {
            this.vel[0] *= -1;
        }
    }

    // Update position
    update() {
        this.checkCollision();
        this.pos = vectorAdd(this.pos, vectorMult(this.vel, this.speedMult));
        this.setMeshPos();

        this.trail.forEach(historyParticle => {
            historyParticle.update();
        });
    }

    setMeshPos() {
        this.mesh.position.x = this.pos[0];
        this.mesh.position.y = this.pos[1];
        this.mesh.position.z = this.pos[2];
    }

    duplicate() {
        this.trail.push(new Particle({
            scene:       this.scene,
            geometry:    this.geometry.clone(),
            radius:      this.radius,
            color:       this.color,
            startingVel: [...this.vel],
            x:           this.pos[0],
            y:           this.pos[1],
            z:           this.pos[2]
        }));
    }
}