ig.module( 
	'game.entities.sample' 
)
.requires(
	'impact.entity'
)
.defines(function(){

	EntitySample = ig.Entity.extend({

			type: ig.Entity.TYPE.A
		,	checkAgainst: ig.Entity.TYPE.A
		,	collides: ig.Entity.COLLIDES.ACTIVE

		,	animSheet 	: new ig.AnimationSheet( 'media/player.png', 16, 16 )
		,	size 				: {x: 8, y:12}
		,	offset 			: {x: 4, y: 4}
		,	flip 				: false
		,	maxVel  		: {x: 100, y: 200}
		,	friction 		: {x: 600, y: 0}
		,	accelGround : 400
		,	accelAir 		: 200
		,	jump 				: 150

		,	init: function( x, y, settings ) {
				this.parent( x, y, settings );

				this.addAnim( 'idle', 1, [0] );
				this.addAnim( 'run', 0.07, [0,1,2,3,4,5] );
				this.addAnim( 'jump', 1, [9] );
				this.addAnim( 'fall', 0.4, [6,7] );
			}
		, update: function() {
			      // move left or right
				var 
						accel = this.standing ? this.accelGround : this.accelAir
					,	deviceAccel	= -ig.input.accel.y
					, anims = this.standing ? {  
									action 	: this.anims.run
								,	idle		: this.anims.idle
							}
						: {
									action 	: this.vel.y < 0 ? this.anims.jump : this.anims.fall
								, idle 		: this.vel.y < 0 ? this.anims.jump : this.anims.fall
							}

				if( ig.input.state('left') || deviceAccel > 0) {
					this.accel.x = -accel;
					this.flip = true;
					this.currentAnim = anims.action
				}
				else if( ig.input.state('right') || deviceAccel < 0 ) {
					this.accel.x = accel;
					this.flip = false;
					this.currentAnim = anims.action
				}
				else {
					this.accel.x = 0;
					this.currentAnim = anims.idle
				}
			       // jump
				if( this.standing && ig.input.pressed('jump') ) {
					this.vel.y = -this.jump;
				}

				this.currentAnim.flip.x = this.flip;
				// move!
				this.parent();

			}
		, draw : function(){
				this.parent()
				
		}
	});
});
































