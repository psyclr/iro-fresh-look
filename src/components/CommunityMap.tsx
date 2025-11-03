import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

import type { Community } from "@/lib/communities";
import { getLocalizedField } from "@/lib/communities";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

interface RecenterProps {
  center: LatLngExpression;
}

const Recenter = ({ center }: RecenterProps) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

interface CommunityMapProps {
  communities: Community[];
  center: LatLngExpression;
  language: string;
  label: string;
  onCommunityClick?: (community: Community) => void;
}

const CommunityMap = ({ communities, center, language, label, onCommunityClick }: CommunityMapProps) => (
  <MapContainer
    center={center}
    zoom={7}
    scrollWheelZoom={false}
    className="h-[420px] w-full rounded-xl overflow-hidden shadow-soft"
    aria-label={label}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Recenter center={center} />
    {communities.map((community) => (
      <Marker key={community.id} position={community.coordinates}>
        <Popup>
          <div className="space-y-2">
            <div>
              <h3 className="text-base font-semibold text-primary">
                {getLocalizedField(community.city, language)}
              </h3>
              <p className="text-sm font-medium text-muted-foreground">
                {getLocalizedField(community.communityName, language)}
              </p>
              <p className="text-xs text-muted-foreground">
                {getLocalizedField(community.address, language)}
              </p>
            </div>
            {onCommunityClick && (
              <button
                onClick={() => onCommunityClick(community)}
                className="w-full mt-2 px-3 py-1.5 text-sm font-medium text-white bg-primary rounded hover:bg-primary/90 transition-colors"
              >
                Подробнее
              </button>
            )}
          </div>
        </Popup>
      </Marker>
    ))}
  </MapContainer>
);

export default CommunityMap;
