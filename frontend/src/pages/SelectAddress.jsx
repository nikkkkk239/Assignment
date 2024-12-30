import React, { useEffect, useState } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { RiCrosshair2Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { RiUserLocationFill } from "react-icons/ri";
import { useAuthStore } from "../store/AuthStore";
import { libraries } from "../lib/constants";

function SelectAddress() {
  const [loc, setLoc] = useState(
    JSON.parse(localStorage.getItem("currentLocation")) || { latitude: 0, longitude: 0 }
  );
  const {setPermissionGiven,isPermissionGiven,setAdressSelected,currentLocation,setCurrentLocation} = useAuthStore();
  const [address, setAddress] = useState(localStorage.getItem("currentAddress") || "");
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDyvTvU89e-PTuzB24DpgbEks_AEjlH5Os",
    libraries,
  });

  const geocodeLatLng = (lat, lng) => {
    if (window.google) {
      const geocoder = new window.google.maps.Geocoder();
      const latLng = { lat: parseFloat(lat), lng: parseFloat(lng) };

      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === "OK" && results[0]) {
          const formattedAddress = results[0].formatted_address;
          setAddress(formattedAddress);
          localStorage.setItem("currentAddress", formattedAddress); // Save address to localStorage
        } else {
          setAddress("Address not found");
        }
      });
    } else {
      console.error("Google Maps API is not loaded.");
    }
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const location = { latitude: lat, longitude: lng };
    setLoc(location);
    localStorage.setItem("currentLocation", JSON.stringify(location)); // Save location to localStorage
    geocodeLatLng(lat, lng);
  };

  useEffect(() => {
    if (loc.latitude && loc.longitude) {
      geocodeLatLng(loc.latitude, loc.longitude);
    }
  }, [loc]);

  const yourLocation = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { latitude, longitude };

          // Save location in localStorage for persistence
          localStorage.setItem("currentLocation", JSON.stringify(location));
          setCurrentLocation(location)
          setLoc(location)
        },
        (error) => {
          console.error("Error retrieving location:", error);
          toast.error("Failed to get location. Please enable location services.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  if (!isLoaded) {
    return <p>Loading......</p>;
  }

  if (loadError) {
    return <p>Error loading Google Maps API: {loadError.message}</p>;
  }

  return (
    <div className="complete">

      {/* <button className="cross">
        <RxCross2 />
      </button> */}

      <h1>
        Location Information
      </h1>

      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "75vh" }}
        center={{ lat: loc.latitude, lng: loc.longitude }}
        zoom={15}
        onClick={handleMapClick}
      >
        <MarkerF position={{ lat: loc.latitude, lng: loc.longitude }} />
      </GoogleMap>

      <div className="bottom">
        <div className="left">
          <p>Select Your Delivery address</p>
          <div className="address">
              <RiUserLocationFill  style={{fontSize:'25px'}}/> {address}
          </div>
        </div>

        <div className="right">
          <button>Use Address</button>
        </div>

        <button className="locateMe" onClick={yourLocation}>
          <RiCrosshair2Fill /> Locate me
        </button>
      </div>
    </div>
  );
}

export default SelectAddress;
