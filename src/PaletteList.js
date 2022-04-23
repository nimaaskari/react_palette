import { palette } from "@mui/system";
import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

const styles = {
  root: {
    backgroundColor: "blue",
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  container: {
    width: "55%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
    "@media (max-width: 1200px)": {
      width: "65%",
    },
    "@media (max-width: 992px)": {
      width: "80%",
    },
    "@media (max-width: 768px)": {
      width: "90%",
    },
    "@media (max-width: 576px)": {
      width: "90%",
    },
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
    color: "white",
    "& a": {
      color: "white",
    },
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridGap: "5%",
    "@media (max-width: 1200px)": {
      gridGap: "4%",
    },
    "@media (max-width: 992px)": {
      gridGap: "3%",
    },
    "@media (max-width: 768px)": {
      gridGap: "2%",
    },
    "@media (max-width: 576px)": {
      gridTemplateColumns: "1fr 1fr",
      gridGap: "2%",
    },
  },
};

class PaletteList extends Component {
  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }
  render() {
    const { palettes, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>PaletteList</h1>
            <Link to="/palette/new">Creat Palette</Link>
          </nav>
          <div className={classes.palettes}>
            {palettes.map((palette) => (
              <MiniPalette
                {...palette}
                handleClick={() => this.goToPalette(palette.id)}
                handleDelete={this.props.deletePalette}
                key={palette.id}
                id={palette.id}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
