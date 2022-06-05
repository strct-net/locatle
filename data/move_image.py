import json
import sys

image_id = sys.argv[1]
index = int(sys.argv[2])

with open("image_list.json", "r") as list_r:
    images = json.load(list_r)

current_index = None
for i, image in enumerate(images):
    if image["id"] == image_id:
        current_index = i
        break

if current_index == None:
    print("Unable to find image.")
    quit()

image = images.pop(current_index)
images.insert(index, image)

with open("image_list.json", "w") as list_w:
    json.dump(images, list_w)
