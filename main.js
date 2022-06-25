
prediction_1=""
prediction_2=""

Webcam.set({
    width:350, height:300, image_format:"png", png_quality:90
})

camera=document.getElementById("camera")
Webcam.attach(camera)

function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capturedimage" src="'+data_uri+'">'
    })
}

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/cAvCjYEU_/model.json",modelloaded)

function modelloaded(){
    console.log("modelloaded")

}

function speak(){
    synth=window.speechSynthesis
    speak1="the first prediction is "+prediction_1
    speak2="the second prediction is "+prediction_2

    utterthis=new SpeechSynthesisUtterance(speak1+speak2)
    synth.speak(utterthis)
}

function predictemotion(){
    capimg=document.getElementById("capturedimage")
    classifier.classify(capimg,gotresult)
}

function gotresult(error,result){
if(error){
    console.error(error)
}
else{
    console.log(result)
    document.getElementById("result_gesture_name").innerHTML=result[0].label
    document.getElementById("result_gesture_name2").innerHTML=result[1].label

    prediction_1=result[0].label
    prediction_2=result[1].label

    speak()

    if(result[0].label=="Victory"){
        document.getElementById("gesture1").innerHTML="&#9996"
    }

    if(result[0].label=="Best"){
        document.getElementById("gesture1").innerHTML="&#128076"
    }

    if(result[0].label=="Amazing"){
        document.getElementById("gesture1").innerHTML="&#128077"
    }

    if(result[0].label=="Rock"){
        document.getElementById("gesture1").innerHTML="&#129304"
    }

    if(result[1].label=="Victory"){
        document.getElementById("gesture2").innerHTML="&#9996"
    }

    if(result[1].label=="Best"){
        document.getElementById("gesture2").innerHTML="&#128076"
    }

    if(result[1].label=="Amazing"){
        document.getElementById("gesture2").innerHTML="&#128077"
    }

    if(result[1].label=="Rock"){
        document.getElementById("gesture2").innerHTML="&#129304"
    }
}
}