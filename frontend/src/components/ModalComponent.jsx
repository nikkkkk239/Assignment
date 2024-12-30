// ModalComponent.js
import React, { useEffect, useState } from "react";
import { modalContext } from "../store/ModalContext";
import { useAuthStore } from "../store/AuthStore";
import toast from "react-hot-toast";

const ModalComponent = () => {
  const { isModalOpen, setIsModalOpen } = useContext(modalContext);
  const { isPermissionGiven, setCurrentLocation, setPermissionGiven } = useAuthStore();
  const [deliveryAddress, setDeliveryAddress] = useState("");

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

  // Request user's location
  const enableLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
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

  useEffect(() => {
    if (!isPermissionGiven) {
      checkLocationPermission();
    }
  }, []);

  useEffect(() => {
    if (isPermissionGiven) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  }, [isPermissionGiven]);

  return (
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
              alert(`Selected Address: ${deliveryAddress}`);
            }}
            style={{ marginTop: "20px", ...buttonStyle }}
          >
            Search Manually
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
