import react, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";

function App() {
  return (
    <Switch>
      <Route exact path="/" />
      <Route exact path="/pelette/:id" />
    </Switch>

    /* {<div>
      <Palette palette={generatePalette(seedColors[4])} />
    </div>} */
  );
}

export default App;
