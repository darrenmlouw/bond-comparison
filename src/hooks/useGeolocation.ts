// src/hooks/useGeolocation.ts
import { useState, useEffect } from 'react';

interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
}

const useGeolocation = () => {
  const [coordinates, setCoordinates] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    const success = (position: GeolocationPosition) => {
      setCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      });
    };

    const error = (err: GeolocationPositionError) => {
      setError(err.message);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return { coordinates, error };
};

export default useGeolocation;
