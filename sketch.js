// variables
//common vars
  var database;
  var background_img, background_imgtxt = "dashboad.png";
  var opt_img, submit_img, next_img;
  var appState = "dashboard"
  var update = "off", longitude = "not given", latitude = "not given";
  var upload_img, upload_imgp1, upload_imgp2, upload_imgp1h;
  var Animal_type, animal_type;

//doctor form vars
  var d_input1, d_input2, d_input3, dn_input1, dn_input2,d_input;
  var d_x, d_x1, d_y, d_s;
  var d_inp1, d_inp2, d_inp3, dn_inp1, dn_inp2;
  var d_submition_no = 0, docthanks;
  var d_img

//ngo form vars
  var n_input2, n_input3, n_input, n_inp2, n_inp3
  var n_submition_no = 0, ngothanks;
  var n_img;

function preload() {
  //loading images
  opt_img = loadImage("dash opt.png");
  background_img = loadImage("dashboad.png");
  submit_img = loadImage("submit_button.png");
  next_img = loadImage("next_button.png");
  ngothanks = loadImage("ngothanks.png");
  docthanks = loadImage("docthanks.png");
}

function setup() {
  //creating canvas
  canvas = createCanvas(250, 400);
  background_imgtxt = "/dashboad.png";

  // initialization of the database.
  database = firebase.database();

  // initialization of the button's x,y in the first screen
  d_x = 25;
  d_y = 125;
  d_x1 = 125;
  d_s = 30;

  // creating the inputs for the ngo form
  n_input2 = createInput();
  n_input3 = createInput();
  Animal_type = createInput('EG:Dog,Cat');
  
  // hiding the inputs so that it is not shown the the first screen
  n_input2.hide();
  n_input3.hide();
  Animal_type.hide();

  // creating the inputs for the doctor form pg1
  d_input1 = createInput();
  d_input2 = createInput();
  d_input3 = createInput();
  type = createInput('EG: png,jpg');
  
  // hiding the inputs so that it is not shown the the first screen
  d_input1.hide();
  d_input2.hide();
  d_input3.hide();
  type.hide();
  
  //sizing
  type.size(50,15)

  // creating the inputs for the doctor form pg2
  dn_input1 = createInput();
  dn_input2 = createInput();
  
  // hiding the inputs so that it is not shown the the first screen
  dn_input1.hide();
  dn_input2.hide();

  //crearing the input 
  n_input = createFileInput(handleFile);
  n_input.hide();
  n_input.size(190,25)
  
  //crearing the input 
  d_input = createFileInput(handleFile1);
  d_input.size(190,25)
  d_input.hide();
}


function draw() {
  // to get location
  if ('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(function(position){
      latitude = (position.coords.latitude)
      longitude = (position.coords.longitude)
    });
  }

  // to get the submition no for ngo
  if (appState !== "ngo over") {
    var docRef = database.ref('doctor_count');
    docRef.on("value", (data) => {
      d_submition_no = data.val();
    });
  }

  // to get the submition no for doctor help
  if (appState !== "doctor over") {
    var ngoRef = database.ref('ngo_count');
    ngoRef.on("value", (data) => {
      n_submition_no = data.val();
    });
  }

  //to make the text black
  fill("black");
  //creating the background image
  background(background_img);
  // text styling
  textStyle(BOLD);
  //sizing of the text
  textSize(12);

  //when the app state is on dashboard 
  if (appState === "dashboard") {
    // text
    text("Please Choose Any", 10, 95);
    text(" Of The Options:", 60, 110);
    // to make the button and the text pop-up when the cursor is over the button 
    if (mouseX > d_x && mouseX < d_x + 75 && mouseY > d_y && mouseY < d_y + 75) {
      //image
      image(opt_img, d_x - 2.5, d_y - 2.5, 80, 80);
      // text sizing
      textSize(15);
      // changing the image position due to the effect
      d_s = 25;
    } else {
      //image
      image(opt_img, d_x, d_y, 75, 75);
      // text sizing
      textSize(12);
      // changing the image position due to the effect
      d_s = 30;
      
    }
    // text over the button
    text("Report A", d_s + 7, 150);
    text("Animal", d_s + 15, 165);
    text("Help", d_s + 22, 180);

    // to make the button and the text pop-up when the cursor is over the button 
    if (mouseX > d_x1 && mouseX < d_x1 + 75 && mouseY > d_y && mouseY < d_y + 75) {
      //image
      image(opt_img, d_x1 - 2.5, d_y - 2.5, 80, 80);
      //text sizing
      textSize(15);
      //repositon-ing due to the effect 
      d_s1 = 25;
    } else {
      //image
      image(opt_img, d_x1, d_y, 75, 75);
      //repositon-ing due to the effect 
      d_s1 = 30;
      //text sizing
      textSize(12);
    }

    // text over the button
    text("Consult", d_s1 + 110, 150);
    text("A Pet", d_s1 + 118, 165);
    text("Doctor", d_s1 + 115, 180);

  }

  // to change the pages
  if (appState === "ngo") {
    ngo();
  }
  if (appState === "doctor") {
    doctor();
  }
  if (appState === "doctor2") {
    doctor2();
    
    //to hide the things form previous page
    d_input1.hide();
    d_input2.hide();
    d_input3.hide();
    Animal_type.hide()
  }

  // to change the state
  if (appState === "ngo over") {
    // to chang the uploaded image from binary to byte64 code to update to firebase
    upload_img = n_img.canvas.toDataURL()
    upload_imgp1h = upload_img.length/2
    upload_imgp1 = upload_img.slice(22,upload_imgp1h)
    upload_imgp2 = upload_img.slice(upload_imgp1h,upload_imgp1h*2)
    
    //hiding the previous pages items
    n_input.hide();
    n_input2.hide();
    n_input3.hide();
    type.hide();
    Animal_type.hide();
    
    //giving the value to the vars
    n_inp2 = n_input2.value();
    n_inp3 = n_input3.value();
    types = type.value();//-
    animal_type = Animal_type.value();
    
    // changing the background to a thank you message
    background(ngothanks);
    
    //changing update to ngo
    update = "ngo"
  }
  // to change the state
  if (appState === "doctor over") {
    // to chang the uploaded image from binary to byte64 code to update to firebase
    upload_img = d_img.canvas.toDataURL()
    upload_imgp1h = upload_img.length/2
    upload_imgp1 = upload_img.slice(22,upload_imgp1h)
    upload_imgp2 = upload_img.slice(upload_imgp1h,upload_imgp1h*2)
    
    // changing the background to a thank you message
    background(docthanks)
    
    //hiding the previous pages items
    d_input.hide();
    dn_input1.hide();
    dn_input2.hide();
    type.hide();
    
    //giving the value to the vars
    d_inp1 = d_input1.value();
    d_inp2 = d_input2.value();
    d_inp3 = d_input3.value();
    dn_inp1 = dn_input1.value();
    dn_inp2 = dn_input2.value();
    types = type.value();
    animal_type =  Animal_type.value();
    
    //changing update to ngo
    update = "doctor"
  }
  if (update === "ngo") {
    
    // path for the database
    var path = "ngo submitions/" + n_submition_no
    
    //updating the database with the options chosen
    database.ref(path).update({
      latitude: latitude,
      longitude:longitude,
      issue: n_inp2,
      phone_number: n_inp3,
      image1: upload_imgp1,
      image2: upload_imgp2,
      assigned : false,
      type : types,
      animal_type : animal_type
    });
  }
  if (update === "doctor") {
    // path for the databse
    var path = "doctor submitions/" + d_submition_no
    
    // updating the database with the options chosen
    database.ref(path).update({
      owner_name: d_inp1,
      pet_name: d_inp2,
      problem: d_inp3,
      phone_number: dn_inp1,
      pet_age: dn_inp2,
      assigned : "false",
      animal_type : animal_type,
      image1: upload_imgp1,
      image2: upload_imgp2,
      type : types
    });
  }
}

function mousePressed() {
  // when the app state is dashboard
  if (appState === "dashboard") {
    // to make the user go to ngo screen when the button is pressed
    if (mouseX > d_x && mouseX < d_x + 75 && mouseY > d_y && mouseY < d_y + 75) {
      appState = "ngo";
    }
    
    // to make the user go to doctor screen when the button is pressed 
    if (mouseX > d_x1 && mouseX < d_x1 + 75 && mouseY > d_y && mouseY < d_y + 75) {
      appState = "doctor";
    }
  }

  // to make the user submit the form whem the button is pressed
  if (mouseX > 150 && mouseX < 200 && mouseY > 375 && mouseY < 395 && appState === "ngo") {
    //changing the state
    appState = "ngo over";

    // adding the ngo submition no
    n_submition_no += 1;
    
    // updating the no
    database.ref('/').update({
      ngo_count: n_submition_no
    });

  }

  // to make the user submit the form whem the button is pressed
  if (mouseX > 150 && mouseX < 200 && mouseY > 375 && mouseY < 395 && appState === "doctor2") {
    //changing the state
    appState = "doctor over";

    // adding the doctor submition no
    d_submition_no += 1;
    // updating the no
    database.ref('/').update({
      doctor_count: d_submition_no
    });
  }

  // to make the user go to the next page
  if (mouseX > 150 && mouseX < 200 && mouseY > 375 && mouseY < 395 && appState === "doctor") {
    //changing the appstate
    appState = "doctor2";
  }
}

function ngo() {
  // to show to input boxes
  n_input2.show();
  n_input3.show();
  n_input.show()
  type.show();
  Animal_type.show()

  // to position the input boxes
  n_input2.position(25, 160);
  n_input3.position(25, 215);
  n_input.position(5, 280);
  type.position(100, 340); 
  Animal_type.position(25,115);
  
  //sizing
  type.size(50,15)

  //to display the image once the file is chosen 
  if (n_img) {
    image(n_img, 25, 310, 60, 60);
  }

  // questions for the user at the ngo screen
  fill("black");
  text("Pls Enter The Data Type",100,315);
  text("Of Your Image",100,330)
  text("Animal type",15,100)
  text("Please A Upload Photo", 15, 260);
  text("Of The Animal", 15, 275);
  text("Your Phone No", 15, 205);
  fill("black");
  textSize(15)
  text("Summary Of The Issue", 15, 150);

  // to make the button get bigger when the mouse is over the submit button
  if (mouseX > 150 && mouseX < 200 && mouseY > 375 && mouseY < 395) {
    image(submit_img, 149, 374, 52, 22);
  } else {
    image(submit_img, 150, 375, 50, 20);
  }
}

function handleFile(file) {
  // to show the file chosen
  fill("red")
  print(file);
  // to load the image chosen by the user
  if (file.type === 'image') {
    n_img = loadImage(file.data);
  } else {
    n_img = null;
  }
}

function handleFile1(file) {
  // to show the file chosen 
  fill("red"); 
  print(file);
  // to load the image chosen by the user
  if (file.type === 'image') {
    d_img = loadImage(file.data);
  } else {
    d_img = null;
  }
}

function doctor() {
  // to show to input boxes
  d_input1.show();
  d_input2.show();
  d_input3.show();
  Animal_type.show()

  // to position the input boxes
  d_input1.position(25, 100);
  d_input2.position(25, 160);
  d_input3.position(25, 215);
  Animal_type.position(25,270);

  // questions for the person
  text("Your Name", 15, 90);
  text("Your Pets Name", 15, 150);
  text("A Small Description", 15, 200);
  text("Of The Problem", 15, 210);
  text("Type Of Your Pet",15,260);


  // to make the button get bigger when the mouse is over the submit button
  if (mouseX > 150 && mouseX < 200 && mouseY > 375 && mouseY < 395) {
    image(next_img, 149, 374, 52, 22);
  } else {
    image(next_img, 150, 375, 50, 20);
  }
}

function doctor2() {

  // to show to input boxes
  dn_input1.show();
  dn_input2.show();
  d_input.show()
  type.show();
  

  // to position the input boxes
  dn_input1.position(25, 100);
  dn_input2.position(25, 160);
  d_input.position(5, 210);
  type.position(160,300);

  // questions for the person
  text("Your Phone Number", 15, 90);
  text("Age Your Pet", 15, 150);
  text("Photo Of Your Pet", 15, 200);
  textSize(15);
  text("Data type of ", 160, 272);
  text("the Image",160,285);

  //to display the image once the file is chosen 
  if (d_img) {
    image(d_img, 10, 240, 100, 100);
  }

  // to make the button get bigger when the mouse is over the submit button
  if (mouseX > 150 && mouseX < 200 && mouseY > 375 && mouseY < 395) {
    image(submit_img, 149, 374, 52, 22);
  } else {
    image(submit_img, 150, 375, 50, 20);
  }
}
