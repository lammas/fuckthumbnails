var offset = 0;
var itemsPerPage = 10;
var gallery = '.';
var galleryData = false;

function loadmore() {
	var items = galleryData[gallery];

	if (offset<items.length) {
		var container = $('#content');
		for (var i = offset; i < items.length && i < offset + itemsPerPage; i++) {
			var image = $('<img>').attr('src', items[i].path);
			container.append(image);
		}
		offset+=itemsPerPage;
	}

	if (offset<items.length) {
		$('#load-more').show();
	}
	else {
		$('#load-more').hide();
		$('#the-end').show();
	}
}

function menu(data) {
	var container = $('#menu');

	if (gallery != '.')
		container.append($('<a href="/">Home</a>'));

	for (var item in data) {
		if (item === '.') continue;
		var link = $('<a></a>')
			.attr('href', '/g/'+item)
			.text(item);
		container.append(link);
	}
}

function boot() {
	var matches = document.location.pathname.match(/\/g\/([a-zA-Z0-9_\/]+)/)
	if (matches) {
		gallery = matches[1];
	}
	$('#load-more').hide();
	$('#the-end').hide();
	$.getJSON('/gallery.json', function (data) {
		galleryData = data;
		menu(galleryData);
		loadmore();
	});
}
