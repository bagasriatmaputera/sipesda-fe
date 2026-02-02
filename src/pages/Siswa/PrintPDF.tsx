import CetakPDF from "@/components/ui/create/CetakPDF"
import { useSiswa } from "@/hooks/useSiswa"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PrintPDF() {
    const { id } = useParams();
    const { showSiswa,  } = useSiswa();
    const [siswa, setSiswa] = useState<any>(null);
    useEffect(() => {
            const fetchDetail = async () => {
                if (id) {
                    const data = await showSiswa(id);
                    setSiswa(data);
                }
            };
            fetchDetail();
        }, [id]);
    return (
        <CetakPDF data={siswa}></CetakPDF>
    )
}