import * as THREE from "../lib/three.module.js";

/*
    The goal of this class is to abstract the manipulation of meshes from outside of this class.
 */

export class RubiksPiece {

    constructor({scene, parentPiece, geometry, x = 0, y = 0, z = 0, color, mats}) {
        this.color    = color || 0xFFFFFF;
        this.material = mats || new THREE.MeshBasicMaterial({color: this.color});
        this.mesh     = new THREE.Mesh(geometry, this.material);
        this.children = [];
        this.setPosition({x, y, z});

        if (scene) {
            scene.attach(this.mesh);
            this.parent = null;
        } else if (parentPiece) {
            this.parent = parentPiece;
            parentPiece.attach(this);
        }
    }

    update() {
        this.mesh.updateMatrix();
    }

    rotate({axis, rad}) {
        this.mesh.rotateOnAxis(axis, rad);
    }

    setRotationFromQuaternion(quat) {
        this.mesh.setRotationFromQuaternion(quat);
    }

    attach(childPiece) {
        this.children.push(childPiece);
        this.mesh.attach(childPiece.mesh);
    }

    remove(formerChildPiece) {
        this.children = this.children.filter(child => !child.equals(formerChildPiece));
    }

    detachSelf() {
        if (this.parent) {
            this.parent.remove(this);
        }
    }

    equals(otherPiece) {
        return this.mesh.uuid === otherPiece.mesh.uuid;
    }

    setPosition({x, y, z}) {
        if (x) this.mesh.position.x = x;
        if (y) this.mesh.position.y = y;
        if (z) this.mesh.position.z = z;
    }

    /***
     *
     *      ,ad8888ba,   88888888888  888888888888  ad88888ba
     *     d8"'    `"8b  88                88      d8"     "8b
     *    d8'            88                88      Y8,
     *    88             88aaaaa           88      `Y8aaaaa,
     *    88      88888  88"""""           88        `"""""8b,
     *    Y8,        88  88                88              `8b
     *     Y8a.    .a88  88                88      Y8a     a8P
     *      `"Y88888P"   88888888888       88       "Y88888P"
     *
     *
     */

    getChildren() {
        return this.children;
    }

    getWorldPosition() {
        const pos = new THREE.Vector3();
        this.mesh.getWorldPosition(pos);
        return pos;
    }

    getWorldQuaternion() {
        const quat = new THREE.Quaternion();
        this.mesh.getWorldQuaternion(quat);
        return quat;
    }

    getChildWithVector({vec, x, y, z}) {
        if (vec) {
            return this.getChildren().find(child => child.mesh.position.equals(vec));
        } else {
            return this.getChildren().find(child =>
                child.mesh.position.getComponent(0) === x &&
                child.mesh.position.getComponent(1) === y &&
                child.mesh.position.getComponent(2) === z
            );
        }
    }

    getChildrenWithXOff({xOff}) {
        return this.getChildren().filter(child => child.mesh.position.getComponent(0) === xOff);
    }

    getChildrenWithYOff({yOff}) {
        return this.getChildren().filter(child => child.mesh.position.getComponent(1) === yOff);
    }

    getChildrenWithZOff({zOff}) {
        return this.getChildren().filter(child => child.mesh.position.getComponent(2) === zOff);
    }

    getMaterials() {
        return this.material;
    }
}