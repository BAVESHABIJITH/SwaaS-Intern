import { Routes, Route } from "react-router-dom"
import MemberView from "../pages/MemberView"
import LibrarianView from "../pages/LibrarianView"
import Login from "../pages/Login"

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/member" element={<MemberView />} />
      <Route path="/librarian" element={<LibrarianView />} />
    </Routes>
  )
}
