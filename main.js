harry_potter = "";
peter_pan = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song1_status = "";
song2_status = "";

function preload(){
    harry_potter = loadSound("harry_potter.mp3");
    peter_pan = loadSound("peter_pan.mp3");
}

function setup(){
    canvas = createCanvas(650,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotResults);
}

function modelLoaded(){
    console.log("PoseNet is initialized");
}

function gotResults(results){
    if(results.length > 0){
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        scoreleftWrist = results[0].pose.keypoints[9].score;
        scorerightWrist = results[0].pose.keypoints[10].score;
    }
}

function draw(){
    image(video, 0, 0, 650, 500);

    fill("#f00");
    stroke("#000");

    song1_status = harry_potter.isPlaying();
    song2_status = peter_pan.isPlaying();
    
    if(scoreleftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        peter_pan.stop();

        if(song1_status == false){
            harry_potter.play();
            document.getElementById("song_name").innerHTML = "Song Name - Harry Potter Theme Song Remix";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        harry_potter.stop();

        if(song2_status == false){
            peter_pan.play();
            document.getElementById("song_name").innerHTML = "Song Name - Peter Pan Song";
        }
    }
}