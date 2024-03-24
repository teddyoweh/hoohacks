import requests
import os 
import json
import openai
import requests
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration
import librosa
import numpy as np
from elevenlabs import play,Voice,save
from elevenlabs.client import ElevenLabs
import cloudinary.uploader
import requests
from tempfile import NamedTemporaryFile
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-large")
openai.api_key = os.getenv("OPENAI_API_KEY")

cloudinary.config(
    cloud_name = os.getenv("cloudinary_cloud_name"),
    api_secret=os.getenv("cloudinary_api_secret"),
    api_key=os.getenv("cloudinary_api_key")
)

 
elevenlabs_client = ElevenLabs(
  api_key=os.getenv("elevenlabs_api_key"),  
)

def run_inference(image_path,is_url=False):
    if is_url:
        image = Image.open(requests.get(image_path, stream=True).raw)
    else:
        image = Image.open(image_path)
    inputs = processor(image, return_tensors="pt")
    caption = model.generate(**inputs)
    return processor.decode(caption[0], skip_special_tokens=True)

def generate_audio(text):
    print('Generating audio for:', text)
    try:
        audio = elevenlabs_client.generate(
            text=text,
            voice=Voice(
                voice_id='TWUKKXAylkYxxlPe4gx0',
            )
        )

        with NamedTemporaryFile(suffix='.mp3', delete=False) as temp_audio_file:
            save(audio, temp_audio_file.name)
            temp_audio = temp_audio_file.name

        response = cloudinary.uploader.upload(temp_audio,
                                               resource_type="video",
                                               upload_preset="e4rpkaay")
        print('Audio uploaded to Cloudinary:', response['secure_url'])
        return response['secure_url']
    except Exception as e:
        print('Failed to generate and upload audio to Cloudinary:', e)
def classifier (kini):

    prompt = """Based on the given inference/caption from the picture decide whether or not the item in the image is recyclable or compostable, it has to be either recyclable or compostable- make it in json format
    Beyond identifying recyclable and compostable items, this app educates users on the environmental impact of different materials. It could provide information on how each item is processed and its potential effects on the environment
    also give it a point on 1 to 10 the impact of the item on the environment. also give the amount of CO2(int), Energy(int), Water(int), Trees(int) saved by recycling the item on a scale of 1 to 10 strictly as a number based of impact,
    add a short description (7 words) of the item, it should be very short, very very precisely and exactly speficiallly state what the item is and concise, say it confidently.
    make the impact text bit a bit long like 50 -60 words minimum, first start of by stating what the item is first, then state if is recyclable or compostable,  sound very normal like a normal conversation use umms ans uhhhs and stuff like that, and be straight to the point, sound very confident and charismatic, ensure to start off by mention the item or items type/name, very IMPORTANT, say what the item or items is and whether it is compostable or recyclable!!!!. then go a very very impressive short impact statement, ensure to crack some good jokes/be be humorous in between.
    rewards should be an of max 1-3 rewards that the user gets for recycling the item should be very very unique and thoughtful, it should be a list of strings, if there are no rewards then leave it empty, eg: cookie saver, tree saver- essential just really cool reward name ideas
    
    the json format should be like this ---->
    
    # {"type": "compostable/recyclable","why": "","impact":'',point:"",'CO2 Saved':,
    'description':"",
    'Energy Saved': '',
    'Water Saved': '',
    'Trees Saved': '',
    'rewards':['']}
}       
    ,"""+kini    

    openai_key = os.getenv('openai_key')
    openai.api_key= openai_key
    response = openai.ChatCompletion.create(
    model="gpt-4-0125-preview",
    response_format={ "type": "json_object" },
    messages=[
        {"role": "system", "content": "You are a recycling human expert trying to help people recycle and more aware better."},
        {"role": "user", "content": f"this is the inference/caption {prompt}"},])
    ans = eval(response.choices[0].message['content'])
    print(ans)
    audio= generate_audio(ans['impact'])
    return {
        "type":ans['type'],
        "why":ans['why'],
        "impact":ans['impact'],
        "point":ans['point'],
        "CO2 Saved":ans['CO2 Saved'],
        "Energy Saved":ans['Energy Saved'],
        "Water Saved":ans['Water Saved'],
        "Trees Saved":ans['Trees Saved'],
        "description":ans['description'],
        'rewards':ans['rewards'],
        "audio":audio
    }