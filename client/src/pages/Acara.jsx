import React, { useEffect, useState } from 'react'
import { FaWhatsapp } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { BsCalendarDate } from "react-icons/bs";
import { LuAlarmClock } from "react-icons/lu";
import { MdLocationOn } from "react-icons/md";
import {useParams, Link} from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';

export default function Acara() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.id]: e.target.value,
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/rsvp/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...formData, listingRef: `${params.listingId}`}),
      });
      const data = await res.json();
      console.log(data);
      if(data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      };
      setLoading(false);
      setError(null);
      alert('RSVP anda berjaya didaftarkan!');
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log(error.message);

    }
  };


  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);       
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();

  }, [params.listingId]);

  return (
    <main className='z-0'>
      {loading && <p className='text-center text-white my-7 text-2xl'>Loading...</p>}
      {error && <p className='text-center text-white my-7 text-2xl'>Kesilapan Paparan Halaman!</p>}
      {listing && !loading && !error && 
      (
        <div>
          {/* <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                className='h-[550px]'
                style={{
                  background: `url(${url}) center no-repeat`, backgroundSize: 'cover'
                }}>
                  
                </div>
              </SwiperSlide>
            ))}
          </Swiper> */}
          <img src={listing.imageUrls} alt="" className='object-cover max-w-[896px] shadow-md'/>
          <div className='flex flex-col max-w-4xl mx-auto px-5 my-7 gap-4'>
            <p className='text-2xl text-white uppercase font-bold'>{listing.title}</p>
            <p className='text-white'>{listing.description}</p>
            <div className='flex gap-2'>
              <BsCalendarDate className='h-5 w-5 text-white' />
              <p className='text-white'>{listing.date}</p>
            </div>
            <div className='flex gap-2'>
              <LuAlarmClock className='h-5 w-5 text-white' />
              <p className='text-white'>{listing.time}</p>
            </div>
            <div className='flex gap-2'>
             <MdLocationOn className='h-5 w-5 text-white'/>
             <p className='text-white'>{listing.location}</p>
            </div>
            <Link to={listing.googleUrl}> {/* fetch rsvp */}
              <p className='text-white underline'>Buka lokasi di Google map</p>
            </Link>
            <div className='flex gap-2'>
              <Link to={`https://api.whatsapp.com/send?phone=6${listing.phone}`}> {/* fetch rsvp */}
               <FaWhatsapp className='h-5 w-5 text-white' />
              </Link>
              <Link to={`tel:${listing.phone}`}>
               <IoIosCall className='h-5 w-5 text-white' /> {/* fetch rsvp */}
              </Link>
              <p className='text-white'>{listing.personInCharge}</p> {/* fetch rsvp */}
            </div>
            <hr />
            <p className='text-xl text-white uppercase font-semibold text-center'>RSVP</p>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <input 
                type="text" 
                placeholder='nama'                
                className='border p-3 rounded-3xl drop-shadow-md' 
                onChange={handleChange}
                id='name' 
              />
              <input 
                type="email" 
                placeholder='email' 
                className='border p-3 rounded-3xl drop-shadow-md' 
                onChange={handleChange}
                id='email' 
              />
              <input 
                type="number" 
                placeholder='nombor telefon' 
                className='border p-3 rounded-3xl drop-shadow-md' 
                onChange={handleChange}
                id='phone' 
              />
              <button className='gradient_background text-white p-3 drop-shadow-md rounded-3xl hover:opacity-75 
              disabled:-80 my-5'>
                {loading ? 'Dalam proses...': 'HANTAR RSVP'}
              </button>
            </form>

          </div>
        </div>
      )}
    </main>
  )
}
