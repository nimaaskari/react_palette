import React from "react";
import { SortableElement } from "react-sortable-hoc";
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
    marginBottom: "-8px",
    position: "relative",
    "&:hover svg": {
      color: "white",
      transform: "scale(1.3)",
      transition: "all 0.3s ease-in-out",
    },
    "@media (max-width: 1200px)": {
      width: "25%",
      height: "20%",
    },
    "@media (max-width: 992px)": {},
    "@media (max-width: 768px)": {
      width: "50%",
      height: "10%",
    },
    "@media (max-width: 576px)": {
      width: "100%",
      height: "5%",
    },
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: "rgba(0,0,0,0.75)",
    letteSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between",
    "& svg": {
      right: "0px",
    },
    "@media (max-width: 576px)": {
      padding: "0",
    },
  },
};

const DraggableColorBox = SortableElement((props) => {
  const { classes, name, color, handleClick } = props;
  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span>{name}</span>

        <DeleteOutlinedIcon onClick={handleClick} />
      </div>
    </div>
  );
});

export default withStyles(styles)(DraggableColorBox);
