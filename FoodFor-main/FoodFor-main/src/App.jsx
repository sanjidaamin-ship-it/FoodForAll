import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Home, HandHelping, Leaf, Target, MapPin, User, Sun, Moon } from "lucide-react";

// Mock Data for Ongoing Donations
const ongoingDonations = [
  { id: 1, donor: "Raghib", item: "10 Canned Foods", location: "Hare St. Wari" },
  { id: 2, donor: "Nafisa", item: "Fresh Vegetables", location: "Dhanmondi 19" },
  { id: 3, donor: "Protysha", item: "5 Bread Loaves", location: "Gulshan 2" },
  { id: 4, donor: "Piku", item: "Tomatoes", location: "Khilgaon" },
  { id: 5, donor: "Anika", item: "Packaged Snacks", location: "Banani" },
];

// Dhaka Area Options
const dhakaAreas = [
  "All Areas",
  "Hare St. Wari",
  "Dhanmondi 19",
  "Gulshan 2",
  "Khilgaon",
  "Banani",
  "Uttara",
  "Mohammadpur",
  "Mirpur",
  "Tejgaon",
  "Bashundhara",
  "Baridhara",
  "Shahbagh",
  "Farmgate",
  "Motijheel",
  "Malibagh",
  "Paltan",
  "Rampura",
  "Badda",
  "Shantinagar",
  "Kalabagan",
  "Jatrabari",
];


// Home Page
const HomePage = ({ toggleTheme, currentTheme }) => (
  <div
    className={`w-screen min-h-screen flex items-center justify-center ${currentTheme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}
  >
    <Helmet>
      <title>Home - Food For All</title>
    </Helmet>
    <div className="text-center space-y-6 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold transform hover:scale-105 transition duration-300">
        Welcome to Food For All
      </h1>
      <p className="text-lg sm:text-xl mx-auto max-w-2xl text-gray-700 hover:text-gray-400 transition duration-300">
        A community-driven platform to reduce food waste and eliminate hunger. Join us to make a difference!
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/donate"
          className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-full text-lg shadow-md transition"
        >
          Donate Food
        </Link>
        <Link
          to="/volunteer"
          className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-full text-lg shadow-md transition"
        >
          Become A Volunteer
        </Link>
      </div>
    </div>
    {/* Dark/Light Mode Toggle */}
    <div
      onClick={toggleTheme}
      className="absolute bottom-8 right-8 p-3 bg-gray-200 rounded-full cursor-pointer shadow-lg hover:scale-105 transform transition duration-300"
    >
      {currentTheme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
    </div>
  </div>
);

// About Us Page
const AboutUsPage = () => (
  <div className="w-screen min-h-screen bg-gray-100 p-8">
    <Helmet>
      <title>About Us</title>
    </Helmet>
    <div className="max-w-4xl mx-auto text-center space-y-8">
      <h2 className="text-3xl font-extrabold text-black">About Us</h2>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto">
        Food For All is a community-driven platform committed to reducing food waste and fighting hunger. We bring
        together individuals, businesses, and non-profits to make sure surplus food reaches those in need. Join us in
        creating a sustainable future.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AboutCard
          icon={<Leaf size={48} className="text-gray-600" />}
          title="Sustainability"
          description="Promoting food sustainability and environmental responsibility."
        />
        <AboutCard
          icon={<HandHelping size={48} className="text-gray-600" />}
          title="Community"
          description="Building strong communities through shared resources."
        />
        <AboutCard
          icon={<Target size={48} className="text-gray-600" />}
          title="Zero Hunger"
          description="Fighting to end hunger in every community we serve."
        />
      </div>
    </div>
  </div>
);

const AboutCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4 hover:scale-105 transform transition-transform duration-300">
    <div>{icon}</div>
    <h3 className="text-xl font-semibold text-black">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// Donate Food Page
const DonateFoodPage = () => {
  const [donorName, setDonorName] = useState("");
  const [foodType, setFoodType] = useState("");
  const [donationType, setDonationType] = useState("Fresh Produce");
  const [expiryDate, setExpiryDate] = useState("");
  const [foodImage, setFoodImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("donate_food", true);
      formData.append("donor_name", donorName);
      formData.append("food_type", foodType);
      formData.append("donation_type", donationType);
      formData.append("expiry_date", expiryDate);
      formData.append("food_image", e.target.food_image.files[0]);

      const response = await fetch("http://localhost/food_for_all/backend.php", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.status === "success") {
        setSubmitted(true);
        alert(data.message);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An unexpected error occurred during submission.");
    }
  };

  const handleImageChange = (e) => {
    setFoodImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="w-screen min-h-screen bg-gray-50 p-6 md:p-12">
      <Helmet>
        <title>Donate Food</title>
      </Helmet>
      {submitted ? (
        <div className="text-center bg-white p-8 rounded-lg shadow-md mx-auto max-w-lg">
          <h2 className="text-3xl font-bold text-gray-600">Thank You!</h2>
          <p className="text-gray-700 mt-4">Your donation has been submitted successfully!</p>
          <Link
            to="/"
            className="mt-6 inline-block bg-gray-200 hover:bg-gray-300 text-black px-6 py-3 rounded-lg"
          >
            Back to Home
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg mx-auto max-w-lg"
        >
          <h2 className="text-3xl font-bold mb-6 text-black">Donate Food</h2>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Donor Name</label>
            <input
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full p-3 border rounded focus:ring-gray-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Donation Type</label>
            <select
              value={donationType}
              onChange={(e) => setDonationType(e.target.value)}
              className="w-full p-3 border rounded focus:ring-gray-500"
            >
              <option value="Fresh Produce">Fresh Produce</option>
              <option value="Cooked Meals">Cooked Meals</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Food Type</label>
            <input
              type="text"
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
              className="w-full p-3 border rounded focus:ring-gray-500"
              placeholder="e.g., Bread, Vegetables"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Expiry Date</label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full p-3 border rounded focus:ring-gray-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Food Image</label>
            <input
              type="file"
              name="food_image"
              onChange={handleImageChange}
              className="w-full p-3 border rounded focus:ring-gray-500"
            />
            {foodImage && (
              <div className="mt-4">
                <img
                  src={foodImage}
                  alt="Food"
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gray-200 hover:bg-gray-300 text-black py-3 rounded-lg"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

// Ongoing Donations Page
const OngoingDonationsPage = () => {
  const [selectedArea, setSelectedArea] = useState("All Areas");

  // Filter Donations Based on Selected Area
  const filteredDonations =
    selectedArea === "All Areas"
      ? ongoingDonations
      : ongoingDonations.filter((donation) => donation.location === selectedArea);

  return (
    <div className="w-screen min-h-screen bg-gray-100 p-8">
      <Helmet>
        <title>Ongoing Donations</title>
      </Helmet>
      <h2 className="text-4xl font-bold text-center text-black mb-6">Ongoing Donations</h2>

      {/* Filter Dropdown */}
      <div className="flex justify-center mb-8">
        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          className="w-1/2 max-w-md p-3 border rounded focus:ring-gray-500 text-black"
        >
          {dhakaAreas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      {/* Display Filtered Donations */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDonations.length > 0 ? (
          filteredDonations.map((donation) => (
            <div
              key={donation.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center mb-2">
                <h3 className="text-lg font-bold text-black">{donation.donor}</h3>
                <span className="ml-2 flex items-center">
                  <span className="inline-block w-2.5 h-2.5 bg-red-500 rounded-full animate-blink mr-1"></span>
                  <span className="text-red-500 text-sm font-bold">Live</span>
                </span>
              </div>
              <p className="text-gray-600">Item: {donation.item}</p>
              <p className="text-gray-600">Location: {donation.location}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No donations found for the selected area.
          </p>
        )}
      </div>
    </div>
  );
};
// User Registration Page
const UserRegistrationPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formPayload = new URLSearchParams();
      formPayload.append("register_user", true);
      formPayload.append("username", username);
      formPayload.append("email", email);
      formPayload.append("password", password);

      const response = await fetch("http://localhost/food_for_all/backend.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formPayload.toString(),
      });

      const data = await response.json();
      if (data.status === "success") {
        alert(data.message);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("User registration failed.");
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gray-100 p-8">
      <Helmet>
        <title>Register - Food For All</title>
      </Helmet>
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-black text-center mb-6">User Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded focus:ring-gray-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded focus:ring-gray-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded focus:ring-gray-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-200 hover:bg-gray-300 text-black py-3 rounded-lg"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

// Volunteer Registration Page
const VolunteerRegistrationPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    availability: "",
    experience: "",
    interests: [],
    transportation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInterestChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      interests: checked
        ? [...prev.interests, value]
        : prev.interests.filter((interest) => interest !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formPayload = new URLSearchParams();
      formPayload.append("register_volunteer", true);
      formPayload.append("full_name", formData.fullName);
      formPayload.append("email", formData.email);
      formPayload.append("phone", formData.phone);
      formPayload.append("address", formData.address);
      formPayload.append("availability", formData.availability);
      formPayload.append("transportation", formData.transportation);
      formPayload.append("experience", formData.experience);
      formPayload.append("interests", formData.interests.join(","));

      const response = await fetch("http://localhost/food_for_all/backend.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formPayload.toString(),
      });

      const data = await response.json();
      if (data.status === "success") {
        alert(data.message);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Volunteer registration failed.");
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gray-100 p-8">
      <Helmet>
        <title>Become a Volunteer - Food For All</title>
      </Helmet>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-black text-center mb-6">Become a Volunteer</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:ring-gray-500"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:ring-gray-500"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:ring-gray-500"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:ring-gray-500"
              rows="2"
              required
            />
          </div>
          {/* Additional fields */}
          <button
            type="submit"
            className="w-full bg-gray-200 hover:bg-gray-300 text-black py-3 rounded-lg transition duration-300"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

// Navigation 
const Navigation = ({ toggleTheme, currentTheme }) => (
  <header className={`${currentTheme === "dark" ? "bg-gray-900" : "bg-black"} text-white p-4 shadow-lg`}>
    <nav className="container mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Home size={24} />
        <h1 className="text-xl font-semibold">Food For All</h1>
      </div>
      <ul className="flex space-x-6">
        <li>
          <Link to="/" className="hover:text-gray-400">Home</Link>
        </li>
        <li>
          <Link to="/donate" className="hover:text-gray-400">Donate</Link>
        </li>
        <li>
        <Link to="/ongoing" className="hover:text-gray-400">Ongoing Donations</Link>
        </li>
        <li>
          <Link to="/volunteer" className="hover:text-gray-400">Volunteer</Link>
        </li>
        <li>
          <Link to="/register" className="hover:text-gray-400">Register</Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-gray-400">About Us</Link>
        </li>
      </ul>
    </nav>
  </header>
);

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <BrowserRouter>
      <div className={`app ${theme}`}>
        <Navigation toggleTheme={toggleTheme} currentTheme={theme} />
        <Routes>
          <Route path="/" element={<HomePage toggleTheme={toggleTheme} currentTheme={theme} />} />
          <Route path="/donate" element={<DonateFoodPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/ongoing" element={<OngoingDonationsPage />} />
          <Route path="/register" element={<UserRegistrationPage />} />
          <Route path="/volunteer" element={<VolunteerRegistrationPage />} />  
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;