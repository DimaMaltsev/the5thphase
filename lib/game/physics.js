// TODO : 
/*



*/

var physics = (function(){
	var 
			moMatrix
		,	matrix
		,	stepTime = 10
	
	function getMOMatrix( movingObjects ){
		var 
				mo = movingObjects
			,	_moMatrix 	= {}
		
		for( var id in mo ){
			var 
					m 	= mo[ id ] 
				,	_x 	= m.x
				,	_y	= m.y
				,	ex	= _x + m.size.x
				,	ey	= _y + m.size.y
			
			for( var x = _x ; x < ex ; x++ ){
				if( _moMatrix[ x ] == undefined )
					_moMatrix[ x ] = {}
				for( var y = _y ; y < ey ; y++ ){
					if( _moMatrix[ x ][ y ] == undefined )
						_moMatrix[ x ][ y ] = m.type
					else
						;// добавить обработчик совпадения координат
				}
			}
		}
		
		return _moMatrix
	}
	
	function prepareMOMatrix( movingObjects ){
		moMatrix 	= getMOMatrix( movingObjects )
	} // подготовить матрицу координат движущихся объектов
	
	function setMOMatrix( movingObject ){
		var 
				m = movingObject
		var
					_x 	= m.x
				,	_y	= m.y
				,	ex	= _x + m.size.x
				,	ey	= _y + m.size.y
			
			for( var x = _x ; x <= ex ; x++ ){
				if( moMatrix[ x ] == undefined )
					moMatrix[ x ] = {}
				for( var y = _y ; y <= ey ; y++ ){
					if( moMatrix[ x ][ y ] == undefined )
						moMatrix[ x ][ y ] = m.type
				}
			}
		}
	
	function prepareMatrix( _matrix ){
		matrix = {}
		matrix = _matrix
	}
	
	function setMoMatrix( x , y , val ){
		if( moMatrix[ x ] == undefined )
			moMatrix[ x ] = {}
		moMatrix[ x ][ y ] = val
	}
	
	function getValue( x , y ){
		return 	( matrix[ x ] 	&& matrix[ x ][ y ] ) || 
						( moMatrix[ x ] && moMatrix[ x ][ y ]) || 0
	}

	function getCollision( movingObject , step , fpos , velocity ){
		var m 				= movingObject
		var direction = {
				horizontal 	: null
			,	vertical 		: null
		}
		
		if( !m.v.x && !m.v.y )
			return false
			
		direction.horizontal = ( m.v.x > 0 ? "right" 	: m.v.x < 0 ? "left" 	: null )
		direction.vertical   = ( m.v.y > 0 ? "down" 	: m.v.y < 0 ? "up" 		: null ) 
			
		var ranges = []
		
		if( direction.horizontal ){
			ranges.push({
					x : direction.horizontal == "right" ? [ m.size.x - 1 	, m.size.x - 1 ] : [ 0 , 0 ]
				,	y : [ 0 ,	m.size.y - 1 ]
			})
		}
		
		if( direction.vertical ){
			ranges.push({
					x : [ 0 , m.size.x - 1 ]
				,	y : direction.vertical == "down" 	? [ m.size.y , m.size.y ] : [ -1 , -1 ]
			})
		}
		//console.log(JSON.stringify(ranges))
		//console.log( direction )
		var _f = fpos[ m.gameId ]
		for( var i = 0 ; i < ranges.length ; i++ )
			for( var x = _f.x + ranges[i].x[0] ; x <= _f.x + ranges[i].x[1] ; x++ )
				for( var y = _f.y + ranges[i].y[0] ; y <= _f.y + ranges[i].y[1] ; y++ ){
					var 
							_nx 	= x + m.v.x * ( step / velocity )
						, _ny		= y + m.v.y * ( step / velocity )
						, nx		= Math.round( _nx )
						,	ny    = Math.round( _ny )
					//m.v.x && console.log(m.y , _ny)
					if( ( x != nx || y != ny ) && getValue( nx , ny ) ){
						console.log(x,y,nx,ny)
						return true
					}
				}
		return false
	}
		
	function step( _matrix , movingObjects , bsize ){
		prepareMOMatrix( movingObjects )
		prepareMatrix( _matrix )
		
		var mo 	= movingObjects
			,	fpos= {}
	
		for( id in mo ){
			var 
					m = mo[ id ]
				,	velocity 	= Math.sqrt( Math.pow( m.v.x , 2 ) + Math.pow( m.v.y , 2 ) )
			//console.log(velocity)
			if( velocity == 0 )
				continue;
			for( var step = 1 ; step <= velocity ; step++ ){
				if( step == 1 )
					fpos[ m.gameId ] = { x : m.x , y : m.y }
				if( getCollision( m , step , fpos , velocity ) )
					step=velocity;//console.log("collision");
				else{
					m.x = Math.floor( fpos[ id ].x + m.v.x * step / velocity )
					m.y = Math.floor( fpos[ id ].y + m.v.y * step / velocity )
					
					setMOMatrix( m )
				}
			}
		}
		
	} // расчитать шаг физики мира для всех обхектов
	return{
			step : step
		, getMOMatrix : getMOMatrix
	}
})()