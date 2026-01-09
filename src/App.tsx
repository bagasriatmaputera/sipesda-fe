import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import DataSiswaPage from "./pages/DaftarSiswaPage";
import DataGuruPage from "./pages/DaftarGuruPage";
import PelanggaranSiswa from "./pages/PelanggaranSiswaPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/" element={<DashboardPage />}></Route>
        <Route path="/siswa" element={<DataSiswaPage />}></Route>
        <Route path="/guru" element={<DataGuruPage />}></Route>
        <Route path="/pelanggaran" element={<PelanggaranSiswa />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
