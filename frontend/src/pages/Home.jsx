import React, { useState,useEffect } from 'react'
import { RiUserLocationFill } from "react-icons/ri";
import Modal from "react-modal"
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { useAuthStore } from '../store/AuthStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { libraries } from '../lib/constants';
function Home() {
  const navigate = useNavigate()
  const [isModalOpen,setIsModalOpen] = useState(true)
  const {setPermissionGiven,isPermissionGiven,currentLocation,setCurrentLocation} = useAuthStore();
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDyvTvU89e-PTuzB24DpgbEks_AEjlH5Os",
    libraries,
  });

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
  useEffect(() => {
    !isPermissionGiven && checkLocationPermission();
  }, []);
  const handlePlaceSelected = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setDeliveryAddress(place.formatted_address || "");

      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const location = { latitude: lat, longitude: lng };
        localStorage.setItem("currentLocation", JSON.stringify(location));
        setCurrentLocation(location)
        navigate('/selectAddress')
      }
    }
  };
  const enableLocation = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { latitude, longitude };

          // Save location in localStorage for persistence
          localStorage.setItem("currentLocation", JSON.stringify(location));
          setCurrentLocation(location)
          toast.success("Location enabled.");
          setIsModalOpen(false);
        },
        (error) => {
          console.error("Error retrieving location:", error);
          toast.error("Failed to get location. Please enable location services.");
        }
      );
      setPermissionGiven(true);
      navigate("/selectAddress");
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div>
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
        <RiUserLocationFill style={{fontSize:"30px",marginBottom:"5px",color:"#4facfe"}}/>
        <h2>Location Permission Required</h2>
        <p>Please enable your location to proceed or search manually for your address.</p>

        <div style={{ marginTop: "20px" }}>
          {!isPermissionGiven && <button onClick={enableLocation} className="btn" style={buttonStyle}>
            Enable Location
          </button>}

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
          </div>
        </div>
      </Modal>
    </div>

  )
}

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

export default Home