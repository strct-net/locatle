# Process

Download the Mapillary "Planet-Scale Depth" Dataset.
Move the images to a folder called `planet-scale/` and
the metadata file to `planet-scale.json`.

1. Run `extract.elk [count]`
2. Run `even-out.elk`
3. Remove any unwanted images
4. Run `clean.elk`
5. Run `../data/concat.py && mv joined.json image_list.json`
6. Run `mv out/*.jpg ../data/images`
