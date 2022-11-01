var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var speed = 10; // скорость анимации (чем меньше тем быстрее)

function getBezierBasis(i, n, t) { // находим bi,n по алгоритму де Кастельжо
	// Факториал
	function f(n) { // рекурсивно находим факториал
		if(n <= 1){
			return 1;
		}else{
			return n * f(n - 1);
		}
	};

	// считаем i-й элемент полинома Берштейна
	return (f(n)/(f(i)*f(n - i)))* Math.pow(t, i)*Math.pow(1 - t, n - i);
}


function getBezierCurve(arr) {

	var step = 0.0001;		// пишем шаг

	var res = new Array(); // создаем массив в котором будем хранить новые точки для построения

	for (var t = 0; t < 1 + step; t += step) {
		if (t > 1) {
			t = 1; // сумма шага не может быть больше 1
		}

		var ytmp=0;// временные для хранения координат
		var xtmp=0;

		for (var i = 0; i < arr.length; i++) { // проходим по каждой точке
			var b = getBezierBasis(i, arr.length - 1, t); // вычисляем наш полином Берштейна
			xtmp += arr[i].x * b; // записываем и прибавляем результат
			ytmp += arr[i].y * b;
		}
		res.push({"x":xtmp,"y":ytmp}); // запушиваем конечный результат в наш новыйй массив

	}

	return res; // возвращаем его
}


var cords = [ // наши координаты точек
	{
		"x":10,
		"y":150
	},
	{
		"x":5,
		"y":50
	},
	{
		"x":150,
		"y":50
	},
	{
		"x":140,
		"y":140
	},
	{
		"x":150,
		"y":50
	},
	{
		"x":150,
		"y":50
	},
	{
		"x":150,
		"y":50
	},			
];

var arrayCords = getBezierCurve(cords);// получаем координаты точек кривой безье


ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.beginPath(); // очищаем полотно и начинаем рисовать
ctx.moveTo(arrayCords[0].x,arrayCords[0].y); // двигаемся к 1 точке



var i=0;
var interval = setInterval(function(){		
	draw(); // вызываем функцию прорисовки
	i++; // увеличиваем i				
	if(i>=arrayCords.length){ // проверяем не конец ли массива?
		clearInterval(interval); // конец, удаляем интервал
	}

},speed);

function draw(){ // функция прорисовки точки
	ctx.lineTo(arrayCords[i].x,arrayCords[i].y); // рисуем итую точку
	ctx.stroke(); 
}