import '../css/style.css'

(function () {
  var water = document.querySelectorAll('.water');
  for (var i = 0; i < water.length; ++i) {
    water[i].addEventListener('mousedown', rippleEffect, false);
  }
})();

function rippleEffect(e) {
  var width = this.clientWidth;
  var height = this.clientHeight;
  var rect = this.getBoundingClientRect();
  var posX = e.clientX - rect.left;
  var posY = e.clientY - rect.top;

  // create the ripple
  var size = Math.max(width, height);
  var ripple = document.createElement('div');
  ripple.className = 'ripple';
  ripple.style.width = size + 'px';
  ripple.style.height = size  + 'px';
  ripple.style.top = posY - size/2 + 'px';
  ripple.style.left = posX - size/2 + 'px';

  this.appendChild(ripple);
  var _this = this;

  setTimeout(function() {
    _this.removeChild(ripple);
  }, 750);
}




document.addEventListener('DOMContentLoaded', () => { //событие сработает, когда документ готов 
	const btn = document.getElementById('btn-pdf');
	const elements = document.querySelectorAll('.editable'); //измененные поля
	
	elements.forEach((elem, index) => { //загружает сохр. данные из localStorage для каждого редактируемого элемента
		const data = localStorage.getItem(`editable-${index}`);
		if (data) {
			elem.textContent = data;
    }
		elem.addEventListener('input', () => {
			localStorage.setItem(`editable-${index}`, elem.textContent);
		});
	});
	
	btn.addEventListener('click', () => { //добавляем событие click кнопке
		const { jsPDF } = window.jspdf;
		const doc = new jsPDF();
		const container = document.querySelector('.container');
		doc.html(container, {
			callback: function (doc) {
				doc.save('Resume.pdf');
			},
			x: 5,
			y: 5,
			width: 200,
      windowWidth: 595 
		});
	});
});


