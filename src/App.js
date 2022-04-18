import react, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import PaletteList from "./PaletteList";
import { Switch } from "react-router-dom";
import { Router } from "react-router-dom/cjs/react-router-dom.min";

class App extends Component {
  findPalette(id) {
    return seedColors.find(function (palette) {
      return palette.id === id;
    });
  }
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/palette/:id"
          render={(routeProps) => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            ></Palette>
          )}
        />
        <Route
          exact
          path="/"
          render={() => <PaletteList palettes={seedColors} />}
        />
      </Switch>

      /* {<div>
      <Palette palette={generatePalette(seedColors[4])} />
    </div>} */
    );
  }
}

export default App;
