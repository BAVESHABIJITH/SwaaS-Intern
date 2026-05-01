import {styled} from "@mui/material/styles";
import {Button,Box, Typography, Paper} from "@mui/material";

export const GradStyleTypography = styled(Typography)(({theme}) => ({
    fontWeight: 700,
    background: 'linear-gradient(45deg, #7F00FF 30%, #800080 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
}))

export const GoogleLoginButton=styled(Button)(({theme}) => ({
    color: "inherit",
    border: '1px solid inherit'
}))
export const GradBackground = styled(Box)(({theme}) => ({
    // height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
}))

export const AuthCard = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: 380,
  padding: theme.spacing(5),
  borderRadius: 12,

  backgroundColor: theme.palette.background.paper, 
  color: theme.palette.text.primary,

  [theme.breakpoints.up("sm")]: {
    maxWidth: 420,
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: 500,
    padding: theme.spacing(6),
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: 560,
    padding: theme.spacing(7),
  },
}));
