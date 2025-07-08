import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";

const LiveMap = () => {
  const [position] = useState([5.6037, -0.187]);
  const [isMounted, setIsMounted] = useState(false);
  const [MapContainer, setMapContainer] = useState(null);
  const [TileLayer, setTileLayer] = useState(null);
  const [Marker, setMarker] = useState(null);
  const [Popup, setPopup] = useState(null);
  const [L, setL] = useState(null);

  const ghPhone = "+233241926409";
  useEffect(() => {
    // Dynamic import to avoid SSR issues
    const loadMap = async () => {
      try {
        const [
          {
            MapContainer: MapContainerComponent,
            TileLayer: TileLayerComponent,
            Marker: MarkerComponent,
            Popup: PopupComponent,
          },
          LeafletModule,
        ] = await Promise.all([import("react-leaflet"), import("leaflet")]);

        // Import CSS
        await import("leaflet/dist/leaflet.css");

        // Fix default icon URLs
        delete LeafletModule.default.Icon.Default.prototype._getIconUrl;
        LeafletModule.default.Icon.Default.mergeOptions({
          iconRetinaUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
          iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        });

        setMapContainer(() => MapContainerComponent);
        setTileLayer(() => TileLayerComponent);
        setMarker(() => MarkerComponent);
        setPopup(() => PopupComponent);
        setL(LeafletModule.default);
        setIsMounted(true);
      } catch (error) {
        console.error("Error loading map:", error);
      }
    };

    loadMap();
  }, []);

  // Create custom icon only after L is loaded
  const customIcon = L
    ? new L.Icon({
        iconUrl:
          "data:image/svg+xml;base64," +
          btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"/>
        <path d="M12 1v6m0 6v6"/>
        <path d="m4.93 4.93 4.24 4.24m5.66 5.66 4.24 4.24"/>
        <path d="m19.07 4.93-4.24 4.24m-5.66 5.66-4.24 4.24"/>
      </svg>
    `),
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
        className: "custom-solar-marker",
      })
    : null;

  return (
    <section className="relative z-10 mt-12">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Navigation className="w-8 h-8 mr-3 text-orange-500 dark:text-orange-400 animate-bounce" />
            <h2 className="text-3xl md:text-4xl font-bold text-sky-800 dark:text-slate-100">
              Visit Our Location
            </h2>
          </div>
          <p className="text-lg max-w-2xl mx-auto text-sky-600 dark:text-slate-300">
            Find us in the heart of Accra, ready to power your solar journey
          </p>
        </div>

        {/* Map Container */}
        <div className="rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm border-4 relative bg-slate-50 dark:bg-slate-800/90 border-orange-200 dark:border-slate-600 transition-colors duration-300">
          {/* Map Header */}
          <div className="px-6 py-4 border-b-2 bg-orange-50 dark:bg-slate-800/95 border-orange-200 dark:border-slate-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-orange-500 dark:text-orange-400" />
                <div>
                  <h3 className="font-bold text-lg text-sky-800 dark:text-slate-100">
                    Sunlink Power HQ
                  </h3>
                  <p className="text-sm text-sky-600 dark:text-slate-300">
                    123 Solar Street, Sunshine City
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-semibold text-sky-700 dark:text-slate-200">
                    Open Now
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="relative h-96">
            {isMounted &&
            MapContainer &&
            TileLayer &&
            Marker &&
            Popup &&
            customIcon ? (
              <MapContainer
                center={position}
                zoom={15}
                style={{ height: "100%", width: "100%" }}
                className="z-0"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position} icon={customIcon}>
                  <Popup className="custom-popup">
                    <div className="p-4 min-w-[280px] bg-amber-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="rounded-full p-2 bg-orange-500">
                          <MapPin className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-sky-800 dark:text-slate-100">
                            Sunlink Power
                          </h3>
                          <p className="text-sm text-sky-600 dark:text-slate-300">
                            Solar Energy Solutions
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 flex-shrink-0 text-green-600 dark:text-green-400" />
                          <span className="text-sm text-sky-700 dark:text-slate-300">
                            123 Solar Street, Sunshine City, SC 12345
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 flex-shrink-0 text-orange-500 dark:text-orange-400" />
                          <span className="text-sm text-sky-700 dark:text-slate-300">
                            +1 (555) 123-SOLAR
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 flex-shrink-0 text-blue-500 dark:text-blue-400" />
                          <span className="text-sm text-sky-700 dark:text-slate-300">
                            info@sunlinkpower.com
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 flex-shrink-0 text-green-600 dark:text-green-400" />
                          <span className="text-sm text-sky-700 dark:text-slate-300">
                            Mon-Fri: 8AM-6PM | Sat: 9AM-4PM
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-slate-600">
                        <button
                          className="w-full py-2 px-4 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700"
                          style={{
                            boxShadow: "0 4px 15px rgba(255, 123, 0, 0.3)",
                          }}
                          onClick={() =>
                            window.open(
                              `https://maps.google.com/?q=${position[0]},${position[1]}`,
                              "_blank"
                            )
                          }
                        >
                          Get Directions
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            ) : (
              <div className="flex items-center justify-center h-full bg-slate-100 dark:bg-slate-700">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                  <p className="text-slate-600 dark:text-slate-300">
                    Loading map...
                  </p>
                </div>
              </div>
            )}

            {/* Floating Info Cards */}
            <div className="absolute top-4 right-4 z-10">
              <div className="rounded-lg p-3 shadow-lg backdrop-blur-sm bg-white/95 dark:bg-slate-800/95 border-2 border-orange-200 dark:border-slate-600 transition-colors duration-300">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full animate-pulse bg-green-500 dark:bg-green-400" />
                  <span className="text-sm font-semibold text-sky-800 dark:text-slate-100">
                    We're Open!
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="px-6 py-4 border-t-2 bg-blue-50 dark:bg-slate-800/95 border-orange-200 dark:border-slate-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white"
                  style={{
                    boxShadow: "0 4px 15px rgba(255, 123, 0, 0.3)",
                  }}
                 onClick={() => window.open(`tel:${ghPhone}`, "_self")}
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </button>

                <button
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                  style={{
                    boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
                  }}
                  onClick={() =>
                    window.open(
                      `https://maps.google.com/?q=${position[0]},${position[1]}`,
                      "_blank"
                    )
                  }
                >
                  <Navigation className="w-4 h-4" />
                  <span>Directions</span>
                </button>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-sky-800 dark:text-slate-100">
                  Distance: 2.3 km
                </p>
                <p className="text-xs text-sky-600 dark:text-slate-300">
                  ~7 min drive
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveMap;
