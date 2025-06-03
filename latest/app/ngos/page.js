import Ngos from "@/sections/ngos/ngos";

// app/ngos/page.js
async function fetchNGOs() {
  try {
    const res = await fetch("http://localhost:8000/api/v1/ngo/getallngos", {
      cache: "force-cache",
    });
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    const data = await res.json();
    return Array.isArray(data) ? data : []; // Ensure we return an array
  } catch (error) {
    console.error("Error fetching NGOs:", error);
    return []; // Return empty array on error
  }
}

export default async function NgosPage() {
  const ngos = await fetchNGOs();

  return (
    <div>
      <Ngos ngos={ngos} />
    </div>
  );
}
