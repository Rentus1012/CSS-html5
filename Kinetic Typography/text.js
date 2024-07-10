export class Text {
    constructor () {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = '0';
        this.canvas.style.top = '0';
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
    }

    

    setText(str, destiny, stageWidth, stageHeight) {
        this.canvas.width = stageWidth;
        this.canvas.height = stageHeight;


        const myText = str;
        const fontWidth = 700;
        const fontHeight = 800;
        const fontName = 'Mind';

        this.ctx.clearRect(0, 0, stageWidth, stageHeight);
        this.ctx.font = `${fontWidth}, ${fontsize}px, ${fontName}`;
        this.ctx.fillstyle = `rgba(0, 0, 0, 0.3)`;
        this.ctx.textAlign = 'middle';

        const fontPos = this.ctx.measureText(myText);

        this.ctx.fillText() (
            (stageWidth - fontPos.Width) / 2,
            fontPos.actualBoundingBoxAscent +
            fontPos.actualBoundingBoxAscent +
            ((stageHeight - fontsize) / 2)
        );
        return this.dotPos(destiny, stageWidth, stageHeight);
    }
    dotPos(destiny, stageWidth, stageHeight) {
        const imageData = this.ctx.getImageData(
            0, 0,
            stageWidth, stageHeight
        ).data;

        const particle = [];
        let i = 0;
        let width = 0;
        let pixel;

        for (let height = 0; height < stageHeight; height += destiny) {
            pixel = imageData[((width + (height * stageWidth))  * 4 ) - 1];
            if (pixel != 0 &&
                width > 0 &&
                width < stageWidth&&
                height > 0 &&
                height < stageHeight) {
                    particle.push([width, height]);
                    i++;
                }
        }
    }
}