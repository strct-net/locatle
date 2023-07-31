# Instructions

* Install the dependencies: `pip install -r requirements.txt`
* Set the GEOAPIFY\_TOKEN environment variable
* Set the TOKEN variable (Mapillary)
* Run generate.py
* Remove any unwanted images from `queue/`
* Run add\_all.py

## Files

### add\_country.py
Add country codes to each item in image\_list.json

### clean\_image\_dict.py
Remove non-existent images from image\_dict.json

### dict\_to\_list.py
Create a list of images from image\_dict.json

### generate.py
Grab images from Mapillary
