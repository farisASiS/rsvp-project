import React, { useState } from 'react';
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage';
import { app } from '../firebase';


export default function KemaskiniAcara() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(null);
  const [uploading, setUploading] = useState(false);
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

          <div className='flex flex-col flex-1 gap-2'>
            <p className='font-semibold'>Muatnaik Gambar</p>
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
