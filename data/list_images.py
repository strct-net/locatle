import json

with open("image_list.json", "r") as f:
    images = json.load(f)

for i, image in enumerate(images):
    print(str(i) + ": " + str(image["id"]))
