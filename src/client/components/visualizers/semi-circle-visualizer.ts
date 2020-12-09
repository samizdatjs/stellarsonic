import {inject, bindable} from 'aurelia-framework';
import {Player} from '@domain/player';
import {Color} from '@client/services/color';

@inject(Player, Color)
export class SemiCircleVisualizerCustomElement {
  @bindable color!: string;
  @bindable opacity!: number;
  canvas!: HTMLCanvasElement;
  value: any;

  public constructor(
    public player: Player,
    private colorService: Color,
  ) {}

  bind() {
    const ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    const dataArray = new Uint8Array(128);

    const renderFrame = () => {
      requestAnimationFrame(renderFrame);

      if (this.player.analyser) {
        this.player.analyser.getByteFrequencyData(dataArray);
        this.drawBars(ctx, dataArray);
      }
    }

    renderFrame();
  }

  drawBars (ctx: CanvasRenderingContext2D, array: Uint8Array) {
    const c = this.canvas;

    if (!c) {
      return;
    }

    var threshold = 0;
    ctx.clearRect(0, 0, c.width, c.height);
    var maxBinCount = array.length;
          
    ctx.save();

    ctx.globalCompositeOperation='source-over';

    ctx.scale(0.5, 0.5);
    ctx.translate(c.width, c.height);
    const color = this.colorService.hexToRgb(this.color);
    if (color) {
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${this.opacity})`
    }

    var bass = Math.floor(array[1]); //1Hz Frequenz 
    var radius = 0.2 * -(bass * 0.25 + 0.45 * c.width);

    var bar_length_factor = 1.5;
    ctx.rotate(-90 * Math.PI/180);   

    for ( var i = 0; i < maxBinCount; i++ ){
      var value = array[i];
      if (value >= threshold) {
        ctx.fillRect(0, radius, 1, -value / bar_length_factor);
        ctx.rotate((180 / maxBinCount) * Math.PI/180);   
      }
    }  
    
    for ( var i = 0; i < maxBinCount; i++ ){
      var value = array[i];
      if (value >= threshold) {				
        ctx.rotate(-(180 / maxBinCount) * Math.PI/180);
        ctx.fillRect(0, radius, 1, -value / bar_length_factor);
      }
    } 
    
    for ( var i = 0; i < maxBinCount; i++ ){

      var value = array[i];
      if (value >= threshold) {				
        ctx.rotate((180 / maxBinCount) * Math.PI/180);
        ctx.fillRect(0, radius, 1, -value / bar_length_factor);
      }
    } 
      
    ctx.restore();
  }
}
