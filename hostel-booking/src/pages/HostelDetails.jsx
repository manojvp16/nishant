import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const HostelDetails = () => {
  const { id } = useParams();
  const [hostel, setHostel] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHostel = async () => {
      const hostelDoc = doc(db, "hostels", id);
      const hostelData = await getDoc(hostelDoc);
      if (hostelData.exists()) {
        setHostel({ id: hostelData.id, ...hostelData.data() });
      }
    };
    fetchHostel();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      navigate("/login");
      return;
    }
    const totalPrice = hostel.price * ((endDate - startDate) / (1000 * 60 * 60 * 24));
    await addDoc(collection(db, "bookings"), {
      userId: auth.currentUser.uid,
      hostelId: id,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      totalPrice,
    });
    alert("Booking successful!");
    navigate("/dashboard");
  };

  if (!hostel) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <img src={hostel.image} alt={hostel.name} className="w-full h-64 object-cover rounded" />
        <h2 className="text-3xl font-bold text-indigo-600 mt-4">{hostel.name}</h2>
        <p className="text-gray-600">{hostel.city}</p>
        <p className="text-indigo-600 font-bold">₹{hostel.price}/month</p>
        <p className="text-gray-700 mt-2">{hostel.description}</p>
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Amenities</h3>
          <ul className="list-disc pl-5">
            {hostel.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Check Availability</h3>
          <Calendar
            selectRange
            onChange={([start, end]) => {
              setStartDate(start);
              setEndDate(end);
            }}
            tileDisabled={({ date }) =>
              hostel.availableDates &&
              !hostel.availableDates.includes(date.toISOString().split("T")[0])
            }
          />
        </div>
        <form onSubmit={handleBooking} className="mt-4">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default HostelDetails;