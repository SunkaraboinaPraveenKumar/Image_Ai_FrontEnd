import {surpriseMePrompts} from '../constants'
export function getRandomPrompt(prompt){
    const randomIndex=Math.floor(Math.random()*surpriseMePrompts.length);
    const randomPrompt=surpriseMePrompts[randomIndex];
    if(randomPrompt===prompt) return getRandomPrompt(prompt);
    return randomPrompt;
}

export const downloadImage = (id, photoUrl) => {
    const link = document.createElement('a');
    link.href = photoUrl;  // Use the Firebase Storage URL to download the image
    link.download = `${id}.jpg`;  // Set the download filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  