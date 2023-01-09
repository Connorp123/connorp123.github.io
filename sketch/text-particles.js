export const text_particles = (p) => {

  let redraw = true;
  let reset = true;
  let repel = true;
  let radiate = false;
  let debug = false;
  let displayMode = 0;
  let bgColor = 0;
  let vehicles = [];
  let fontNames = [
    '/fonts/waltograph42.ttf',
    '/fonts/waltographUI.ttf'];
  let fontNum = 0;
  let fontSize;
  let font;
  let textBox1;
  let fontButton;
  let displayModeButton;
  let canvas;
  let mouse;

//--------------------------------------------------------------------------------------------------

  p.preload = () => {
    // Load the font
    font = p.loadFont(fontNames[0]);
  }//-------------------------------------------------------------------------------------------------

  p.setup = () => {
    // Creates the canvas
    canvas = createInstanceCanvas(p);

    // Calculate the font size
    fontSize = p.floor(p.width / 4.5);

    // Create the html elements
    createElements();

    // Display the particles
    updateText();
  }//-------------------------------------------------------------------------------------------------

  p.draw = () => {
    if (redraw) p.background(bgColor);
    if (debug) drawDebug();
    mouse = p.createVector(p.mouseX, p.mouseY);

    // Applies behaviors to the vehicles
    for (let i = 0; i < vehicles.length; i++) {
      if (reset) vehicles[i].reset();
      if (repel) vehicles[i].repel(mouse);
      if (radiate) vehicles[i].repel(p.createVector(p.width / 2, p.height / 2), p.width);
      vehicles[i].run();
    }
  }//-------------------------------------------------------------------------------------------------

// Key-binds
  p.keyPressed = () => {

    let key = p.key.toUpperCase();

    if (key === "1") {
      reset = !reset;
    }
    if (key === "R") {
      repel = !repel;
    }
    if (key === "B") {
      redraw = !redraw;
    }
    if (key === "F") {
      radiate = !radiate;
    }
    if (key === " ") {
      debug = !debug;
    }
    if (p.keyCode === p.UP_ARROW) {
      changeFontSize(25);
    }
    if (p.keyCode === p.DOWN_ARROW) {
      changeFontSize(-25);
    }
  }//-------------------------------------------------------------------------------------------------

  function changeFontSize(amount) {
    fontSize += amount;
    updateText();
    console.log("New font size: " + fontSize);
  }//-------------------------------------------------------------------------------------------------

  function updateText() {

    let text = textBox1.value();
    let xPos = 25;
    let yPos = p.height / 2 + fontSize / 3;

    // Gets a list of points from the borders of the text
    let points = font.textToPoints(text, xPos, yPos, fontSize, {
      sampleFactor: 0.15  // sampleFactor ~ frequency of points
    });

    // Creates a vehicle at each of the points
    vehicles = [];
    for (let i = 0; i < points.length; i++) {
      let pt = points[i];
      let vehicle = new Vehicle(pt.x, pt.y, 5);
      vehicle.randomizePos();
      vehicles.push(vehicle);
    }
  }//-------------------------------------------------------------------------------------------------

  function switchFont() {
    fontNum++;
    font = p.loadFont(fontNames[fontNum % fontNames.length], updateText);
  }//-------------------------------------------------------------------------------------------------

// Create the HTML Elements
  function createElements() {

    // Get the variables from the URL
    let urlValues = getURLValues();

    // Create the elements
    if (urlValues.text)
      textBox1 = p.createInput(urlValues.text);
    else
      textBox1 = p.createInput('ConnorPeace');
    fontButton = p.createButton('Switch Font');
    displayModeButton = p.createButton('Switch Particle Type');

    // Set their functions
    textBox1.input(updateText);
    fontButton.mousePressed(switchFont);
    displayModeButton.mousePressed(changeDisplayMode);

    // Set their positions
    textBox1.position(0, 0);
    fontButton.position(textBox1.width, 0);
    displayModeButton.position(textBox1.width + fontButton.width, 0);

    // Set their parents
    // textBox1.parent('textInput1');
    // fontButton.parent('fontButton');
    // displayModeButton.parent('displayModeButton');
  }//-------------------------------------------------------------------------------------------------

// From http://stackoverflow.com/questions/8237780/javascript-read-variable-value-from-url
  function getURLValues() {

    let search = window.location.search.replace(/^\?/, '').replace(/\+/g, ' ');
    let values = {};

    if (search.length) {
      let part, parts = search.split('&');

      for (let i = 0, iLen = parts.length; i < iLen; i++) {
        part = parts[i].split('=');
        values[part[0]] = window.decodeURIComponent(part[1]);
      }
    }
    console.log(values);
    return values;
  }//-------------------------------------------------------------------------------------------------

  function changeDisplayMode() {
    displayMode++;
    displayMode = displayMode % 2;
    updateText();
  }//-------------------------------------------------------------------------------------------------

  function drawDebug() {
    p.stroke(255);
    p.line(0, p.height / 2, p.width, p.height / 2);
    p.line(0, p.height / 2 + fontSize / 2, p.width, p.height / 2 + fontSize / 2);
    p.line(0, p.height / 2 - fontSize / 2, p.width, p.height / 2 - fontSize / 2);
  }//-------------------------------------------------------------------------------------------------


  function Vehicle(x,y,r) {

    this.iPos     = p.createVector(x,y);
    this.prevPos  = this.iPos.copy();
    this.pos      = this.iPos.copy();
    this.acc      = p.createVector(0,0);
    this.vel      = p.createVector(0,0);
    this.r        = r || 1;
    this.maxSpeed = 10;
    this.maxForce = 1;
    this.clr      = p.color( p.random(255), p.random(255), p.random(255) );

    // Call the methods required to update this vehicle
    this.run = function() {
      this.update();
      this.display(displayMode);
      this.updatePrev();
    }//---------------------------------------------------------------------------------------------

    // Update the physics of this vehicle
    this.update = function () {
      // Update vel
      this.vel.add(this.acc);
      // Limit speed
      this.vel.limit(this.maxSpeed);
      this.pos.add(this.vel);
      // Reset acceleration to 0 each cycle
      this.acc.mult(0);
    }//---------------------------------------------------------------------------------------------

    this.display = function (displayMode) {
      switch(displayMode) {
        case 0  : this.displayLine();   break;
        case 1  : this.displayCirlce(); break;
        default : this.displayLine();
      }
    }//---------------------------------------------------------------------------------------------

    this.displayCirlce = function () {
      p.push();
      p.fill(this.clr);
      p.noStroke();
      p.translate(this.pos.x, this.pos.y);
      p.ellipse(0, 0, this.r*2, this.r*2);
      p.pop();
    }//---------------------------------------------------------------------------------------------

    this.displayLine = function() {
      p.push();
      p.stroke(this.clr);
      p.strokeWeight(2);
      p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
      p.pop();
    }//---------------------------------------------------------------------------------------------

    // Updates the previous position
    this.updatePrev = function() {
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
    }//---------------------------------------------------------------------------------------------

    // Apply a force to this vehicle
    this.applyForce = function(force) {
      this.acc.add(force);
      this.acc.limit(this.maxForce);
    }//---------------------------------------------------------------------------------------------

    // Steer this vehicle towards a target and slow down when it gets close
    this.arrive = function(target) {
      let desired = p5.Vector.sub(target, this.pos);
      let d = desired.mag();

      if (d < 100) {
        // Map the desired magnitude according to distance
        let m = p.map(d, 0, 100, 0, this.maxSpeed);
        desired.setMag(m);
      } else {
        desired.setMag(this.maxSpeed);
      }

      let steering = p5.Vector.sub(desired, this.vel);
      this.applyForce(steering);
    }//---------------------------------------------------------------------------------------------

    // Steer this vehicle towards it's initial position
    this.reset = function() {
      this.arrive(this.iPos);
    }//---------------------------------------------------------------------------------------------

    this.randomizePos = function() {
      this.pos.x = p.random(p.width);
      this.pos.y = p.random(p.height);
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
    }//---------------------------------------------------------------------------------------------

    // Steer this vehicle away from a target
    this.repel = function(target, dist) {

      if(!dist) {
        dist = 100;
      }

      let desired = p5.Vector.sub(this.pos, target);
      let d = desired.mag();

      if(d < dist) {
        let steering = p5.Vector.sub(desired, this.vel);
        this.applyForce(steering);
      }
    }//---------------------------------------------------------------------------------------------
  }
}

