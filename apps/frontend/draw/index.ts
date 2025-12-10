import axiosInstance from "@/lib/axiosInstance";

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

async function getMessage(id:number){
  const responce =await axiosInstance.post(`/room/allmessage`,{
        roomId:id
    })
    return responce.data.allMessages
}


export async function initDraw(canvas:HTMLCanvasElement,roomId:number,socket:WebSocket){

    if(!canvas)return

    const ctx = canvas.getContext("2d");
    let existingShapes : shape[] =  await getMessage(roomId);

    clearCanvas(existingShapes,ctx,canvas);

    if(!ctx) return ;
    

    let clicked = false ;
      let startX = 0 ;
      let startY = 0 ;


      socket.onmessage=(event)=>{
        const message = JSON.parse(event.data);
        
        if(message.type ==="chat"){
          const parsedMessage = JSON.parse(message.message);
          existingShapes.push(parsedMessage);
          clearCanvas(existingShapes ,ctx,canvas)
        }

      }
 

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

        socket.send(JSON.stringify({
          type:"chat",
          roomsId: roomId,
          message: JSON.stringify({type:"rect" ,
            x: startX ,
            y:startY ,
            height : height ,
            width : width
        })
        }))
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
      let fig
        if(shape.id){
          fig = JSON.parse(shape.message)
        }else{
          fig = shape
        }
        if(fig.type==="rect"){
        ctx.strokeRect(fig.x,fig.y,fig.width,fig.height) ;
            
        }
    })

}