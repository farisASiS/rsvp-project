import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Rsvp() {
  const [listingRsvps, setListingRsvps] = useState([]);
  const [ error , setError ] = useState(false);
  const params = useParams();

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
  }, [params.listingId]);



  return (
    <main className='flex flex-col p-3 max-w-4xl mx-auto'>
      <div className='text-[#0086A4] text-5xl text-center font-semibold my-7' >
        RSVP
      </div>
      <p className='text-xl text-[#038CA2] font-semibold text-center'>Acara </p>
      {listingRsvps && 
        
          <table className='border-collapse border border-[#0086A4]' >
            <thead>
              <tr>
                <th className='border border-[#0086A4] p-1'>No</th>
                <th className='border border-[#0086A4] p-1'>Nama</th>
                <th className='border border-[#0086A4] p-1'>Email</th>
                <th className='border border-[#0086A4] p-1'>Telefon</th>
              </tr>
            </thead>
            <tbody>
              {listingRsvps.map((rsvps, index) => (
                <tr>
                  <td className='border border-[#0086A4] p-1' key='index'>{index+1}</td>
                  <td className='border border-[#0086A4] p-1' key='name'>{rsvps.name}</td>
                  <td className='border border-[#0086A4] p-1' key='email'>{rsvps.email}</td>
                  <td className='border border-[#0086A4] p-1' key='phone'>+60{rsvps.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
         }


    </main>
  )

}
