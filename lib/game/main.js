ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font'
)
.defines(function(){
ind = 0
config = {
		scale : 2
	, debug	: 1
	, rate	: 100
}
	
lastUpdate = null
MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	
	init: function() {
		// Initialize your game here; bind keys etc.
		world.init( 10 , 10 , 10 )
		
		world.movingObjects.addMovingObject({ x : -9 , y : 5 , v : {x : 3 , y : 3 } , size : { x : 3 , y : 3 } , type : "2"})
		world.movingObjects.addMovingObject({ x : 2 , y : -5 , v : {x : 0 , y : 0 } , size : { x : 2 , y : 3 } , type : "F"})
		world.movingObjects.addMovingObject({ x : -10 , y : -5 , v : {x : 0 , y : 0 } , size : { x : 2 , y : 3 } , type : "F"})
		//setInterval( function(){ world.test() } , 100 )
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		var date = new Date().getTime()
		if(!lastUpdate || date - lastUpdate > config.rate)
			lastUpdate = date
		else
			return
		world.test();
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
		
		//this.font.draw( ind++, x, y, ig.Font.ALIGN.CENTER );
		config.debug && world.debug.drawGrid(/*3,3,1,1*/)
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 240, config.scale );

});
