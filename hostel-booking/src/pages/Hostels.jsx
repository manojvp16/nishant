import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import HostelCard from "../components/HostelCard";

const Hostels = () => {
  const [hostels, setHostels] = useState([]);
  const [filterCity, setFilterCity] = useState("");

  useEffect(() => {
    const fetchHostels = async () => {
      const hostelCollection = collection(db, "hostels");
      const hostelSnapshot = await getDocs(hostelCollection);
      const hostelList = hostelSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHostels(hostelList);
    };
    fetchHostels();
  }, []);

  const cities = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"];
  const filteredHostels = filterCity
    ? hostels.filter((hostel) => hostel.city === filterCity)
    : hostels;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6">All Hostels</h2>
      <div className="mb-4">
        <label className="mr-2">Filter by City:</label>
        <select
          className="p-2 border rounded"
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
        >
          <option value="">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHostels.map((hostel) => (
          <HostelCard key={hostel.id} hostel={hostel} />
        ))}
      </div>
    </div>
  );
};

export default Hostels;