import React, { Component, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
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

export default function NewPaletteForm(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [cColor, setcColor] = React.useState("#234242");
  const [colors, setColors] = React.useState(props.palettes[0].colors);
  const [newPaletteName, setnewPaletteName] = React.useState("");
  const [name, setName] = React.useState("");
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

  // const onSortEnd = ({ oldIndex, newIndex }) => {
  //   this.setState(({ colors }) => ({
  //     items: arrayMove(, oldIndex, newIndex),
  //   }));
  // };

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
      <CssBaseline />
      <AppBar position="fixed" open={open} color="default">
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
            Persistent drawer
          </Typography>
          <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator
              label="Palette Name"
              value={newPaletteName}
              onChange={(evt) => {
                setnewPaletteName(evt.target.value);
              }}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Enter Palette Name", "Name already used"]}
            />
            <Button type="submit" variant="contained" color="primary">
              Save Palette
            </Button>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
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
        <Typography variant="h4">Design Your Palette</Typography>
        <div>
          <Button variant="contained" color="secondary" onClick={clearColors}>
            Clear Palette
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={colors.length >= props.maxColors}
            onClick={addRandomColor}
          >
            Random Color
          </Button>
        </div>
        <ChromePicker
          color={cColor}
          onChangeComplete={(newColor) => {
            const { hex } = newColor;
            setcColor(hex);
          }}
        />
        <ValidatorForm
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
            onChange={(evt) => {
              setName(evt.target.value);
            }}
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
