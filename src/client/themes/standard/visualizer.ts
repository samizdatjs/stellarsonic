import {inject} from 'aurelia-framework';
import {Player} from '@domain/player';

@inject(Player, 'stellarsonic.Analyser')
export class VisualizerCustomElement {
  canvas!: HTMLCanvasElement;

  public constructor(
    public player: Player,
    private analyser: AnalyserNode,
  ) {}

  bind() {
    const ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    const bufferLength = this.analyser.frequencyBinCount;

    const dataArray = new Uint8Array(bufferLength);

    const WIDTH = this.canvas.width;
    const HEIGHT = this.canvas.height;

    const barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    const renderFrame = () => {
      requestAnimationFrame(renderFrame);

      x = 0;

      this.analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0,0,WIDTH,HEIGHT);

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
       
        ctx.fillStyle = `rgba(214,176,155,${barHeight / 512})`;
        ctx.fillRect(x, 0, barWidth, barHeight / 2);

        x += barWidth + 1;
      }

      ctx.stroke();
    }

    renderFrame();
  }
}
