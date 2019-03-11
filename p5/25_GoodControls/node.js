function Node(data, x, y) {

  this.data = data;
  this.dataLength = data.length;
  this.pos = createVector(x, y);

  this.edges = [];
  //-------------------------------------------------------------------------------------------------
  // Display the Node and it's edges
  this.display = function () {
    this.displayEdges();
    this.displayNode();
  };//-------------------------------------------------------------------------------------------------

  // Display the node and draw a line from the node it's connected to
  this.displayFrom = function (fromPos) {

    // Draw the line
    stroke(0, 255, 0);
    strokeWeight(1);
    line(fromPos.x, fromPos.y, this.pos.x, this.pos.y);

    // Draw the edges
    // this.displayEdges();

    // Draw this node
    this.displayNode();
  };//-------------------------------------------------------------------------------------------------

  // Display the node
  this.displayNode = function () {
    // Display the node
    ellipseMode(CENTER);
    fill(255);
    stroke(BG_COLOR);
    ellipse(this.pos.x, this.pos.y, this.dataLength*15, this.dataLength*15);

    // Display the data within the node
    textAlign(CENTER, CENTER);
    fill(255, 0, 0);
    textSize(20);
    text(this.data, this.pos.x, this.pos.y);
  };//-------------------------------------------------------------------------------------------------

  // Display the edges
  this.displayEdges = function () {
    for(var i = 0; i < this.edges.length; i++) {
      this.edges[i].displayFrom(this.pos);
    }
  };//-------------------------------------------------------------------------------------------------

  // Add an edge
  this.addEdge = function (newNode) {
    this.edges.push(newNode);
  };//-------------------------------------------------------------------------------------------------


}

