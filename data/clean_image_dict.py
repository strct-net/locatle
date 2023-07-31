import os.path
import json
import sys

def clean(image_dict):
    new_images = {}
    for image_id, image_data in image_dict.items():
        if os.path.exists("queue/" + image_id + ".jpeg"):
            new_images[image_id] = image_data

    return new_images

def main():
    with open(sys.argv[1], "r") as f:
        images = json.load(f)

    new_images = clean(images)

    with open("cleaned_image_dict.json", "w") as clean_f:
        json.dump(new_images, clean_f)

if __name__ == "__main":
    main()
