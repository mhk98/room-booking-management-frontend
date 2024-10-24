"use client";
import Navbar from '@/components/Navbar';
import { useCreateBookingMutation } from '@/redux/features/bookings/bookings';
import { useGetSingleRoomQuery } from '@/redux/features/rooms/rooms';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';

const RoomDetails = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [roomId, setRoomId] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      setUserId(id);
    }
  }, []);

  const [createBooking] = useCreateBookingMutation(); // Move this hook to the top-level of the component

  useEffect(() => {
    if (pathname) {
      // Extract the ID from the pathname
      const pathParts = pathname.split('/');
      const id = pathParts[pathParts.length - 1]; // Get the last part of the path
      setRoomId(id);
    }
  }, [pathname]);

  const [room, setRoom] = useState([]);
  const { data, isLoading, isError, error } = useGetSingleRoomQuery(roomId);

  useEffect(() => {
    if (isError) {
      console.error("Error fetching room data:", error);
    } else if (!isLoading && data) {
      setRoom(data.data);
    }
  }, [data, isLoading, isError, error]);



  const handleLoginAlert = () =>{
    const confirmed = window.confirm('Please login first. Do you want to login?')

    if(confirmed){
      router.push("/login")
    }
  }

  
  const handleBooking = async () => {
    // Validate if startDate and endDate are selected
    if (!startDate || !endDate) {
      alert('Please select both check-in and check-out dates.');
      return;
    }
  
    // Check if check-out date is after check-in date
    if (new Date(startDate) >= new Date(endDate)) {
      alert('Check-out date must be later than check-in date.');
      return;
    }
  
    setIsConfirmed(true); // Mark booking as confirmed (can also show a loading spinner)
    setSelectedRoom(null); // Close the booking modal (optional)
  
    // Prepare booking data
    const bookingData = {
      startDate,
      endDate,
      userId, // Fetching from localStorage or state
      roomId, // Room ID obtained from the URL or state
    };
  
    try {
      // Make a POST request to create the booking using the hook
      const res = await createBooking({ data: bookingData, userId, roomId });
      
      // Handle successful booking
      if (res?.data?.status === 'Success') {
        console.log('Booking created successfully:', res);
        alert('Booking created successfully!');
        
      } else {
        console.error('Error occurred while booking:', res?.error.data.message);
        alert(res?.error.data.message);
      }
    } catch (error) {
      // Handle any errors that occur during the POST request
      console.error('Error creating booking:', error);
    
    }
  };
  

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (!data?.data) return <div className="text-center">Room not found.</div>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="mb-12">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">{room.title}</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="col-span-2">
              <Image
                src={`https://room-booking-management-backend.onrender.com/${room.picture}`}
                alt="Room Image"
                className="rounded-lg shadow-lg"
                width={900}
                height={600}
                objectFit="cover"
              />
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-4">
              <Image
                src="/images/standard.jpg"
                alt="Pool"
                className="rounded-lg shadow-lg"
                width={300}
                height={200}
                objectFit="cover"
              />
              <Image
                src="/images/premimum.jpg"
                alt="Jacuzzi"
                className="rounded-lg shadow-lg"
                width={300}
                height={200}
                objectFit="cover"
              />
              <Image
                src="/images/partner.jpg"
                alt="Lobby"
                className="rounded-lg shadow-lg"
                width={300}
                height={200}
                objectFit="cover"
              />
              <Image
                src="/images/economy.jpg"
                alt="Room"
                className="rounded-lg shadow-lg"
                width={300}
                height={200}
                objectFit="cover"
              />
            </div>
          </div>

          <div className="mt-12 grid lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold">{room.title}</h2>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500 text-lg">★★★★★</span>
                <span className="ml-2 text-blue-600 text-sm">{room.location}</span>
              </div>
              <div className="mt-6">
                <p className="text-gray-500 text-sm line-through">BDT {room.rent + 200}</p>
                <p className="text-3xl font-semibold text-red-600">BDT {room.rent}</p>
                <p className="text-green-600 text-sm">Price starts from <span className="font-bold">20% OFF</span></p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold">Facilities</h2>
              <ul className="mt-2">
                {room?.facilities?.map((facility, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="text-green-500">
                      <FaCheck />
                    </span>
                    <span>{facility}</span>
                  </li>
                ))}
              </ul>
              
              {
                userId ? 
                <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4"
                onClick={() => {
                  
                  setSelectedRoom(room)
                }}
              >
                Book Now
              </button>  :
                  <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4"
                  onClick={() => {
                    handleLoginAlert();
                   
                  }}
                  >
                  Book Now
                  </button>
              }
            </div>
          </div>
        </div>

        {selectedRoom && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-2xl font-semibold mb-4">{selectedRoom.name}</h3>
              <Image
                src={`https://room-booking-management-backend.onrender.com/${room.picture}`}
                alt={`${selectedRoom.name} image`}
                width={400}
                height={250}
                className="w-full h-auto object-cover mb-4"
              />
              <p className="text-lg font-medium mb-2">Rent: {selectedRoom.rent}</p>
              <p className="mb-4">Facilities:</p>
              <ul className="list-disc ml-6">
                {selectedRoom?.facilities?.map((facility, i) => (
                  <li key={i}>{facility}</li>
                ))}
              </ul>

              <div className="mt-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">Check-in Date</label>
                <input
                  type="date"
                  className="border border-gray-300 p-2 w-full rounded"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />

                <label className="block mb-2 text-sm font-medium text-gray-700 mt-4">Check-out Date</label>
                <input
                  type="date"
                  className="border border-gray-300 p-2 w-full rounded"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg w-full" onClick={handleBooking}>
                  Confirm Booking
                </button>
              </div>
              <div className="mt-4 text-right">
                <button className="text-sm text-blue-500 underline" onClick={() => setSelectedRoom(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* {isConfirmed && (
          <div className="fixed inset-0 bg-green-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-semibold mb-4">Booking Confirmed!</h3>
              <p className="mb-4">Your booking for {selectedRoom?.title} is confirmed from {startDate} to {endDate}.</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg" onClick={() => setIsConfirmed(false)}>
                Close
              </button>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default RoomDetails;
