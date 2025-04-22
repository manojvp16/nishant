import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import HostelCard from "../components/HostelCard";

const Home = () => {
  const [hostels, setHostels] = useState([]);
  const [searchCity, setSearchCity] = useState("");

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

  const filteredHostels = hostels.filter((hostel) =>
    hostel.city.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white">
      <div className="container mx-auto p-4">
        <div className="text-center py-16 bg-indigo-600 rounded-xl shadow-lg mb-10">
          <h1 className="text-5xl font-extrabold text-white">Welcome to HostelHub</h1>
          <p className="text-xl text-indigo-100 mt-4">Find the perfect hostel for your studies in India</p>
          <input
            type="text"
            placeholder="Search by city (e.g., Delhi, Mumbai)"
            className="mt-6 p-3 w-full max-w-md rounded-lg border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
          />
        </div>
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Featured Hostels</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHostels.map((hostel) => (
            <HostelCard key={hostel.id} hostel={hostel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;