# vekri-maker

IDEA: recreate one of those creature-creator flash games I used to play as a kid. Currently, publicly accessible at https://test.catharina-castillo.corp.he.net/

----

### General Layout

Left hand side houses the svg representation of the created character. The buttons here will randomize everything on the creature, permit downloading of the creature (still in progress), and the theme button (not implemented) allows changing of the background and the initial saved color pallete


Right hand side houses the controls to change the appearance and information about the creature. There are 4 sections:  

Body details allow changing of body color, fur length (short or long(not yet implemented), fur type (straight, curly, or patterned(not yet implemented), paw colors, the tail style and accent color, and the belly shape.  

Head details allow changing of the face shape and color, ear shape and color, and horn shape and color.  

Face details allow changing of the color of details on the face, the gem shape and color, the eyes shape, number, and colors, mouth colors, and the addition of accessories to the face (functionality operational, but data has not been created or entered in the mysql database). 

Finally, Account details allow for naming and describing of the creature.  

----

### General function

Pressing buttons on the right hand side will trigger a post request that'll run a php script to obtain the changed information data from the mysql database. This is then returned to the frontend, where the text data is used to repopulate the svg.
Changing colors of any feature does not make a request to the server, just changes using javascript.


Information on the creature is kept both in a json on the client side, and in an instance of the VekriClass on the server side, which allows keeping track of the data relevant to the creature on both ends.


----

### Unfinished as of 10/2/22
Need to implement Theme changing  

At this time, downloading the Vekri creates an svg file using the data on the server side, then downloads that. The problem with this is that it contains no color data, and the downloaded file appears blank.  

Eyes, Fur types, and Accessories are not yet implemented. While the coding functionality is there, the svg data has not been created and entered into the database yet.

Some tweaks are needed to make the GUI more comprehensible. Some ideas are:  
-Making the background behind the creature transparent so the background image is visible in the character design screen.  
-The open detail screen should be more obvious. It should match the color of the tab used to pull it open.  

Other fixes more pertaining to "aesthetics" would include altering the existing svg data to add more depth to the creature in general.
