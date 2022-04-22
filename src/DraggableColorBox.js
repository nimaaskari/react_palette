import React from "react";
import { withStyles } from "@material-ui/styles";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const styles = {
  root: {
    height: "25%",
    width: "20%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    position: "relative",
    "&:hover svg": {
      color: "white",
      transform: "scale(1.3)",
      transition: "all 0.3s ease-in-out",
    },
  },
  boxContent: {
    position: "absolute",
    width: "100",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: "rgba(0,0,0,0.75)",
    letteSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between",
  },
};

function DraggableColorBox(props) {
  const { classes } = props;
  return (
    <div className={classes.root} style={{ backgroundColor: props.color }}>
      <div className={classes.boxContent}>
        <span>{props.name}</span>

        <DeleteOutlinedIcon />
      </div>
      {props.name}
    </div>
  );
}

export default withStyles(styles)(DraggableColorBox);
