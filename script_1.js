let mouse = {x: 0, y:0};
let canv = document.getElementById("canvas"),
    ctxCanv  = canv.getContext('2d');
let rectSize = 3;
let num = 0;
let last = {x: 0, y: 0};
let c = {x: 0, y: 0};

let cords = [];

ctxCanv.strokeStyle = 'black';
ctxCanv.lineWidth = 1;
ctxCanv.fillStyle = 'black'; 

canv.width = 400;
canv.height = 400;

canv.addEventListener("mousedown", function(e){   // Рисование квадратов

    console.log(e.which);
    if(e.which == 1){
        last.x = mouse.x;
        last.y = mouse.y;       
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        ctxCanv.strokeRect(mouse.x, mouse.y, rectSize, rectSize);
        ctxCanv.fillRect(mouse.x + 1, mouse.y + 1, rectSize - 2, rectSize - 2);
        num++;
        if(num == 2){
            ctxCanv.moveTo(last.x, last.y);
            ctxCanv.lineTo(mouse.x, mouse.y);
            ctxCanv.stroke();
            console.log('yeap!');
            num = 0;
        }
    }
    else if(e.which == 3){
        if(Math.sqrt(Math.pow((e.pageX - this.offsetLeft - mouse.x), 2) + Math.pow((e.pageY - this.offsetTop - mouse.y), 2)) <= 30){
            c.x = mouse.x;
            c.y = mouse.y;
            console.log(cords.x + " " + cords.y);
        }
        else if(Math.sqrt(Math.pow((e.pageX - this.offsetLeft - last.x), 2) + Math.pow((e.pageY - this.offsetTop - last.y), 2)) <= 30){
            c.x = last.x;
            c.y = last.y;
            console.log(cords.x + " " + cords.y + " blya");
        }
    }
    
});

canv.addEventListener("mouseup", function(e){
    if(e.which == 3){
        console.log("shh");
    }
});

function getBezierBasis(i, n, t) { // находим bi,n по алгоритму де Кастельжо
	// Факториал
	function f(n) { // рекурсивно находим факториал
		if(n <= 1){
			return 1;
		} else{
			return n * f(n - 1);
		}
	};

	// считаем i-й элемент полинома Берштейна
	return (f(n)/(f(i)*f(n - i)))* Math.pow(t, i)*Math.pow(1 - t, n - i);
}

function getBezierCurve(arr) {

	var step = 0.01;		// пишем шаг

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

var arrayCords = getBezierCurve(cords);// получаем координаты точек кривой безье


ctxCanv.clearRect(0, 0, canvas.width, canvas.height);
ctxCanv.beginPath(); // очищаем полотно и начинаем рисовать
ctxCanv.moveTo(arrayCords[0].x,arrayCords[0].y); // двигаемся к 1 точке

var speed = 10;

var i=0;
var interval = setInterval(function(){		
	draw(); // вызываем функцию прорисовки
	i++; // увеличиваем i				
	if(i>=arrayCords.length){ // проверяем не конец ли массива?
		clearInterval(interval); // конец, удаляем интервал
	}

},speed);

function draw(){ // функция прорисовки точки
	ctxCanv.lineTo(arrayCords[i].x,arrayCords[i].y); // рисуем итую точку
	ctxCanv.stroke(); 
}