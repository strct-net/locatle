import json
import random
import os

path = os.path.abspath(os.path.dirname(__file__))

images = []
with open(path + "/image_dict.json", "r") as dict_f:
    for key, value in json.load(dict_f).items():
        images.append({
            "id": key,
            "coordinates": value["coordinates"]
        })

random.shuffle(images)

with open(path + "/image_list.json", "w") as list_f:
    json.dump(images, list_f, indent=4)
