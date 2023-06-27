import {Gui} from "../classes/Gui.js";

/**
 * Create a gui from a state with controls set
 * ex:
 * let state = {
 *     volume: 0,
 *     reset: () => resetSketch(),
 *     ...
 * }
 * @param state must contain state.controls = {}
 * @param name will be used to save the controls in local storage
 * @param showControls false to hide controls
 */
export const createGui = ({state, name="gui", showControls=true}) => {
    let gui = new Gui({
        name:         name,
        showControls: showControls
    });

    if (!state) return gui;

    Object.keys(state).forEach((control => {
        gui.add(state, control);
    }))
    gui.loadPreset();
}