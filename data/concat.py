#!/usr/bin/python3

import json
import sys

content1 = None
with open(sys.argv[1], "r") as f:
    content1 = json.load(f)

content2 = None
with open(sys.argv[2], "r") as f:
    content2 = json.load(f)

with open("joined.json", "w") as f:
    joined = None
    if isinstance(content1, dict):
        joined = dict(content1)
        joined.update(content2)
    elif isinstance(content1, list):
        joined = content1 + content2

    json.dump(joined, f)
