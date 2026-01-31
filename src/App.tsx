import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import DataSiswaPage from "./pages/Siswa/DaftarSiswaPage";
import DataGuruPage from "./pages/Guru/DaftarGuruPage";
import PelanggaranSiswa from "./pages/Pelanggaran/PelanggaranSiswaPage";
import InputPelanggaranPage from "./pages/Pelanggaran/InputPelanggaranSiswaPage";
import JenisPelanggaranPage from "./pages/Pelanggaran/JenisPelanggaranPage";
import InputJenisPelanggaran from "./pages/Pelanggaran/InputJenisPelanggaran";
import InputGuruPage from "./pages/Guru/InputGuruPage";
import InputSiswaPage from "./pages/Siswa/InputSiswaPage";
import DetailSiswaPage from "./pages/Siswa/DetailSiswaPage";
import DetailGuruPage from "./pages/Guru/DetailGuruPage";
import KriteriaTahapBobotRulePage from "./pages/SAW/KriteriaTahapBobotRulePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/" element={<DashboardPage />}></Route>
        <Route path="/siswa" element={<DataSiswaPage />}></Route>
        <Route path="/siswa/create" element={<InputSiswaPage />}></Route>
        <Route path="/siswa/detail/:id" element={<DetailSiswaPage />}></Route>
        <Route path="/guru" element={<DataGuruPage />}></Route>
        <Route path="/guru/detail/:id" element={<DetailGuruPage />}></Route>
        <Route path="/guru/create" element={<InputGuruPage />}></Route>
        <Route path="/pelanggaran" element={<PelanggaranSiswa />}></Route>
        <Route path="/pelanggaran/input-pelanggaran" element={<InputPelanggaranPage />}></Route>
        <Route path="/pelanggaran/jenis-pelanggaran" element={<JenisPelanggaranPage />}></Route>
        <Route path="/pelanggaran/create-jenis-pelanggaran" element={<InputJenisPelanggaran />}></Route>
        <Route path="/saw/kriteria-tahap-bobot-rule" element={<KriteriaTahapBobotRulePage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
