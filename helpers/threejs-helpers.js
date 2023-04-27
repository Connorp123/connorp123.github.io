/***
 *
 *    88888888ba   88888888888  888b      88  88888888ba,    88888888888  88888888ba   88888888888  88888888ba
 *    88      "8b  88           8888b     88  88      `"8b   88           88      "8b  88           88      "8b
 *    88      ,8P  88           88 `8b    88  88        `8b  88           88      ,8P  88           88      ,8P
 *    88aaaaaa8P'  88aaaaa      88  `8b   88  88         88  88aaaaa      88aaaaaa8P'  88aaaaa      88aaaaaa8P'
 *    88""""88'    88"""""      88   `8b  88  88         88  88"""""      88""""88'    88"""""      88""""88'
 *    88    `8b    88           88    `8b 88  88         8P  88           88    `8b    88           88    `8b
 *    88     `8b   88           88     `8888  88      .a8P   88           88     `8b   88           88     `8b
 *    88      `8b  88888888888  88      `888  88888888Y"'    88888888888  88      `8b  88888888888  88      `8b
 *
 *
 */

function createRenderer({THREE, canvas, AA = true}) {
    const renderer = new THREE.WebGLRenderer({canvas, antialias: AA});

    if (isMobile()) {
        renderer.setSize(window.innerWidth, window.innerHeight);

    } else {
        renderer.setSize(window.innerWidth - 400, window.innerHeight);
    }

    return renderer;
}


/***
 *
 *    8b           d8  88888888888  ,ad8888ba,  888888888888  ,ad8888ba,    88888888ba
 *    `8b         d8'  88          d8"'    `"8b      88      d8"'    `"8b   88      "8b
 *     `8b       d8'   88         d8'                88     d8'        `8b  88      ,8P
 *      `8b     d8'    88aaaaa    88                 88     88          88  88aaaaaa8P'
 *       `8b   d8'     88"""""    88                 88     88          88  88""""88'
 *        `8b d8'      88         Y8,                88     Y8,        ,8P  88    `8b
 *         `888'       88          Y8a.    .a8P      88      Y8a.    .a8P   88     `8b
 *          `8'        88888888888  `"Y8888Y"'       88       `"Y8888Y"'    88      `8b
 *
 *
 */
function vectorSub(v1, v2) {
    if (v1.length < 3 || v2.length < 3) return v1;

    return [v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2]];
}

function vectorAdd(v1, v2) {
    if (v1.length < 3 || v2.length < 3) return v1;

    return [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]];
}

function vectorMult(v1, v2) {
    if (v1.length < 3 || v2.length < 3) return v1;

    return [v1[0] * v2[0], v1[1] * v2[1], v1[2] * v2[2]];
}

function vectorLimit(v, limit) {
    if (v.length < 3) return v;

    v[0] = v[0] > limit ? limit : v[0] < (-1 * limit) ? (-1 * limit) : v[0];
    v[1] = v[1] > limit ? limit : v[1] < (-1 * limit) ? (-1 * limit) : v[1];
    v[2] = v[2] > limit ? limit : v[2] < (-1 * limit) ? (-1 * limit) : v[2];

    return v;
}


/***
 *
 *      ,ad8888ba,         db         88b           d88  88888888888  88888888ba          db
 *     d8"'    `"8b       d88b        888b         d888  88           88      "8b        d88b
 *    d8'                d8'`8b       88`8b       d8'88  88           88      ,8P       d8'`8b
 *    88                d8'  `8b      88 `8b     d8' 88  88aaaaa      88aaaaaa8P'      d8'  `8b
 *    88               d8YaaaaY8b     88  `8b   d8'  88  88"""""      88""""88'       d8YaaaaY8b
 *    Y8,             d8""""""""8b    88   `8b d8'   88  88           88    `8b      d8""""""""8b
 *     Y8a.    .a8P  d8'        `8b   88    `888'    88  88           88     `8b    d8'        `8b
 *      `"Y8888Y"'  d8'          `8b  88     `8'     88  88888888888  88      `8b  d8'          `8b
 *
 *
 */

// Create camera and move it back slightly
// const camera      = new THREE.PerspectiveCamera(fov, aspect, near, far);
// camera.position.x = 4;
// camera.position.y = 10;
// camera.position.z = cameraDistance;


/***
 *
 *      ,ad8888ba,  888888888888  88        88  88888888888  88888888ba
 *     d8"'    `"8b      88       88        88  88           88      "8b
 *    d8'        `8b     88       88        88  88           88      ,8P
 *    88          88     88       88aaaaaaaa88  88aaaaa      88aaaaaa8P'
 *    88          88     88       88""""""""88  88"""""      88""""88'
 *    Y8,        ,8P     88       88        88  88           88    `8b
 *     Y8a.    .a8P      88       88        88  88           88     `8b
 *      `"Y8888Y"'       88       88        88  88888888888  88      `8b
 *
 *
 */

function isMobile() {
    return window.innerWidth < 1024;
}

function constrain(n, low, high) {
    return Math.max(Math.min(n, high), low);
}

function map(n, start1, stop1, start2, stop2, withinBounds) {
    const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    if (!withinBounds) {
        return newval;
    }
    if (start2 < stop2) {
        return constrain(newval, start2, stop2);
    } else {
        return constrain(newval, stop2, start2);
    }
}

function printProgress(progress) {
    console.clear();
    console.log(`Progress: ${progress}%`);
}

/***
 *
 *    888b      88    ,ad8888ba,    88   ad88888ba   88888888888
 *    8888b     88   d8"'    `"8b   88  d8"     "8b  88
 *    88 `8b    88  d8'        `8b  88  Y8,          88
 *    88  `8b   88  88          88  88  `Y8aaaaa,    88aaaaa
 *    88   `8b  88  88          88  88    `"""""8b,  88"""""
 *    88    `8b 88  Y8,        ,8P  88          `8b  88
 *    88     `8888   Y8a.    .a8P   88  Y8a     a8P  88
 *    88      `888    `"Y8888Y"'    88   "Y88888P"   88888888888
 *
 *
 */

const NOISE_PERMUTATION = [
    151, 160, 137, 91, 90, 15,
    131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23,
    190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
    88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166,
    77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244,
    102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
    135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123,
    5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42,
    223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
    129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228,
    251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107,
    49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
    138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180
];

class PerlinNoise {

    // PERLIN NOISE
    // http://asserttrue.blogspot.nl/2011/12/perlin-noise-in-javascript_31.html
    // This is a port of Ken Perlin's Java code. The
    // original Java code is at https://cs.nyu.edu/~perlin/noise/.
    // Note that in this version, a number from 0 to 1 is returned.

    static noise(x, y, z) {

        // Initialize p
        let p = new Array(512);
        for (let i = 0; i < 256; i++)
            p[256 + i] = p[i] = NOISE_PERMUTATION[i];

        // Find unit cube that contains point
        let X = Math.floor(x) & 255;
        let Y = Math.floor(y) & 255;
        let Z = Math.floor(z) & 255;

        // Find relative x,y,z of point in cube
        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);

        // Compute fade curves for each of x,y,z
        let u = this.fade(x);
        let v = this.fade(y);
        let w = this.fade(z);

        // Hash coordinates of the 8 cube corners
        let A  = p[X] + Y;
        let AA = p[A] + Z;
        let AB = p[A + 1] + Z;
        let B  = p[X + 1] + Y;
        let BA = p[B] + Z;
        let BB = p[B + 1] + Z;

        return this.scale(
            this.lerp(w,
                this.lerp(v,
                    this.lerp(u,
                        this.grad(p[AA], x, y, z),
                        this.grad(p[BA], x - 1, y, z)),
                    this.lerp(u,
                        this.grad(p[AB], x, y - 1, z),
                        this.grad(p[BB], x - 1, y - 1, z))),
                this.lerp(v,
                    this.lerp(u,
                        this.grad(p[AA + 1], x, y, z - 1),
                        this.grad(p[BA + 1], x - 1, y, z - 1)),
                    this.lerp(u,
                        this.grad(p[AB + 1], x, y - 1, z - 1),
                        this.grad(p[BB + 1], x - 1, y - 1, z - 1))
                )
            )
        );
    };

    static fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    static lerp(t, a, b) {
        return a + t * (b - a);
    }

    static grad(hash, x, y, z) {
        let h = hash & 15;
        let u = h < 8 ? x : y;
        let v = h < 4 ? y : h === 12 || h === 14 ? x : z;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }

    static scale(n) {
        return (1 + n) / 2;
    }
}