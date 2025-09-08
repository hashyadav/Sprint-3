import React, { useState } from "react";
import { Box, Paper, TextField, Button, Typography, IconButton, InputAdornment } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loginUser, registerUser } from "../../Store/Auth/Action";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import SpaceLogo from "../Navigation/Space_logo.png";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useSelector((store) => store);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Login validation schema
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  // Register validation schema
  const registerValidationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  // Login form
  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  // Register form
  const registerFormik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  const switchForm = () => {
    setIsLogin(!isLogin);
    // Reset forms when switching
    loginFormik.resetForm();
    registerFormik.resetForm();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: theme.currentTheme === "dark"
          ? 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)'
          : 'linear-gradient(135deg, #f0f2f5 0%, #e1e8ed 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: theme.currentTheme === "dark"
            ? 'radial-gradient(circle at 20% 80%, rgba(29, 155, 240, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(138, 43, 226, 0.1) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 80%, rgba(29, 155, 240, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(138, 43, 226, 0.05) 0%, transparent 50%)',
          zIndex: 0
        }}
      />

      <Paper
        elevation={8}
        sx={{
          p: 4,
          borderRadius: 6,
          background: theme.currentTheme === "dark"
            ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          border: theme.currentTheme === "dark" ? '1px solid #333' : '1px solid #e0e0e0',
          boxShadow: theme.currentTheme === "dark"
            ? 'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.3)'
            : 'inset 0 1px 0 rgba(255,255,255,0.8), 0 8px 32px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: 400,
          minWidth: 380,
          position: 'relative',
          overflow: 'hidden',
          zIndex: 1
        }}
      >
        {/* Logo */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box
            sx={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              margin: '0 auto',
              backgroundImage: `url(${SpaceLogo})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: theme.currentTheme === "dark"
                ? '0 0 2px #5f5f5f, 0 0 5px #ecf0f3, 8px 8px 15px #a7aaaf, -8px -8px 15px #ffffff'
                : '0 0 2px #5f5f5f, 0 0 5px #ecf0f3, 8px 8px 15px #a7aaaf, -8px -8px 15px #ffffff',
              mb: 2
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #1d9bf0, #1a8cd8)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: theme.currentTheme === "dark"
                ? '8px 8px 15px #a7aaaf, -8px -8px 15px #ffffff'
                : '8px 8px 15px #a7aaaf, -8px -8px 15px #ffffff',
              letterSpacing: 0.5
            }}
          >
            Academian App
          </Typography>
        </Box>

        {/* Form */}
        <Box sx={{ width: '100%', px: 1 }}>
          {isLogin ? (
            // Login Form
            <form onSubmit={loginFormik.handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Email Field */}
                <Box
                  sx={{
                    borderRadius: 6,
                    boxShadow: theme.currentTheme === "dark"
                      ? 'inset 5px 5px 8px #cbced1, inset -5px -5px 8px #ffffff'
                      : 'inset 5px 5px 8px #cbced1, inset -5px -5px 8px #ffffff',
                    p: 1
                  }}
                >
                  <TextField
                    name="email"
                    placeholder="Email"
                    fullWidth
                    variant="standard"
                    value={loginFormik.values.email}
                    onChange={loginFormik.handleChange}
                    onBlur={loginFormik.handleBlur}
                    error={loginFormik.touched.email && Boolean(loginFormik.errors.email)}
                    helperText={loginFormik.touched.email && loginFormik.errors.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: '#999', fontSize: 18 }} />
                        </InputAdornment>
                      ),
                      disableUnderline: true,
                      sx: {
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: 18,
                        color: theme.currentTheme === "dark" ? '#555' : '#555',
                        px: 2,
                        py: 1
                      }
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: 18,
                        color: theme.currentTheme === "dark" ? '#555' : '#555',
                        '&::placeholder': {
                          color: '#999',
                          fontFamily: 'Poppins, sans-serif'
                        }
                      }
                    }}
                  />
                </Box>

                {/* Password Field */}
                <Box
                  sx={{
                    borderRadius: 6,
                    boxShadow: theme.currentTheme === "dark"
                      ? 'inset 5px 5px 8px #cbced1, inset -5px -5px 8px #ffffff'
                      : 'inset 5px 5px 8px #cbced1, inset -5px -5px 8px #ffffff',
                    p: 1
                  }}
                >
                  <TextField
                    name="password"
                    placeholder="Password"
                    fullWidth
                    variant="standard"
                    type={showPassword ? 'text' : 'password'}
                    value={loginFormik.values.password}
                    onChange={loginFormik.handleChange}
                    onBlur={loginFormik.handleBlur}
                    error={loginFormik.touched.password && Boolean(loginFormik.errors.password)}
                    helperText={loginFormik.touched.password && loginFormik.errors.password}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: '#999', fontSize: 18 }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: '#999' }}
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      disableUnderline: true,
                      sx: {
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: 18,
                        color: theme.currentTheme === "dark" ? '#555' : '#555',
                        px: 2,
                        py: 1
                      }
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: 18,
                        color: theme.currentTheme === "dark" ? '#555' : '#555',
                        '&::placeholder': {
                          color: '#999',
                          fontFamily: 'Poppins, sans-serif'
                        }
                      }
                    }}
                  />
                </Box>

                {/* Login Button */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    height: 60,
                    borderRadius: 6,
                    background: '#1d9bf0',
                    boxShadow: '5px 5px 8px #b1b1b1, -5px -5px 8px #ffffff',
                    textTransform: 'none',
                    fontSize: 18,
                    fontWeight: 700,
                    fontFamily: 'Poppins, sans-serif',
                    '&:hover': {
                      background: '#',
                      boxShadow: '3px 3px 8px #b1b1b1, -3px -3px 8px #ffffff'
                    },
                    '&:active': {
                      background: '#1d9bf0'
                    }
                  }}
                >
                  Sign In
                </Button>
              </Box>
            </form>
          ) : (
            // Register Form
            <form onSubmit={registerFormik.handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Full Name Field */}
                <Box
                  sx={{
                    borderRadius: 6,
                    boxShadow: theme.currentTheme === "dark"
                      ? 'inset 5px 5px 8px #cbced1, inset -5px -5px 8px #ffffff'
                      : 'inset 5px 5px 8px #cbced1, inset -5px -5px 8px #ffffff',
                    p: 1
                  }}
                >
                  <TextField
                    name="fullName"
                    placeholder="Full Name"
                    fullWidth
                    variant="standard"
                    value={registerFormik.values.fullName}
                    onChange={registerFormik.handleChange}
                    onBlur={registerFormik.handleBlur}
                    error={registerFormik.touched.fullName && Boolean(registerFormik.errors.fullName)}
                    helperText={registerFormik.touched.fullName && registerFormik.errors.fullName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: '#999', fontSize: 18 }} />
                        </InputAdornment>
                      ),
                      disableUnderline: true,
                      sx: {
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: 18,
                        color: theme.currentTheme === "dark" ? '#555' : '#555',
                        px: 2,
                        py: 1
                      }
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: 18,
                        color: theme.currentTheme === "dark" ? '#555' : '#555',
                        '&::placeholder': {
                          color: '#999',
                          fontFamily: 'Poppins, sans-serif'
                        }
                      }
                    }}
                  />
                </Box>

                {/* Email Field */}
                <Box
                  sx={{
                    borderRadius: 6,
                    boxShadow: theme.currentTheme === "dark"
                      ? 'inset 5px 5px 8px #cbced1, inset -5px -5px 8px #ffffff'
                      : 'inset 5px 5px 8px #cbced1, inset -5px -5px 8px #ffffff',
                    p: 1
                  }}
                >
                  <TextField
                    name="email"
                    placeholder="Email"
                    fullWidth
                    variant="standard"
                    value={registerFormik.values.email}
                    onChange={registerFormik.handleChange}
                    onBlur={registerFormik.handleBlur}
                    error={registerFormik.touched.email && Boolean(registerFormik.errors.email)}
                    helperText={registerFormik.touched.email && registerFormik.errors.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: '#999', fontSize: 18 }} />
                        </InputAdornment>
                      ),
                      disableUnderline: true,
                      sx: {
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: 18,
                        color: theme.currentTheme === "dark" ? '#555' : '#555',
                        px: 2,
                        py: 1
                      }
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: 18,
                        color: theme.currentTheme === "dark" ? '#555' : '#555',
                        '&::placeholder': {
                          color: '#999',
                          fontFamily: 'Poppins, sans-serif'
                        }
                      }
                    }}
                  />
                </Box>

                {/* Password Field */}
                <Box
                  sx={{
                    borderRadius: 6,
                    boxShadow: theme.currentTheme === "dark"
                      ? 'inset 5px 5px 8px #cbced1, inset -5px -5px 8px #ffffff'
                      : 'inset 5px 5px 8px #cbced1, inset -5px -5px 8px #ffffff',
                    p: 1
                  }}
                >
                  <TextField
                    name="password"
                    placeholder="Password"
                    fullWidth
                    variant="standard"
                    type={showPassword ? 'text' : 'password'}
                    value={registerFormik.values.password}
                    onChange={registerFormik.handleChange}
                    onBlur={registerFormik.handleBlur}
                    error={registerFormik.touched.password && Boolean(registerFormik.errors.password)}
                    helperText={registerFormik.touched.password && registerFormik.errors.password}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: '#999', fontSize: 18 }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: '#999' }}
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      disableUnderline: true,
                      sx: {
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: 18,
                        color: theme.currentTheme === "dark" ? '#555' : '#555',
                        px: 2,
                        py: 1
                      }
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: 18,
                        color: theme.currentTheme === "dark" ? '#555' : '#555',
                        '&::placeholder': {
                          color: '#999',
                          fontFamily: 'Poppins, sans-serif'
                        }
                      }
                    }}
                  />
                </Box>

                {/* Register Button */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    height: 60,
                    borderRadius: 6,
                    background: '#1d9bf0',
                    boxShadow: '5px 5px 8px #b1b1b1, -5px -5px 8px #ffffff',
                    textTransform: 'none',
                    fontSize: 18,
                    fontWeight: 700,
                    fontFamily: 'Poppins, sans-serif',
                    '&:hover': {
                      background: '#',
                      boxShadow: '3px 3px 8px #b1b1b1, -3px -3px 8px #ffffff'
                    },
                    '&:active': {
                      background: '#1d9bf0'
                    }
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            </form>
          )}

          {/* Switch Form Link */}
          <Box sx={{ textAlign: 'center', mt: 3, px: 2 }}>
            <Typography
              variant="body2"
              sx={{
                color: theme.currentTheme === "dark" ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
                fontSize: 15,
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600
              }}
            >
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <Typography
                component="span"
                onClick={switchForm}
                sx={{
                  color: '#1d9bf0',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  '&:hover': {
                    color: '#000'
                  }
                }}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default LandingPage;











