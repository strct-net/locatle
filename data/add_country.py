import requests
from requests.structures import CaseInsensitiveDict
import json
import os
from dotenv import load_dotenv
import sys

load_dotenv()
token = os.getenv("GEOAPIFY_TOKEN")

headers = CaseInsensitiveDict()
headers["Accept"] = "application/json"

path = os.path.abspath(os.path.dirname(__file__))
with open(path + "/" + sys.argv[1], "r") as f:
    images = json.load(f)
print(images)
for image in images:
    if "country" in image:
        continue

    url = "https://api.geoapify.com/v1/geocode/reverse?type=country&lat={}&lon={}&apiKey={}" \
        .format(image["coordinates"][0], image["coordinates"][1], token)
    resp = requests.get(url, headers=headers)
    results = json.loads(resp.content)["features"]
    if len(results) == 0:
        print("Skipping " + image["id"])
        continue

    image["country"] = results[0]["properties"]["country_code"].upper()

filtered_images = list(filter(lambda x: "country" in x, images))
print(len(images), len(filtered_images))
with open(path + "/" + sys.argv[1], "w") as f:
    json.dump(filtered_images, f)

# from audioop import reverse
# import json
# import reverse_geocoder
# import os
#
# path = os.path.abspath(os.path.dirname(__file__))
#
# with open(path + "/image_list.json", "r") as f:
#    images = json.load(f)
#
# for image in images:
#    image["country"] = reverse_geocoder.search(
#        image["coordinates"], mode=1)[0]["cc"]
#
# with open(path + "/image_list.json", "w") as f:
#    json.dump(images, f)
