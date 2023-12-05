import React, { useState } from 'react';
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function CiptaAcara() {
  const {currentUser} = useSelector(state => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
  });
  const [imageUploadError, setImageUploadError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length <7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({ 
          ...formData, 
          imageUrls: formData.imageUrls.concat(urls)
        });
        setImageUploadError(false);
        setUploading(false);
      }).catch((err) => {
        setImageUploadError('Gagal memuat naik gambar!(Maksimum 2 mb bagi setiap gambar)');
        setUploading(false);
      });
    }else{
      setImageUploadError('Anda hanya boleh muatnaik maksimum 6 gambar!');
      setUploading(false);

    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`)
        },
        (error) => {
          reject(error);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !==
      index),
    })
  };

  const handleChange = (e) => {
    if(e.target.type === 'text' || e.target.type === 'textarea'){
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      })
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if(formData.imageUrls.length < 1) return setError('Anda perlu muatnaik sekurang-kurangnya 1 gambar');
      setLoading(true);
      setError(false);
      const res = await fetch('api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });

      const data = await res.json();
      setLoading(false);
      if(data.success === false){
        setError(data.message);
      }
      navigate(`/acara/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <div className='text-[#0086A4] text-5xl text-center font-semibold my-7' >
        Cipta Acara
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row' >
        <div className='flex flex-col gap-4 flex-1 mb-20' >

          <h1 className='text-xl text-[#038CA2] font-semibold'>Tajuk</h1>
          <input type='text' placeholder='Tajuk' className='border p-3 rounded-3xl drop-shadow-md' id='title' maxLength='62' minLength='2' required
          onChange={handleChange} value={formData.title} />

          <div className='flex flex-col flex-1 gap-2'>
            <p className='text-xl text-[#038CA2] font-semibold'>Muatnaik Gambar</p>
            <div className='flex gap-4'>
              <input onChange={(e)=>setFiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='image/*' multiple ></input>
              <button type='button' disabled={uploading} onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>
                {uploading ? 'Memuatnaik...' : 'Muatnaik'}
              </button>
            </div>
            <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>
            {formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                <div key={url} className='flex justify-between p-1 border items-center'>
                  <img src={url} alt='kemaskini gambar' className='w-10 h-10 object-cover rounded-lg' />
                  <button type='button' onClick={() => handleRemoveImage(index)} className='p-3 text text-red-700 rounded-lg uppercase hover:opacity-75'>Hapus</button>
                </div>
              ))
            }
          </div>

          <p className='text-xl text-[#038CA2] font-semibold'>Penerangan</p>
          <textarea type='text' placeholder='Penerangan' className='border p-3
          rounded-lg' id='description' required onChange={handleChange} value={formData.description} />

          <p className='text-xl text-[#038CA2] font-semibold'>Tarikh</p>
          <input type='text' placeholder='Tarikh' className='border p-3 rounded-3xl drop-shadow-md' id='date' required onChange={handleChange} value={formData.date}/>

          <p className='text-xl text-[#038CA2] font-semibold'>Masa</p>
          <input type='text' placeholder='Masa' className='border p-3 rounded-3xl drop-shadow-md' id='time' required onChange={handleChange} value={formData.time}/>

          <p className='text-xl text-[#038CA2] font-semibold'>Lokasi</p>
          <input type='text' placeholder='Lokasi' className='border p-3 rounded-3xl drop-shadow-md' id='location' required onChange={handleChange} value={formData.location}/>


          <button disabled={loading || uploading} className='bg-[#44BBB2] text-white p-3 drop-shadow-md rounded-3xl uppercase hover:opacity-75 
        disabled:-80 my-5'>
            {loading ? 'Mencipta...' : 'Cipta acara'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
  )
}
