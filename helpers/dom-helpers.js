let makeSlider = (p, slider_id, minValue, maxValue, startValue, step) => {

  // Create controls container for the slider
  let controlsContainer = p.createDiv()
  controlsContainer.class('controls-container')
  controlsContainer.id(`slider-container-${slider_id}`)
  controlsContainer.parent('sidebar')

  // Create control div
  let controlDiv = p.createDiv()
  controlDiv.id(`slider-control-${slider_id}`)
  controlDiv.parent(`slider-container-${slider_id}`)

  // Add label to slider
  let key = p.createDiv(slider_id)
  key.class('key')
  key.parent(`slider-control-${slider_id}`)

  let separator = p.createDiv('-')
  separator.class('separator')
  separator.parent(`slider-control-${slider_id}`)

  // Create slider
  let slider = p.createSlider(minValue, maxValue, startValue, step)
  slider.class('p5-slider action')
  slider.id(slider_id)
  slider.parent(`slider-control-${slider_id}`)

  return slider
}