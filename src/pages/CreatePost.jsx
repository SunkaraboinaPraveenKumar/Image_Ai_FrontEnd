import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';
import { db, storage } from '../../firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('https://image-ai-backend-o8dk.onrender.com/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const imageBlob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result.split(',')[1];
          setForm({ ...form, photo: base64String });
        };
        reader.readAsDataURL(imageBlob);
      } catch (err) {
        alert('An error occurred during image generation.');
        console.error(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide a proper prompt.');
    }
  };
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   if (form.prompt && form.photo) {
  //     // console.log('Photo data:', form.photo);
  //     setLoading(true);
  //     try {
  //       const response = await fetch('https://image-ai-backend-o8dk.onrender.com/api/v1/post', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ ...form }),
  //       });
  
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  
  //       await response.json();
  //       alert('Success');
  //       navigate('/');
  //     } catch (err) {
  //       alert(err);
  //       console.error('Error submitting form:', err); // Log the error
  //     } finally {
  //       setLoading(false);
  //     }
  //   } else {
  //     alert('Please generate an image with proper details');
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        // Create a reference to Firebase Storage
        const storageRef = ref(storage, `images/${Date.now()}_${form.name}.jpg`);
  
        // Upload the base64 image to Firebase Storage
        await uploadString(storageRef, form.photo, 'base64', {
          contentType: 'image/jpeg',
        });
  
        // Get the download URL for the image
        const downloadURL = await getDownloadURL(storageRef);
  
        // Save the form data along with the image download URL to Firestore
        await addDoc(collection(db, 'posts'), {
          name: form.name,
          prompt: form.prompt,
          photoUrl: downloadURL, // Save the image URL, not the base64 string
          createdAt: new Date(),
        });
  
        alert('Post successfully created!');
        navigate('/');  // Navigate to home after successful submission
      } catch (err) {
        alert('Error uploading image or saving post:', err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Generate an imaginative image through AI and share it with the community</p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., john doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={`data:image/jpeg;base64,${form.photo}`}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">** Once you have created the image you want, you can share it with others in the community **</p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
