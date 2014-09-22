var offset = 0;
var itemsPerPage = 10;
var gallery = '.';
var galleryData = false;

function loadmore() {
	if (!galleryData || !(gallery in galleryData))
		return;

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

function formatDate(date) {
	return date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
}

function menu(data) {
	var container = $('#menu');

	if (gallery != '.')
		container.append($('<a href="/">Home</a>'));

	var latest = false;

	for (var item in data) {
		if (data[item].length == 0)
			continue;

		if (!latest)
			latest = new Date(data[item][0].time);
		else {
			var d = new Date(data[item][0].time);
			if (d>latest)
				latest = d;
		}

		if (item === '.')
			continue;

		var link = $('<a></a>')
			.attr('href', '/g/'+item)
			.text(item);
		container.append(link);
	}

	if (latest) {
		var lastModified = $('<span>').text(formatDate(latest));
		container.append(lastModified);
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
