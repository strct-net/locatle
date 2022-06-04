from audioop import reverse
import json
import reverse_geocoder
import os

path = os.path.abspath(os.path.dirname(__file__))

with open(path + "/image_list.json", "r") as f:
    images = json.load(f)

for image in images:
    image["country"] = reverse_geocoder.search(
        image["coordinates"], mode=1)[0]["cc"]

with open(path + "/image_list.json", "w") as f:
    json.dump(images, f)
