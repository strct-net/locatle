#!/usr/bin/python3

import json
import sys
import random

start_from = int(sys.argv[1])

with open("image_list.json", "r") as f:
    images = json.load(f)
    leading = images[:start_from]
    trailing = images[start_from:]

random.shuffle(trailing)

with open("shuffled_image_list.json", "w") as f:
    json.dump(leading + trailing, f)
