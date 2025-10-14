import getAllEventsApi from "@/apis/events/getAllEventsApi";
import Events from "@/sections/events/events";

// This ensures the page is dynamically rendered and fetches fresh data on each request.
export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await getAllEventsApi();

  return (
    <div>
      <Events events={events} />
    </div>
  );
}
