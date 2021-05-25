**** Code content description ****

Code for making a revolving cylinder that spawn enemies at one side while the player dodges obstacles the other side.
This zip holds the client side web framework and js code which makes up a website along with a web hosted game. 
External libraries were used during the creation of this project. 


** File Structure 

HTML PAGES
 * index.html -  Main page
 * login.html - Login page
 * register.html -  Register page
 * error.html - Error page
 * loading.html - Loading page
 * game.html - Main game page

RESOURCES  - Contains all the css, js and images for the website along with vendors for libraries.
 * resources
   * css  - Contains all the CSS.
      * style.css -  Main css used through for the website layout.
   * images - Contains all the images 
      * background.jpg -  Self created background
      * error.jpg  - Self created error messae 
      * icon.ico -  Self created icon
      * logo.png -  Self created logo
      * menu.jpg -  Self created menu
      * player.jpg -  Self created player
   * js - Contains all the JS. Note this is minified. The non minified version will be included seperatly.
      * game
         * enemy.js -  Enemy class for moving and adding mesh to scene.
	 * game.js - Main script for gameplay controls the game loop.
	 * input.js - Module for controlling input.
	 * lights.js - Module for importing lighting. 
	 * primitive.js - Module for importing primitives. 

 * vendor - Libraries used.
   * three.js - Three.JS for creating 3D web application.
   * dat.gui -  DAT.GUI for easy, interactive debugging.

** References

Libraries - 
2020. Three.Js. London: mrdoob.
2017. Dat.Gui. San Francisco: Google Data Arts Team.

Code Help -
Stemkoski.github.io. 2020. Collision Detection (Three.Js). [online] Available at: <http://stemkoski.github.io/Three.js/Collision-Detection.html> [Accessed 29 October 2020].
Gist. 2020. Getting Data From Pokeapi.Co. [online] Available at: <https://gist.github.com/brickbones/29a2c406387c15d4f1cc6ba5c18e45b9> [Accessed 29 October 2020].
loaded?, T., Deschamps, P. and Deschamps, P., 2020. Three.Js - How To Wait For A Image To Be Loaded?. [online] Stack Overflow. Available at: <https://stackoverflow.com/questions/43733088/three-js-how-to-wait-for-a-image-to-be-loaded> [Accessed 29 October 2020].
Thecolorapi.com. 2020. The Color API. [online] Available at: <https://www.thecolorapi.com/> [Accessed 29 October 2020].