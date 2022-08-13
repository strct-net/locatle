import json
import random
import sys

country = sys.argv[1]
after_id = int(sys.argv[2])

with open("image_dict.json", "r") as dict_r:
    image_dict = json.load(dict_r)

with open("image_list.json", "r") as list_r:
    image_list = json.load(list_r)

new_image_dict = {}
new_image_list = []
for i, item in enumerate(image_list):
    if item["country"] != country or i <= after_id or random.randint(1, 20) == 1:
        new_image_list.append(image_list[i])
        new_image_dict[item["id"]] = image_dict[item["id"]]

print(len(image_list), len(new_image_list))

with open("image_dict.json", "w") as dict_w:
    json.dump(new_image_dict, dict_w)

with open("image_list.json", "w") as list_w:
    json.dump(new_image_list, list_w)

