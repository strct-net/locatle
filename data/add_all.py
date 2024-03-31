#!/usr/bin/python3

import os
import json
import shutil
from clean_image_dict import clean
from add_country import add_country
from dict_to_list import dict_to_list
from analyse import analyse

input("Run generate.py and remove any unwanted images from the 'queues' folder. Make sure the file 'new_images.json' exists.\nPress any key to continue.")

with open("new_images.json", "r") as f:
    image_dict = json.load(f)

image_dict = clean(image_dict)
image_list = dict_to_list(image_dict)
image_list = add_country(image_list)
if image_list == None:
    exit(-1)

while True:
    analyse(image_list)
    answer_decrease = input("Do you want to decrease the number of images from one country? [Y/n]> ")
    if answer_decrease != "Y":
        break

    country_code = input("Country code> ")
    chance_remove = input("What percentage of images from this country should be removed? (0-100)> ")
    image_list = remove_country(image_list, country_code, 0, int(chance_remove)) 

with open("image_list.json", "r") as f:
    original_image_list = json.load(f)

with open("image_list.json", "w") as f:
    json.dump(original_image_list + image_list, f)

queued_files = os.listdir("queue/")
for queued_file in queued_files:
    try:
        shutil.move("queue/" + queued_file, "images/")
    except:
        pass

os.remove("new_images.json")
