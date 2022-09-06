import json
import random
import os
import sys

path = os.path.abspath(os.path.dirname(__file__))

images = []
with open(path + "/" + sys.argv[1], "r") as dict_f:
    for key, value in json.load(dict_f).items():
        images.append({
            "id": key,
            # Mapillary has a different order
            "coordinates": [value["coordinates"][1], value["coordinates"][0]]
        })

random.shuffle(images)

with open(path + "/new_image_list.json", "w") as list_f:
    json.dump(images, list_f, indent=4)
