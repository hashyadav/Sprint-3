import React from "react";
import { navigationMenu } from "../../Utils/NavigationMenu";
import { Avatar, Button, Menu, MenuItem, Box, Typography, Paper } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/Auth/Action";
import { useNavigate, useLocation } from "react-router-dom";

// Import the local image
import SpaceLogo from "./Space_logo.png";

const Navigation = () => {
  const { auth, theme } = useSelector((store) => store);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openLogoutMenu = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenLogoutMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  const isActive = (path) => {
    if (path === "/home" && location.pathname === "/") return true;
    if (path === "/profile" && location.pathname.startsWith("/profile/")) return true;
    return location.pathname === path;
  };

  return (
    <div className="h-screen sticky top-0">
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="py-5">
            <img className="w-10" src={SpaceLogo} alt="App Logo" />
          </div>
          <div className="space-y-2">
            {navigationMenu.map((item) => {
              const path = item.title === "Profile" ? `/profile/${auth.user?.id}` : `/${item.title.toLowerCase()}`;
              const active = isActive(path);
              
              return (
                <Box
                  key={item.title}
                  onClick={() =>
                    item.title === "Profile"
                      ? navigate(`/profile/${auth.user?.id}`)
                      : navigate(`/${item.title.toLowerCase()}`)
                  }
                  sx={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    background: active 
                      ? (theme.currentTheme === "dark" 
                          ? 'linear-gradient(135deg, rgba(29, 155, 240, 0.2), rgba(29, 155, 240, 0.1))' 
                          : 'linear-gradient(135deg, rgba(29, 155, 240, 0.1), rgba(29, 155, 240, 0.05))')
                      : 'transparent',
                    border: active 
                      ? (theme.currentTheme === "dark" ? '1px solid rgba(29, 155, 240, 0.3)' : '1px solid rgba(29, 155, 240, 0.2)')
                      : '1px solid transparent',
                    '&:hover': {
                      background: theme.currentTheme === "dark" 
                        ? 'rgba(255,255,255,0.05)' 
                        : 'rgba(0,0,0,0.02)',
                      transform: 'translateX(4px)',
                    }
                  }}
                >
                  <Box sx={{ 
                    color: active ? '#1d9bf0' : (theme.currentTheme === "dark" ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'),
                    transition: 'color 0.3s ease',
                    '& svg': {
                      color: 'inherit'
                    }
                  }}>
                    {React.cloneElement(item.icon, {
                      sx: {
                        color: active ? '#1d9bf0' : (theme.currentTheme === "dark" ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'),
                        fontSize: '1.5rem'
                      }
                    })}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '1.1rem',
                      fontWeight: active ? 'bold' : 'normal',
                      color: active ? '#1d9bf0' : (theme.currentTheme === "dark" ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)'),
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
              );
            })}
          </div>
          <div className="py-8">
            <Button
              sx={{
                width: "100%",
                borderRadius: 3,
                py: 2,
                background: 'linear-gradient(45deg, #1d9bf0, #1a8cd8)',
                boxShadow: '0 4px 15px rgba(29, 155, 240, 0.3)',
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1a8cd8, #1d9bf0)',
                  boxShadow: '0 6px 20px rgba(29, 155, 240, 0.4)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
              variant="contained"
              size="large"
            >
              Tweet
            </Button>
          </div>
        </div>

        {/* User Profile Section */}
        <Paper
          elevation={2}
          sx={{
            p: 2,
            borderRadius: 3,
            background: theme.currentTheme === "dark"
              ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            border: theme.currentTheme === "dark" ? '1px solid #333' : '1px solid #e0e0e0',
            mb: 2
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar
                alt={auth.user?.fullName}
                src={auth.user?.image || "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"}
                sx={{
                  width: 40,
                  height: 40,
                  border: '2px solid #1d9bf0'
                }}
              />
              <div>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    color: theme.currentTheme === "dark" ? 'white' : 'black'
                  }}
                >
                  {auth.user?.fullName}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.8rem',
                    color: theme.currentTheme === "dark" ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'
                  }}
                >
                  @{auth.user?.fullName?.split(" ")[0]?.toLowerCase()}
                </Typography>
              </div>
            </div>
            <Button
              id="basic-button"
              aria-controls={openLogoutMenu ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openLogoutMenu ? "true" : undefined}
              onClick={handleOpenLogoutMenu}
              sx={{
                minWidth: 'auto',
                p: 1,
                borderRadius: 2,
                '&:hover': {
                  background: theme.currentTheme === "dark" ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
                }
              }}
            >
              <MoreHorizIcon sx={{ color: theme.currentTheme === "dark" ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)' }} />
            </Button>
          </div>
        </Paper>
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openLogoutMenu}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          sx: {
            background: theme.currentTheme === "dark" 
              ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' 
              : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            border: theme.currentTheme === "dark" ? '1px solid #333' : '1px solid #e0e0e0',
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            minWidth: 150
          }
        }}
      >
        <MenuItem 
          onClick={handleLogout}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: '#ff4444',
            borderRadius: 2,
            mx: 1,
            my: 0.5,
            '&:hover': {
              background: 'rgba(255, 68, 68, 0.1)'
            }
          }}
        >
          <LogoutIcon fontSize="small" />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Navigation;
