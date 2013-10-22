// TODO : 

/*

- Отображение колижн зон движущихся объектов
- Проверку валидности объектов при добавлении в движущиеся
- Подумать, может нужно изменить алгоритм выдачи айдишника

*/


var world = (function(){
	var 
			matrix 	= {}
		,	width		=	0 // sizes of the matrix
		,	height	=	0
		,	bsize   = 0 // size of matrix pixel
		,	screen  = {
				width : null//ig.system.width
			,	height: null//ig.system.height
		}
		, context = null//ig.system.context // for drawing debug stuff
		
		, movingObjects = {
				0 : {
						x : 3
					, y : 3
					, type 	: 2
					, v 		: { x : 2 , y : 2 }
					, size 	: { x : 5 , y : 5 }
				}
		} // массив всех физических объектов игры (движущихся)

	
	function getGameId(){
		var id = -1
		while( movingObjects[ ++id ] != undefined ); // TOADD : change id creation algorythm
		return id
	} // function to create game object id
	
	function addMovingObject( obj ){
		// TOADD : obj validate check
		if( obj == undefined ) return
		
		var id = getGameId() // get unique id
		movingObjects[ id ] = obj
		obj.gameId = id
	}
	
	function removeMovingObject( id ){
		movingObjects[ id ] != undefined && delete( movingObjects[ id ] )
	}
	
	
	function init( _width , _height , _bsize ){
		
		width = _width * 2
		height= _height* 2
		bsize = _bsize
		
		screen.width = ig.system.width
		screen.height= ig.system.height
		
		context = ig.system.context
		
		for( var x = -_width ; x <= _width; x++ ){ // initing empty matrix for world
			matrix[ x ] = {}
			for( var y = -_height ; y <= _height ; y++ ){
				matrix[ x ][ y ] = 0
			}
		}
	} // create world with empty matrix	
	function get(){ // params = ( x, y ) || (x) || ()
		if( arguments.length == 0 ) // ()
			return matrix
		else if( arguments.length == 1 ) // (x)
			return matrix[ arguments[ 0 ] ]
		else if( arguments.length == 2 ) // (x , y)
			return matrix[ arguments[ 0 ]][arguments[ 1 ] ]
	} // get specific matrix value
	function set(){ // params = ( x, y , val ) || ( x , vector ) || ( matrix )
		if( arguments.length == 0 ) // ()
			return
		else if( arguments.length == 1 ) // (matrix)
			matrix = arguments[ 0 ]
		else if( arguments.length == 2 ) // (	x , vector )
			matrix[ arguments[ 0 ] ] = arguments[ 1 ]
		else if( arguments.length == 3 ){ // ( x , y , val )
			if( !matrix[ arguments[ 0 ] ] )
				matrix[ arguments[ 0 ] ] = {}
			matrix[ arguments[ 0 ] ][ arguments[ 1 ] ] = arguments[ 2 ]
		}
			
	} // set specific matrix value
	function drawBox( x , y , val ){
		var s = config.scale
		x = s * screen.width / 2 + s * x * bsize - ig.game.screen.x - bsize /// 2
		y = s * screen.height/ 2 + s * y * bsize - ig.game.screen.y - bsize /// 2
		
		context.beginPath();
	
		context.rect(	x	,	y	,	s * bsize , s * bsize );
		val && ( context.fillStyle	=	"#FF0000"	)
    val && context.fill();
		context.lineWidth = 1;
		context.strokeStyle = 'white';
		context.stroke();
	} // draw debug box for grid
	function drawGrid(){ 
		for( var x in matrix )
			for( var y in matrix[ x ] )
				drawBox( x , y , matrix[ x ][ y ] )
	} // draw debug matrix grid
	function drawSectorGrid( _x , _y , width , height ){ 
		for( var x = _x - width ; x <= _x + width ; x++ )
			if( matrix[ x ] )
				for( var y = _y - height ; y <= _y + height ; y++ )
					if( matrix[ x ][ y ] != undefined )
						drawBox( x , y , matrix[ x ][ y ] )
	} // draw debug matrix grid
	

	
	return {
			init 			: init
		, get  			: get
		, set				: set
		
		, movingObjects : {
				addMovingObject 		: addMovingObject
			,	removeMovingObject 	: removeMovingObject
		}
		
		, debug 		: { // debug stuff
				drawGrid 				: drawGrid
			,	drawSectorGrid 	: drawSectorGrid
			,	drawBox					: drawBox
		}
		,	test : function(){ physics.step( matrix , movingObjects ) }
		
	}
})()