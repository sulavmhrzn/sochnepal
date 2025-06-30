import { useState } from "react";

export const useGeoLocation = () => {
    const [isLoading, setIsLoading] = useState(false);

    const getCurrentLocation = async (): Promise<{
        coords?: { latitude: number; longitude: number };
        permissionDenied: boolean;
    }> => {
        return new Promise((resolve) => {
            if (!navigator.geolocation) {
                resolve({ permissionDenied: true });
                return;
            }
            navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                    setIsLoading(false);
                    resolve({
                        coords: {
                            latitude: coords.latitude,
                            longitude: coords.longitude,
                        },
                        permissionDenied: false,
                    });
                },
                (error) => {
                    setIsLoading(false);
                    console.log("Geolocation error", error);
                    resolve({ permissionDenied: true });
                },
                { enableHighAccuracy: true }
            );
        });
    };
    return { getCurrentLocation, isLoading };
};
