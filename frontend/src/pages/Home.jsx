import React, { useState,useEffect } from 'react'
import { RiUserLocationFill } from "react-icons/ri";
import Modal from "react-modal"
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { useAuthStore } from '../store/AuthStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaHouse } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
import { IoMdPeople } from "react-icons/io";
import { libraries } from '../lib/constants';
import { MdLocationPin } from "react-icons/md";
import { useAddressStore } from '../store/AddressStore';
function Home() {
  const navigate = useNavigate()
  const [isModalOpen,setIsModalOpen] = useState(true)
  const {getAddress,address,setHome,setOffice,setFamily} = useAddressStore();
  const {setPermissionGiven,isPermissionGiven,currentLocation,addressSelected,setCurrentLocation} = useAuthStore();
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [house,setHouse] = useState("")
  const [road,setRoad] = useState("") 
  const [autocomplete, setAutocomplete] = useState(null);
  const formatAddress = (address) => {
    const parts = address?.split(",");
    const boldPart = parts?.slice(0, 2)?.join(","); // Join parts before the 2nd comma
    const normalPart = parts?.slice(2)?.join(","); // Join the rest of the parts
    return { boldPart, normalPart };
  };
  const { boldPart, normalPart } = formatAddress(addressSelected);
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
    getAddress();
  }, []);

  const handlePlaceSelected = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setDeliveryAddress(place.formatted_address || "");

      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const location = { latitude: lat, longitude: lng };
        sessionStorage.setItem("currentLocation", JSON.stringify(location));
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
          sessionStorage.setItem("currentLocation", JSON.stringify(location));
          setCurrentLocation(location)
          toast.success("Location enabled.");
          setPermissionGiven(true);
          if(address?.home?.length!=0 && address?.office?.length!=0 && address?.family?.length!=0){
            navigate('/yourlocation');
          }
          else{
          navigate("/selectAddress");
          }
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
  const handleHomeClick = ()=>{
    console.log("hi")
    if(house.length == 0 ){
      toast.error("Flat details needed .")
      return;
    }
    if(road.length == 0 ){
      toast.error("Appartment details needed .")
      return;
    }
    setHome({home : addressSelected+","+house+","+road})
    navigate('/yourlocation')
  }

  const handleWorkClick = ()=>{
    console.log("hi")
    if(house.length == 0 ){
      toast.error("Flat details needed .")
      return;
    }
    if(road.length == 0 ){
      toast.error("Appartment details needed .")
      return;
    }
    setOffice({office : addressSelected+","+house+","+road})
    navigate('/yourlocation')

  }

  const handlePeopleClick = ()=>{
    console.log("hi")
    if(house.length == 0 ){
      toast.error("Flat details needed .")
      return;
    }
    if(road.length == 0 ){
      toast.error("Appartment details needed .")
      return;
    }
    setFamily({family : addressSelected+","+house+","+road})
    navigate('/yourlocation')
  }

  return (
    <div>
      {!addressSelected ? <Modal
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

          {(address?.home?.length==0 || address?.office?.length==0||address?.family?.length==0 ) && <div style={{ marginTop: "10px" }}>
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
          </div>}
        </div>
      </Modal> :
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
            height: "fit-content",
          },
        }}
        >
          <div className='set-Add'>
            <div className='upper'>
              <p className='title'>
                <MdLocationPin style={{color:"#00c2ff"}}/> {boldPart}</p>
              <p>{normalPart}</p>
            </div>

            <div className='middle'>
              <div>
                <label htmlFor="house">House/Flat/Block No.</label>
                <input type="text" value={house} onChange={(e)=>setHouse(e.target.value)} name='house' />
              </div>

              <div>
                <label htmlFor="house">Apartment/Road/Area</label>
                <input type="text" value={road} onChange={(e)=>setRoad(e.target.value)} name='house' />
              </div>
            </div>

            <div className='lower'>
              <p>Save As</p>
              <div>
                <button onClick={handleHomeClick}><FaHouse/></button>
                <button onClick={handleWorkClick}><MdWork/></button>
                <button onClick={handlePeopleClick}> <IoMdPeople/></button>
              </div>
            </div>
          </div>
        </Modal>
      }
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