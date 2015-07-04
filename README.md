# govhack-vet-provider-map
A map for VET (Vocational Education Training) providers

# Requirements

MapGuide Open Source 2.6 or higher
mapguide-rest 1.0 RC2

# Setup

1. Install MapGuide Open Source
2. Install mapguide-rest 
3. git clone this repository into the 'www' directory of the MapGuide web installation as $CLONE_NAME
4. Set up a new alias named GIS_DATA_ROOT that points to $YOUR_GIT_CLONE_PATH/Data
5. Load the included package file via the MapGuide Site Administrator
6. Run http://$YOURMAPGUIDESERVER/mapguide/$CLONE_NAME/index.html