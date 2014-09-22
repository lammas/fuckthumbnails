fuckthumbnails
==============

Node.js based image gallery thing that does not support thumbnails and never will.


Install
--------------

Download / clone the repository and do the following:

```sh
$ npm install

# To simply run in production mode:
$ ./run.sh

# or to run in debug mode:
$ npm start
```

By default it will serve whatever is located in the `public/data/` directory.
Feel free to replace the `data` directory with a symlink that points to some images.

By default the application listens on `127.0.0.1:3000`. The port can be changed in `run.sh`.
This is currently intended to be used behind something like [nginx](http://nginx.org/).
Here's an example nginx config:

```
server {
	listen 80;
	server_name example.com;

	access_log /var/log/nginx/example.com.access_log main;
	error_log /var/log/nginx/example.com.error_log info;

	location / {
		proxy_set_header X-Real-IP  $remote_addr;
		proxy_set_header X-Forwarded-For $remote_addr;
		proxy_set_header Host $host;
		proxy_pass http://127.0.0.1:3000;
	}
}
```

