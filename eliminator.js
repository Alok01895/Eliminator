/** @type {HTMLCanvasElement} */


const button=document.getElementById("start")
var enemyFrame=0
button.addEventListener('click',()=>{
    

    
    const scorecard=document.getElementById("score")
    const score1=document.getElementById("score1")
    const popup2=document.getElementById("popup2")
    const restart=document.getElementById("restart")

    restart.addEventListener("click", ()=>{
        location.reload();
    })

    const popup=document.getElementById("popup")
    popup.style.display="none"
    const box=document.getElementById("box")
    box.style.opacity="1"
    const body=document.getElementById("body");
    body.style.margin=0;
    const bodyCtx=body.getContext('2d');
    const body_width=body.width=1600
    const body_height=body.height=690
    const bgImage=new Image();
    bgImage.src='/images/layer-5.png';
    var gamespeed=8;


    // enemies
    const enemies=document.getElementById("enemies")
    const enemyCtx=enemies.getContext('2d');
    const enemy_width=enemies.width=1600
    const enemy_height=enemies.height=500







    const canvas=document.getElementById("gamebox");
    const ctx=canvas.getContext('2d');

    const Canvas_width=canvas.width=1500;
    const Canvas_height=canvas.height=610;

    const playerImage=new Image();
     playerImage.src='/images/dog_left_right_white.png';
    var Eliminator_width=200;
    var Eliminator_height=181.5;
    var gameframe=0;
    var movingFrame=8;
    var playerState='run';
    function getInputDirection(){
        window.addEventListener("keydown", e=>{
           
            switch(e.key)
            {
                case 'i' : 
                playerState='idle'
                break;

                case 'w' : 
                playerState='jump'
                break;
                
                case 's' : 
                playerState='fall'
                break;
            
                case 'd' : 
                playerState='run'
                break;
                
                case ' ' : 
                playerState='sit'
                break;

                

                case 'ArrowRight' : 
                playerState='roll'
                break;

                

                default : playerState=playerState
            }
        })
        return playerState;
    }

    const eliminatorAnimation=[];

    const animationStates=
    [
        {
            name: 'idle',
            frames: 7
        },
        {
            name: 'jump',
            frames: 7
        },
        {
            name: 'fall',
            frames: 7
        },
        {
            name: 'run',
            frames: 9
        },
        {
            name: 'sit',
            frames: 5
        },
        {
            name: 'roll',
            frames: 7
        },
    ]

    animationStates.forEach((states,Index)=>{
        let frames= 
        {
            loc:[],
        }
        for(let i=0;i<states.frames;i++)
        {
            if(i%2==0)
            {
                let positionX=i*Eliminator_width;
                let positionY=Index*Eliminator_height*2;
                frames.loc.push({x: positionX,y:positionY});
                
            }
            
        }
        eliminatorAnimation[states.name]=frames;
    })
    console.log(eliminatorAnimation)
    var x=0;
    var x2=2400;

    function animate1()
    {
        var movement=getInputDirection()
        bodyCtx.clearRect(0,0,body_width,body_height)
        bodyCtx.drawImage(bgImage,x,0)
        bodyCtx.drawImage(bgImage,x2,0)

        if(movement!='sit')
        {
            if(x<-2400) x=2400+x2-gamespeed
            else x-= gamespeed
            if(x2<-2400) x2=2400+x-gamespeed
            else x2-= gamespeed
        }

        requestAnimationFrame(animate1);

    }
    animate1();
    var eliminatorposX=150;
   
    var eleminatorposY=Canvas_height-Eliminator_height+8;
    var eleminatorposY1=Canvas_height-Eliminator_height+8;
    var DogState=getInputDirection();
    function animate()
    {
        
        ctx.clearRect(0,0,Canvas_width,Canvas_height)
        var position=Math.floor(gameframe/movingFrame)%eliminatorAnimation[DogState].loc.length;
        let frameX=position*Eliminator_width;
        let frameY=eliminatorAnimation[DogState].loc[position].y;
        // ctx.strokeRect(eliminatorposX,eleminatorposY,Eliminator_width,Eliminator_height);

        ctx.drawImage(playerImage,frameX,frameY,Eliminator_width,Eliminator_height,eliminatorposX,eleminatorposY,Eliminator_width,Eliminator_height);
        gameframe+=1;
        
        
        ElemPos();
        changeState()
        requestAnimationFrame(animate);
        
    }
    animate();
    var GameOver=eleminatorposY;
    function ElemPos() {
         GameOver={
            a:eleminatorposY,
            b:Eliminator_width,
            c:eliminatorposX,
            d:Eliminator_height,
            e:DogState
         }
        
        return GameOver;
    }
    var cout=0;
    var curPos="bottom"
    function changeState()
    {
        
        DogState=getInputDirection() 
    
        

        switch(DogState)
        {
            case 'jump' :
                
                if(eleminatorposY>=50 && curPos!="top")
                {
                    eleminatorposY-=3
                    eliminatorposX+=2
                   
                }
                if(eleminatorposY<=50)
                {
                    curPos="top"
                    eliminatorposX+=2
                }
                if(curPos=="top" )
                {
                    eleminatorposY+=3
                    
                    DogState='fall'

                }
                if(eleminatorposY>=eleminatorposY1-2 && curPos=="top")
                {
                    
                   eleminatorposY=eleminatorposY1
                   DogState='run'
                    curPos="bottom"
                    if(eliminatorposX>150) eliminatorposX-=2
                   
                }
                
                

                break

            case 'fall' :
                if(eleminatorposY>=Canvas_height-Eliminator_height+8)
                {
                    eleminatorposY=eleminatorposY1
                    DogState='run'
                    if(eliminatorposX>150) eliminatorposX-=1.5
                }
                if(eleminatorposY<Canvas_height-Eliminator_height+8)
                {
                    eleminatorposY+=3
                }
                break

            case 'run':
                if(eleminatorposY<eleminatorposY1) eleminatorposY+=5
                if(eliminatorposX>150) eliminatorposX-=1.5
                break

            case 'sit':
                eleminatorposY=eleminatorposY1+4
                break

            case 'roll':
                if(eleminatorposY<eleminatorposY1) 
                {
                    eleminatorposY+=5
                    eliminatorposX+=2
                   
                }
               
                break
        }
        
    }
    var score=0

    class Enemy{
        constructor()
        {
            this.image=new Image()
            this.image.src='/images/enemy1.png'
            this.enemyWidth=293
            this.enemyHeight=155
            this.width=this.enemyWidth/3
            this.height=this.enemyHeight/3
            this.frame=0
            this.x=1580
            this.y=(Math.random() * (410))+10;
            this.flapspeed=Math.floor(Math.random()*3 +1)
            this.angle=Math.random()*2
        }
        update()
        {
           
             this.x=this.x-Math.random()*2
            this.y+=Math.sin(this.angle)
            this.angle+=0.1
            if(gameframe%this.flapspeed==0)
            {
                this.frame>4?this.frame=0:this.frame++
            }
            
            var myGame=ElemPos()
            
          
       
            if(this.x<myGame.b+myGame.c+10
                && this.width + this.x> myGame.c+10
                && this.y< myGame.a+myGame.d-150
                &&  this.y + this.height> myGame.a+10)
            {
                if(myGame.e=='roll')
                {
                 this.image.src=''
                 this.x=-10
                 score++
                 scorecard.innerHTML=score*10
                 console.log(score)
                }
                else{
                 box.style.opacity="0"
                 popup2.style.display="flex"
                 popup2.style.zIndex="14"
                 score1.innerHTML=score*10
                }
            }
           
            
        }
        draw(){
            enemyCtx.drawImage(this.image,this.frame* this.enemyWidth,0,this.enemyWidth,this.enemyHeight,this.x,this.y,this.width,this.height)
            // enemyCtx.strokeRect(this.x,this.y,this.width,this.height)
        }
        
    };
    const enemyArray=[]
    function createenemies()
    {
        enemyArray.push(new Enemy())
        
        
        
    }
    // createenemies()
    setInterval(createenemies,3500)
    function animate3()
    {
        enemyCtx.clearRect(0,0,enemy_width,enemy_height)
        enemyArray.forEach(enemy=>{
            enemy.draw()
            enemy.update()
            
        })
        
        enemyFrame++
        requestAnimationFrame(animate3);
    }
    animate3();

})


    