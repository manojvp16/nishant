import { Link } from "react-router-dom";

const HostelCard = ({ hostel }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105">
      <img src={hostel.image} alt={hostel.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-indigo-800">{hostel.name}</h3>
        <p className="text-gray-600">{hostel.city}</p>
        <p className="text-indigo-600 font-bold">₹{hostel.price}/month</p>
        <p className="text-sm text-gray-500">{hostel.description.substring(0, 100)}...</p>
        <Link
          to={`/hostel/${hostel.id}`}
          className="mt-2 inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded hover:from-indigo-700 hover:to-purple-700 transition duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default HostelCard;