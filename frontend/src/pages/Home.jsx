import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import { modalContext } from "../store/ModalContext";
import { RiUserLocationFill } from "react-icons/ri";
import { RiCrosshair2Fill } from "react-icons/ri";
import { GoogleMap, MarkerF, useLoadScript, Autocomplete } from "@react-google-maps/api";
import { useAuthStore } from "../store/AuthStore";
import toast from "react-hot-toast";
import { useLocationStore } from "../store/LocationStore";

const Home = () => {
  const { isModalOpen, setIsModalOpen } = useContext(modalContext);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);
  const { isPermissionGiven, setPermissionGiven } = useAuthStore();
  const [address,setAddress] = useState("")
  const { currentLocation, setLocation, getLocation, setCurrentLocation } = useLocationStore();

  // Google Maps configuration
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDyvTvU89e-PTuzB24DpgbEks_AEjlH5Os",
    libraries: ["places"],
  });

  // Check location permission
  const checkLocationPermission = async () => {
    if ("geolocation" in navigator && "permissions" in navigator) {
      const permissionStatus = await navigator.permissions.query({
        name: "geolocation",
      });

      if (permissionStatus.state === "denied" || permissionStatus.state === "prompt") {
        setIsModalOpen(true);
      }

      permissionStatus.onchange = () => {
        if (permissionStatus.state === "denied" || permissionStatus.state === "prompt") {
          setIsModalOpen(true);
        } else {
          setIsModalOpen(false);
        }
      };
    }
  };

  const geocodeLatLng = (lat, lng) => {
    const geocoder = new google.maps.Geocoder();
    const latLng = { lat: parseFloat(lat), lng: parseFloat(lng) };

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === "OK" && results[0]) {
        setAddress(results[0].formatted_address); // Use the first result's address
      } else {
        setAddress("Address not found");
      }
    });
  };

  // Request user's location and store it
  const enableLocation = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { latitude, longitude };
          
          // Save location in localStorage for persistence
          localStorage.setItem("currentLocation", JSON.stringify(location));

          setLocation({ location });
          toast.success("Location enabled.");
          setIsModalOpen(false);
        },
        (error) => {
          console.error("Error retrieving location:", error);
          toast.error("Failed to get location. Please enable location services.");
        }
      );
      setPermissionGiven(true);
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  // Handle autocomplete address selection
  const handlePlaceSelected = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setDeliveryAddress(place.formatted_address || "");

      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const location = {latitude : lat , longitude:lng}
        localStorage.setItem("currentLocation", JSON.stringify(location));
        setPermissionGiven(true)
        setLocation({location});
      }
    }
  };

  useEffect(() => {
    !isPermissionGiven && checkLocationPermission();
    
    // Retrieve persisted location from localStorage if available
    const savedLocation = localStorage.getItem("currentLocation");
    if (savedLocation) {
      setCurrentLocation(JSON.parse(savedLocation)); // Parse and set persisted location
    }

    getLocation();
  }, []);

  useEffect(() => {
    console.log(currentLocation);
  }, [currentLocation]);

  useEffect(() => {
    if (isPermissionGiven) {
      setIsModalOpen(false);
      geocodeLatLng(currentLocation.lati,currentLocation.long)
    } else {
      setIsModalOpen(true);
    }
  }, [isPermissionGiven]);

  if (loadError) {
    return <p>Error loading Google Maps API: {loadError.message}</p>;
  }

  // Ensure currentLocation has valid lat and lng properties
  const lat = currentLocation?.lati;
  const lng = currentLocation?.long;

  return (
    <>
      <Modal
        ariaHideApp={false}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
          content: {
            maxWidth: "500px",
            margin: "auto",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            height: "fit-content",
          },
        }}
      >
        <h2>Location Permission Required</h2>
        <p>Please enable your location to proceed or search manually for your address.</p>

        <div style={{ marginTop: "20px" }}>
          <button onClick={enableLocation} className="btn" style={buttonStyle}>
            Enable Location
          </button>

          <div style={{ marginTop: "10px" }}>
            {isLoaded && (
              <Autocomplete
                onLoad={(autoCompleteInstance) => setAutocomplete(autoCompleteInstance)}
                onPlaceChanged={handlePlaceSelected}
              >
                <input
                  type="text"
                  placeholder="Search your address"
                  style={inputStyle}
                />
              </Autocomplete>
            )}
            <button
              onClick={() => {
                setIsModalOpen(false);
              }}
              style={{ marginTop: "20px", ...buttonStyle }}
            >
              Search Manually
            </button>
          </div>
        </div>
      </Modal>

      {isPermissionGiven && isLoaded && lat && lng && (
        <div className="yeah">
          <h1 style={{backgroundColor:"white",fontSize:"16px",textAlign:"center",padding:"10px",color:"#4facfe",borderBottom:"2px solid black"}}>Location Information</h1>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "75vh" }}
          center={{ lat, lng }}
          zoom={15}
        >
          <MarkerF position={{ lat, lng }} />
        </GoogleMap>
        <div className="bottom">
          <div className="left">
            <p >Select Your Delivery address</p>
            <div className="add">
              <p className="address" > <RiUserLocationFill style={{fontSize:'20px'}}/> {address}</p>
            </div>
          </div>

          <div className="right">
            <button onClick={enableLocation}>Enable</button>
            <button>Change</button>
          </div>


            <button className="locateMe"> <RiCrosshair2Fill/> Locate me</button>


        </div>
        </div>
      )}
    </>
  );
};

// Custom styles for buttons and inputs
const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#4facfe",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

export default Home;
