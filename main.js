function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier('MobileNet',modelloaded);
  classifier.classify(video,gotResult);
}
function draw(){
  image(video,0,0,300,300);
}
function modelloaded(){
  console.log("model is loaded!");
}
function gotResult(error,results){
  if(error){
    console.log(error);
  }
  else{
    if((results[0].confidence>0.5)&&(previous_result!=results[0].label)){
      console.log(results);
      previous_result=results[0].label;
      var synth=window.speechSynthesis;
      speak_data="object detected is "+results[0].label;
      var utterthis=new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterthis);
      document.getElementById("object_name").innerHTML=results[0].label;
      document.getElementById("object_accuracy").innerHTML=results[0].confidence.toFixed(3);
    }
  }
}