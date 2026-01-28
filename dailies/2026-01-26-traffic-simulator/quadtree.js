// https://carlosupc.github.io/Spatial-Partitioning-Quadtree/
// class QuadBoundary {
//     constructor({x, y, w, h}) {
//         this.x = x;
//         this.y = y;
//         this.w = w;
//         this.h = h;
//
//         this.top    = y - h;
//         this.bottom = y + h;
//         this.left   = x - w;
//         this.right  = x + w;
//     }
//
//     contains({pointX, pointY}) {
//         return pointX >= this.left &&
//             pointX <= this.right &&
//             pointY >= this.top &&
//             pointY <= this.bottom;
//     }
//
//     intersects({rangeLeft, rangeRight, rangeTop, rangeBottom}) {
//         return !(rangeLeft > this.right || rangeRight < this.left || rangeTop > this.bottom || rangeBottom < this.top);
//     }
//
// }
//
// export class QuadTree {
//     constructor({boundary, n}) {
//         this.boundary = boundary;
//         this.capacity = n;
//         this.points   = [];
//         this.divided  = false;
//     }
//
//     subdivide() {
//
//         let x = this.boundary.x;
//         let y = this.boundary.y;
//         let w = this.boundary.w;
//         let h = this.boundary.h;
//
//         let ne = new QuadBoundary({
//                 x: x + w / 2,
//                 y: y - h / 2,
//                 w: w / 2,
//                 h: h / 2
//             }
//         );
//         let nw = new QuadBoundary({
//             x: x - w / 2,
//             y: y - h / 2,
//             w: w / 2,
//             h: h / 2
//         });
//         let se = new QuadBoundary({
//             x: x + w / 2,
//             y: y + h / 2,
//             w: w / 2,
//             h: h / 2
//         });
//         let sw = new QuadBoundary({
//             x: x - w / 2,
//             y: y + h / 2,
//             w: w / 2,
//             h: h / 2
//         });
//
//         this.northeast = new QuadTree(ne, this.capacity);
//         this.northwest = new QuadTree(nw, this.capacity);
//         this.southeast = new QuadTree(se, this.capacity);
//         this.southwest = new QuadTree(sw, this.capacity);
//
//
//         this.divided = true;
//     }
//
//
//     insert({pointX, pointY}) {
//
//         if (!this.boundary.contains({pointX, pointY})) {
//             return false;
//         }
//
//         if (this.points.length < this.capacity) {
//             this.points.push(point);
//             return true;
//         } else {
//             if (!this.divided) {
//                 this.subdivide();
//             }
//
//             if (this.northeast.insert(point)) return true;
//             else if (this.northwest.insert({pointX, pointY})) return true;
//             else if (this.southeast.insert({pointX, pointY})) return true;
//             else if (this.southwest.insert({pointX, pointY})) return true;
//         }
//     }
//
//
//     query({range, found}) {
//
//         // let found = [];
//
//         if (!this.boundary.intersects(range)) {
//             return;
//         } else {
//             for (let p of this.points) {
//                 if (range.contains(p)) {
//                     found.push(p);
//                 }
//             }
//         }
//
//         if (this.divided) {
//             this.northwest.query({range, found});
//             this.northeast.query({range, found});
//             this.southwest.query({range, found});
//             this.southeast.query({range, found});
//         }
//
//     }
//
//     clear() {
//         this.points = [];
//
//         if (this.divided) {
//             this.northeast.clear();
//             this.northwest.clear();
//             this.southeast.clear();
//             this.southwest.clear();
//         }
//
//         this.divided = false;
//     }
//
//
//     show({p}) {
//         p.stroke(255);
//         p.strokeWeight(1);
//         p.noFill();
//         p.rectMode(p.CENTER);
//         p.rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);
//
//         if (this.divided) {
//             this.northeast.show({p});
//             this.northwest.show({p});
//             this.southeast.show({p});
//             this.southwest.show({p});
//         }
//
//         this.points.forEach((pt) => {
//             p.strokeWeight(4);
//             p.point(pt.x, pt.y);
//         });
//     }
// }
