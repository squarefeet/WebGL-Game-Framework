WebGL Game Framework
====================

A helper framework to aid code organisation when writing games in WebGL using 
THREE.js.


------------------------------------------------------------------------------


###Architecture###
_(Currently in progress)_

* **SceneManager**: Creates three rendering "layers" (background, middleground
                    and foreground). When an object is added to a given layer
                    that layer is sorted according to its objects' .zIndex
                    property in order to achieve tick and rendering order.
                    Each scene is an object containing an instance of 
                    `THREE.Scene` and `THREE.PerspectiveCamera`.
                    
                    
* **Renderer**:     Holds an instance of `THREE.WebGLRenderer`, with autoClear
                    set to false in order to render multiple layers from the
                    `SceneManager` on top of each other.
                    Each object (an instance of `GameObject` or a custom 
                    sub-class of this constructor) in each layer in the 
                    `SceneManager` is updated by calling its `.tick()` method 
                    before each scene is rendered.

                    
* **GameObject**:   A parent class that all game objects derive from. A 
                    `GameObject` can be anything from a starfield, to the 
                    player, to an enemy.


* **KeyHandler**:   A simple class that keeps track of what keys are currently
                    pressed.
                    

* **MouseHandler**: Similar to the `KeyHandler` but for the mouse.


* **EventHandler**: A straight-forward PubSub model. Uses `.on()`, `.off()`,
                    and `.fire()`.


* **Inheritance**:  All class inheritance is done through here. It's modelled
                    on `Backbone.js`'s lovely inheritance model, which is
                    itself modelled on Google's one from the Closure library
                    (I think!)
                    

----

###Object "Classifications"###
There are three "classifications" of GameObjects, given by GameObject.classification:

* 0 - Friendly to the player
* 1 - Enemy to the player
* 2 - Unknown or neutral.


Planning to use these classifications to guide basic AI:

* 0 - Don't fire on player
* 1 - Fire on player without doubts
* 2 - Remain neutral until fired upon, then become the side that fired's enemy.