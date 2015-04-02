var fs = require('fs');

var video_file_path = "video.mp4";

var Streamer = function(filename){
	var self = this;
	fs.open(video_file_path, 'r', function(err, fd){
		if (err) {
			log.error(err, "Error opening video file!");
			return err;
		}
		self.fd = fd;
	});

	var position = function(callback){
		fs.stat(filename, function(err, stats){
			if (err) {
				self.shutdown();
				return;
			}

		});
	}

	var watcher = fs.watch(video_file_path, function(evt, filename){
		console.log("Video file updated! "+evt);
		if ('change' == evt) update();
	});

	var update = function(){

		//send data to clients.
	}

	this.shutdown = function(callback){
		watcher.close();
		fs.closeSync(self.fd);
	}
};

var streamer = new Streamer(video_file_path);


process.on('SIGINT', function() {
    console.log("Caught interrupt signal.  Shutting Down.");
    streamer.shutdown();
    process.exit();
});

// Run vlc
// :sout=#file{dst=/path/to/video.mp4,no-overwrite} :sout-keep