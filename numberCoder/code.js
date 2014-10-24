window.onload = function(){
	var button 	= document.querySelector(".button"),
		input 	= document.querySelector(".number");

	function buttonClick(){
		if( !input.value ) return;
		
		var myNode = document.querySelector('.figures');
		while (myNode.firstChild) {
		    myNode.removeChild(myNode.firstChild);
		}

		var letters = input.value.split(''), num = '', nextNum;

		do{
			nextNum = letters.shift();
			if( !parseInt( nextNum ) ) continue;

			num += nextNum;
			processNumberMD5( parseInt(num) );

		}
		while( letters.length > 0 );
	}

	button.addEventListener('click', buttonClick, false);
}

function processNumber( val ){
}

function processNumberMD5( val ){
	var letters = MD5( val + '' ), nextLetter, num, x, y, r, g, b;
	letters = letters.split('');

	var coords = [];
	do{
		nextLetter = letters.shift();
		num = parseInt( nextLetter, 16 );

		x = 1 - ( num % 3 );
		y = 1 - ( 16 - num ) % 3 ;
		r = ( 5 % num).toString(16);
		g = ( 10 % num).toString(16);
		b = ( 15 % num).toString(16);

		coords.push( [x,y,r,g,b] );
	}while(letters.length > 0)

	newFigure( coords );
}

function newFigure( coords ){
	var figure = document.createElement( 'div' ), box, hr, x, y, r,g,b, maxY, minY;
	hr = document.createElement('hr');
	figure.className = 'figure';

	x = 0;
	y = 0;

	maxY = 0;
	minY = 0;
	var height = 0;

	for( var i = 0 ; i < coords.length ; i++ ){

		x += coords[ i ][ 0 ];
		y += coords[ i ][ 1 ];
 		r = coords[ i ][ 2 ];
 		g = coords[ i ][ 3 ];
 		b = coords[ i ][ 4 ];

 		if( coords[ i ][ 1 ]<0 ) height++;

		maxY = y > maxY ? y : maxY;
		minY = y < minY ? y : minY;

		box = document.createElement( 'div' );
		box.className = 'box';
		box.style.left = x * 10 + 'px';
		box.style.top  = y * 10 + 'px';
		box.style.backgroundColor = "#" + [r,r,g,g,b,b].join('');
		figure.appendChild( box );
	}

	figure.style.marginTop = ( Math.abs(minY) + 1 ) * 10 + 'px';
	figure.style.height = ( Math.abs(maxY) + 1 ) * 10 + 'px';
	document.querySelector('.figures').appendChild( figure );
	document.querySelector('.figures').appendChild( hr );
}
















