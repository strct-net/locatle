import json
import sys

image_id = sys.argv[1]

with open("image_list.json", "r") as list_r:
    image_list = json.load(list_r)

new_image_list = list(filter(lambda x: x["id"] != image_id, image_list))
print(len(image_list), len(new_image_list))

with open("image_list.json", "w") as list_w:
    json.dump(new_image_list, list_w)

