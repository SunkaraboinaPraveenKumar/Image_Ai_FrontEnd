import React from 'react'
import { download } from '../assets'

import {downloadImage} from '../utils'

const Card = ({ id, name, prompt, photoUrl }) => {
  return (
    <div className='rounded-xl group relative shadow-card hover:shadow-cardhover card'>
      <img
        className='w-full h-auto object-cover rounded-xl'
        src={photo}  // Use the Firebase Storage download URL for the photo
        alt={prompt}
        onError={() => console.log('Image failed to load')}
      />
      <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md'>
        <p className='text-white text-sm overflow-y-auto prompt'>{prompt}</p>
        <div className='mt-5 flex justify-between items-center gap-2'>
          <div className='flex items-center gap-2'>
            <div className='w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold'>
              {name[0]}
            </div>
            <p className='text-white text-md'>{name}</p>
          </div>
          <button
            type='button'
            onClick={() => downloadImage(id, photo)}  // Use the Firestore `id` and `photo` URL
            className='outline-none bg-transparent border-none'
          >
            <img src={photoUrl} alt="download" className='w-6 h-6 object-contain invert'/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
