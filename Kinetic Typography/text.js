// text.js

export class Text {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = '0';
        this.canvas.style.top = '0';
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
    }

    setText(str, density, stageWidth, stageHeight) {
        this.canvas.width = stageWidth;
        this.canvas.height = stageHeight;

        const myText = str;
        const fontWidth = 700;
        const fontHeight = 800;
        const fontSize = 800; // 추가된 변수
        const fontName = 'Hind'; // 수정된 글꼴 이름

        this.ctx.clearRect(0, 0, stageWidth, stageHeight);
        this.ctx.font = `${fontWidth} ${fontSize}px ${fontName}`; // 템플릿 리터럴로 수정
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'; // fillstyle -> fillStyle, 색상 문자열 수정
        this.ctx.textBaseline = 'middle';
        const fontPos = this.ctx.measureText(myText);

        console.log('fontPos:', fontPos); // 폰트 위치 디버깅

        this.ctx.fillText(
            myText,
            (stageWidth - fontPos.width) / 2, // width 소문자로 수정
            (stageHeight / 2) // 수직 위치를 수정하여 가운데 맞춤
        );
        return this.dotPos(density, stageWidth, stageHeight);
    }

    dotPos(density, stageWidth, stageHeight) {
        const imageData = this.ctx.getImageData(0, 0, stageWidth, stageHeight).data;

        const particles = [];
        let i = 0;
        let width = 0;
        let pixel;

        for (let height = 0; height < stageHeight; height += density) {
            ++i;
            const slide = (i % 2) === 0;
            width = 0;
            if (slide) { // 비교 연산자 수정
                width += 6;
            }

            for (width; width < stageWidth; width += density) {
                pixel = imageData[((width + (height * stageWidth)) * 4) + 3]; // alpha 채널 인덱스 수정
                if (pixel !== 0 &&
                    width > 0 &&
                    width < stageWidth &&
                    height > 0 &&
                    height < stageHeight) {
                    particles.push({ x: width, y: height });
                }
            }
        }
        return particles;
    }
}
