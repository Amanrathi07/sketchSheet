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
      startx: number;
      starty: number;
      radius: number;
      endAngle: number;
    }
  | {
      type: "line";
      startx: number;
      starty: number;
      endx: number;
      endy: number;
    }
  | {
      type: "pencil";
      points: { x: number; y: number }[];
    };

interface shapeMap {
  id?: string;
  message: string;
}

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: any[];
  private roomId: number;
  private socket: WebSocket;
  private clicked = false;
  private startX = 0;
  private startY = 0;
  private selectedTool: tool = "circle";

  private pencilPoints: { x: number; y: number }[] = [];

  constructor(canvas: HTMLCanvasElement, roomId: number, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.existingShapes = [];
    this.roomId = roomId;
    this.socket = socket;

    this.init();
    this.initHandlers();
    this.initMouseHandlers();
  }

  setTool(tool: tool) {
    this.selectedTool = tool;
  }

  async init() {
    this.existingShapes = await getMessage(this.roomId);
    this.clearCanvas();
  }

  initHandlers() {
    this.socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "chat") {
        this.existingShapes.push(JSON.parse(msg.message));
        this.clearCanvas();
      }
    };
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = "white";

    this.existingShapes.forEach((s: shapeMap | shape) => {
      const fig = "message" in s ? JSON.parse(s.message) : s;

      if (fig.type === "rect") {
        this.ctx.strokeRect(fig.x, fig.y, fig.width, fig.height);
      }

      if (fig.type === "line") {
        this.ctx.beginPath();
        this.ctx.moveTo(fig.startx, fig.starty);
        this.ctx.lineTo(fig.endx, fig.endy);
        this.ctx.stroke();
      }

      if (fig.type === "circle") {
        this.ctx.beginPath();
        this.ctx.arc(fig.startx, fig.starty, fig.radius, 0, fig.endAngle);
        this.ctx.stroke();
      }

      if (fig.type === "pencil") {
        this.ctx.beginPath();
        fig.points.forEach((p: any, i: number) => {
          if (i === 0) this.ctx.moveTo(p.x, p.y);
          else this.ctx.lineTo(p.x, p.y);
        });
        this.ctx.stroke();
      }
    });
  }

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", (e) => {
      this.clicked = true;
      this.startX = e.clientX;
      this.startY = e.clientY - 73;

      if (this.selectedTool === "pencil") {
        this.pencilPoints = [{ x: this.startX, y: this.startY }];
      }
    });

    this.canvas.addEventListener("mousemove", (e) => {
      if (!this.clicked) return;

      const x = e.clientX;
      const y = e.clientY - 73;

      if (this.selectedTool === "Rectangle") {
        this.clearCanvas();
        this.ctx.strokeRect(
          this.startX,
          this.startY,
          x - this.startX,
          y - this.startY
        );
      }

      if (this.selectedTool === "line") {
        this.clearCanvas();
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
      }

      if (this.selectedTool === "circle") {
        this.clearCanvas();
        this.ctx.beginPath();
        this.ctx.arc(
          this.startX,
          this.startY,
          Math.abs(x - this.startX),
          0,
          Math.PI * 2
        );
        this.ctx.stroke();
      }

      if (this.selectedTool === "pencil") {
        this.pencilPoints.push({ x, y });
        this.clearCanvas();
        this.ctx.beginPath();
        this.pencilPoints.forEach((p, i) => {
          if (i === 0) this.ctx.moveTo(p.x, p.y);
          else this.ctx.lineTo(p.x, p.y);
        });
        this.ctx.stroke();
      }
    });

    this.canvas.addEventListener("mouseup", (e) => {
      this.clicked = false;

      let shape: shape | null = null;

      if (this.selectedTool === "Rectangle") {
        shape = {
          type: "rect",
          x: this.startX,
          y: this.startY,
          width: e.clientX - this.startX,
          height: e.clientY - this.startY,
        };
      }

      if (this.selectedTool === "line") {
        shape = {
          type: "line",
          startx: this.startX,
          starty: this.startY,
          endx: e.clientX,
          endy: e.clientY - 73,
        };
      }

      if (this.selectedTool === "circle") {
        shape = {
          type: "circle",
          startx: this.startX,
          starty: this.startY,
          radius: Math.abs(e.clientX - this.startX),
          endAngle: Math.PI * 2,
        };
      }

      if (this.selectedTool === "pencil") {
        shape = {
          type: "pencil",
          points: this.pencilPoints,
        };
      }

      if (!shape) return;

      this.socket.send(
        JSON.stringify({
          type: "chat",
          roomsId: this.roomId,
          message: JSON.stringify(shape),
        })
      );
    });
  }
}
