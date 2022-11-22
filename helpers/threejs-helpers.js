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

function createRenderer({THREE, canvas, AA}) {
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

const PERLIN_YWRAPB    = 4;
const PERLIN_YWRAP     = 1 << PERLIN_YWRAPB;
const PERLIN_ZWRAPB    = 8;
const PERLIN_ZWRAP     = 1 << PERLIN_ZWRAPB;
const PERLIN_SIZE      = 4095;
let perlin_octaves     = 4; // default to medium smooth
let perlin_amp_falloff = 0.5; // 50% reduction/octave
const scaled_cosine    = i => 0.5 * (1.0 - Math.cos(i * Math.PI));
let perlin; // will be initialized lazily by noise() or noiseSeed()

function noise(x, y = 0, z = 0) {
  if (perlin == null) {
    perlin = new Array(PERLIN_SIZE + 1);
    for (let i = 0; i < PERLIN_SIZE + 1; i++) {
      perlin[i] = Math.random();
    }
  }

  if (x < 0) {
    x = -x;
  }
  if (y < 0) {
    y = -y;
  }
  if (z < 0) {
    z = -z;
  }

  let xi = Math.floor(x),
      yi = Math.floor(y),
      zi = Math.floor(z);
  let xf = x - xi;
  let yf = y - yi;
  let zf = z - zi;
  let rxf, ryf;

  let r    = 0;
  let ampl = 0.5;

  let n1, n2, n3;

  for (let o = 0; o < perlin_octaves; o++) {
    let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);

    rxf = scaled_cosine(xf);
    ryf = scaled_cosine(yf);

    n1 = perlin[of & PERLIN_SIZE];
    n1 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n1);
    n2 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
    n2 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2);
    n1 += ryf * (n2 - n1);

    of += PERLIN_ZWRAP;
    n2 = perlin[of & PERLIN_SIZE];
    n2 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n2);
    n3 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
    n3 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3);
    n2 += ryf * (n3 - n2);

    n1 += scaled_cosine(zf) * (n2 - n1);

    r += n1 * ampl;
    ampl *= perlin_amp_falloff;
    xi <<= 1;
    xf *= 2;
    yi <<= 1;
    yf *= 2;
    zi <<= 1;
    zf *= 2;

    if (xf >= 1.0) {
      xi++;
      xf--;
    }
    if (yf >= 1.0) {
      yi++;
      yf--;
    }
    if (zf >= 1.0) {
      zi++;
      zf--;
    }
  }
  return r;
}

function noiseSeed(seed) {
  // Linear Congruential Generator
  // Variant of a Lehman Generator
  const lcg = (() => {
    // Set to values from http://en.wikipedia.org/wiki/Numerical_Recipes
    // m is basically chosen to be large (as it is the max period)
    // and for its relationships to a and c
    const m = 4294967296;
    // a - 1 should be divisible by m's prime factors
    const a = 1664525;
    // c and m should be co-prime
    const c = 1013904223;
    let seed, z;
    return {
      setSeed(val) {
        // pick a random seed if val is undefined or null
        // the >>> 0 casts the seed to an unsigned 32-bit integer
        z = seed = (val == null ? Math.random() * m : val) >>> 0;
      },
      getSeed() {
        return seed;
      },
      rand() {
        // define the recurrence relationship
        z = (a * z + c) % m;
        // return a float in [0, 1)
        // if z = m then z / m = 0 therefore (z % m) / m < 1 always
        return z / m;
      }
    };
  })();

  lcg.setSeed(seed);
  perlin = new Array(PERLIN_SIZE + 1);
  for (let i = 0; i < PERLIN_SIZE + 1; i++) {
    perlin[i] = lcg.rand();
  }
}