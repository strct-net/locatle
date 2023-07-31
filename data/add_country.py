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

def add_country(images):
    if not token:
        print("ERROR: Geoapify token not found.")
        return None

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

    return list(filter(lambda x: "country" in x, images))

def main():
    path = os.path.abspath(os.path.dirname(__file__))
    with open(path + "/" + sys.argv[1], "r") as f:
        images = json.load(f)

    filtered_images = add_country(images)

    print(len(images), len(filtered_images))
    with open(path + "/" + sys.argv[1], "w") as f:
        json.dump(filtered_images, f)

if __name__ == "__main__":
    main()
