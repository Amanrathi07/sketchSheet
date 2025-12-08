
    type shape ={
        type:"rect" ;
        x:number ;
        y:number ;
        width:number ;
        height: number;
    }|{
        type:"circle" ;
        centerX:number ;
        centerY:number ;
        radius: number;
    }

export function initDraw(canvas){



    const ctx = canvas.getContext("2d");

    let existingShapes : shape[] = [] ;

    if(!ctx) return ;
    
    let clicked = false ;
      let startX = 0 ;
      let startY = 0 ;


      canvas.addEventListener("mousedown",(e)=>{
        clicked = true ;
        startX = e.clientX
        startY = e.clientY
      })
      canvas.addEventListener("mouseup",(e)=>{
        clicked =false ;
        const width  = e.clientX-startX
        const height = e.clientY-startY

        existingShapes.push({type:"rect" ,
            x: startX ,
            y:startY ,
            height : height ,
            width : width
        }) 
      })

      canvas.addEventListener("mousemove",(e)=>{
        if(clicked){
        const width  = e.clientX-startX
        const height = e.clientY-startY
        clearCanvas(existingShapes,ctx,canvas)
        ctx.strokeStyle = "rgb(255,255,255)"
        ctx.strokeRect(startX,startY,width,height) ;

        }
        
      })

}


function clearCanvas(existingShapes:shape[],ctx ,canvas){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.strokeStyle = "rgb(255,255,255)"

    ctx.fillRect(0,0,canvas.height,canvas.width);

    existingShapes.map((shape)=>{
        if(shape.type==="rect"){
        ctx.strokeRect(shape.x,shape.y,shape.width,shape.height) ;
            
        }
    })

}