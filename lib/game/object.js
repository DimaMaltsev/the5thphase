var object = function( params ){
	var 
			entity = ig.game.spawnEntity( EntitySample , ig.system.width / 2 , ig.system.height / 2 )
		,	x = params.x || 0
		,	y = params.y || 0
		,	v = params.v || { x : 0 , y : 0 }
		, id= params.id 
	
	function prepareChars(){
		return {
				pos : { x : Math.floor( x / world.size() ) 	, y : Math.floor( y / world.size() ) 	}
			, rpos: { x : x , y : y	}
			,	vel : { x : v.x	, y : v.y }
			, size: { x : entity.size.x / world.size() , y : entity.size.y / world.size() }
			, type: 200
		}
	}
	
	function step(){
		x += v.x
		y += v.y
		
		entity.pos.x = world.translateCoord( x , y ).x - world.size() / 2
		entity.pos.y = world.translateCoord( y , y ).y - world.size() / 2
	}
	
	function move( _x , _y ){
		x = _x
		y = _y
	}
	
	return {
			step 	: step	
		,	state	: prepareChars
		, move  : move
	}
}