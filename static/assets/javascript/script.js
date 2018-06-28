document.addEventListener('DOMContentLoaded', function () {
    // References to all the element we will need.
    var video = document.querySelector('#camera-stream'),
        image = document.querySelector('#snap'),
        start_camera = document.querySelector('#start-camera'),
        controls = document.querySelector('.controls'),
        take_photo_btn = document.querySelector('#take-photo'),
        download_photo_btn = document.querySelector('#download-photo'),
        // delete_photo_btn = document.querySelector('#delete-photo'),
        form = document.getElementById("form-id"),
        error_message = document.querySelector('#error-message');

    // The getUserMedia interface is used for handling camera input.
    // Some browsers need a prefix so here we're covering all the options
    navigator.getMedia = ( navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

    if(!navigator.getMedia){
        displayErrorMessage("Browser needs an update!");
    }
    else{
        // Request the camera.
        navigator.getMedia(
            {
                video: true
            },
            // Success Callback
            function(stream){
                // Create an object URL for the video stream and
                // set it as src of our HTLM video element.
                video.src = window.URL.createObjectURL(stream);
                // Play the video element to start the stream.
                video.play();
                video.onplay = function() {
                    showVideo();
                };
            },
            // Error Callback
            function(err){
                displayErrorMessage("There was an error with accessing the camera stream: " + err.name, err);
            }
        );
    }
    
    // Mobile browsers cannot play video without user input,
    // so here we're using a button to start it manually.
    start_camera.addEventListener("click", function(e){
        e.preventDefault();
        // Start video playback manually.
        video.play();
        showVideo();
    });
    
    take_photo_btn.addEventListener("click", function(e){
        e.preventDefault();
        var snap = takeSnapshot();
        // Show image. 
        image.setAttribute('src', snap);
        //image.classList.add("visible");
        // Enable delete and save buttons
        // delete_photo_btn.classList.remove("disabled");
        download_photo_btn.classList.remove("disabled");
        // Set the href attribute of the download button to the snap url.
        download_photo_btn.value = snap;
        // document.getElementById("image-uploader").submit();
        save_image();
        // Pause video playback of stream.
        video.play();
    
    });

    function save_image(){
        $data2post = $("#image-uploader").serializeArray();
        $btnVal = $("#take-photo").html()
        $("#take-photo").html("Processing...").css({
            'left' : 250
        });
        $.ajax({
            url: "/",
            type: "POST",
            data: $data2post,
            success: function(data){
                if(data){
                    $("#msg").css({
                        'display' : 'block'
                    }).addClass('card-panel green white-text').html('Attendance Marked!').fadeIn('slow').delay(2000).fadeOut('slow');
                    $("#take-photo").html('<i class="material-icons left">camera_alt</i>Mark Attendance');
                }
            },
            error: function(){
                $("#msg").html('Please Contact Administration!');
            }
        })
    }
    
    function showVideo(){
        // Display the video stream and the controls.
        hideUI();
        video.classList.add("visible");
        controls.classList.add("visible");
    }
    
    function takeSnapshot(){
        // Here we're using a trick that involves a hidden canvas element.  
        var hidden_canvas = document.querySelector('canvas'),
            context = hidden_canvas.getContext('2d');
        var width = video.videoWidth,
            height = video.videoHeight;
        if (width && height) {
            // Setup a canvas with the same dimensions as the video.
            hidden_canvas.width = width;
            hidden_canvas.height = height;
            // Make a copy of the current frame in the video on the canvas.
            context.drawImage(video, 0, 0, width, height);
            // Turn the canvas image into a dataURL that can be used as a src for our photo.
            return hidden_canvas.toDataURL('image/png');
        }
    }
    
    function displayErrorMessage(error_msg, error){
        error = error || "";
        if(error){
            console.error(error);
        }
        error_message.innerText = error_msg;
        hideUI();
        error_message.classList.add("visible");
    }
    
    function hideUI(){
        // Helper function for clearing the app UI.
        controls.classList.remove("visible");
        start_camera.classList.remove("visible");
        video.classList.remove("visible");
        snap.classList.remove("visible");
        error_message.classList.remove("visible");
    }
});