export const sketch = (p) => {
  let canvas;

  p.setup = () => {
    canvas = createInstanceCanvas(p);
  };

  p.draw = () => {
    redrawBackground(p);
  };
};