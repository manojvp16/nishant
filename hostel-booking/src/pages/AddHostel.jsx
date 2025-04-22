import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddHostel = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [availableDates, setAvailableDates] = useState(["2025-05-01"]);
  const [amenities, setAmenities] = useState(["WiFi"]);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current user:", auth.currentUser);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      setError("You must be logged in to add a hostel.");
      return;
    }
    try {
      await addDoc(collection(db, "hostels"), {
        name,
        city,
        price: Number(price),
        amenities,
        image,
        description,
        availableDates,
      });
      console.log("Hostel added successfully!");
      alert("Hostel added successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error adding hostel:", err);
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md bg-white rounded-xl shadow-2xl mt-10">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">Add Your Hostel</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Hostel Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">City</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Price (₹/month)</label>
          <input
            type="number"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Amenities (comma-separated)</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={amenities.join(",")}
            onChange={(e) => setAmenities(e.target.value.split(",").map((item) => item.trim()) || ["WiFi"])}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Available Dates (comma-separated, YYYY-MM-DD)</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={availableDates.join(",")}
            onChange={(e) => setAvailableDates(e.target.value.split(",").map((date) => date.trim()) || ["2025-05-01"])}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300"
        >
          Add Hostel
        </button>
      </form>
    </div>
  );
};

export default AddHostel;