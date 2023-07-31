import json
import random
import os
import sys

path = os.path.abspath(os.path.dirname(__file__))

def dict_to_list(image_dict):
    images = []
    for key, value in image_dict.items():
        images.append({
            "id": key,
            # Mapillary has a different order
            "coordinates": [value["coordinates"][1], value["coordinates"][0]]
        })

    random.shuffle(images)

    return images

def main():
    with open(path + "/" + sys.argv[1], "r") as dict_f:
        image_dict = json.load(dict_f)

    images = dict_to_list(image_dict)

    with open(path + "/new_image_list.json", "w") as list_f:
        json.dump(images, list_f, indent=4)

if __name__ == "__main__":
    main()
