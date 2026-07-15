/* ===========================================
        ROLE SWITCHER
=========================================== */

const roles = [
    "Backend Engineer",
    "Java Developer",
    "Cloud Enthusiast",
    "AI Builder",
    "Software Engineer"
];

const role = document.getElementById("role");

let currentRole = 0;

setInterval(() => {

    role.style.opacity = "0";

    setTimeout(() => {

        currentRole++;

        if(currentRole >= roles.length){

            currentRole = 0;

        }

        role.textContent = roles[currentRole];

        role.style.opacity = "1";

    },300);

},2500);


/* ===========================================
      NAVBAR BACKGROUND
=========================================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 60){

        navbar.style.background="rgba(10,16,30,.88)";
        navbar.style.backdropFilter="blur(22px)";
        navbar.style.boxShadow="0 15px 35px rgba(0,0,0,.35)";

    }

    else{

        navbar.style.background="rgba(10,16,30,.55)";
        navbar.style.boxShadow="none";

    }

});


/* ===========================================
      SMOOTH SCROLL
=========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


/* ===========================================
      SECTION REVEAL
=========================================== */

const sections=document.querySelectorAll(".section");

const observer=new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";
            entry.target.style.transform="translateY(0)";

        }

    });

},{

    threshold:.15

});

sections.forEach(section=>{

    section.style.opacity="0";

    section.style.transform="translateY(40px)";

    section.style.transition=".8s ease";

    observer.observe(section);

});


/* ===========================================
      SPACE BACKGROUND
=========================================== */

const canvas=document.getElementById("space");

const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let stars=[];

const STAR_COUNT=140;

class Star{

    constructor(){

        this.reset();

    }

    reset(){

        this.x=Math.random()*canvas.width;

        this.y=Math.random()*canvas.height;

        this.radius=Math.random()*1.7;

        this.opacity=Math.random();

        this.speed=Math.random()*0.05+.01;

    }

    update(){

        this.y+=this.speed;

        if(this.y>canvas.height){

            this.y=0;

            this.x=Math.random()*canvas.width;

        }

    }

    draw(){

        ctx.beginPath();

        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);

        ctx.fillStyle=`rgba(255,255,255,${this.opacity})`;

        ctx.fill();

    }

}

for(let i=0;i<STAR_COUNT;i++){

    stars.push(new Star());

}


/* ===========================================
        SHOOTING STAR
=========================================== */

let meteor=null;

function createMeteor(){

    meteor={

        x:Math.random()*canvas.width,

        y:-100,

        length:180,

        speed:14

    };

}

setInterval(createMeteor,14000);

function drawMeteor(){

    if(!meteor) return;

    ctx.beginPath();

    ctx.moveTo(meteor.x,meteor.y);

    ctx.lineTo(

        meteor.x-meteor.length,

        meteor.y-meteor.length

    );

    ctx.strokeStyle="rgba(255,255,255,.75)";

    ctx.lineWidth=2;

    ctx.stroke();

    meteor.x+=meteor.speed;

    meteor.y+=meteor.speed;

    if(meteor.y>canvas.height+200){

        meteor=null;

    }

}


/* ===========================================
      SPACE LOOP
=========================================== */

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    stars.forEach(star=>{

        star.update();

        star.draw();

    });

    drawMeteor();

    requestAnimationFrame(animate);

}

animate();


/* ===========================================
      WINDOW RESIZE
=========================================== */

window.addEventListener("resize",()=>{

    canvas.width=window.innerWidth;

    canvas.height=window.innerHeight;

});