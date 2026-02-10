import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

# --- SETTINGS ---
URL = "https://huggingface.co/datasets/AxonData/multilingual-call-center-speech-dataset" 
FOLDER_NAME = "hackathon_audios"

# Create folder if it doesn't exist
if not os.path.exists(FOLDER_NAME):
    os.makedirs(FOLDER_NAME)

print(f"Connecting to {URL}...")
response = requests.get(URL)
soup = BeautifulSoup(response.text, 'html.parser')

# Find all links on the page
links = soup.find_all('a')
audio_count = 0

for link in links:
    href = link.get('href')
    if href and (href.endswith('.mp3') or href.endswith('.wav')):
        audio_url = urljoin(URL, href) # Handle relative links
        file_name = os.path.join(FOLDER_NAME, href.split('/')[-1])
        
        print(f"Downloading: {href.split('/')[-1]}...")
        audio_data = requests.get(audio_url).content
        with open(file_name, 'wb') as handler:
            handler.write(audio_data)
        audio_count += 1

print(f"\nFinished! Downloaded {audio_count} files into the '{FOLDER_NAME}' folder.")