import React, { Component, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ChromePicker } from "react-color";
import { Button } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DraggableColorList from "./DraggableColorList";
import { arrayMoveImmutable } from "array-move";
import { withStyles } from "@material-ui/styles";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const styles = {
  root: {
    display: "flex",
  },

  navBtns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "64px",
  },
  container: {
    width: "90%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  picker: {
    width: "100% !important",
    marginTop: "2rem",
  },
  validatorForm: {
    width: "100%",
  },
  addColorBtn: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    fontSize: "2rem",
  },
  colorNameInput: {
    width: "100%",
    height: "70px",
  },
  buttons: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
  button: {
    width: "48%",
  },
  navBtns: {
    marginRight: "1rem",
    display: "flex",
    justifyContent: "space-between",
  },
  navBtn: {},
};

const drawerWidth = 400;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: "92vh",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function NewPaletteForm(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [cColor, setcColor] = React.useState("#234242");
  const [colors, setColors] = React.useState(props.palettes[0].colors);
  const [newPaletteName, setnewPaletteName] = React.useState("");
  const [name, setName] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleClickDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    let newName = newPaletteName;
    const newPalette = {
      colors: colors,
      emoji: "35",
      id: newName.toLowerCase().replace(/ /g, "-"),
      paletteName: newName,
    };
    props.savePalette(newPalette);
    props.history.push("/");
  };

  const removeColor = (colorName) => {
    setColors(colors.filter((color) => color.name !== colorName));
  };

  const addRandomColor = () => {
    const allColors = props.palettes.map((p) => p.colors).flat();
    var rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    setColors([...colors, randomColor]);
  };

  const clearColors = () => {
    setColors([]);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors((colors) => {
      return arrayMoveImmutable(colors, oldIndex, newIndex);
    });
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      const valid = colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );

      return valid;
    });
    ValidatorForm.addValidationRule("isColorUnique", (value) => {
      const valid = colors.every(({ color }) => color !== cColor);

      return valid;
    });
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      const valid = props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );

      return valid;
    });
  });

  return (
    <Box sx={{ display: "flex" }}>
      <div className={props.classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          color="default"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            height: "64px",
            alignItems: "center",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Creat A New Palette
            </Typography>
          </Toolbar>
          <div className={props.classes.navBtns}>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="secondary"
                className={props.classes.navBtn}
                style={{ marginRight: "10px" }}
              >
                Go Back
              </Button>
            </Link>
            <div>
              <Button
                variant="contained"
                color="primary"
                className={props.classes.navBtn}
                onClick={handleClickDialogOpen}
              >
                Save Palette
              </Button>
              <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Choose a Palette Name</DialogTitle>
                <ValidatorForm onSubmit={handleSubmit}>
                  <DialogContent>
                    <DialogContentText>
                      Please enter a name for your new Palette. Make sure it's
                      unique!
                    </DialogContentText>
                    <TextValidator
                      label="Palette Name"
                      value={newPaletteName}
                      fullWidth
                      variant="filled"
                      margin="normal"
                      onChange={(evt) => {
                        setnewPaletteName(evt.target.value);
                      }}
                      validators={["required", "isPaletteNameUnique"]}
                      errorMessages={[
                        "Enter Palette Name",
                        "Name already used",
                      ]}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={props.classes.navBtn}
                    >
                      Save Palette
                    </Button>
                  </DialogActions>
                </ValidatorForm>
              </Dialog>
            </div>
          </div>
        </AppBar>
      </div>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div className={props.classes.container}>
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <div className={props.classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              className={props.classes.button}
              onClick={clearColors}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={props.classes.button}
              disabled={colors.length >= props.maxColors}
              onClick={addRandomColor}
            >
              Random Color
            </Button>
          </div>
          <ChromePicker
            color={cColor}
            className={props.classes.picker}
            onChangeComplete={(newColor) => {
              const { hex } = newColor;
              setcColor(hex);
            }}
          />
          <ValidatorForm
            className={props.classes.validatorForm}
            onSubmit={() => {
              const newColor = {
                color: cColor,
                name: name,
              };
              setColors([...colors, newColor]);
            }}
          >
            <TextValidator
              value={name}
              className={props.classes.colorNameInput}
              margin="normal"
              placeholder="Color Name"
              onChange={(evt) => {
                setName(evt.target.value);
              }}
              variant="filled"
              validators={["required", "isColorNameUnique", "isColorUnique"]}
              errorMessages={[
                "Enter a color name ",
                "Color name must be unique",
                "Color already used",
              ]}
            />
            <Button
              variant="contained"
              type="submit"
              color="primary"
              className={props.classes.addColorBtn}
              disabled={colors.length >= props.maxColors}
              style={{
                backgroundColor:
                  colors.length >= props.maxColors ? "grey" : cColor,
              }}
            >
              {`${
                colors.length >= props.maxColors ? "Palette Full" : "Add Color"
              }`}
            </Button>
          </ValidatorForm>
        </div>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
        />
        {/* {colors.map((color) => (
          <DraggableColorBox
            key={color.name}
            color={color.color}
            name={color.name}
            handleClick={() => removeColor(color.name)}
          />
        ))} */}
      </Main>
    </Box>
  );
}

export default withStyles(styles)(NewPaletteForm);
