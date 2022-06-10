import json
import sys

image_id = sys.argv[1]

with open("image_dict.json", "r") as dict_r:
    image_dict = json.load(dict_r)

with open("image_list.json", "r") as list_r:
    image_list = json.load(list_r)

image_dict.pop(image_id)
new_image_list = list(filter(lambda x: x["id"] != image_id, image_list))
print(len(image_list), len(new_image_list))

with open("image_dict.json", "w") as dict_w:
    json.dump(image_dict, dict_w)

with open("image_list.json", "w") as list_w:
    json.dump(new_image_list, list_w)

