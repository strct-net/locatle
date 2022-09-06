import os.path
import json
import sys

with open(sys.argv[1], "r") as f:
    images = json.load(f)

new_images = {}
for image_id, image_data in images.items():
    if os.path.exists("queue/" + image_id + ".jpeg"):
        new_images[image_id] = image_data

with open("cleaned_image_dict.json", "w") as clean_f:
    json.dump(new_images, clean_f)
