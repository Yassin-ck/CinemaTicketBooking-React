import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import "./css/ScreenSIngleShowoingDetails.css";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import AddchartIcon from '@mui/icons-material/Addchart';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function ScreenSIngleShowoingDetails() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [screenData, setScreenData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backButton, setBackButton] = useState(false);

  const Screendetialsfetching = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_URL_SERVER}/theatre/screendetailsform/${id}`
    );
    const data = response.data;
    if (response.status == 200) {
      setScreenData(data);
      setLoading(true);
    }
  };

  const AddShowHandler = () => {
      navigate(`/theatre/screens/${id}/addshow`);
     
  }

  useEffect(() => {
    Screendetialsfetching();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const UpcomingShowsHandler = ()=>{
    navigate(`/theatre/screens/${id}/showview`)
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer
        onMouseEnter={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
        variant="permanent"
        open={open}
      >
        <DrawerHeader
          onMouseEnter={handleDrawerClose}
          style={{ background: open && "grey" }}
        >
          {loading &&
            [screenData].map((item) => (
              <div className="text-dark typographyintheatresidebar">
                <Typography variant={!open ? "p" : "h6"}>
                  {open ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "4rem",
                      }}
                    >
                      {" "}
                      <SlideshowIcon />{" "}
                      <span className="InsideSpanOfSidebarForScreenText ms-2">
                        Screen <span className="InsideSpanOfSidebarForScreenNumber">{item.screen_number}</span>
                      </span>
                    </div>
                  ) : (
                    <div
                      onClick={() => navigate("/theatre/screens")}
                      onMouseEnter={() => setBackButton(true)}
                      onMouseLeave={() => setBackButton(false)}
                      style={{
                        marginRight: "0.85rem",
                        background: "grey",
                        width: "1.5rem",
                        height: "1.5rem",
                        borderRadius: "50%",
                        textAlign: "center",
                        cursor: "pointer",
                        fontSize: "12px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {!backButton ? (
                        item.screen_number
                      ) : (
                        <IconButton onClick={handleDrawerClose}>
                          {theme.direction === "rtl" ? (
                            <ChevronRightIcon fontSize="small" />
                          ) : (
                            <ChevronLeftIcon fontSize="small" />
                          )}
                        </IconButton>
                      )}
                    </div>
                  )}
                </Typography>
              </div>
            ))}
        </DrawerHeader>
        <List>
          {["Add Show", "UpcomingShows", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={text == "Add Show" ? AddShowHandler : 'UpcomingShows'? UpcomingShowsHandler :null}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index  === 0 ? <AddchartIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
