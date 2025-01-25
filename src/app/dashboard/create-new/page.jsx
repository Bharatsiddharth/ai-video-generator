"use client"
import React, { useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
const { v4: uuidv4 } = require('uuid');


const scriptData = "The old mansion stood on a hill, overlooking the town below, shrouded in mist. Locals whispered tales of a family that vanished within its walls, years ago... A young woman, ignoring the warnings, decided to explore the mansion's grounds... The rusted gates creaked open, inviting her into the overgrown garden, now silent and still... Inside, the air grew cold, and she could hear faint whispers, echoing from the empty rooms... A sudden gust of wind slammed doors shut, trapping her deeper into the maze of rooms. She stumbled upon a child's room, toys scattered across the floor, frozen in time... A shadowy figure began to coalesce in the corner, its eyes glowing with an unnatural light... The whispers grew louder, turning into terrifying screams, surrounding her... She tried to flee, but every turn led her deeper into the heart of the mansion... The mansion had claimed her, and she became part of its terrifying legacy. And so the mansion stood on the hill, silent and waiting...for the next unfortunate soul. "

const page = () => {
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [videoScript, setVideoScript] = useState()

    const onHandleInputChange = (fieldName, fieldValue)=>{
        console.log(fieldName, fieldValue)

        setFormData(prev => ({
            ...prev,
            [fieldName]:fieldValue
        }))


    }

    const onCreateClickHandler = () => {
        // GetVideoScript();
        GenerateAudio(scriptData);
    }

    const GetVideoScript = async () => {
        setLoading(true)
        const prompt = "Write a script to generate "+formData.duration+" video on topic: "+formData.topic+" along with AI image prompt in "+formData.imageStyle+" format for each scene and give me result in JSON format with imagePrompt and ContentText as field,No Plain text and also i don't want scene_number and duration and i only want array i don't want that array inside videoscript"
        console.log(prompt)
        const result = await axios.post("/api/get-video-script",{
            prompt:prompt
        }).then(resp=>{
            console.log(resp.data.result);
            setVideoScript(resp.data.result);
            GenerateAudio(resp.data.result);
        })
        setLoading(false);
    }


    const GenerateAudio = async (videoScriptData) => {
        setLoading(true)
        let script = "";
        const id = uuidv4(); 
        // videoScriptData.forEach(item => {
        //     script += item.contentText + " "; // Use 'contentText' instead of 'ContentText'
        // });

        console.log(script)
        
        await axios.post("/api/generate-audio", {
            text:videoScriptData,
            id:id
        }).then(resp=> {
            console.log(resp.data)
        })
        setLoading(false);
    };


  return (
    <div className='md:px-20'>
        <h2 className='font-bold text-4xl text-primary text-center'>
            Create New
        </h2>


        <div className='mt-10 shadow-md p-10'>
            {/* Select Topic */}
            <SelectTopic onUserSelect={onHandleInputChange} />

            {/* Select Style */}
            <SelectStyle onUserSelect={onHandleInputChange} />


            {/* Duration */}
            <SelectDuration onUserSelect={onHandleInputChange} />


            {/* Creation */}
            <Button className="mt-10 w-full" onClick={onCreateClickHandler} >Create Short Video</Button>

        </div>

        <CustomLoading loading={loading} />

    </div>
  )
}

export default page