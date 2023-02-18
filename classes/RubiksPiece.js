import * as THREE from "../lib/three.module.js";

export class RubiksPiece {

    constructor({parent, geometry, x = 0, y = 0, z = 0, color, mesh}) {
        console.log(x, y, z);

        // Physical properties
        this.initPos  = [x, y, z];
        this.color    = color || 0xFFFFFF;
        this.material = mesh || new THREE.MeshBasicMaterial({color: this.color});
        this.mesh     = new THREE.Mesh(geometry, this.material);
        this.setMeshPos({x, y, z});
        parent.add(this.mesh);
    }

    rotate({axis, rad}) {
        this.mesh.rotateOnAxis(axis, rad);
    }

    update() {
        this.setMeshPos({});
    }

    getPosAsVector() {
        return this.mesh.position;
    }

    setMeshPos({x, y, z}) {
        if (x) this.mesh.position.x = x;
        if (y) this.mesh.position.y = y;
        if (z) this.mesh.position.z = z;
    }

    getChildren() {
        return Array.from(this.mesh.children);
    }

    getChildWithVector({vec, x, y, z}) {
        if (vec) {
            return this.getChildren().find(child => child.position.equals(vec));
        } else {
            return this.getChildren().find(child =>
                child.position.getComponent(0) === x &&
                child.position.getComponent(1) === y &&
                child.position.getComponent(2) === z
            );
        }
    }

    getChildrenWithXOff({xOff}) {
        return this.getChildren().filter(child => child.position.getComponent(0) === xOff)
    }

    getChildrenWithYOff({yOff}) {
        return this.getChildren().filter(child => child.position.getComponent(1) === yOff)
    }

    getChildrenWithZOff({zOff}) {
        return this.getChildren().filter(child => child.position.getComponent(2) === zOff)
    }

    getChildrenWithComponents({x, y, z}) {
        return this.getChildren().filter(child => {
            return (x === 0 ? true : child.position.getComponent(0) === x) &&
                (y === 0 ? true : child.position.getComponent(1) === y) &&
                (z === 0 ? true : child.position.getComponent(2) === z);
        });
    }

    getChildrenWithOffset({x, y, z}) {
        if (x) {
            console.log(this.getChildren().filter(child => child.position.getComponent(0) === x));
            return this.getChildren().filter(child => child.position.getComponent(0) === x);
        } else if (y) {
            return this.getChildren().filter(child => child.position.getComponent(1) === y);
        } else if (z) {
            return this.getChildren().filter(child => child.position.getComponent(2) === z);

        }
        return null;
    }

    getChildrenWithZeroComponents({xIsZero, yIsZero, zIsZero}) {
        return this.getChildren().filter(child => {
            return (xIsZero ? child.position.getComponent(0) === 0 : child.position.getComponent(0) !== 0) &&
                (yIsZero ? child.position.getComponent(1) === 0 : child.position.getComponent(1) !== 0) &&
                (zIsZero ? child.position.getComponent(2) === 0 : child.position.getComponent(2) !== 0);
        });
    }
}