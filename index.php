<?php
require 'VekriClass.php';
session_start();
//require 'reloadCreature.php';
/*$_SESSION['body'];
$_SESSION['tail'];
$_SESSION['ear'];
$_SESSION['belly'];
$_SESSION['face'];
$_SESSION['horn'];
$_SESSION['gem'];
$_SESSION['faceDets'];*/
$_SESSION['vekri'] = new Vekri();
?>

<!DOCTYPE html>
<html>

<head>
    <title>Make Your Own Vekri</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Make yourself a little friend :)">
    <meta name="author" content="Cat">
</head>
<link rel="stylesheet" href="main.css">
</link>

<body>
    <div id="creator">
        <div id="creaturedet">
            <div id="randomizers">
                <button title="randomize everything" onclick="Randomize()">
                    <image src="supportingFiles/dice.png" alt="Random" width="25px;" height="20px;"></image>
                </button>
                <button title="randomize colors" onclick="RandomizeOnlyColors()">
                    <image src="supportingFiles/dice.png" alt="Random" width="25px;" height="20px;"></image>
                    <image src="supportingFiles/rainbow.png" alt="Color" width="25px;" height="20px;"></image>
                </button>
                <button title="randomize colors from palette" onclick="RandomizePaletteColors()">
                    <image src="supportingFiles/dice.png" alt="Random" width="25px;" height="20px;"></image>
                    <image src="supportingFiles/palette.png" alt="Palette Color" width="25px;" height="20px;"></image>
                </button>
                <button title="randomize features" onclick="RandomizeOnlyFeatures()">
                    <image src="supportingFiles/dice.png" alt="Random" width="25px;" height="20px;"></image>
                    <image src="supportingFiles/feat.png" alt="Features" width="25px;" height="20px;"></image>
                </button>
            </div>
            <!--button> Choose Color Theme</button-->

            <div id="creature"></div>
        </div>
        <div id="detNav">
            <div></div>
            <button onclick="loadet(0)">Body</button>
            <button onclick="loadet(1)">Head</button>
            <button onclick="loadet(2)">Face</button>
            <button onclick="loadet(3)">Account</button>
        </div>
        <div class="det" id="bodydet">
            <div>
                <label>Body Color:</label>
                <button onclick="ColorPopup('body')" style="display: inline"> </button>
            </div>
            <br>
            <div>
                <label> Fur Length: </label>
                <button class="smallButton" onclick="alterParam('fur', 0)">Short</button>
                <button class="smallButton" onclick="alterParam('fur', 1)">Medium</button>
                <button class="smallButton" onclick="alterParam('fur', 2)">Long</button>
            </div>
            <br>
            <div>
                <label> Fur Type: </label>
                <button class="smallButton" onclick="alterParam('fur', 'straight')">Straight</button>
                <button class="smallButton" onclick="alterParam('fur', 'curly')">Curly</button>
                <button class="smallButton" onclick="alterParam('fur', 'sleek')">Sleek</button>
            </div>
            </hr>
            <div>
                <label>Paw Color:</label>
                <button onclick="ColorPopup('paw')" style="display: inline"> </button>
            </div>
            <hr>
            <div>
                <label> Tail: </label>
                <button class="smallButton" onclick="alterParam('tail', 1)">1</button>
                <button class="smallButton" onclick="alterParam('tail', 2)">2</button>
                <button class="smallButton" onclick="alterParam('tail', 3)">3</button>
                <button class="smallButton" onclick="alterParam('tail', 4)">4</button>
                <button class="smallButton" onclick="alterParam('tail', 5)">5</button>
            </div>
            <br>
            <div>
                <label>Tail Accent Color:</label>
                <button onclick="ColorPopup('tail')" style="display: inline"> </button>
                <button class="smallButton" onclick="alterParam('tail','none')"> Remove</button>
            </div>
            <hr>
            <div>
                <label> Belly Shape: </label>
                <button class="smallButton" onclick="alterParam('belly', 1)">1</button>
                <button class="smallButton" onclick="alterParam('belly', 2)">2</button>
                <button class="smallButton" onclick="alterParam('belly', 3)">3</button>
                <button class="smallButton" onclick="alterParam('belly', 4)">4</button>
                <button class="smallButton" onclick="alterParam('belly', 5)">5</button>
            </div>
        </div>
        <div class="det" id="headdet">
            <div>
                <label> Face Shape: </label>
                <button class="smallButton" onclick="alterParam('face', 1)">1</button>
                <button class="smallButton" onclick="alterParam('face', 2)">2</button>
            </div>
            <br>
            <div>
                <label>Face Color:</label>
                <button onclick="ColorPopup('face')" style="display: inline"> </button>
            </div>
            <hr>
            <div>
                <label> Ear Shape: </label>
                <button class="smallButton" onclick="alterParam('ear', 1)">1</button>
                <button class="smallButton" onclick="alterParam('ear', 2)">2</button>
                <button class="smallButton" onclick="alterParam('ear', 3)">3</button>
                <button class="smallButton" onclick="alterParam('ear', 4)">4</button>
                <button class="smallButton" onclick="alterParam('ear', 5)">5</button>
            </div>
            <br>
            <div>
                <label>Ear Accent Color:</label>
                <button onclick="ColorPopup('ear')" style="display:inline;"> </button>
            </div>
            <hr>
            <div>
                <label> Horn Shape: </label>
                <button class="smallButton" onclick="alterParam('horn', 1)">1</button>
                <button class="smallButton" onclick="alterParam('horn', 2)">2</button>
                <button class="smallButton" onclick="alterParam('horn', 3)">3</button>
                <button class="smallButton" onclick="alterParam('horn', 4)">4</button>
                <button class="smallButton" onclick="alterParam('horn', 5)">5</button>
            </div>
            <br>
            <div>
                <label>Horn Color:</label>
                <button onclick="ColorPopup('horn')" style="display:inline"> </button>
            </div>
            <hr>
        </div>
        <div class="det" id="facedet">
            <div>
                <label> Gem Shape: </label>
                <button class="smallButton" onclick="alterParam('gem', 1)">1</button>
                <button class="smallButton" onclick="alterParam('gem', 2)">2</button>
                <button class="smallButton" onclick="alterParam('gem', 3)">3</button>
                <button class="smallButton" onclick="alterParam('gem', 4)">4</button>
                <button class="smallButton" onclick="alterParam('gem', 5)">5</button>
            </div>
            <br>
            <div>
                <label>Gem Color:</label>
                <button onclick="ColorPopup('gem')" style="display:inline"> </button>
            </div>
            <hr>
            <pre>
	    TODO:
	    Move gems here
	    Add eyes, add mouth
	    option to change eye color
	    haven't decided on mouth color
	    </pre>
        </div>
        <div class="det" id="accdet">
            <div>
                <label>Name:</label>
                <input type="text" onkeyup="alterParam('name', this.value)"></input>
            </div>
            <div>
                <label>Notes:</label>
                <textarea title="Tell me about your Vekri" onkeyup="alterParam('notes', this.value)"></textarea>
                <p id="error"></p>
            </div>
        </div>
    </div>
    <div id="ColorPickerOverlay">
        <button onclick="Exit()">X</button>
        <div id="ColorPicker">
            <div>
                <label>Hue:</label>
                <div class="hue">
                    <input type="range" id="hue" min="0" max="360" step="1" value="180" onchange="UpdateColor()"></input>
                </div>
            </div>
            <div>
                <label>Saturation:</label>
                <div id="satDiv">
                    <input type="range" id="sat" min="0" max="100" step="1" value="50" onchange="UpdateColor()"></input>
                </div>
            </div>
            <div>
                <label>Lightness:</label>
                <div class="light">
                    <input type="range" id="light" min="0" max="100" step="1" value="50" onchange="UpdateColor()"></input>
                </div>
            </div>
            <div>
                <label>Hex: #</label>
                <input type="text" maxlength="7" id="hexInput" onchange="SetHex()"></input>
            </div>

            <div class="colorSquare" id="sample">
            </div>
            <div id="sampleButtons">
                <p id="hexVal">#40bfbf</p>
                <button onclick="Apply()"> Apply </button>
                <button onclick="OverwritePopUp()">Save Color</button>
            </div>
            <div id="colorBank">
                <div class="colorSquare savedColors" onclick="LoadColor(1)">
                </div>
                <div class="colorSquare savedColors" onclick="LoadColor(2)">
                </div>
                <div class="colorSquare savedColors" onclick="LoadColor(3)">
                </div>
                <div class="colorSquare savedColors" onclick="LoadColor(4)">
                </div>
                <div class="colorSquare savedColors" onclick="LoadColor(5)">
                </div>
                <div class="colorSquare savedColors" onclick="LoadColor(6)">
                </div>
            </div>
        </div>
    </div>
    </div>
    <div id="overwriteOverlay">
        <div id="overwrite">
            <button class="smallButton" onclick="Overwrite(1)">1</button>
            <button class="smallButton" onclick="Overwrite(2)">2</button>
            <button class="smallButton" onclick="Overwrite(3)">3</button>
            <button class="smallButton" onclick="Overwrite(4)">4</button>
            <button class="smallButton" onclick="Overwrite(5)">5</button>
            <button class="smallButton" onclick="Overwrite(6)">6</button>
            <button onclick="CloseOverwrite()"> Cancel </button>
        </div>
    </div>
</body>
<script>
    sessionStorage.setItem('palette', JSON.stringify(["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"]));
</script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script type="text/javascript" src="creatureEdit.js"></script>
<script type="text/javascript" src="colorSelector.js"></script>
<script type="text/javascript" src="loadThemes.js"></script>

</html>