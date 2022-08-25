// Created by Karak10
window.addEventListener('load', (e)=>{
    var fired= [];
    for (let a=0; a<27;a++){
    fired[a]= 'false';
    }
    let canvas = document.querySelector('canvas');
    let c = canvas.getContext('2d');


    canvas.width = innerWidth;
    canvas.height = innerHeight;
    
    window.addEventListener('resize', (e)=>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;  
    });
    
    // Image constructor
    let image= class{
        constructor(x,t,u,id){
            this.x=x;
            this.t=t;
            this.u=u;
            this.id=id;
        }
        draw(){
            c.save();
            c.beginPath();
            var imageParametre
            imageParametre= new Image();
            imageParametre.src=this.id;
            var wrh = (imageParametre.width / imageParametre.height);
            var newWidth = canvas.width*0.2;
            var newHeight = newWidth / wrh;
            if (newHeight > canvas.height) {
                        newHeight = canvas.height;
                newWidth = newHeight * wrh;
            }
            var xOffset = newWidth < canvas.width ? ((canvas.width - newWidth) / 2) : 0;
            var yOffset = newHeight < canvas.height ? ((canvas.height - newHeight) / 2) : 0;
            c.translate(canvas.width/2,canvas.height/2 +this.t);
            c.rotate(-Math.PI/this.x);
            c.translate(-canvas.width/2, -canvas.height/2-this.u );
            c.drawImage(imageParametre,xOffset,yOffset, newWidth,newHeight);
            c.restore();
        }
    }

	// text constructor
	let text= class{
        constructor(id,x,y){
            this.x=x;
            this.y=y;
            this.id=id;
        }
        draw(){
            c.save();
            c.beginPath();
            c.textAlign= "center";
            c.textBaseLine= "middle";
            c.font= 'normal 35px Arial';
            c.fillStyle = "black";
            c.fillText(this.id, this.x, this.y);
            c.restore();
        }
    }
	
	// line constructor
	let line= class{
		constructor(x,y,x2,y2){
			this.x=x;
			this.y=y;
			this.x2=x2;
			this.y2=y2;
			}
			draw(){
			c.beginPath();
			c.moveTo(this.x,this.y);
			c.lineTo(this.x2,this.y2);
			c.strokeStyle= "black";
			c.lineWidth=2;
			c.stroke();}
			
			}
	
    // joystick constructor
    let joyStickConstructor = class{
    constructor(x, y, r, id){
    this.x = x;
    this.y = y;
    this.r = r;
    this.id = id;
    this.x2 = x;
    this.y2 = y;
    this.distance = {
        x: 0,
        y: 0
    }
    this.angle = 0;
    }
    // draws the joystick
    draw(){
    c.save();
    // draws the joystick's container
    c.fillStyle = 'grey';
    c.globalAlpha = 0.3;
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2); 
    c.fill();
    c.globalAlpha = 1;
    c.stroke();
    
    // draws the joystick
    if(this.id == 'shoot'){
    c.fillStyle = '#00BBC3';
    }
    if(this.id == 'move'){
    c.fillStyle = '#00BBC3';
    }
    c.beginPath();
    c.arc(this.x2,this.y2, this.r/2, 0, Math.PI*3);
    c.fill();
    c.stroke();
    if(this.id == 'shoot'){
    c.textAlign = "center";
    c.textBaseLine = "middle";
    c.font = 'normal 18px Arial';
    c.fillStyle = "white";
    c.fillText('Right', this.x2, this.y2 + 2);
    }
    
    if(this.id == 'move'){
    c.textAlign = "center";
    c.textBaseLine = "middle";
    c.font = 'normal 18px Arial';
    c.fillStyle = "white";
    c.fillText('Left', this.x2, this.y2 + 2);
    }
    c.restore();
    }
    update(){

    // checks if the horizontal 
    // distance between touch and 
    // the center of the joystick is greater 
    // than this.r / 1.2
    if(this.distance.x > this.r / 1.2){
    // if true then sets distance.x 
    // to this.r / 1.2
    this.distance.x = this.r / 1.2;
    }
    
    // checks if the vertical distance between 
    // the center of the joystick and the 
    // touch is greater than this.r / 1.2
    if(this.distance.y > this.r / 1.2){
    // if true sets this.distance 
    // to this.r / 1.2
    this.distance.y = this.r / 1.2;
    }
    
    
    // changes the x2 to 
    // the center of the container + 
    // Math.cos(angle) multiplied by the 
    // horizontal distance 
    this.x2 = this.x + Math.cos(this.angle) * this.distance.x;
    // changes the y2 to
    // the center of the container + 
    // Math.sin(angle) multiplied by the 
    // vertical distance 
    this.y2 = this.y + Math.sin(this.angle) * this.distance.y;
    // draws the joystick
    this.draw();
    }
    }
    
    // creates the move joystick
    let r = 100; 
    let y = canvas.height/2;
    let x = r + 150;
    
    let joyStick = new joyStickConstructor(x,y,r, 'move');
    
    // creates the shoot joystick
    let y2 = canvas.height/2;
    let x2 = canvas.width - r - 150;
    
    let shootJoyStick = new joyStickConstructor(x2,y2,r, 'shoot');

    //creates image
    var Img = new image(2,70,0,"Airship_phone.png");
    var Img2 = new image(0,-120,0,"Airship.JPG");
    
    //creates text
    var Txt = new text("LET'S GO",canvas.width/2,canvas.height/4);

	//creates lines
	let Line1= new line(canvas.width/2,canvas.height + 70,canvas.width/2,canvas.height + 40);
    let Line2= new line(canvas.width/2,canvas.height + 70,canvas.width/2+30,canvas.height + 70);
    
    // repositions joysticks if window changes size
    window.addEventListener('resize', ()=>{
    shootJoyStick.y = canvas.height - r - 20;
    joyStick.y = canvas.height - r - 20;
    });
    
    // variables that will let us know
    // wether joysticks are in use
    let shootJoyStickActive = false;
    let joyStickActive = false;
    
    // variables that will keep track of the 
    // touch which drags each joystick
    let touchIndex;
    let touchIndex2;
    
    // variables that will keep track of the 
    // position of the touches 
    let touchPosition = null;
    let touchPosition2 = null;
    
    // function that returns true if touch passed
    // as it's parameter was made over the 
    // move joystick
    function touchedMoveJoystick(touch){
    return touch.clientX > joyStick.x - joyStick.r && touch.clientX < joyStick.x + joyStick.r && touch.clientY > joyStick.y - joyStick.r && touch.clientY < joyStick.y + joyStick.r;
    } 
    
    // function that returns true if touch passed
    // as it's parameter was made over the 
    // shoot joystick
    function touchedShootJoystick(touch){
    return touch.clientX > shootJoyStick.x - shootJoyStick.r && touch.clientX <             shootJoyStick.x + shootJoyStick.r && touch.clientY > shootJoyStick.y - shootJoyStick.r && touch.clientY < shootJoyStick.y + shootJoyStick.r;
    }
    
    window.addEventListener('gamepadconnected', (event) =>{
		const update = () => {
			for (const gamepad of navigator.getGamepads()){
				if (!gamepad) continue;
				if (!joyStickActive){
					let cx=gamepad.axes[0]*100;
					let cy=gamepad.axes[1]*100;
					joyStick.distance.x=Math.abs(cx);
					joyStick.distance.y=Math.abs(cy);
					joyStick.angle= Math.atan2(cy,cx);
				}
				if (!shootJoyStickActive){
					let cx1=gamepad.axes[2]*100;
					let cy1=gamepad.axes[3]*100;
					shootJoyStick.distance.x=Math.abs(cx1);
					shootJoyStick.distance.y=Math.abs(cy1);
					shootJoyStick.angle= Math.atan2(cy1,cx1);
				}
				if ((joyStick.distance.x>50) && (joyStick.distance.y<50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y<50) && ((-30<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <30))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[0]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[0]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/RightDiri");
            xttp.send();
            {Connection:close};
            Img = new image(4,70,0,"Airship_phone.png");
            Img2 = new image(0,-120,0,"Airship.png");
            Txt = new text("-",canvas.width/2,canvas.height/4);

    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y<50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y<50) && ((150<joyStick.angle*360/(2*3.14159)) || (joyStick.angle*360/(2*3.14159)<-150))){
        // console.log ("ok");
        // console.log (fired[0])
        if (fired[1]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[1]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/LeftDiri");
            xttp.send();
            {Connection:close};
            Img = new image(4/3,70,0,"Airship_phone.png");
            Img2 = new image(0,-120,0,"Airship.png");
            Txt = new text("-",canvas.width/2,canvas.height/4);

    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y<50) && ((30<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <50))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[2]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[2]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/DownRightDiri");
            xttp.send();
            {Connection:close};
            Img = new image(4,70,0,"Airship_phone.png");
            Img2 = new image(0,-90,0,"Airship.png");
            Txt = new text("DOWN",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y<50) && ((-50<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <-30))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[3]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[3]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/UpRightDiri");
            xttp.send();
            {Connection:close};
            Img = new image(4,70,0,"Airship_phone.png");
            Img2 = new image(0,-150,0,"Airship.png");
            Txt = new text("UP",canvas.width/2,canvas.height/4);

    }
    }

    if ((joyStick.distance.x<50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y<50) && ((-130<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <-50))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[4]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[4]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/UpDiri");
            xttp.send();
            Img = new image(2,70,0,"Airship_phone.png");
            Img2 = new image(0,-150,0,"Airship.png");
            Txt = new text("UP",canvas.width/2,canvas.height/4);
            {Connection:close};
    }
    }

    if ((joyStick.distance.x<50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y<50) && ((50<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <130))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[5]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[5]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/DownDiri");
            xttp.send();
            {Connection:close};
            Img = new image(2,70,0,"Airship_phone.png");
            Img2 = new image(0,-90,0,"Airship.png");
            Txt = new text("DOWN",canvas.width/2,canvas.height/4);

    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y<50) && ((-150<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <-130))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[6]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[6]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/UpLeftDiri");
            xttp.send();
            {Connection:close};
            Img = new image(4/3,70,0,"Airship_phone.png");
            Img2 = new image(0,-150,0,"Airship.png");
            Txt = new text("UP",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y<50) && ((130<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <150))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[7]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[7]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/DownLeftDiri");
            xttp.send();
            {Connection:close};
            Img = new image(4/3,70,0,"Airship_phone.png");
            Img2 = new image(0,-90,0,"Airship.png");
            Txt = new text("DOWN",canvas.width/2,canvas.height/4);

    }
    }

    if ((joyStick.distance.x<50) && (joyStick.distance.y<50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y<50)){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[8]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[8]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/");
            xttp.send();
            {Connection:close};
            Img = new image(2,70,0,"Airship_phone.png");
            Img2 = new image(0,-120,0,"Airship.png");
            Txt = new text("-",canvas.width/2,canvas.height/4);
    }
    }
    
    // NOW FOR RIGHT JOYSTICK DOWN:
    
    if ((joyStick.distance.x>50) && (joyStick.distance.y<50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((-30<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <30)) && ((50<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <130))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[18]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[18]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/RightDiri_DownCam");
            xttp.send();
            {Connection:close};
            Img = new image(4,100,0,"Airship_phone.png");
            Img2 = new image(0,-120,0,"Airship.png");
            Txt = new text("-",canvas.width/2,canvas.height/4);

    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y<50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((150<joyStick.angle*360/(2*3.14159)) || (joyStick.angle*360/(2*3.14159)<-150)) && ((50<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <130))){
        // console.log ("ok");
        // console.log (fired[0])
        if (fired[19]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[19]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/LeftDiri_DownCam");
            xttp.send();
            {Connection:close};
            Img = new image(4/3,100,0,"Airship_phone.png");
            Img2 = new image(0,-120,0,"Airship.png");
            Txt = new text("-",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((30<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <50)) && ((50<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <130))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[20]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[20]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/DownRightDiri_DownCam");
            xttp.send();
            {Connection:close};
            Img = new image(4,100,0,"Airship_phone.png");
            Img2 = new image(0,-90,0,"Airship.png");
            Txt = new text("DOWN",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((-50<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <-30)) && ((50<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <130))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[21]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[21]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/UpRightDiri_DownCam");
            xttp.send();
            {Connection:close};
            Img = new image(4,100,0,"Airship_phone.png");
            Img2 = new image(0,-150,0,"Airship.png");
            Txt = new text("UP",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x<50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((-130<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <-50)) && ((50<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <130))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[22]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[22]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/UpDiri_DownCam");
            xttp.send();
            {Connection:close};
            Img = new image(2,100,0,"Airship_phone.png");
            Img2 = new image(0,-150,0,"Airship.png");
            Txt = new text("UP",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x<50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((50<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <130))&& ((50<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <130))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[23]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[23]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/DownDiri_DownCam");
            xttp.send();
            {Connection:close};
            Img = new image(2,100,0,"Airship_phone.png");
            Img2 = new image(0,-90,0,"Airship.png");
            Txt = new text("DOWN",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((-150<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <-130))&& ((50<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <130))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[24]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[24]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/UpLeftDiri_DownCam");
            xttp.send();
            {Connection:close};
            Img = new image(4/3,100,0,"Airship_phone.png");
            Img2 = new image(0,-150,0,"Airship.png");
            Txt = new text("UP",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((130<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <150))&& ((50<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <130))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[25]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[25]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/DownLeftDiri_DownCam");
            xttp.send();
            {Connection:close};
            Img = new image(4/3,100,0,"Airship_phone.png");
            Img2 = new image(0,-90,0,"Airship.png");
            Txt = new text("DOWN",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x<50) && (joyStick.distance.y<50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50)&& ((50<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <130))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[26]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[26]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/DownCam");
            xttp.send();
            {Connection:close};
            Img = new image(2,100,0,"Airship_phone.png");
            Img2 = new image(0,-120,0,"Airship.png");
            Txt = new text("-",canvas.width/2,canvas.height/4);
    }
    }
    
    //NOW FOR THE RIGHT JOYSTICK UP
    
    if ((joyStick.distance.x>50) && (joyStick.distance.y<50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((-30<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <30)) && ((-130<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <-50))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[9]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[9]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/RightDiri_UpCam");
            xttp.send();
            {Connection:close};
            Img = new image(4,20,0,"Airship_phone.png");
            Img2 = new image(0,-120,0,"Airship.png");
            Txt = new text("-",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y<50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((150<joyStick.angle*360/(2*3.14159)) || (joyStick.angle*360/(2*3.14159)<-150)) && ((-130<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <-50))){
        // console.log ("ok");
        // console.log (fired[0])
        if (fired[10]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[10]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/LeftDiri_UpCam");
            xttp.send();
            {Connection:close};
            Img = new image(4/3,20,0,"Airship_phone.png");
            Img2 = new image(0,-120,0,"Airship.png");
            Txt = new text("-",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((30<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <50)) && ((-130<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <-50))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[11]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[11]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/DownRightDiri_UpCam");
            xttp.send();
            {Connection:close};
            Img = new image(4,20,0,"Airship_phone.png");
            Img2 = new image(0,-90,0,"Airship.png");
            Txt = new text("DOWN",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((-50<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <-30)) && ((-130<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <-50))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[12]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[12]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/UpRightDiri_UpCam");
            xttp.send();
            {Connection:close};
            Img = new image(4,20,0,"Airship_phone.png");
            Img2 = new image(0,-150,0,"Airship.png");
            Txt = new text("UP",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x<50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((-130<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <-50)) && ((-130<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <-50))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[13]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[13]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/UpDiri_UpCam");
            xttp.send();
            {Connection:close};
            Img = new image(2,20,0,"Airship_phone.png");
            Img2 = new image(0,-150,0,"Airship.png");
            Txt = new text("UP",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x<50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((50<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <130))&& ((-130<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <-50))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[14]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[14]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/DownDiri_UpCam");
            xttp.send();
            {Connection:close};
            Img = new image(2,20,0,"Airship_phone.png");
            Img2 = new image(0,-90,0,"Airship.png");
            Txt = new text("DOWN",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((-150<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <-130)) && ((-130<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <-50))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[15]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[15]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/UpLeftDiri_UpCam");
            xttp.send();
            {Connection:close};
            Img = new image(4/3,20,0,"Airship_phone.png");
            Img2 = new image(0,-150,0,"Airship.png");
            Txt = new text("UP",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((130<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <150))&& ((-130<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <-50))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[16]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[16]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/DownLeftDiri_UpCam");
            xttp.send();
            {Connection:close};
            Img = new image(4/3,20,0,"Airship_phone.png");
            Img2 = new image(0,-90,0,"Airship.png");
            Txt = new text("DOWN",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x<50) && (joyStick.distance.y<50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50)&& ((-130<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <-50))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[17]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[17]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/UpCam");
            xttp.send();
            {Connection:close};
            Img = new image(2,20,0,"Airship_phone.png");
            Img2 = new image(0,-120,0,"Airship.png");
            Txt = new text("-",canvas.width/2,canvas.height/4);
    }
    }
				else{}
			}
			requestAnimationFrame(update);
		}
		update();
		});
    
    // event that triggers when touch starts
    canvas.addEventListener("touchstart", (e)=>{
        for (let a=0; a<27;a++){
            fired[a]= 'false';
            }
    // makes an array of the touches
    let touchArray = Array.from(e.touches);
    
    // loops through each touch object
    touchArray.forEach((touch, i)=>{
    // checks if touch was made over 
    // move joystick
    if(touchedMoveJoystick(touch)){
    // if true sets joyStickActive to true 
    // touchIndex to the index of the touch 
    // and touchPosition to touch.clientX
    joyStickActive = true;
    touchIndex = i;
    touchPosition = touch.clientX;
    } 
    // checks if the touch was made over the 
    // shoot joyatick
    else if(touchedShootJoystick(touch)){
    
    // if true sets shootJoyStickActive to true,
    // touchIndex2 to touch's index and
    // touchPosition2 to touch.clientX
    shootJoyStickActive = true;
    touchIndex2 = i;
    touchPosition2 = touch.clientX; 
    mousedown = true;
    }
    });
    });
    
    
    // triggers again and again as touch moves
    // around the screen
    canvas.addEventListener('touchmove', (e)=>{
    // creates an array of all the touches
    e.preventDefault();
    let touchArray = Array.from(e.touches); 
    // checks if move joystick is active
    if(joyStickActive){
    // if true loops through all the touches
    touchArray.forEach((touch, i)=>{
    // console.log(touch.clientX-joyStick.x);
    // checks wether the distance between the 
    // touch and the touchPosition set previously
    // is smaller than the radiusX formed by the
    // finger plush 10 
    if(Math.abs((touch.clientX - touchPosition)) < touch.radiusX + 10){
    // if true sets touchIndex to the index of
    // the touch which passed the test
    touchIndex = i;
    }
    });
    
    // tries the following code, since there is 
    // a chance an error may occured if touch 
    // cancelled for whatever reason or something
    // else happened
    try{
    // sets touchPosition to the new clientX 
    touchPosition = e.touches[touchIndex].clientX;  
    // gets horizontal distance between the 
    // center of the joystick and the touch
    let vx = 
    e.touches[touchIndex].clientX - joyStick.x;
    // gets vertical distance between the 
    // center of the joystick and the touch
    let vy= 
    e.touches[touchIndex].clientY - joyStick.y;
    // sets the distance.x and distance.y of 
    // joystick object to the distances 
    // calculated above, but makes sure they 
    // are given as positive values, direction
    // does not matter since we will 
    // rotate the joyStick 
    // console.log('vx:' + vx + 'vy:' + vy)
    joyStick.distance.x = Math.abs(vx);
    joyStick.distance.y = Math.abs(vy);
    // calculates the angle formed by the 
    // center of the joystick and the touch
    let angle = Math.atan2(vy, vx);
    // sets joystick.angle to the angle
    // we calculated above
    joyStick.angle = angle;
    } 
    // if the code above throws an error
    // this code deactivates the joystick
    // and resets the variables 
    catch{
    joyStickActive = false;
    joyStick.distance.x = 0;
    joyStick.distance.y = 0;
    joyStick.angle = 0;
    touchPosition = 0;
    touchIndex = -1;
    }
    } 
    
    // checks if shootJoyStickActive is true
    if(shootJoyStickActive){
    // if true loops through all the touches
    touchArray.forEach((touch, i)=>{
    // checks if the distance between the
    // touch.clientX and the touchPosition2 
    // that we set earlier is smaler than the 
    // radiusX formed by the finger plush 10
    if(Math.abs((touch.clientX - touchPosition2)) < touch.radiusX + 10){
    // if true sets touchIndex to the index of
    // the touch which passed the test
    touchIndex2 = i;
    }
    });
    
    // tries the following code, which may throw
    // errors under certain situations
    try{
    // updates touchPosition2 to new 
    // touch's position 
    touchPosition2 = e.touches[touchIndex2].clientX;
    // calculates horizontal and
    // vertical distances between the 
    // center of the shoot joystick and
    // the touch
    let vx = 
    e.touches[touchIndex2].clientX - shootJoyStick.x;
    let vy = 
    e.touches[touchIndex2].clientY - shootJoyStick.y;
    // sets the distance.x and distance.y 
    // of the shoot joystick to the distances
    // calculated above but makes sure we 
    // set them as positive values because 
    // we don't want a direction, since we 
    // will later use the angle to rotate it
    shootJoyStick.distance.x = Math.abs(vx);
    shootJoyStick.distance.y = Math.abs(vy);
    // calculates the angle of the vector
    let angle = Math.atan2(vy, vx);
    // sets the angle of the shootJoyStick to
    // the angle calculated above
    shootJoyStick.angle = angle;
    } 
    
    // if code above threw an error this 
    // diactivates the shoot joystick and 
    // resets the variables 
    catch{
    shootJoyStickActive = false;
    shootJoyStick.distance.x = 0;
    shootJoyStick.distance.y = 0;
    shootJoyStick.angle = 0;
    touchPosition2 = 0;
    touchIndex2 = -1;
    mousedown = false;
    }
    } 
    // console.log ("Lxvalue="+joyStick.distance.x +"&Lyvalue="+joyStick.distance.y+ "&Langle="+joyStick.angle*360/(2*Math.PI)+"&Rxvalue="+shootJoyStick.distance.x + "&Ryvalue="+ shootJoyStick.distance.y+ "&Rangle="+ shootJoyStick.angle)
    if ((joyStick.distance.x>50) && (joyStick.distance.y<50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y<50) && ((-30<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <30))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[0]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[0]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/RightDiri");
            xttp.send();
            {Connection:close};
            Img = new image(4,70,0,"Airship_phone.png");
            Img2 = new image(0,-120,0,"Airship.png");
            Txt = new text("-",canvas.width/2,canvas.height/4);

    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y<50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y<50) && ((150<joyStick.angle*360/(2*3.14159)) || (joyStick.angle*360/(2*3.14159)<-150))){
        // console.log ("ok");
        // console.log (fired[0])
        if (fired[1]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[1]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/LeftDiri");
            xttp.send();
            {Connection:close};
            Img = new image(4/3,70,0,"Airship_phone.png");
            Img2 = new image(0,-120,0,"Airship.png");
            Txt = new text("-",canvas.width/2,canvas.height/4);

    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y<50) && ((30<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <50))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[2]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[2]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/DownRightDiri");
            xttp.send();
            {Connection:close};
            Img = new image(4,70,0,"Airship_phone.png");
            Img2 = new image(0,-90,0,"Airship.png");
            Txt = new text("DOWN",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y<50) && ((-50<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <-30))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[3]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[3]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/UpRightDiri");
            xttp.send();
            {Connection:close};
            Img = new image(4,70,0,"Airship_phone.png");
            Img2 = new image(0,-150,0,"Airship.png");
            Txt = new text("UP",canvas.width/2,canvas.height/4);

    }
    }

    if ((joyStick.distance.x<50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y<50) && ((-130<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <-50))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[4]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[4]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/UpDiri");
            xttp.send();
            Img = new image(2,70,0,"Airship_phone.png");
            Img2 = new image(0,-150,0,"Airship.png");
            Txt = new text("UP",canvas.width/2,canvas.height/4);
            {Connection:close};
    }
    }

    if ((joyStick.distance.x<50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y<50) && ((50<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <130))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[5]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[5]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/DownDiri");
            xttp.send();
            {Connection:close};
            Img = new image(2,70,0,"Airship_phone.png");
            Img2 = new image(0,-90,0,"Airship.png");
            Txt = new text("DOWN",canvas.width/2,canvas.height/4);

    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y<50) && ((-150<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <-130))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[6]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[6]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/UpLeftDiri");
            xttp.send();
            {Connection:close};
            Img = new image(4/3,70,0,"Airship_phone.png");
            Img2 = new image(0,-150,0,"Airship.png");
            Txt = new text("UP",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y<50) && ((130<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <150))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[7]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[7]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/DownLeftDiri");
            xttp.send();
            {Connection:close};
            Img = new image(4/3,70,0,"Airship_phone.png");
            Img2 = new image(0,-90,0,"Airship.png");
            Txt = new text("DOWN",canvas.width/2,canvas.height/4);

    }
    }

    if ((joyStick.distance.x<50) && (joyStick.distance.y<50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y<50)){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[8]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[8]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/");
            xttp.send();
            {Connection:close};
            Img = new image(2,70,0,"Airship_phone.png");
            Img2 = new image(0,-120,0,"Airship.png");
            Txt = new text("-",canvas.width/2,canvas.height/4);
    }
    }
    
    // NOW FOR RIGHT JOYSTICK DOWN:
    
    if ((joyStick.distance.x>50) && (joyStick.distance.y<50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((-30<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <30)) && ((50<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <130))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[18]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[18]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/RightDiri_DownCam");
            xttp.send();
            {Connection:close};
            Img = new image(4,100,0,"Airship_phone.png");
            Img2 = new image(0,-120,0,"Airship.png");
            Txt = new text("-",canvas.width/2,canvas.height/4);

    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y<50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((150<joyStick.angle*360/(2*3.14159)) || (joyStick.angle*360/(2*3.14159)<-150)) && ((50<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <130))){
        // console.log ("ok");
        // console.log (fired[0])
        if (fired[19]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[19]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/LeftDiri_DownCam");
            xttp.send();
            {Connection:close};
            Img = new image(4/3,100,0,"Airship_phone.png");
            Img2 = new image(0,-120,0,"Airship.png");
            Txt = new text("-",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((30<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <50)) && ((50<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <130))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[20]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[20]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/DownRightDiri_DownCam");
            xttp.send();
            {Connection:close};
            Img = new image(4,100,0,"Airship_phone.png");
            Img2 = new image(0,-90,0,"Airship.png");
            Txt = new text("DOWN",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((-50<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <-30)) && ((50<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <130))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[21]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[21]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/UpRightDiri_DownCam");
            xttp.send();
            {Connection:close};
            Img = new image(4,100,0,"Airship_phone.png");
            Img2 = new image(0,-150,0,"Airship.png");
            Txt = new text("UP",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x<50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((-130<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <-50)) && ((50<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <130))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[22]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[22]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/UpDiri_DownCam");
            xttp.send();
            {Connection:close};
            Img = new image(2,100,0,"Airship_phone.png");
            Img2 = new image(0,-150,0,"Airship.png");
            Txt = new text("UP",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x<50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((50<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <130))&& ((50<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <130))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[23]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[23]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/DownDiri_DownCam");
            xttp.send();
            {Connection:close};
            Img = new image(2,100,0,"Airship_phone.png");
            Img2 = new image(0,-90,0,"Airship.png");
            Txt = new text("DOWN",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((-150<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <-130))&& ((50<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <130))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[24]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[24]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/UpLeftDiri_DownCam");
            xttp.send();
            {Connection:close};
            Img = new image(4/3,100,0,"Airship_phone.png");
            Img2 = new image(0,-150,0,"Airship.png");
            Txt = new text("UP",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((130<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <150))&& ((50<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <130))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[25]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[25]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/DownLeftDiri_DownCam");
            xttp.send();
            {Connection:close};
            Img = new image(4/3,100,0,"Airship_phone.png");
            Img2 = new image(0,-90,0,"Airship.png");
            Txt = new text("DOWN",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x<50) && (joyStick.distance.y<50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50)&& ((50<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <130))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[26]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[26]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/DownCam");
            xttp.send();
            {Connection:close};
            Img = new image(2,100,0,"Airship_phone.png");
            Img2 = new image(0,-120,0,"Airship.png");
            Txt = new text("-",canvas.width/2,canvas.height/4);
    }
    }
    
    //NOW FOR THE RIGHT JOYSTICK UP
    
    if ((joyStick.distance.x>50) && (joyStick.distance.y<50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((-30<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <30)) && ((-130<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <-50))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[9]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[9]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/RightDiri_UpCam");
            xttp.send();
            {Connection:close};
            Img = new image(4,20,0,"Airship_phone.png");
            Img2 = new image(0,-120,0,"Airship.png");
            Txt = new text("-",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y<50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((150<joyStick.angle*360/(2*3.14159)) || (joyStick.angle*360/(2*3.14159)<-150)) && ((-130<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <-50))){
        // console.log ("ok");
        // console.log (fired[0])
        if (fired[10]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[10]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/LeftDiri_UpCam");
            xttp.send();
            {Connection:close};
            Img = new image(4/3,20,0,"Airship_phone.png");
            Img2 = new image(0,-120,0,"Airship.png");
            Txt = new text("-",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((30<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <50)) && ((-130<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <-50))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[11]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[11]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/DownRightDiri_UpCam");
            xttp.send();
            {Connection:close};
            Img = new image(4,20,0,"Airship_phone.png");
            Img2 = new image(0,-90,0,"Airship.png");
            Txt = new text("DOWN",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((-50<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <-30)) && ((-130<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <-50))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[12]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[12]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/UpRightDiri_UpCam");
            xttp.send();
            {Connection:close};
            Img = new image(4,20,0,"Airship_phone.png");
            Img2 = new image(0,-150,0,"Airship.png");
            Txt = new text("UP",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x<50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((-130<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <-50)) && ((-130<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <-50))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[13]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[13]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/UpDiri_UpCam");
            xttp.send();
            {Connection:close};
            Img = new image(2,20,0,"Airship_phone.png");
            Img2 = new image(0,-150,0,"Airship.png");
            Txt = new text("UP",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x<50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((50<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <130))&& ((-130<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <-50))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[14]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[14]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/DownDiri_UpCam");
            xttp.send();
            {Connection:close};
            Img = new image(2,20,0,"Airship_phone.png");
            Img2 = new image(0,-90,0,"Airship.png");
            Txt = new text("DOWN",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((-150<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <-130)) && ((-130<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <-50))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[15]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[15]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/UpLeftDiri_UpCam");
            xttp.send();
            {Connection:close};
            Img = new image(4/3,20,0,"Airship_phone.png");
            Img2 = new image(0,-150,0,"Airship.png");
            Txt = new text("UP",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x>50) && (joyStick.distance.y>50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50) && ((130<joyStick.angle*360/(2*Math.PI)) && (joyStick.angle*360/(2*Math.PI) <150))&& ((-130<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <-50))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[16]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[16]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/DownLeftDiri_UpCam");
            xttp.send();
            {Connection:close};
            Img = new image(4/3,20,0,"Airship_phone.png");
            Img2 = new image(0,-90,0,"Airship.png");
            Txt = new text("DOWN",canvas.width/2,canvas.height/4);
    }
    }

    if ((joyStick.distance.x<50) && (joyStick.distance.y<50) && (shootJoyStick.distance.x<50) && (shootJoyStick.distance.y>50)&& ((-130<shootJoyStick.angle*360/(2*Math.PI)) && (shootJoyStick.angle*360/(2*Math.PI) <-50))){
        // console.log ("ok");
        // console.log (joyStick.angle*360/(2*Math.PI));
        // console.log ("2");
        if (fired[17]=='false'){
            for (let a=0; a<27;a++){
                fired[a]= 'false';
                }
            fired[17]='true';
            var xttp = new XMLHttpRequest();
            xttp.open("GET", "/UpCam");
            xttp.send();
            {Connection:close};
            Img = new image(2,20,0,"Airship_phone.png");
            Img2 = new image(0,-120,0,"Airship.png");
            Txt = new text("-",canvas.width/2,canvas.height/4);
    }
    }
    
    // var xttp= new XMLHttpRequest();
    // xttp.open ("GET", "/state?Lxvalue="+joyStick.distance.x +"&Lyvalue="+joyStick.distance.y+ "&Langle="+joyStick.angle+"&Rxvalue="+shootJoyStick.distance.x + "&Ryvalue="+ shootJoyStick.distance.y+ "&Rangle="+ shootJoyStick.angle, true);
    // xttp.send();
    // {Connection: close}
    });
    
    
    // triggers when a touch ends
    canvas.addEventListener('touchend', (e)=>{
    for (let a=0; a<27;a++){
    fired[a]= 'false';
    }
    var xttp = new XMLHttpRequest();
    xttp.open("GET", "/");
    xttp.send();
    {Connection:close};
    Img = new image(2,70,0,"Airship_phone.png");
    Img2 = new image(0,-120,0,"Airship.png");
    Txt = new text("-",canvas.width/2,canvas.height/4);
    if(e.cancelable){
       e.preventDefault();
    }
    // checks if the distance between the 
    // touchPosition and the position of the 
    // touch that ended were less than the
    // radiusX formed by the finger plush 10
    if(Math.abs((e.changedTouches[0].clientX - touchPosition)) < e.changedTouches[0].radiusX){ 
    // if true it deactivates the move
    // joyStick and resets the variables
    // linked to it
    joyStickActive = false;
    joyStick.distance.x = 0;
    joyStick.distance.y = 0;
    joyStick.angle = 0;
    touchPosition = 0;
    touchIndex = -1;
    }
    
    // checks if the distance between the 
    // touchPosition2 and the position of the 
    // touch that ended were less than the
    // radiusX formed by the finger plush 10
    if(Math.abs((e.changedTouches[0].clientX - touchPosition2)) < e.changedTouches[0].radiusX){
    // if true it deactivates the shoot
    // joyStick and resets the variables
    // linked to it
    shootJoyStickActive = false;
    shootJoyStick.distance.x = 0;
    shootJoyStick.distance.y = 0;
    shootJoyStick.angle = 0;
    touchPosition2 = 0;
    touchIndex2 = -1;
    // mousedown = false;
    } 
    // var xttp= new XMLHttpRequest();
    // xttp.open ("GET", "/state?Lxvalue="+joyStick.distance.x +"&Lyvalue="+joyStick.distance.y+ "&Langle="+joyStick.angle+"&Rxvalue="+shootJoyStick.distance.x + "&Ryvalue="+ shootJoyStick.distance.y+ "&Rangle="+ shootJoyStick.angle, true);
    // xttp.send();
    // {Connection: close}
    });
    
    // function that runs again and again
    let animate = function(){
    c.clearRect(0, 0, canvas.width,canvas.height);
    
    joyStick.update();
    shootJoyStick.update();
    Img.draw();
    //Img2.draw();
	Txt.draw();
	Line1.draw();
	Line2.draw();
    requestAnimationFrame(animate);
    }
    
    // starts the animation
    animate();
    
    });
