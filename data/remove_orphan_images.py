import json
from pathlib import Path
import os

with open("image_list.json", "r") as dict_r:
    images = json.load(dict_r)

image_dict = {}
for image in images:
    image_dict[image["id"]] = image

for file in os.listdir("images"):
    file_name = Path(file).stem
    if file_name not in image_dict:
        print("Deleting ", file_name)
        os.remove("images/" + file)
