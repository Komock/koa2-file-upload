(function() {

	var uploadURL = '/api/upload',
		form = document.querySelector('.form'),
		fileInput = document.querySelector('.form #fileInput'),
		picURL = '';

	fileInput.addEventListener('change', function(e) {
		var file = e.target.files[0];
		console.log(file);
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function(event) {
			picURL = event.target.result;
			preview.src = picURL;
		};
	});

	function upload(file) {
		var xhr = new XMLHttpRequest();
		// обработчик для закачки
		xhr.upload.onprogress = function(event) {
			progress.innerText = event.loaded + ' / ' + event.total;
		};

		// обработчики успеха и ошибки
		// если status == 200, то это успех, иначе ошибка
		xhr.onload = xhr.onerror = function() {
			if (this.status == 200) {
				console.log('success');
			} else {
				console.log('error ' + this.status);
			}
		};

		xhr.open('POST', uploadURL);
		xhr.send(file);
	}

	form.addEventListener('submit', function(e) {
		e.preventDefault();
		var file = fileInput.files[0];
		upload(picURL);
	});

})();


//====== As form data
// var formData = new FormData(document.forms.fileForm);
// // send
// var xhr = new XMLHttpRequest();
// xhr.open('POST', uploadURL);
// xhr.send(formData);
// xhr.addEventListener('load', function (e) {
// 	if (this.readyState == 4) {
// 		if (this.status == 200) {
// 			// OK
// 			console.log('Response', e.target.responseText);
// 		} else {
// 			console.error('XHR Error!')
// 		}
// 	}
// })
