import NGOProfile from "@/sections/ngos/ngoProfile";
import GetAllNgosApi from "@/apis/ngo/GetAllNgosApi";
import GetNgoByIdApi from "@/apis/ngo/GetNgoByIdApi";

export const dynamic = "force-dynamic";

// This function for generating static paths remains correct.
export async function generateStaticParams() {
  const ngos = await GetAllNgosApi();
  return ngos.map((ngo) => ({
    id: ngo._id,
  }));
}

// The page component needs to handle the `params` promise.
export default async function NgoPage({ params }) {
  const resolvedParams = await params;
  const ngo = await GetNgoByIdApi(resolvedParams.id);

  return (
    <div>
      <NGOProfile ngo={ngo} />
    </div>
  );
}
