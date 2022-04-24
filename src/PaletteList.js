import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import bg from "./bg.svg";
import img from "./img/b.jpg";

const styles = {
  "@global": {
    ".fade-exit": {
      opacity: 1,
    },
    ".fade-exit-active": {
      opacity: 0,
      transition: "opacity 500ms ease-out",
    },
  },
  root: {
    // backgroundColor: "purple",
    // backgroundColor: "#22EECC",
    backgroundImage: `url(${img})`,

    backgroundSize: "50%",
    backgroundRepeat: "repeat",
    overflow: "scroll",
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  heading: {
    fontSize: "2rem",
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
    // height: "50px",
    margin: "0",
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
    margin: "0",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridGap: "4%",
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
            <h1 className={classes.heading}>PaletteList</h1>
            <Link to="/palette/new">Creat Palette</Link>
          </nav>

          <TransitionGroup className={classes.palettes}>
            {palettes.map((palette) => (
              <CSSTransition ket={palette.id} classNames="fade" timeout={500}>
                <MiniPalette
                  {...palette}
                  handleClick={() => this.goToPalette(palette.id)}
                  handleDelete={this.props.deletePalette}
                  key={palette.id}
                  id={palette.id}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
