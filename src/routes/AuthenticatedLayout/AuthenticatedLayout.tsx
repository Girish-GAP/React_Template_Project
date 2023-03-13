import { logRoles } from "@testing-library/react"
import { FC, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAuthentication } from "../../utils/redux";
import { clearStorage } from "../../utils/storage";

import { useLocation, useNavigate } from "react-router-dom";
import "./AuthenticatedLayout.scss";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
    Box,
    Avatar,
    styled,
    Drawer,
    CssBaseline,
    Toolbar,
    List,
    Typography,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    AppBarProps as MuiAppBarProps,
    Container,
    useTheme,
    IconButton,
    Collapse,
  } from "@mui/material";
  import MuiAppBar from "@mui/material/AppBar";
import { ExpandMore } from "@mui/icons-material";
import strings from "../../common/Translation/Translate";
import { Privilege } from "../../utils/redux/reducer/authentication-slice";
import LogoutIcon from "@mui/icons-material/Logout";
import config from "./config";
import NotificationWrapper from "../../components/NotificationInfo/NotificationWrapper";
import { images } from "../../utils/constants/images";

const drawerWidth = 240;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
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
    marginLeft: -20,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme, open }) => ({
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


const AuthenticatedLayout : FC<{ Component: FC }> = ({ Component }) => {
   const theme = useTheme();
   const privilegeData = useSelector(Privilege);
   const dispatch = useDispatch();

   const [key, setKey] = useState<string>();
   const [open, setOpen] = useState<boolean>(false);
   const [showSideBar, setShowSideBar] = useState<boolean>(true);
   const [userData, setUserData] = useState<any>({});

   const Navigate = useNavigate();
   const location = useLocation();

   const handleLogout = () =>{
    clearStorage();
    dispatch(setAuthentication(null));
   }



   const menu = useMemo(() => {
    const handleExpand = (key: string) => {
      setKey(key);
      if (key === "21") {
        setOpen(!open);
      } else if (key === "7") {
        setOpen(!open);
      } else {
        setOpen(false);
      }
    };

    return (
      <List>
        {/* followng config, filter and map : 
            1) config will return the array which contains json and empty stirng array based on privilages.
            2) filter will filter the empty string elements which is the false and keep only the array which has json
            3) map will iterate those elements which is the json
        */}
        {config(privilegeData, strings)
          .filter((item: any) => item)
          .map((menuItem: any, index: number) => (
            <div key={index}>
              <ListItem
                key={index}
                disablePadding
                sx={{
                  // if the currunt route mathes with config route then apply our them other wise inherit it
                  backgroundColor:
                    `/${location.pathname.split("/")[1]}` === menuItem.route
                      ? `${theme.palette.secondary.dark}1a`
                      : "inherit",
                  color:
                    `/${location.pathname.split("/")[1]}` === menuItem.route
                      ? theme.palette.secondary.dark
                      : "inherit",
                  borderRight:
                    `/${location.pathname.split("/")[1]}` === menuItem.route
                      ? `5px solid ${theme.palette.secondary.dark}`
                      : "none",
                }}
              >
              
                <ListItemButton
                  onClick={() => {
                    handleExpand(menuItem.key);
                    Navigate(menuItem.route);
                  }}
                  sx={{
                    color:
                      `/${location.pathname.split("/")[1]}` === menuItem.route
                        ? theme.palette.secondary.dark
                        : "#ffffff",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color:
                        `/${location.pathname.split("/")[1]}` === menuItem.route
                          ? theme.palette.secondary.dark
                          : "#ffffff",
                      fontSize: "10px",
                    }}
                  >
                <menuItem.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={menuItem.name}     // title of side bar
                    primaryTypographyProps={{
                      sx: { fontWeight: 600 },
                      fontSize: "0.9rem",
                    }}
                  />
                  {menuItem.key !== "7" ? (
                    ""
                  ) : !open && menuItem.key === "7" ? (
                    <KeyboardArrowRightIcon />
                  ) : (
                    <ExpandMore />
                  )}
                  
                  {menuItem.key !== "21" ? (
                    ""
                  ) : !open && menuItem.key === "21" ? (
                    <KeyboardArrowRightIcon />
                  ) : (
                    <ExpandMore />
                  )}
                </ListItemButton>
              </ListItem>
              <Collapse
                in={open && menuItem.key === key}
                timeout="auto"
                unmountOnExit
              >
                <Divider />
                {menuItem?.children &&
                  menuItem?.children
                    .filter((item: any) => item)
                    .map((child: any, i: number) => (
                      <ListItem
                        key={i}
                        disablePadding
                        sx={{
                          backgroundColor: "inherit",
                          borderRight:"none"
                        }}
                      >
                        <ListItemButton
                          onClick={() => {
                            Navigate(child.route);
                          }}
                          sx={{
                            color: "#ffffff"
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              color : "#ffffff"
                            }}
                          >
                            <child.icon />
                          </ListItemIcon>
                          <ListItemText
                            primaryTypographyProps={{
                              sx: { fontWeight: 600 },
                              fontSize: "0.9rem",
                            }}
                          >
                            {child.name}
                          </ListItemText>
                        </ListItemButton>
                      </ListItem>
                    ))}
              </Collapse>
            </div>
          ))}
      </List>
    );
  }, [privilegeData, open, window.location.pathname, theme.palette.secondary.dark, key, Navigate]);
  
   
   
   
    return(
<Container sx={{ display: "flex", height: "100%" }} maxWidth={false}>
      <CssBaseline />
      <Drawer
        variant="persistent"
        open={showSideBar}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          height: "100%",
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            height: "100%",
            boxSizing: "border-box",
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            paddingTop: "10px",
            '.MuiCollapse-root': { backgroundColor: theme.palette.primary.main, }
          }}
          height="100%"
        >
          {menu}
        </Box>
      </Drawer>
      <Main open={showSideBar}>
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: theme.palette.secondary.light,
            boxShadow: "none",
            color: theme.palette.primary.main,
          }}
        >
          <Toolbar>
            <Box
              ml={showSideBar ? "255px" : "50px"}
              component="div"
              sx={{
                flexGrow: 25,
                color: theme.palette.primary.main,
                display: "flex",
                gap: "10px",
                transition: "0.2s",
              }}
            >
              <img
                height="32px"
                width="32px"
                src={
                  showSideBar ? images.sideBarCloseIcon : images.sideBarOpenIcon
                }
                alt="logo"
                onClick={() => setShowSideBar(!showSideBar)}
              />

              <Typography variant="h6" sx={{ mx: 2, fontWeight: 600 }}>
                {strings.project_title}
              </Typography>
            </Box>
            {/* <NotificationWrapper color="red" /> */}
            <Avatar
              sx={{
                marginLeft: 2,
                backgroundColor: theme.palette.primary.main,
                width: 30,
                height: 30,
              }}
            //   onClick={handleProfile}
              className={"cursor-pointer"}
            >
              <Typography variant="h6">
                {userData.firstName?.slice(0, 1)}
              </Typography>
            </Avatar>
            <Typography
              variant="body2"
            //   onClick={handleProfile}
              className={"cursor-pointer"}
              sx={{ mx: 2, fontWeight: 600 }}
            >
              {userData.firstName} {userData.lastName}
            </Typography>
            <IconButton onClick={handleLogout} aria-label="delete">
              <LogoutIcon />
            </IconButton>
          </Toolbar>

          {/* <InfoModal/> */}
        </AppBar>
        <Toolbar />
        <Component />
      </Main>
    </Container>
    )
}



export default AuthenticatedLayout;