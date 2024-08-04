import '../css/style.css'

// реализация эффекта Material Wave 
(function () {
  var form = document.querySelectorAll('[contenteditable="true"], .btn'); 
  for (var i = 0; i < form.length; ++i) {
    form[i].addEventListener('mousedown', rippleEffect, false);
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

// реализация изменения текстовых элементов резюме
try {
  document.addEventListener('DOMContentLoaded', function() { 
    const btn = document.getElementById('btn-pdf');
    const form = document.querySelectorAll('[contenteditable="true"]'); //элементы с возможностью изменения текста
    const ls = localStorage;

    //получаем данные из input
    //сохраняем данные из localStorage для каждого редактируемого элемента
    form.forEach((elem, key) => { 
      try {
        const newData = ls.getItem(`edit-${key}`);
        if (newData) {
          elem.textContent = newData;
        }
        elem.addEventListener('input', () => {
          ls.setItem(`edit-${key}`, elem.textContent);
        });
      } catch (error) {
        console.error('Error saving data');
      }
    });
    
    // реализация сохранения измененной страницы в формате pdf 
   
    const download_button = document.getElementById('btn-pdf');
    const content = document.getElementById('app');

    download_button.addEventListener ('click', async function () {
        const filename = 'Resume.pdf';
        try {
            const opt = {
                margin: 0.5,
                filename: filename,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: {
                    unit: 'in', format: 'letter',
                    orientation: 'portrait'
                }
            };
            await html2pdf().set(opt).
                from(content).save();
        } catch (error) {
          console.error('Error creating PDF');
        }
    });

  });
  } catch (error) {
    console.error(error);
}

