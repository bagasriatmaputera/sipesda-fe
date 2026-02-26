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
import RankingSAWPage from "./pages/SAW/RankingSawPage";
import EditSiswaPage from "./pages/Siswa/EditSiswaPage";
import EditGuruPage from "./pages/Guru/EditGuruPage";
import EditPelanggaranPage from "./pages/Pelanggaran/EditPelanggaranPage";
import PrintPDF from "./pages/Siswa/PrintPDF";
import ProtectedRouted from "./components/ui/middleware/ProtectedRoute";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="">
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>

          <Route element={<ProtectedRouted />}>
            <Route path="/" element={<DashboardPage />}></Route>
            <Route path="/siswa" element={<DataSiswaPage />}></Route>
            <Route path="/siswa/create" element={<InputSiswaPage />}></Route>
            <Route path="/siswa/detail/print/:id" element={<PrintPDF />}></Route>
            <Route path="/siswa/detail/:id" element={<DetailSiswaPage />}></Route>
            <Route path="/siswa/edit/:id" element={<EditSiswaPage />}></Route>
            <Route path="/guru" element={<DataGuruPage />}></Route>
            <Route path="/guru/detail/:id" element={<DetailGuruPage />}></Route>
            <Route path="/guru/edit/:id" element={<EditGuruPage />}></Route>
            <Route path="/guru/create" element={<InputGuruPage />}></Route>
            <Route path="/pelanggaran" element={<PelanggaranSiswa />}></Route>
            <Route path="/pelanggaran/input-pelanggaran" element={<InputPelanggaranPage />}></Route>
            <Route path="/pelanggaran/:id" element={<EditPelanggaranPage />}></Route>
            <Route path="/pelanggaran/jenis-pelanggaran" element={<JenisPelanggaranPage />}></Route>
            <Route path="/pelanggaran/create-jenis-pelanggaran" element={<InputJenisPelanggaran />}></Route>
            <Route path="/saw/kriteria-tahap-bobot-rule" element={<KriteriaTahapBobotRulePage />}></Route>
            <Route path="/saw/ranking" element={<RankingSAWPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
