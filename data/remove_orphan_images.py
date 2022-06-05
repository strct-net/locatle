import json
from pathlib import Path
import os

with open("image_dict.json", "r") as dict_r:
    images = json.load(dict_r)

for file in os.listdir("images"):
    file_name = Path(file).stem
    if file_name not in images:
        print("Deleting ", file_name)
        os.remove("images/" + file)
