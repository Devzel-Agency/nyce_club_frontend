import EventProfile from "@/sections/events/eventProfile";
import getAllEventsApi from "@/apis/events/getAllEventsApi";
import getEventByIdApi from "@/apis/events/getEventByIdApi";

// This directive ensures the page is dynamically rendered, fetching fresh data on each visit.
export const dynamic = "force-dynamic";

/**
 * Generates static paths for each event at build time.
 * This improves performance by pre-rendering pages for known event IDs.
 */
export async function generateStaticParams() {
  const events = await getAllEventsApi();
  // Ensure the API returned an array before mapping
  if (!Array.isArray(events)) {
    return [];
  }
  return events.map((event) => ({
    id: event._id,
  }));
}

/**
 * The main page component that fetches data for a single event.
 * @param {object} { params } - Contains the dynamic route parameters, e.g.,
 */
export default async function EventPage({ params }) {
  const resolvedParams = await params;

  const event = await getEventByIdApi(resolvedParams.id);

  // If the event is not found, Next.js will automatically show a 404 page.
  if (!event || event.error) {
    return (
      <div className="flex items-center justify-center h-screen text-center">
        <div>
          <h1 className="text-2xl font-bold">Event Not Found</h1>
          <p className="text-gray-600">
            The event you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <EventProfile event={event} />
    </div>
  );
}
