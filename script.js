/* =====================================================
                ROLE CHANGER
===================================================== */

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

        role.innerText = roles[currentRole];

        role.style.opacity = "1";

    },300);

},2500);

/* =====================================================
                NAVBAR
===================================================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

    if(window.scrollY>40){

        navbar.style.background="rgba(8,14,30,.88)";
        navbar.style.boxShadow="0 12px 35px rgba(0,0,0,.35)";

    }

    else{

        navbar.style.background="rgba(9,14,28,.58)";
        navbar.style.boxShadow="none";

    }

});

/* =====================================================
                SMOOTH SCROLL
===================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({

            behavior:"smooth"

        });

    });

});

/* =====================================================
                SECTION REVEAL
===================================================== */

const sections=document.querySelectorAll(".section");

const observer=new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity=1;

            entry.target.style.transform="translateY(0)";

        }

    });

},{
    threshold:.15
});

sections.forEach(section=>{

    section.style.opacity=0;

    section.style.transform="translateY(50px)";

    section.style.transition=".8s ease";

    observer.observe(section);

});

/* =====================================================
                CUSTOM CURSOR
===================================================== */

const cursor=document.createElement("div");
cursor.className="cursor";

document.body.appendChild(cursor);

const ring=document.createElement("div");
ring.className="cursor-ring";

document.body.appendChild(ring);

let mouseX=0;
let mouseY=0;

window.addEventListener("mousemove",(e)=>{

    mouseX=e.clientX;
    mouseY=e.clientY;

    cursor.style.left=mouseX+"px";
    cursor.style.top=mouseY+"px";

});

function animateCursor(){

    let x=parseFloat(ring.style.left)||mouseX;
    let y=parseFloat(ring.style.top)||mouseY;

    x+=(mouseX-x)*0.18;
    y+=(mouseY-y)*0.18;

    ring.style.left=x+"px";
    ring.style.top=y+"px";

    requestAnimationFrame(animateCursor);

}

animateCursor();

document.querySelectorAll("a,.project-card,.about-card,.skill-box,.contact-grid a")
.forEach(item=>{

    item.addEventListener("mouseenter",()=>{

        ring.classList.add("active");

    });

    item.addEventListener("mouseleave",()=>{

        ring.classList.remove("active");

    });

});

/* =====================================================
                SPACE CANVAS
===================================================== */

const canvas=document.getElementById("space");
const ctx=canvas.getContext("2d");

function resize(){

    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

}

resize();

window.addEventListener("resize",resize);

/* =====================================================
                STARS
===================================================== */

const stars=[];

for(let i=0;i<180;i++){

    stars.push({

        x:Math.random()*canvas.width,

        y:Math.random()*canvas.height,

        r:Math.random()*1.6,

        a:Math.random(),

        s:Math.random()*.05+.01

    });

}

/* =====================================================
                PLANETS
===================================================== */

const planets=[

{

x:.82,

y:.18,

r:75,

color:"#526BFF"

},

{

x:.15,

y:.78,

r:45,

color:"#D4D4D4"

},

{

x:.73,

y:.65,

r:28,

color:"#D97A43"

}

];

/* =====================================================
                SHOOTING STAR
===================================================== */

let meteors=[];

function createMeteor(){

    meteors.push({

        x:Math.random()*canvas.width,

        y:-150,

        length:180,

        speed:12

    });

}

setInterval(createMeteor,12000);

/* =====================================================
                ANIMATION LOOP
===================================================== */

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    planets.forEach(p=>{

        const x=canvas.width*p.x;
        const y=canvas.height*p.y;

        const g=ctx.createRadialGradient(

            x,
            y,
            5,

            x,
            y,
            p.r

        );

        g.addColorStop(0,p.color);
        g.addColorStop(1,"transparent");

        ctx.beginPath();

        ctx.fillStyle=g;

        ctx.arc(x,y,p.r,0,Math.PI*2);

        ctx.fill();

    });

    stars.forEach(star=>{

        star.y+=star.s;

        if(star.y>canvas.height){

            star.y=0;

            star.x=Math.random()*canvas.width;

        }

        ctx.beginPath();

        ctx.fillStyle=`rgba(255,255,255,${star.a})`;

        ctx.arc(star.x,star.y,star.r,0,Math.PI*2);

        ctx.fill();

    });

    meteors.forEach((m,index)=>{

        ctx.beginPath();

        ctx.moveTo(m.x,m.y);

        ctx.lineTo(m.x-m.length,m.y-m.length);

        ctx.strokeStyle="rgba(255,255,255,.75)";

        ctx.lineWidth=2;

        ctx.stroke();

        m.x+=m.speed;

        m.y+=m.speed;

        if(m.y>canvas.height+250){

            meteors.splice(index,1);

        }

    });

    requestAnimationFrame(draw);

}

draw();

/* =====================================================
                ACTIVE NAV LINK
===================================================== */

const navLinks=document.querySelectorAll(".navbar a");

window.addEventListener("scroll",()=>{

    let current="";

    document.querySelectorAll("section").forEach(section=>{

        const top=section.offsetTop-150;

        if(scrollY>=top){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")=="#"+current){

            link.classList.add("active");

        }

    });

});