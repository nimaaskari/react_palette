import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/styles";
import { borderRadius } from "@mui/system";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import { render } from "@testing-library/react";

const styles = {
  root: {
    backgroundColor: "white",
    border: "1px solid rgba(0,0,0,0.3)",
    borderRadius: "5px",
    padding: "0.5rem",
    paddingBottom: "1.5rem",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    "&:hover svg": {
      opacity: "1",
    },
  },
  colors: {
    backgroundColor: "#dae1e4",
    height: "120px",
    width: "100%",
    borderRadius: "5px",
    overflow: "hidden",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    position: "relative",
  },
  emoji: {
    marginLeft: "0.5rem",
    fontSize: "1.5rem",
  },
  miniColor: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    marginBottom: "-3.5px",
  },

  deleteIcon: {
    color: "white",
    backgroundColor: "#eb3d30",
    width: "20px",
    height: "20px",
    position: "absolute",
    right: "0px",
    top: "0px",
    padding: "10px",
    zIndex: 10,
    opacity: "0",
  },
};

class MiniPalette extends PureComponent {
  constructor(props) {
    super(props);
    this.deletePalette = this.deletePalette.bind(this);
  }
  deletePalette(e) {
    e.stopPropagation();
    this.props.handleDelete(this.props.id);
  }
  render() {
    const { classes, paletteName, emoji, colors, handleClick } = this.props;

    const miniColorBoxes = colors.map((color) => (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.name}
      ></div>
    ));
    return (
      <div className={classes.root} onClick={handleClick}>
        <DeleteOutlined
          className={classes.deleteIcon}
          style={{ transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}
          onClick={this.deletePalette}
        />

        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title}>
          {paletteName}
          {/* <span className={classes.emoji}>{emoji}</span> */}
        </h5>
      </div>
    );
  }
}

export default withStyles(styles)(MiniPalette);
