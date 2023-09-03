import GUI from "https://cdn.jsdelivr.net/npm/lil-gui@0.18/+esm";

/***
 *
 *      ,ad8888ba,   88        88  88
 *     d8"'    `"8b  88        88  88
 *    d8'            88        88  88
 *    88             88        88  88
 *    88      88888  88        88  88
 *    Y8,        88  88        88  88
 *     Y8a.    .a88  Y8a.    .a8P  88
 *      `"Y88888P"    `"Y8888Y"'   88
 *
 *
 */
export class Gui {
    constructor({name = "guiControls"}) {
        this.gui  = new GUI();
        this.name = name + "-gui";

        this.add(this, "saveControls");
        this.add(this, "unSaveControls");
    }

    add(object, property, $1, max, step) {
        this.gui.add(object, property, $1, max, step).listen().decimals(2);
    }

    onChange = (onChangeFunction) => {
        if (typeof onChangeFunction !== "function") return;
        this.gui.onChange(event => onChangeFunction(event));
    };

    loadPreset() {
        const guiControlString = localStorage.getItem(this.name);
        let preset             = JSON.parse(guiControlString);

        // Load preset
        if (preset) {
            this.gui.load(preset);
        }
    }

    saveControls() {
        const controls      = this.gui.save();
        const controlString = JSON.stringify(controls);
        localStorage.setItem(this.name, controlString);
        console.log("Saving controls at " + this.name, controlString);
        alert("Controls saved -- refresh to apply");

    }

    unSaveControls() {
        localStorage.removeItem(this.name);
        alert("Controls reset -- refresh to apply");
    }
}