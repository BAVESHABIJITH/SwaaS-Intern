import { createContext,useState, useContext} from "react";
type users ='JOBSEEKER' | 'RECRUITER' | 'admin' | any
interface AuthContextType {
  userMail: string;
  setUserMail: React.Dispatch<React.SetStateAction<string | any>>;
  userType: users | null;
  setUsertype: React.Dispatch<React.SetStateAction<users | null>>;
}
export const AuthContext =createContext<AuthContextType|undefined>(undefined);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthContextProvider");
  }
  return context;
};
const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) =>{
const [userMail,setUserMail] = useState<string>('');
const [userType, setUsertype] = useState<users | null>(null);
return (
    <AuthContext.Provider value={{userMail,setUserMail,userType,setUsertype}}>
        {children}
    </AuthContext.Provider>
)

}
export default AuthContextProvider;



