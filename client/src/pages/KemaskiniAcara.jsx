import React from 'react'

export default function KemaskiniAcara() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <div className='text-3xl font-semibold text-center my-7' >
        Kemaskini Acara
      </div>
      <form className='flex flex-col sm:flex-row' >
        <div className='flex flex-col gap-4 flex-1' >

          <h1 className='text-xl font-semibold text-center my-1'>Halaman Utama</h1>
          <input type='text' placeholder='Tajuk' className='border p-3
          rounded-lg' id='title' maxLength='62' minLength='2' required/>

          <input type='text' placeholder='Penerangan' className='border p-3
          rounded-lg' id='description' maxLength='300' minLength='2' required/>

          <input type='text' placeholder='Tarikh' className='border p-3
          rounded-lg' id='date' required/>

          <input type='text' placeholder='Masa' className='border p-3
          rounded-lg' id='time' required/>

          <input type='text' placeholder='Lokasi' className='border p-3
          rounded-lg' id='location' required/>
          <button className='p-3 bg-slate-700 text-white rounded-lg
          uppercase hover:opacity-95 disabled:opacity-80'>
            Kemaskini Acara
          </button>
        </div>
      </form>
    </main>
  )
}
