"use client"
import { useGetAllRoomQuery } from '@/redux/features/rooms/rooms';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaCheck } from "react-icons/fa6";
const RoomCard = () => {
  
  const [rooms, setRooms] = useState([]);
  const {
    data,
    isLoading,
    isError,
    error
  } = useGetAllRoomQuery();

  useEffect(() => {
    if (isError) {
      // Handle error, you can log it or display an error message.
      console.error("Error fetching room data:", error);
    } else if (!isLoading) {
      // Only set the cart if there is data and it's not already set to avoid infinite re-renders.
      if (data) {
        setRooms(data.data);
      }
    }
  }, [data, isLoading, isError, error]);



  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 mb-20">

    {rooms.map((room) => (
      <div key={room._id} className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
        <Image
          src={`http://localhost:5000/${room.picture}`}
          alt={`${room.name} image`}
          width={300}
          height={200}
          className="w-full h-auto object-cover" // Ensure images maintain aspect ratio
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold">{room.name}</h3>
          <ul className="mt-2">
            {room.facilities.map((facility, i) => (
              <li key={i} className="flex items-center space-x-2">
                <span className="text-green-500"><FaCheck /></span>
                <span>{facility}</span>
              </li>
            ))}
          </ul>
          {/* Center the button using flexbox */}
          <h2 className='font-bold ms-4 mt-4'>Rent: BDT {room.rent}</h2>
          <div className="flex justify-center mt-4">
            <button className='btn'><Link  href={`/rooms/${room._id}`} >View Details</Link></button>
          </div>
        </div>
      </div>
    ))}
  </div>
  

  );
};

export default RoomCard;
