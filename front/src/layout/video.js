import React from "react";
import { useParams } from "react-router-dom";

var mediaRecorder = "";

const video = (videoRef, canvasRef, chunks, formRef) => {
  if (
    navigator.mediaDevices.getUserMedia ||
    navigator.mediaDevices.webkitGetUserMedia
  ) {
    // define a Promise that'll be used to load the webcam and read its frames
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then(
        (stream) => {
          // pass the current frame to the window.stream
          window.stream = stream;
          // pass the stream to the videoRef
          videoRef.current.srcObject = stream;

          var options = {
            mimeType: "video/webm;codecs=h264",
          };

          if (!MediaRecorder.isTypeSupported("video/webm;codecs=h264")) {
            var types = [
              "video/webm",
              "audio/webm",
              "video/webm;codecs=vp8",
              "video/webm;codecs=daala",
              "audio/webm;codecs=opus",
              "video/mpeg",
            ];

            for (var i in types) {
              if (MediaRecorder.isTypeSupported(types[i])) {
                options = {
                  mimeType: types[i],
                };
                break;
              }
            }
          }

          mediaRecorder = new MediaRecorder(stream, options);

          mediaRecorder.start();
          mediaRecorder.ondataavailable = function (e) {
            chunks.push(e.data);
          };

          mediaRecorder.onstop = function () {
            //EN BLO ESTA GUARDADO EL VIDEO
            var blob = new Blob(chunks, { type: "video/webm" });
            download(blob);
          };

          function download(blob) {
            var link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute("download", "video_recorded");
            link.style.display = "none";

            document.body.appendChild(link);

            link.click();
            link.remove();

            stream.getTracks().forEach(function (track) {
              track.stop();
            });
          }
        },
        (error) => {
          const form = formRef.current;
          form.innerHTML = "";
          const tittle = document.createElement("h1");
          tittle.innerHTML = "Couldn't start the webcam. Try again!";
          form.appendChild(tittle);
        }
      );
  }
};

const Video = () => {
  var id = useParams().id;

  window.scrollTo(0, 0);
  //const [test, setTest] = useState([]);
  //const [understand, setUnderstand] = useState(false);
  const formRef = React.createRef();
  const formRefEncuesta = React.createRef();
  // reference to both the video and canvas
  const videoRef = React.createRef();
  const canvasRef = React.createRef();
  var chunks = [];
  video(videoRef, canvasRef, chunks, formRef);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = formRef.current;
  };

  const handleEndSurvey = (event) => {
    event.preventDefault();
    const form = formRef.current;
    form.innerHTML = "You just finish the survey. Thanks";
    mediaRecorder.stop();
  };

  // we are gonna use inline style
  const styles = {
    top: 150,
    left: 150,
  };

  return (
    <div className="container">
      <div>
        <h1> We are going to record you until the end of the survey</h1>
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={Iunderstand}
          >
            I Understand:
          </button>
        </div>
      </div>
      <div>
        <video
          style={styles}
          autoPlay
          muted
          ref={videoRef}
          width="720"
          height="600"
        />
        <canvas style={styles} ref={canvasRef} width="720" height="650" />
        <form ref={formRefEncuesta} onSubmit={handleEndSurvey}>
          <button type="submit" className="btn btn-primary">
            Done
          </button>
        </form>
      </div>
    </div>
  );
};

export default Video;
