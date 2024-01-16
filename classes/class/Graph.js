//------------------------------------------------------------------------------
// GraphM: A graph used to demonstrate Dijkstra's algorithm to find the shortest
//         path between a source node and each of the other nodes in the graph.
//         This graph is able to build itself from a file, find the shortest
//         path from each node to each other node, and display its results.
//
// Implementation and assumptions:
//   -- The input graph size will be a valid integer between 1 and 100
//   -- An adjacency list is used to keep track of edges
//   -- No dynamic objects, all static
//   -- 0 is an invalid value for an edge distance/cost

const MAX_NODES = 101

class TableType {
  constructor(visited, cost, path) {
    this.visited = visited
    this.cost = cost
    this.path = path
  }
}

class Graph {


  /***************************
   * Graph Building/Deleting *
   ***************************/
  // -----------------------------------------------------------------------------
  // Constructor
  // Default constructor for class GraphM
  // Calls makeEmpty to initialize the Graph properties
  constructor() {
    this.makeEmpty()
  }

  // -----------------------------------------------------------------------------
  makeEmpty = () => {
    this.size = 0
    this.data = new Array(MAX_NODES).fill("")
    this.C = [...Array(MAX_NODES)].map(() => Array(MAX_NODES).fill(0))
    this.T = [...Array(MAX_NODES)].map(() =>
      Array(MAX_NODES).fill(new TableType(false, Infinity, 0))
    )
  }

  // -----------------------------------------------------------------------------
  insertEdge = (from, to, cost) => {
    if(from < MAX_NODES && to < MAX_NODES)
      this.C[from][to] = cost
  }

  // -----------------------------------------------------------------------------
  removeEdge = (from, to) => {
    if(from < MAX_NODES && to < MAX_NODES)
      this.C[from][to] = 0
  }

  /*******************
   * Display Methods *
   *******************/
  displayGraph = () => {

  }

}