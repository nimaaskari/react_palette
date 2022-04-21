import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import chroma from "chroma-js";
import { withStyles } from "@material-ui/styles";
import "./ColorBox.css";

const styles = {
  textColor: {
    color: (props) =>
      chroma(props.background).luminance() >= 0.3 ? "black" : "white",
  },
};

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
    this.changeCopyState = this.changeCopyState.bind(this);
  }
  changeCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false });
      }, 1500);
    });
  }

  render() {
    const { name, background, moreUrl, showLink, classes } = this.props;
    const { copied } = this.state;

    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className="ColorBox">
          <div
            style={{ background }}
            className={`copy-overlay  ${copied && "show"}`}
          ></div>
          <div className={`copy-msg  ${copied && "show"}`}>
            <h1>Copied!</h1>
            <p className={classes.textColor}>{this.props.background}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span className={classes.textColor}>{name}</span>
            </div>
            <button className={`copy-button ${classes.textColor} `}>
              Copy
            </button>
          </div>
          {showLink && (
            <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
              <span className={`see-more ${classes.textColor}`}>MORE</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
