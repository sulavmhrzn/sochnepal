"use client";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

const ReportMap = ({
    posix,
    zoom = 19,
}: {
    posix: LatLngExpression;
    zoom?: number;
}) => {
    const icon = new Icon({
        iconUrl: markerIconPng as unknown as string,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });
    return (
        <div className="w-full h-full border border-gray-200 rounded-lg overflow-hidden bg-gray-100">
            <div className="w-full h-full relative">
                <MapContainer
                    center={posix}
                    zoom={zoom}
                    scrollWheelZoom={true}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={posix} icon={icon}>
                        <Popup>Hey ! I study here</Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
};

export default ReportMap;
