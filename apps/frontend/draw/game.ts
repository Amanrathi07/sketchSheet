import { getMessage } from "./http";
import { tool } from "@/components/Canvas";

type shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    };

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: shape[];
  private roomId: number;
  private socket: WebSocket;
  private clicked: boolean;
  private startX: number;
  private startY: number;
  private newShape: any;
  private selectedTool: tool;
  constructor(canvas: HTMLCanvasElement, roomId: number, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.existingShapes = [];
    this.roomId = roomId;
    this.socket = socket;
    this.clicked = false;
    this.newShape = "";
    this.startX = 0;
    this.startY = 0;
    this.selectedTool = "circle";
    this.init();
    this.initHandlers();
    this.clearCanvas();
    this.initMouseHandlers();
  }

  setTool(tool) {
    this.selectedTool = tool;
  }

  async init() {
    this.existingShapes = await getMessage(this.roomId);
    console.log(this.existingShapes)
    this.clearCanvas();
  }

  initHandlers() {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "chat") {
        const parsedMessage = JSON.parse(message.message);
        this.existingShapes.push(parsedMessage);
        this.clearCanvas();
      }
    };
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = "rgb(255,255,255)";

    this.ctx.fillRect(0, 0, this.canvas.height, this.canvas.width);

    this.existingShapes.map((shape) => {
      let fig;
      if (shape.id) {
        fig = JSON.parse(shape.message);
      } else {
        fig = shape;
      }
      if (fig.type === "rect") {
        this.ctx.strokeRect(fig.x, fig.y, fig.width, fig.height);
      } else if (fig.type === "line") {
        this.ctx.beginPath();
        this.ctx.moveTo(fig.startx, fig.starty);
        this.ctx.lineTo(fig.endx, fig.endy);
        this.ctx.stroke();
      }
    });
  }

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", (e) => {
      this.clicked = true;
      this.startX = e.clientX;
      this.startY = e.clientY - 73;
    });

    this.canvas.addEventListener("mouseup", (e) => {
      this.clicked = false;
      const width = e.clientX - this.startX;
      const height = e.clientY - this.startY;

      if (this.selectedTool === "Rectangle") {
        this.newShape = {
          type: "rect",
          x: this.startX,
          y: this.startY,
          height: height,
          width: width,
        };
      } else if (this.selectedTool === "line") {
        this.newShape = {
          type: "line",
          startx: this.startX,
          starty: this.startY,
          endx: e.clientX,
          endy: e.clientY,
        };
      }
      
      this.socket.send(
        JSON.stringify({
          type: "chat",
          roomsId: this.roomId,
          message: JSON.stringify(this.newShape),
        })
      );
    });

    this.canvas.addEventListener("mousemove", (e) => {
      if (this.clicked) {
        if (this.selectedTool === "Rectangle") {
          const width = e.clientX - this.startX;
          const height = e.clientY - this.startY;
          this.clearCanvas();
          this.ctx.strokeStyle = "rgb(255,255,255)";
          this.ctx.strokeRect(this.startX, this.startY, width, height);
        } else if (this.selectedTool === "line") {
          this.clearCanvas();
          this.ctx.beginPath();
          this.ctx.moveTo(this.startX, this.startY);
          this.ctx.lineTo(e.clientX, e.clientY);
          this.ctx.stroke();
        }
      }
    });
  }
}
