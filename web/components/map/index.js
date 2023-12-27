
import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_APP_MAPBOX_TOKEN;

const Map = () => {
  
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v11',
      center: [75.8577, 22.7196],
      zoom: 12,
    });

    map.on('load', () => {
      map.addSource('maine', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [75.857733, 22.737231],
                [75.876953, 22.731117],
                [75.882454, 22.706767],
                [75.877352, 22.695799],
                [75.861216, 22.696375],
                [75.849686, 22.702489],
                [75.846596, 22.717042],
                [75.849171, 22.729659],
                [75.857733, 22.737231]
              ],
            ],
          },
        },
      });

      map.addLayer({
        id: 'maine',
        type: 'fill',
        source: 'maine',
        layout: {},
        paint: {
          'fill-color': '#0080ff',
          'fill-opacity': 0.5,
        },
      });

      map.addLayer({
        id: 'outline',
        type: 'line',
        source: 'maine',
        layout: {},
        paint: {
          'line-color': '#000',
          'line-width': 3,
        },
      });
      });

    return () => map.remove();
  }, []); // Empty dependency array ensures useEffect runs only once

  return <div id="map" className="rounded-2xl" style={{ width: '50%', height:'500px' }} />;
};

export default Map;
