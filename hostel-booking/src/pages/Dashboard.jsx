import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
      return;
    }
    const fetchBookings = async () => {
      const q = query(
        collection(db, "bookings"),
        where("userId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const bookingList = querySnapshot.docs.map(async (doc) => {
        const booking = doc.data();
        const hostelDoc = await getDoc(doc(db, "hostels", booking.hostelId));
        return {
          id: doc.id,
          ...booking,
          hostelName: hostelDoc.exists() ? hostelDoc.data().name : "Unknown",
        };
      });
      setBookings(await Promise.all(bookingList));
    };
    fetchBookings();
  }, [navigate]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6">Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{booking.hostelName}</h3>
              <p>From: {new Date(booking.startDate).toLocaleDateString()}</p>
              <p>To: {new Date(booking.endDate).toLocaleDateString()}</p>
              <p>Total Price: ₹{booking.totalPrice}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;