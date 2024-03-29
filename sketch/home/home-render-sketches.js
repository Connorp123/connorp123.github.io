let sketches = [];
let isHome   = true;

import { home_word_vomit } from "../modules/word-vomit.js";
import { home_cursor_v1 } from "./cursor-v1.js";
import { home_dfs } from "../dfs.js";

// Mini sketches
sketches.push(new p5(tiles, "sketch1"));
sketches.push(new p5(rapid_bubbles, "sketch2"));
sketches.push(new p5(whitney, "sketch3"));
sketches.push(new p5(cursor_v2, "sketch4"));
sketches.push(new p5(home_cursor_v1, "sketch5"));
sketches.push(new p5(snake_game, "sketch6"));
sketches.push(new p5(face_attraction, "sketch7"));
sketches.push(new p5(temp_viz, "sketch8"));
sketches.push(new p5(random_number_visualizer, "sketch9"));
sketches.push(new p5(color_layers, "sketch10"));
sketches.push(new p5(home_dfs, "sketch11"));

// Modules
sketches.push(new p5(home_word_vomit, "sketch12"));

// Home background sketch
sketches.push(new p5(flow_field, "home-sketch"));