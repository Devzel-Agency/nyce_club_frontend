"use client";
import { BACKEND_URL } from "@/apis/variables";
import Padding from "@/components/padding";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";

export default function Events({ events }) {
  // Helper to calculate fundraising progress for each event
  const calculateAmounts = (event) => {
    const totalAmountToBeRaised =
      event.donationBreakdown?.reduce(
        (sum, item) => sum + parseFloat(item.amount || 0),
        0
      ) || 0;
    const totalAmountReceived = event.tempReceivedDonation || 0; // Using temp field for simplicity
    const progress =
      totalAmountToBeRaised > 0
        ? (totalAmountReceived / totalAmountToBeRaised) * 100
        : 0;

    return {
      totalAmountToBeRaised,
      totalAmountReceived,
      progress: Math.min(progress, 100), // Cap progress at 100%
    };
  };

  // Helper to get a styled badge based on event status
  const getStatusBadge = (status) => {
    switch (status) {
      case "upcoming":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            Upcoming
          </Badge>
        );
      case "ongoing":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Ongoing
          </Badge>
        );
      case "completed":
        return <Badge className="bg-gray-200 text-gray-800">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Padding className="bg-white min-h-screen">
      <main className="max-w-4xl mx-auto pb-16 pt-20 lg:pt-28">
        <h1 className="text-3xl md:text-4xl text-gray-900 pb-8 font-polysans font-medium text-center">
          Upcoming Events & Drives
        </h1>
        <div className="space-y-8">
          {events.length === 0 ? (
            <div className="text-center py-16">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="font-polysans text-xl font-semibold text-gray-700 mb-2">
                No Events Scheduled Yet
              </h3>
              <p className="font-overused-grotesk text-gray-500">
                We are busy planning. Check back soon for exciting events!
              </p>
            </div>
          ) : (
            events.map((event) => {
              const { totalAmountToBeRaised, totalAmountReceived, progress } =
                calculateAmounts(event);
              return (
                <Link
                  href={`/events/${event._id}`} // Assuming you will have an event detail page
                  key={event._id}
                  className="block group bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                    {/* Image Section */}
                    <div className="md:col-span-2 my-auto ">
                      <AspectRatio ratio={16 / 10}>
                        <img
                          src={
                            event.eventImages?.[0]?.file
                              ? `${BACKEND_URL}/upload/${event.eventImages[0].file}`
                              : "https://via.placeholder.com/400x250?text=Event"
                          }
                          alt={event.eventName}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </AspectRatio>
                    </div>

                    {/* Details Section */}
                    <div className="md:col-span-3 p-6 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-xl text-gray-900 font-polysans font-medium">
                          {event.eventName}
                        </h2>
                        {getStatusBadge(event.status)}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 text-sm text-gray-600 mb-3 font-overused-grotesk">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span>
                            {new Date(event.eventDate).toLocaleDateString(
                              "en-US",
                              { year: "numeric", month: "long", day: "numeric" }
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span>{event.eventLocation}</span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 line-clamp-2 font-overused-grotesk text-sm leading-relaxed">
                        {event.eventDescription}
                      </p>

                      {/* Fundraising Progress */}
                      {totalAmountToBeRaised > 0 && (
                        <div className="mt-auto mb-4">
                          <div className="flex justify-between items-center text-xs font-overused-grotesk mb-1">
                            <span className="text-green-600 font-semibold">
                              ₹{totalAmountReceived.toLocaleString()} Raised
                            </span>
                            <span className="text-gray-500">
                              Target: ₹{totalAmountToBeRaised.toLocaleString()}
                            </span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      )}

                      {/* Sponsors */}
                      {event.sponsors && event.sponsors.length > 0 && (
                        <div className="mt-auto border-t border-gray-100 pt-3">
                          <span className="text-xs font-semibold text-gray-500 font-overused-grotesk">
                            Sponsored By:
                          </span>
                          <div className="flex items-center gap-3 mt-2">
                            {event.sponsors.map(
                              (sponsor) =>
                                sponsor.image && (
                                  <div
                                    key={sponsor._id}
                                    className="relative h-8 w-16"
                                    title={sponsor.name}
                                  >
                                    <img
                                      src={`${BACKEND_URL}/upload/${sponsor.image}`}
                                      alt={sponsor.name}
                                      className="h-full w-full object-contain grayscale opacity-70"
                                    />
                                  </div>
                                )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </main>
    </Padding>
  );
}
