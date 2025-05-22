
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useNavigate } from 'react-router-dom';
import { Project } from '@/types';
import { getStatusColor, getProjectProgress } from '@/lib/helpers';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

// Replace with your public Mapbox token or create an input for it
mapboxgl.accessToken = 'pk.eyJ1IjoiZGVtby11c2VyIiwiYSI6ImNsbjF5cWJ2NjA3aHEya3BpcTcxdGQyYmgifQ.aNhNZWtLJ5Qj-YQE9D0JFg';

interface ProjectsMapProps {
  projects: Project[];
}

const ProjectsMap = ({ projects }: ProjectsMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>(mapboxgl.accessToken);
  const [mapLoaded, setMapLoaded] = useState(false);
  const navigate = useNavigate();

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;
    
    // Skip map initialization if token is not valid
    if (!mapboxToken) return;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-74.006, 40.7128], // New York City
        zoom: 11.5,
        attributionControl: false,
      });

      map.current.on('load', () => {
        setMapLoaded(true);
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'bottom-right'
      );
    } catch (error) {
      console.error("Error initializing map:", error);
      toast({
        title: "Map Error",
        description: "There was an error initializing the map. Please check your Mapbox token.",
        variant: "destructive"
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken]);

  // Add project markers
  useEffect(() => {
    if (!map.current || !mapLoaded || projects.length === 0) return;

    // Remove existing markers
    const existingMarkers = document.querySelectorAll('.project-marker');
    existingMarkers.forEach(marker => marker.remove());

    // Add markers for each project
    projects.forEach(project => {
      // Create marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'project-marker';
      
      const progressValue = getProjectProgress(project);
      const statusColor = getStatusColor(project.status);
      
      // Style the marker
      markerElement.innerHTML = `
        <div class="relative group">
          <div class="w-12 h-12 rounded-full ${statusColor} flex items-center justify-center text-white font-bold border-2 border-white shadow-lg">
            ${progressValue}%
          </div>
          <div class="absolute opacity-0 group-hover:opacity-100 bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 transition-opacity z-10 pointer-events-none">
            <div class="bg-white p-2 rounded shadow-lg whitespace-nowrap text-sm">
              <strong>${project.name}</strong>
            </div>
          </div>
        </div>
      `;

      // Add click event
      markerElement.addEventListener('click', () => {
        navigate(`/projects/${project.id}`);
      });

      // Add marker to map
      new mapboxgl.Marker({
        element: markerElement
      })
        .setLngLat([project.location.lng, project.location.lat])
        .addTo(map.current!);
    });
  }, [projects, mapLoaded, navigate]);

  const handleMapboxTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMapboxToken(e.target.value);
  };

  return (
    <Card className="w-full overflow-hidden">
      {!mapboxgl.accessToken && (
        <div className="p-4 bg-muted/30 border-b">
          <Label htmlFor="mapboxToken">Mapbox Access Token</Label>
          <div className="relative mt-1.5">
            <Input
              id="mapboxToken"
              value={mapboxToken}
              onChange={handleMapboxTokenChange}
              placeholder="Enter your Mapbox public token"
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Get your token at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary">mapbox.com</a>
          </p>
        </div>
      )}
      <div ref={mapContainer} className="h-[500px] w-full" />
    </Card>
  );
};

export default ProjectsMap;
