import { Button, Grid, TextField, Box, Typography, Paper, IconButton, InputAdornment } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loginUser } from "../../Store/Auth/Action";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const SigninForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useSelector((store) => store);
  const [showPassword, setShowPassword] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(loginUser(values));
    },
  });

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
        p: 2
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 4,
          borderRadius: 4,
          background: theme.currentTheme === "dark"
            ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          border: theme.currentTheme === "dark" ? '1px solid #333' : '1px solid #e0e0e0',
          boxShadow: theme.currentTheme === "dark"
            ? 'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.3)'
            : 'inset 0 1px 0 rgba(255,255,255,0.8), 0 8px 32px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: 450,
          minWidth: 400,
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
        
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #1d9bf0, #1a8cd8)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.currentTheme === "dark" ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                fontSize: '1rem'
              }}
            >
              Sign in to your account
            </Typography>
          </Box>

          {/* Form */}
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Email Field */}
              <Box>
                <TextField
                  name="email"
                  label="Email Address"
                  fullWidth
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: '#1d9bf0' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      background: theme.currentTheme === "dark" ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                      '& fieldset': {
                        borderColor: theme.currentTheme === "dark" ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#1d9bf0',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1d9bf0',
                        borderWidth: 2,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: theme.currentTheme === "dark" ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                    },
                    '& .MuiInputBase-input': {
                      color: theme.currentTheme === "dark" ? 'white' : 'black',
                    },
                  }}
                />
              </Box>

              {/* Password Field */}
              <Box>
                <TextField
                  name="password"
                  label="Password"
                  fullWidth
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: '#1d9bf0' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: '#1d9bf0' }}
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      background: theme.currentTheme === "dark" ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                      '& fieldset': {
                        borderColor: theme.currentTheme === "dark" ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#1d9bf0',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1d9bf0',
                        borderWidth: 2,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: theme.currentTheme === "dark" ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                    },
                    '& .MuiInputBase-input': {
                      color: theme.currentTheme === "dark" ? 'white' : 'black',
                    },
                  }}
                />
              </Box>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 2,
                  borderRadius: 3,
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
              >
                Sign In
              </Button>
            </Box>
          </form>

          {/* Footer */}
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography
              variant="body2"
              sx={{
                color: theme.currentTheme === "dark" ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
                fontSize: '0.9rem'
              }}
            >
              Don't have an account?{' '}
              <Typography
                component="span"
                onClick={() => navigate('/signup')}
                sx={{
                  color: '#1d9bf0',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  '&:hover': {
                    color: '#1a8cd8'
                  }
                }}
              >
                Create Account
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default SigninForm;
