#!/usr/bin/python3

import json
import sys

with open("image_list.json", "r") as f:
    images = json.load(f)

if len(sys.argv) > 1:
    images = images[int(sys.argv[1]):]

countries = {}
for image in images:
    country = image["country"]
    countries[country] = countries.get(country, 0) + 1

items = [(k, v) for k, v in countries.items()]
items.sort(key=lambda x: x[1])
for country, count in items:
    print("{}: {}".format(country, count))