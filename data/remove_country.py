import json
import random
import sys

def remove_country(image_list, country, after_id, chance_remove):
    new_image_list = []
    for i, item in enumerate(image_list):
        if item["country"] != country or i <= after_id or random.randint(1, 100) > chance_remove:
            new_image_list.append(image_list[i])

    print("Removed", len(image_list) - len(new_image_list), "images.")

    return new_image_list

def main():
    country = sys.argv[1]
    after_id = int(sys.argv[2])
    chance_remove = int(sys.argv[3])

    with open("image_list.json", "r") as list_r:
        image_list = json.load(list_r)

    new_image_list = remove_country(image_list, country, after_id, chance_remove)

    with open("image_list.json", "w") as list_w:
        json.dump(new_image_list, list_w)

if __name__ == "__main__":
    main()
