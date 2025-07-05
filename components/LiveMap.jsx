

// "use client";

// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { useState } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Import marker images directly
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// // Fix default icon URLs
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x.src,
//   iconUrl: markerIcon.src,
//   shadowUrl: markerShadow.src,
// });


// // // Optional: custom icon
// // const customIcon = new L.Icon({
// //   iconUrl: "/solar.png",
// //   iconSize: [32, 32],
// //   iconAnchor: [16, 32],
// //   popupAnchor: [0, -32],
// // });


// const LiveMap = () => {
//   const [position] = useState([5.6037, -0.187]);

//   return (
//     <div className="h-[500px] w-full rounded-lg overflow-hidden">
//       <MapContainer
//         center={position}
//         zoom={13}
//         style={{ height: "100%", width: "100%" }}
//       >
//         <TileLayer
//           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={position}>
//           <Popup>We are here!</Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// };

// export default LiveMap;


"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";

// Import marker images directly
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default icon URLs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

// Custom solar-themed icon
const customIcon = new L.Icon({
  iconUrl: "data:image/svg+xml;base64," + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8 12h8"/>
      <path d="M12 8v8"/>
      <path d="M8.5 8.5l7 7"/>
      <path d="M15.5 8.5l-7 7"/>
    </svg>
  `),
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  className: 'custom-solar-marker'
});

const LiveMap = () => {
  const [position] = useState([5.6037, -0.187]);

  return (
    <section className="relative z-10 mt-12">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Navigation
              className="w-8 h-8 mr-3"
              style={{
                color: "var(--color-sunlink-orange-500)",
                animation: "gentle-bounce 2s ease-in-out infinite",
              }}
            />
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "var(--color-sky-light-800)" }}
            >
              Visit Our Location
            </h2>
          </div>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--color-sky-light-600)" }}
          >
            Find us in the heart of Accra, ready to power your solar journey
          </p>
        </div>

        {/* Map Container */}
        <div
          className="rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm border-4 relative"
          style={{
            backgroundColor: "var(--color-sky-light-50)",
            borderColor: "var(--color-sunlink-orange-200)",
            boxShadow: "0 25px 50px rgba(255, 123, 0, 0.15)",
          }}
        >
          {/* Map Header */}
          <div
            className="px-6 py-4 border-b-2"
            style={{
              backgroundColor: "var(--color-sunlink-orange-50)",
              borderColor: "var(--color-sunlink-orange-200)",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MapPin
                  className="w-6 h-6"
                  style={{ color: "var(--color-sunlink-orange-500)" }}
                />
                <div>
                  <h3
                    className="font-bold text-lg"
                    style={{ color: "var(--color-sky-light-800)" }}
                  >
                    Sunlink Power HQ
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-sky-light-600)" }}
                  >
                    123 Solar Street, Sunshine City
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Clock
                    className="w-4 h-4"
                    style={{ color: "var(--color-trust-green)" }}
                  />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-sky-light-700)" }}
                  >
                    Open Now
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="relative h-96">
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
                  <div
                    className="p-4 min-w-[280px]"
                    style={{ backgroundColor: "var(--color-comfort-cream)" }}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div
                        className="rounded-full p-2"
                        style={{ backgroundColor: "var(--color-sunlink-orange-500)" }}
                      >
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3
                          className="font-bold text-lg"
                          style={{ color: "var(--color-sky-light-800)" }}
                        >
                          Sunlink Power
                        </h3>
                        <p
                          className="text-sm"
                          style={{ color: "var(--color-sky-light-600)" }}
                        >
                          Solar Energy Solutions
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <MapPin
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: "var(--color-trust-green)" }}
                        />
                        <span
                          className="text-sm"
                          style={{ color: "var(--color-sky-light-700)" }}
                        >
                          123 Solar Street, Sunshine City, SC 12345
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Phone
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: "var(--color-sunlink-orange-500)" }}
                        />
                        <span
                          className="text-sm"
                          style={{ color: "var(--color-sky-light-700)" }}
                        >
                          +1 (555) 123-SOLAR
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Mail
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: "var(--color-sunlink-blue-500)" }}
                        />
                        <span
                          className="text-sm"
                          style={{ color: "var(--color-sky-light-700)" }}
                        >
                          info@sunlinkpower.com
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: "var(--color-trust-green)" }}
                        />
                        <span
                          className="text-sm"
                          style={{ color: "var(--color-sky-light-700)" }}
                        >
                          Mon-Fri: 8AM-6PM | Sat: 9AM-4PM
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <button
                        className="w-full py-2 px-4 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm"
                        style={{
                          backgroundColor: "var(--color-sunlink-orange-500)",
                          boxShadow: "0 4px 15px rgba(255, 123, 0, 0.3)",
                        }}
                        onClick={() => window.open(`https://maps.google.com/?q=${position[0]},${position[1]}`, '_blank')}
                      >
                        Get Directions
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>

            {/* Floating Info Cards */}
            <div className="absolute top-4 right-4 z-10">
              <div
                className="rounded-lg p-3 shadow-lg backdrop-blur-sm"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "2px solid var(--color-sunlink-orange-200)",
                }}
              >
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full animate-pulse"
                    style={{ backgroundColor: "var(--color-trust-green)" }}
                  />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-sky-light-800)" }}
                  >
                    We're Open!
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div
            className="px-6 py-4 border-t-2"
            style={{
              backgroundColor: "var(--color-sunlink-blue-50)",
              borderColor: "var(--color-sunlink-orange-200)",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: "var(--color-sunlink-orange-500)",
                    color: "white",
                    boxShadow: "0 4px 15px rgba(255, 123, 0, 0.3)",
                  }}
                  onClick={() => window.open(`tel:+15551237652`, '_self')}
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </button>
                
                <button
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: "var(--color-sunlink-blue-500)",
                    color: "white",
                    boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
                  }}
                  onClick={() => window.open(`https://maps.google.com/?q=${position[0]},${position[1]}`, '_blank')}
                >
                  <Navigation className="w-4 h-4" />
                  <span>Directions</span>
                </button>
              </div>
              
              <div className="text-right">
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-sky-light-800)" }}
                >
                  Distance: 2.3 km
                </p>
                <p
                  className="text-xs"
                  style={{ color: "var(--color-sky-light-600)" }}
                >
                  ~7 min drive
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .custom-solar-marker {
          filter: drop-shadow(0 4px 8px rgba(255, 123, 0, 0.4));
          color: var(--color-sunlink-orange-500);
        }

        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          border: 2px solid var(--color-sunlink-orange-200);
        }

        .custom-popup .leaflet-popup-tip {
          background: var(--color-comfort-cream);
          border: 2px solid var(--color-sunlink-orange-200);
          border-top: none;
          border-right: none;
        }

        .leaflet-container {
          border-radius: 0;
        }

        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </section>
  );
};

export default LiveMap;