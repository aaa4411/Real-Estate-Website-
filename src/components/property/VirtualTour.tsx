import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useFeatureAccess } from "@/hooks/useFeatureAccess";
import {
  Maximize2,
  Minimize2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Move,
  Info,
  Ruler,
  Star,
  Lock,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

interface RoomData {
  id: string;
  name: string;
  panoramaUrl: string;
  thumbnailUrl: string;
  hotspots?: {
    id: string;
    x: number;
    y: number;
    targetRoomId?: string;
    label?: string;
    type: "room" | "info";
    infoContent?: string;
  }[];
  measurements?: {
    width: number;
    length: number;
    height: number;
  };
}

interface VirtualTourProps {
  propertyId?: string;
  propertyTitle?: string;
  rooms?: RoomData[];
  isPremiumFeature?: boolean;
  onUpgradeClick?: () => void;
}

const VirtualTour = ({
  propertyId = "1",
  propertyTitle = "Modern Apartment with City View",
  isPremiumFeature = true,
  onUpgradeClick = () => {},
  rooms = [
    {
      id: "living-room",
      name: "Living Room",
      panoramaUrl:
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200&q=80",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=300&q=80",
      hotspots: [
        {
          id: "to-kitchen",
          x: 35,
          y: 50,
          targetRoomId: "kitchen",
          label: "Kitchen",
          type: "room",
        },
        {
          id: "to-bedroom",
          x: 65,
          y: 50,
          targetRoomId: "bedroom",
          label: "Bedroom",
          type: "room",
        },
        {
          id: "living-info",
          x: 50,
          y: 30,
          type: "info",
          label: "Living Area",
          infoContent:
            "Spacious living area with hardwood floors and large windows providing abundant natural light.",
        },
      ],
      measurements: {
        width: 15,
        length: 18,
        height: 9,
      },
    },
    {
      id: "kitchen",
      name: "Kitchen",
      panoramaUrl:
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&q=80",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=300&q=80",
      hotspots: [
        {
          id: "to-living",
          x: 25,
          y: 50,
          targetRoomId: "living-room",
          label: "Living Room",
          type: "room",
        },
        {
          id: "kitchen-info",
          x: 50,
          y: 40,
          type: "info",
          label: "Kitchen Island",
          infoContent:
            "Modern kitchen with stainless steel appliances, quartz countertops, and a spacious island with seating.",
        },
      ],
      measurements: {
        width: 12,
        length: 14,
        height: 9,
      },
    },
    {
      id: "bedroom",
      name: "Primary Bedroom",
      panoramaUrl:
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=300&q=80",
      hotspots: [
        {
          id: "to-living-from-bedroom",
          x: 20,
          y: 50,
          targetRoomId: "living-room",
          label: "Living Room",
          type: "room",
        },
        {
          id: "to-bathroom",
          x: 80,
          y: 50,
          targetRoomId: "bathroom",
          label: "Bathroom",
          type: "room",
        },
        {
          id: "bedroom-info",
          x: 50,
          y: 30,
          type: "info",
          label: "Bedroom Features",
          infoContent:
            "Spacious primary bedroom with walk-in closet and en-suite bathroom. Features large windows with city views.",
        },
      ],
      measurements: {
        width: 14,
        length: 16,
        height: 9,
      },
    },
    {
      id: "bathroom",
      name: "Primary Bathroom",
      panoramaUrl:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&q=80",
      hotspots: [
        {
          id: "to-bedroom-from-bathroom",
          x: 20,
          y: 50,
          targetRoomId: "bedroom",
          label: "Bedroom",
          type: "room",
        },
        {
          id: "bathroom-info",
          x: 60,
          y: 40,
          type: "info",
          label: "Bathroom Features",
          infoContent:
            "Luxury bathroom with double vanity, soaking tub, and walk-in shower with rainfall showerhead.",
        },
      ],
      measurements: {
        width: 8,
        length: 10,
        height: 9,
      },
    },
  ],
}: VirtualTourProps) => {
  const [currentRoomId, setCurrentRoomId] = useState<string>(
    rooms[0]?.id || "",
  );
  const [rotation, setRotation] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(100);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [showMeasurements, setShowMeasurements] = useState<boolean>(false);
  const [activeInfoHotspot, setActiveInfoHotspot] = useState<string | null>(
    null,
  );
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const panoramaRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { canAccessFeature } = useFeatureAccess();

  // Check if user has access to virtual tours feature
  const hasAccess = canAccessFeature
    ? canAccessFeature("virtualTours")
    : !isPremiumFeature;

  const currentRoom =
    rooms.find((room) => room.id === currentRoomId) || rooms[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!hasAccess) return;

      switch (e.key) {
        case "ArrowLeft":
          setRotation((prev) => prev - 10);
          break;
        case "ArrowRight":
          setRotation((prev) => prev + 10);
          break;
        case "ArrowUp":
          setZoom((prev) => Math.min(prev + 10, 150));
          break;
        case "ArrowDown":
          setZoom((prev) => Math.max(prev - 10, 50));
          break;
        case "Escape":
          if (isFullscreen) {
            document.exitFullscreen().catch((err) => console.error(err));
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasAccess, isFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!hasAccess) return;

    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragStart || !hasAccess) return;

    const deltaX = e.clientX - dragStart.x;
    setRotation((prev) => prev - deltaX * 0.5);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleRoomChange = (roomId: string) => {
    setCurrentRoomId(roomId);
    setRotation(0);
    setActiveInfoHotspot(null);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 150));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 50));
  };

  const handleReset = () => {
    setRotation(0);
    setZoom(100);
    setActiveInfoHotspot(null);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        toast({
          title: "Fullscreen Error",
          description: `Error attempting to enable fullscreen: ${err.message}`,
          variant: "destructive",
        });
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleHotspotClick = (
    hotspot: VirtualTourProps["rooms"][0]["hotspots"][0],
  ) => {
    if (!hasAccess) return;

    if (hotspot.type === "room" && hotspot.targetRoomId) {
      handleRoomChange(hotspot.targetRoomId);
    } else if (hotspot.type === "info") {
      setActiveInfoHotspot(
        activeInfoHotspot === hotspot.id ? null : hotspot.id,
      );
    }
  };

  const navigateToPreviousRoom = () => {
    const currentIndex = rooms.findIndex((room) => room.id === currentRoomId);
    if (currentIndex > 0) {
      handleRoomChange(rooms[currentIndex - 1].id);
    }
  };

  const navigateToNextRoom = () => {
    const currentIndex = rooms.findIndex((room) => room.id === currentRoomId);
    if (currentIndex < rooms.length - 1) {
      handleRoomChange(rooms[currentIndex + 1].id);
    }
  };

  if (!hasAccess) {
    return (
      <div className="w-full bg-muted/30 rounded-lg overflow-hidden border">
        <div className="relative">
          <AspectRatio ratio={16 / 9}>
            <div className="w-full h-full bg-gradient-to-r from-gray-700 to-gray-900 flex flex-col items-center justify-center p-6 text-center">
              <Lock className="h-12 w-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Premium Feature: Virtual Tour
              </h3>
              <p className="text-gray-300 max-w-md mb-6">
                Explore this property in immersive 3D with our virtual tour
                feature. Upgrade to our Premium plan to access unlimited virtual
                tours.
              </p>
              <Button
                onClick={onUpgradeClick}
                className="bg-amber-500 hover:bg-amber-600"
              >
                <Star className="h-4 w-4 mr-2" /> Upgrade to Premium
              </Button>
            </div>
          </AspectRatio>
          <div className="absolute inset-0 pointer-events-none bg-black/50 flex items-center justify-center">
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
              Virtual Tour
            </div>
          </div>
        </div>

        <div className="p-4 bg-background">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Property Virtual Tour</h3>
            <Badge
              variant="outline"
              className="text-amber-500 border-amber-500"
            >
              Premium Feature
            </Badge>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="relative rounded-md overflow-hidden opacity-50"
              >
                <AspectRatio ratio={1}>
                  <img
                    src={room.thumbnailUrl}
                    alt={room.name}
                    className="object-cover w-full h-full filter grayscale"
                  />
                </AspectRatio>
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <Lock className="h-4 w-4 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-1 text-xs text-center truncate">
                  {room.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`w-full bg-background rounded-lg overflow-hidden border ${isFullscreen ? "fixed inset-0 z-50" : ""}`}
    >
      <div
        className="relative"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <AspectRatio ratio={16 / 9}>
          <div
            ref={panoramaRef}
            className="w-full h-full bg-cover bg-center transition-transform cursor-move"
            style={{
              backgroundImage: `url(${currentRoom.panoramaUrl})`,
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transition: isDragging ? "none" : "transform 0.3s ease-out",
            }}
          >
            {/* Hotspots */}
            {currentRoom.hotspots?.map((hotspot) => (
              <div
                key={hotspot.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10`}
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                onClick={() => handleHotspotClick(hotspot)}
              >
                {hotspot.type === "room" ? (
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/80 text-white flex items-center justify-center animate-pulse">
                      <ChevronRight className="h-6 w-6" />
                    </div>
                    <span className="mt-1 px-2 py-1 bg-black/70 text-white text-xs rounded-md whitespace-nowrap">
                      {hotspot.label}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div
                      className={`h-8 w-8 rounded-full ${activeInfoHotspot === hotspot.id ? "bg-amber-500" : "bg-white/80"} text-black flex items-center justify-center`}
                    >
                      <Info className="h-4 w-4" />
                    </div>
                    {activeInfoHotspot === hotspot.id &&
                      hotspot.infoContent && (
                        <div className="absolute top-full mt-2 p-3 bg-black/80 text-white text-sm rounded-md max-w-xs z-20">
                          <h4 className="font-medium mb-1">{hotspot.label}</h4>
                          <p>{hotspot.infoContent}</p>
                        </div>
                      )}
                  </div>
                )}
              </div>
            ))}

            {/* Measurements overlay */}
            {showMeasurements && currentRoom.measurements && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-3/4 h-3/4 border-2 border-white/50 rounded-md">
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {currentRoom.measurements.width}' wide
                  </div>
                  <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 bg-black/70 text-white px-2 py-1 rounded text-sm rotate-90">
                    {currentRoom.measurements.length}' long
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {currentRoom.measurements.height}' ceiling
                  </div>
                </div>
              </div>
            )}
          </div>
        </AspectRatio>

        {/* Controls overlay */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/70 rounded-full px-3 py-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 h-8 w-8"
            onClick={handleZoomOut}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 h-8 w-8"
            onClick={handleZoomIn}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 h-8 w-8"
            onClick={handleReset}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`text-white hover:bg-white/20 h-8 w-8 ${showMeasurements ? "bg-white/30" : ""}`}
            onClick={() => setShowMeasurements(!showMeasurements)}
          >
            <Ruler className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 h-8 w-8"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Room navigation buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 h-10 w-10"
          onClick={navigateToPreviousRoom}
          disabled={rooms.findIndex((room) => room.id === currentRoomId) === 0}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 h-10 w-10"
          onClick={navigateToNextRoom}
          disabled={
            rooms.findIndex((room) => room.id === currentRoomId) ===
            rooms.length - 1
          }
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
          {currentRoom.name}
        </div>

        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs">
          <div className="flex items-center gap-1">
            <Move className="h-3 w-3" />
            <span>Drag to look around</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold mb-3">Tour Navigation</h3>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {rooms.map((room) => (
            <div
              key={room.id}
              className={`relative rounded-md overflow-hidden cursor-pointer transition-all ${currentRoomId === room.id ? "ring-2 ring-primary" : "hover:opacity-80"}`}
              onClick={() => handleRoomChange(room.id)}
            >
              <AspectRatio ratio={1}>
                <img
                  src={room.thumbnailUrl}
                  alt={room.name}
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-1 text-xs text-center truncate">
                {room.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualTour;
