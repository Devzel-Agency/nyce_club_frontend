import Ngos from "@/sections/ngos/ngos";
import GetAllNgosApi from "@/apis/ngo/GetAllNgosApi"; // Adjust the import path as needed

export const dynamic = "force-dynamic";

export default async function NgosPage() {
  const ngos = await GetAllNgosApi();

  return (
    <div>
      <Ngos ngos={ngos} />
    </div>
  );
}
