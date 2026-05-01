import { createTheme,ThemeProvider as MuiThemeProvider,CssBaseline } from "@mui/material";
import { createContext,useState,useEffect ,useMemo,} from "react";
import type { ReactNode } from "react";

type ThemeMode='light'|'dark';

interface ThemeContextType{
    mode:ThemeMode;
    toggleTheme:()=>void;
}
interface ThemeProviderProps{
    children:ReactNode;
}

export const ThemeContext=createContext<ThemeContextType|undefined>(undefined);



    const getInitialThemeMode=():ThemeMode=>{
        const savedMode=localStorage.getItem('themeMode');
        if(savedMode==='light'||savedMode==='dark'){
            return savedMode;
        }
        return 'light';
    }

export const ThemeProvider=({children}:ThemeProviderProps)=>{
    const [mode,setMode]=useState<ThemeMode>(getInitialThemeMode());
    
    useEffect(()=>{
        localStorage.setItem('themeMode',mode);
        document.body.className=mode;
    },[mode]);

    const toggleTheme=()=>{
        setMode((prevMode)=>(
            prevMode==='light'?'dark':'light'));
    };

    // Create MUI theme based on current mode
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === 'light'
                        ? {
                            // Light mode colors
                            primary: {
                                main: '#1976d2',
                            },
                            secondary: {
                                main: '#dc004e',
                            },
                            background: {
                                default: '#f5f5f5',
                                paper: '#ffffff',
                            },
                        }
                        : {
                            // Dark mode colors
                            primary: {
                                main: '#90caf9',
                            },
                            secondary: {
                                main: '#f48fb1',
                            },
                            background: {
                                default: '#121212',
                                paper: '#1e1e1e',
                            },
                        }),
                },
            }),
        [mode]
    );
    return(
        <ThemeContext.Provider value={{mode,toggleTheme}}>
          <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
        
    );
};