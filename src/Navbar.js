import react, { Component } from "react";
import { Link } from "react-router-dom";
import Slider from "rc-slider";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import "rc-slider/assets/index.css";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import "./Navbar.scss";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { format: "hex", open: false };
    this.handleChange = this.handleChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }
  handleChange(e) {
    this.setState({ format: e.target.value, open: true });
    this.props.handleChange(e.target.value);
  }
  closeSnackbar() {
    this.setState({ open: false });
  }
  render() {
    const { level, changeLevel, handleChange, showingAllColors } = this.props;
    const { format } = this.state;
    return (
      <header className="navbar">
        <div className="logo">
          <Link to="/">reactPalette</Link>
        </div>
        {showingAllColors && (
          <div className="slider-container">
            <span className="level-number">Level: {level}</span>
            <div className="slider">
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                step={100}
                onAfterChange={changeLevel}
              />
            </div>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="secondary"
                style={{
                  position: "absolute",
                  right: "0",
                  top: "7%",
                  marginRight: "10px",
                  fontSize: "0.8rem",
                  padding: "5px",
                }}
              >
                Go Back
              </Button>
            </Link>
          </div>
        )}
        <div className="select-container">
          {/* <Select value={format} onChange={handleChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255, 1.0)</MenuItem>
          </Select> */}
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.open}
          autoHideDuration={3000}
          message={
            <span id="message-id">
              Format Changed To {format.toUpperCase()}
            </span>
          }
          ContentProps={{ "aria-describedby": "message-id" }}
          onClose={this.closeSnackbar}
          action={[
            <IconButton
              onClick={this.closeSnackbar}
              color="inherit"
              key="close"
              aria-label="close"
            >
              <CloseIcon></CloseIcon>
            </IconButton>,
          ]}
        ></Snackbar>
      </header>
    );
  }
}

export default Navbar;
