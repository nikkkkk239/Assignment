import React,{useEffect, useState} from 'react'
import { useAddressStore } from '../store/AddressStore'
import { RiCrosshair2Fill } from "react-icons/ri";
import { FaHouse } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
import Modal from "react-modal"
import { IoMdPeople } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { useAuthStore } from '../store/AuthStore';
import { CiHeart } from "react-icons/ci";
import { MdLogout } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { libraries } from '../lib/constants';
import { FaHeart } from "react-icons/fa";
import { useLoadScript ,GoogleMap,MarkerF,Autocomplete} from '@react-google-maps/api';
import toast from 'react-hot-toast';


function YourLocation() {

  const {address,setHome,addInRecentSearch,setOffice,setFamily,setFavour} = useAddressStore()  
  const [showMap,setShowMap] = useState(false)
  const [isModalOpen,setIsModalOpen] = useState(false)
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [add,setAdd] = useState("")
  const [autocomplete, setAutocomplete] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDyvTvU89e-PTuzB24DpgbEks_AEjlH5Os",
    libraries,
  });
  const {isPermissionGiven,setPermissionGiven,addressSelected,setAddressSelected,setCurrentLocation,currentLocation} = useAuthStore()
  const formatAddress = (address)=>{
    const parts = address?.split(",");
    const required = parts?.slice(0, 2)?.join(",");
    return required;
  }
  const formatAddressIn2 = (address) => {
    const parts = address?.split(",");
    const boldPart = parts?.slice(0, 2)?.join(","); // Join parts before the 2nd comma
    const normalPart = parts?.slice(2)?.join(","); // Join the rest of the parts
    return { boldPart, normalPart };
  };

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
        addInRecentSearch({address:place.formatted_address});
        sessionStorage.setItem("currentAddress", place.formatted_address);
        setAddressSelected(place.formatted_address);
        setShowMap(true)
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
  
  const geocodeLatLng = (lat, lng) => {
    if (window.google) {
      const geocoder = new window.google.maps.Geocoder();
      const latLng = { lat: parseFloat(lat), lng: parseFloat(lng) };
  
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === "OK" && results[0]) {
          const formattedAddress = results[0].formatted_address;
          setDeliveryAddress(formattedAddress); // Update the input box with new address
          setAdd(formattedAddress);
          sessionStorage.setItem("currentAddress", formattedAddress);
          addInRecentSearch({address:formatAddress});
          
          // Save address to sessionStorage
        } else {
          setAdd("Address not found");
        }
      });
    } else {
      console.error("Google Maps API is not loaded.");
    }
  };

  const yourLocation = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { latitude, longitude };

          // Save location in localStorage for persistence
          sessionStorage.setItem("currentLocation", JSON.stringify(location));
          setCurrentLocation(location)
          
          setShowMap(true)
          geocodeLatLng(location.latitude,location.longitude)
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


  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const location = { latitude: lat, longitude: lng };
  
    setCurrentLocation(location);
    sessionStorage.setItem("currentLocation", JSON.stringify(location)); // Save location to sessionStorage
  
    geocodeLatLng(lat, lng); // Update address based on lat/lng
  };
  const handleAddClick = ()=>{
    if(deliveryAddress == "") {
      toast.error("Address required.")
      return
    } ;
    setIsModalOpen(true)

  }
  const homeClicked = ()=>{
    setHome({home:deliveryAddress})
    setIsModalOpen(false)
  }
  const officeClicked = ()=>{
    setOffice({office:deliveryAddress})
    setIsModalOpen(false)

  }
  const familyClicked = ()=>{
    setFamily({family:deliveryAddress})
    setIsModalOpen(false)

  }
  const favourClicked = (address)=>{
    setFavour({favorite:address})
  }

  return (

    <div className='yourlocation'>
      <div className='logout'><MdLogout/></div>
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
        <h1 style={{fontSize:"25px",fontWeight:"600",marginBottom:"20px"}}>Save As</h1>
        <div style={{display:"flex",alignContent:"center",justifyContent:"center",gap:"40px"}}>
          <button style={{width:"40px",height:"40px",color:"#00c2ff",backgroundColor:"#00c2ff",fontSize:"20px",cursor:"pointer",borderRadius:"50%",border:"1px solid black",backgroundColor:"white"}}
            onClick={homeClicked}
          >
            <FaHouse/>
          </button>
          <button style={{width:"40px",height:"40px",color:"#00c2ff",backgroundColor:"#00c2ff",fontSize:"20px",cursor:"pointer",borderRadius:"50%",border:"1px solid black",backgroundColor:"white"}} onClick={officeClicked}><MdWork/></button>
          <button style={{width:"40px",height:"40px",color:"#00c2ff",backgroundColor:"#00c2ff",fontSize:"20px",cursor:"pointer",borderRadius:"50%",border:"1px solid black",backgroundColor:"white"}} onClick={familyClicked}><IoMdPeople/></button>
        </div>
        <button style={{position:"absolute",top:"20px",right:"20px",width:"30px",height:"30px",fontSize:"17px",cursor:"pointer",borderRadius:"50%",border:"1px solid black",backgroundColor:"white",display:"flex",alignItems:"center",justifyContent:"center",}} onClick={()=>setIsModalOpen(false)}><RxCross2/></button>
      </Modal>
      <h1>Your Location</h1>
      <div className='below'>
        <div className='container'>

        <div className='upper'>
          <div className='text' >
          {isLoaded && (
              <Autocomplete
                onLoad={(autoCompleteInstance) => setAutocomplete(autoCompleteInstance)}
                onPlaceChanged={handlePlaceSelected}
              >
                <input
                style={{width:"100%"}}
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Search your address"

                />
              </Autocomplete>
            )}
            <button onClick={handleAddClick}>Add Address</button>
          </div>
          <div className='liability'>
            <p onClick={yourLocation}><RiCrosshair2Fill/> Current location </p>
            {!isPermissionGiven && <button onClick={enableLocation}>Enable</button>}
          </div>
          {showMap && <div className='map'>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "35vh" }}
            center={{ lat:currentLocation.latitude, lng: currentLocation?.longitude }}
            zoom={15}
            onClick={handleMapClick}
          >
            <MarkerF position={{ lat: currentLocation?.latitude, lng: currentLocation?.longitude }} />
          </GoogleMap>
          </div>}
        </div>

        <div className='middle'>
          <div className='title'>
            Saved Locations
          </div>
          <div className='locations'>

            <div>
              <div className='icon'><FaHouse/></div>
              <div style={{display:'flex',flexGrow:1,flexDirection:"column",gap:"2px"}}>
                <h3>Home</h3>
                <p>{address.home.length ==0 ? "Not saved" : formatAddress(address.home)}</p>
              </div>
              {address.home.length != 0 && <div onClick={()=>favourClicked(address.home)} style={{fontSize:"22px",cursor:"pointer"}}>{address.home == address.favorite ? <FaHeart style={{color:"red"}}/> : <CiHeart/>}</div>}
            </div>

            <div>
              <div className='icon'><MdWork/></div>
              <div style={{display:'flex',flexGrow:1,flexDirection:"column",gap:"2px"}}> 
              <h3>Office</h3>
              <p>{address.office.length ==0 ? "Not saved" : formatAddress(address.office)}</p>
              </div> 
              {address.office.length!=0 &&  <div onClick={()=>favourClicked(address.office)} style={{fontSize:"22px",cursor:"pointer"}}>{address.office == address.favorite ? <FaHeart style={{color:"red"}}/> : <CiHeart/>}</div>}
            </div>

            <div>
              <div className='icon'><IoMdPeople/></div>
              <div style={{display:'flex',flexGrow:1,flexDirection:"column",gap:"2px"}}> 
              <h3>Family</h3>
              <p>{address.family.length ==0 ? "Not saved" : formatAddress(address.family)}</p>
              </div>
              {address.family.length!=0 && <div onClick={()=>favourClicked(address.family)} style={{fontSize:"22px",cursor:"pointer"}}>{(address.family == address.favorite && address.favorite.length !=0) ? <FaHeart style={{color:"red"}}/> : <CiHeart/>}</div>}
            </div>
          </div>
        </div>




        <div className='lower'>
          <div className='title'>
            Recent Searches
          </div>
          <div className='locations'>
            {address.recentSearches.length != 0 && address.recentSearches.map((add)=>{
              return <div>
                <div className='icon'><MdLocationPin/></div>
                <div style={{display:'flex',flexDirection:"column",gap:"2px"}}> 
                <h3>{formatAddressIn2(add).boldPart}</h3>
                <p>{formatAddressIn2(add).normalPart}</p>
                </div>
              </div>
            })
            }
            
          </div>
        </div>

      </div>
      </div>
    </div>
  )
}

export default YourLocation