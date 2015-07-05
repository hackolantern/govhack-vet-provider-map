# govhack-vet-provider-map
A map for VET (Vocational Education Training) providers. A detailed project description is available [here](PROJECT-DESC.md).

**URL** </bR>
http://bit.ly/1LLmn4P

# Objectives
1. This project was built to allow its users to look up VET course information or occupation names to find VET providers for that occupation

2. The majority of victorian high school students do VET courses rather than enter university. 

3. It will benefit adults with little education who have been retrenched from low skilled jobs by providing them a gateway to access skillsets and occupations in demand that provide a higher income and better standard of living.

4. We have also used mapped data on locations for volunteer resource centres and DHS offices to help people in need of material and financial support.

5. Public library and free public wifi locations are also mapped to help students who are studying access books and public internet

6. SEIFA indexes can be shown as an overlay to show which local govt areas are more disadvantageous and shows which areas need more funding and assistance.

7. Overlaid transport maps are also used to show which places are less accessible by public transport.

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

# Data Sources Used
-VET Training Providers - https://www.data.vic.gov.au/data/dataset/list-of-contracted-training-organisations </br>   
-Learn Local Locations - http://learnlocal.org.au/find-a-learn-local/ </br>
-SEIFA Indexes - http://www.abs.gov.au/ausstats/abs@.nsf/Lookup/2033.0.55.001main+features100132011 </br>
-DHS Office Locations - https://www.data.vic.gov.au/data/dataset/dhs-area-to-region-mapping-table-of-office-locations </br>
-Volunteer Resources Centre - https://www.data.vic.gov.au/data/dataset/volunteer-resource-centres-contact-data </br>
-Volunteer Resources Centre 2 -http://www.volunteer.vic.gov.au/directory/volunteer-resource-centres </br>
-Public Internet Locations - https://www.data.vic.gov.au/data/dataset/public-internet-locations </br>
-PTV Shapefiles - https://github.com/OKFNau/OpenTransportData </br>
-LGA Shapefiles - http://www.abs.gov.au/AUSSTATS/abs@.nsf/DetailsPage/1270.0.55.003July%202011 </br>
