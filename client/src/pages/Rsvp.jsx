import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Rsvp() {
  const [listingRsvps, setListingRsvps] = useState([]);
  const [ error , setError ] = useState(false);
  const params = useParams();
  const [titleListing, setTitleListing] = useState();

  useEffect(() => {

    const fetchRsvps = async () => {
      try {
        /* setShowListingsError(false); */
        const res = await fetch(`/api/listing/rsvps/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          return;
        }
  
        setListingRsvps(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchRsvps();

    const fetchListingTitle = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      console.log(data.title);
      if(data.success === false) {
        console.log(data.message);
        return;
      }
      setTitleListing(data.title);
    };

    fetchListingTitle();


  }, [params.listingId]);



  return (
    <main className='flex flex-col p-3 max-w-4xl mx-auto'>
      <div className='text-white text-5xl text-center font-semibold my-7' >
        RSVP
      </div>
      <p className='text-xl text-white font-semibold text-center mb-3'>{titleListing}</p>
      {listingRsvps && 
        
          <table className='border-collapse border border-white shadow-lg' >
            <thead>
              <tr>
                <th className='border border-white p-1 w-[40px] text-white'>No</th>
                <th className='border border-white p-1 text-white'>Nama</th>
                <th className='border border-white p-1 text-white'>Email</th>
                <th className='border border-white p-1 text-white'>Telefon</th>
              </tr>
            </thead>
            <tbody>
              {listingRsvps.map((rsvps, index) => (
                <tr>
                  <td className='border border-white p-1 text-white w-[40px] text-center' key='index'>{index+1}</td>
                  <td className='border border-white p-1 text-white' key='name'>{rsvps.name}</td>
                  <td className='border border-white p-1 text-white' key='email'>{rsvps.email}</td>
                  <td className='border border-white p-1 text-white' key='phone'>+60{rsvps.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
         }


    </main>
  )

}
