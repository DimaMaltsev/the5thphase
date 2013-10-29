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
		//console.log(mo)
		for( var id in mo ){
			var 
					m 	= mo[ id ].state()
				,	_x 	= m.pos.x
				,	_y	= m.pos.y
				,	ex	= _x + m.size.x
				,	ey	= _y + m.size.y
			
			//console.log( _x, ex )
			
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

	
	return{
		getMOMatrix : getMOMatrix
	}
})()