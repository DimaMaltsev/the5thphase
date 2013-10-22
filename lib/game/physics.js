// TODO : 
/*



*/

var physics = (function(){
	var 
	
			moMatrix
		,	matrix
	
	function prepareMOMatrix( movingObjects ){
		var 
				mo 				= movingObjects
		moMatrix 	= {}
		
		for( var id in mo ){
			var 
					m 	= mo[ id ] 
				,	_x 	= m.x
				,	_y	= m.y
				,	ex	= _x + m.size.x
				,	ey	= _y + m.size.y
			
			for( var x = _x ; x <= ex ; x++ ){
				if( moMatrix[ x ] == undefined )
					moMatrix[ x ] = {}
				for( var y = _y ; y <= ey ; y++ ){
					if( moMatrix[ x ][ y ] == undefined )
						moMatrix[ x ][ y ] = m.type
					else
						;// добавить обработчик совпадения координат
				}
			}
		}
	} // подготовить матрицу координат движущихся объектов
	
	function prepareMatrix( _matrix ){
		matrix = {}
		matrix = _matrix
	}
	
	function getValue( x , y ){
		return 	( matrix[ x ] 	&& matrix[ x ][ y ] ) || 
						( moMatrix[ x ] && moMatrix[ x ][ y ]) || 0
	}

	function step( _matrix , movingObjects ){
		//console.log( _matrix )
		prepareMOMatrix( movingObjects )
		prepareMatrix( _matrix )
	} // расчитать шаг физики мира для всех обхектов
	return{
		step : step
	}
})()