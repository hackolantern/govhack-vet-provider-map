This directory contains the following directories:

 * package: This contains the raw MapGuide package content that needs to be loaded into a MapGuide Server. To build a MapGuide package, create a zip file with the contents inside this directory and rename the file with a .mgp extension. Load this package using the MapGuide Site Administrator
 * raw: This contains all the open data acquired during the GovHack hackathon. This does not contain the original version of the referenced dataset in some cases, but rather a cleansed and massaged version that allows it for use in this project.
 * restconf: This contains all the mapguide-rest configurations needed by this applications. Copy all the directories within to the data/conf directory of your mapguide-rest installation