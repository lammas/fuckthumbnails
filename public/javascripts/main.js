var offset = 0;
var gallery = '.';
var galleryData = false;
var config = {
	items_per_page: 10,
	display_last_modified: true
};

function loadmore() {
	if (!galleryData || !(gallery in galleryData))
		return;

	var items = galleryData[gallery];
	if (offset<items.length) {
		var container = $('#content');
		for (var i = offset; i < items.length && i < offset + config.items_per_page; i++) {
			var image = $('<img>').attr('src', items[i].path);
			container.append(image);
		}
		offset+=config.items_per_page;
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
			.text(item.replace(/_/g, ' '));
		container.append(link);
	}

	if (config.display_last_modified === true && latest) {
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
		if (jQuery.isEmptyObject(data))
			return;

		config = data.config;
		galleryData = data.gallery;

		menu(galleryData);
		loadmore();
	});
}
