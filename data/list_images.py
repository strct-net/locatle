import json

with open("image_list.json", "r") as f:
    images = json.load(f)

for image in images:
    print(image["id"])
