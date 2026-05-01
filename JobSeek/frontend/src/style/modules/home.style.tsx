import { styled } from '@mui/material/styles';
import { Box, Card, Paper, Button } from '@mui/material';

/* ================= HERO SECTION ================= */

export const HeroCard = styled(Box)(({ theme }) => ({
  background:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, #1e293b, #0f172a)'
      : 'linear-gradient(135deg, #667eea, #764ba2)',

  color: theme.palette.common.white,

  padding: theme.spacing(8, 3),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(10, 6),
  },
}));

/* Search Card */

export const SearchCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  width: '100%',
  maxWidth: 380,

  background:
    theme.palette.mode === 'dark'
      ? 'rgba(30,41,59,0.8)'
      : 'rgba(255,255,255,0.7)',

  backdropFilter: 'blur(12px)',

  border: `1px solid ${theme.palette.divider}`,
}));

/* ================= STATS SECTION ================= */

export const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  maxWidth: 1200,
  margin: 'auto',

  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  },
}));

export const StatsCard = styled(Card)(({ theme }) => ({
  flex: 1,
  textAlign: 'center',
  borderRadius: 16,
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  transition: '0.25s ease',
  cursor: 'pointer',

  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: theme.shadows[4],
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.action.hover
        : theme.palette.grey[50],
  },
}));

/* ================= JOB CARD ================= */

export const JobCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: 18,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  transition: '0.25s ease',

  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: theme.shadows[6],
    borderColor: theme.palette.primary.main,
  },
}));

/* ================= CTA SECTION ================= */

export const CTABox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(5, 3),
  borderRadius: 20,

  background:
    theme.palette.mode === 'dark'
      ? `linear-gradient(135deg,
          ${theme.palette.primary.dark},
          ${theme.palette.secondary.dark}
        )`
      : `linear-gradient(135deg,
          ${theme.palette.primary.light},
          ${theme.palette.secondary.light}
        )`,

  color: theme.palette.getContrastText(
    theme.palette.mode === 'dark'
      ? theme.palette.primary.dark
      : theme.palette.primary.light
  ),
}));

/* ================= BUTTONS ================= */

export const PrimaryButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: 10,
  paddingInline: theme.spacing(3),

  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

export const OutlineButton = styled(Button)(({ theme }) => ({
 textTransform: 'none',
  fontWeight: 600,
  borderRadius: 10,
  paddingInline: theme.spacing(3),
  border: `1px solid white`,
  color: 'inherit',


  '&:hover': {
    boxShadow: theme.shadows[4],
  },

}));
