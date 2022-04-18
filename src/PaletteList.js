import { palette } from "@mui/system";
import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import { Link } from "react-router-dom";

class PaletteList extends Component {
  render() {
    const { palettes } = this.props;
    return (
      <div>
        <MiniPalette />
        <h1>PaletteList</h1>
        {palettes.map((palette) => (
          <MiniPalette {...palette} />
        ))}
      </div>
    );
  }
}

export default PaletteList;
