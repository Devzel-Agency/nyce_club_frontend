import NGOProfile from "@/sections/ngos/ngoProfile";

// app/ngos/[id]/page.js
async function fetchNGOs() {
  try {
    const res = await fetch("http://localhost:8000/api/v1/ngo/getallngos", {
      cache: "force-cache",
    });
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching NGOs:", error);
    return [];
  }
}

async function fetchNGOById(id) {
  try {
    console.log(`Fetching NGO by ID: ${id}`);
    const res = await fetch(
      `http://localhost:8000/api/v1/ngo/getngobyid/${id}`,
      {
        cache: "force-cache",
      }
    );
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    const data = await res.json();
    console.log("NGO by ID response:", data);
    return data.data || {};
  } catch (error) {
    console.error(`Error fetching NGO by ID ${id}:`, error.message);
    return {};
  }
}
export async function generateStaticParams() {
  const ngos = await fetchNGOs();
  return ngos.map((ngo) => ({
    id: ngo._id,
  }));
}

export default async function NgoPage({ params }) {
  const ngo = await fetchNGOById(params.id);

  return (
    <div>
      <NGOProfile ngo={ngo} />
    </div>
  );
}
