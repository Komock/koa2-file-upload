(function() {

	var uploadURL = '/api/upload',
		form = document.querySelector('.form'),
		fileInput = document.querySelector('.form #fileInput'),
		picURL = '',
		blob = null,
		buffer = null;

	fileInput.addEventListener('change', function(e) {
		var file = e.target.files[0];
		console.log(file);
		var reader = new FileReader();
		reader.readAsArrayBuffer(file);
		reader.onload = function(e) {
			console.log(this);
			buffer = this.result;
			var blob = new Blob([buffer], { type: 'image/png' });
			picURL = window.URL.createObjectURL(blob);
			preview.src = picURL;

		};
	});

	function upload(data) {
		var xhr = new XMLHttpRequest();
		// обработчик для закачки
		xhr.upload.onprogress = function(e) {
			console.log(e);
			progress.innerText = e.loaded + ' / ' + e.total;
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
		xhr.send(data);
	}

	form.addEventListener('submit', function(e) {
		e.preventDefault();
		var file = fileInput.files[0];
		upload(blob);
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
