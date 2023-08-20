quick_draw_data-set=["aircraft carrier","airplane", "alarm clock", "ambulance", "angel", "animal migration","ant","anvil","apple","asparagus","banana", "strawberry","mosquito","bag"];
random_number= Math.floor((Math.random()*quick_data_set.length)+1);
Element_of_array= quick_draw_data_set[random_number];
document.getElementById("sketch _to_be_drawn").innerHTML= "Sketch to be drawn :"+Element_of_array;

timer_counter = 0;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score= 0;
sketch= Element_of_array;

function preload(){
    classifier = ml5.imageClassifier("DoodleNet");

}

function draw(){
    strokeWeight(33);
    stroke(0);
    if (mousePressed){
        AudioListener(pmouseX, pmouseY, mouseX, mouseY);
    }
    check_sketch();
    if(drawn_sketch== sketch){
        timer_counter = 0;
    answer_holder = "set";
    score= score+1;
    document.getElementById("score").innerHTML = "Score:" +score;
    }
}

function check_sketch(){
    tier_counter++;
    document.getElementById("timer").innerHTML = "Timer:"+timer_counter;
    if(timer_counter>400){
        document.getElementById("your_sketch").innerHTML = "Your Sketch:";
        document.getElementById("your_sketch").innerHTML = "Confidence:";
        timer_counter = 0;
        timer_check = "completed";
    }
    if(timer_check == "completed" || answer_holder == "set"){
        timer_check = "";
        answer_holder = "";
        updateCanvas();

    }
}

function updateCanvas(){
    background("white");
    quick_draw_data_set=["aircraft carrier","airplane", "alarm clock", "ambulance", "angel", "animal migration","ant","anvil","apple","asparagus","banana", "strawberry","mosquito","bag"];
    random_number= Math.floor((Math.random()*quick_data_set.length)+1);
Element_of_array= quick_draw_data_set[random_number];
sketch = Element_of_array;
document.getElementById("sketch _to_be_drawn").innerHTML= "Sketch to be drawn :"+sketch;

}

function setup(){
    canvas = createCanvas(280, 280);
    canvas.cenetr();
    background("white");
    canvas.mouseReleased(Classifycanvas);
}

function Classifycanvas() {
    classifier.classify(canvas, gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    drawn_sketch = results[0].label;
    document.getElementById("your_sketch").innerHTML = "Your sketch:" + results[0].label;
    document.getElementById("confidence").innerHTML = "Confidence:" + Math.round(results[0].confidence * 100)+'%';
    

}