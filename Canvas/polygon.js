const PI2 = Math.PI * 2; // 2π 값 (원주율 곱하기 2)
const interactive = [
    '#ab45ab',
    '#554fb8',
    '#605ac7',
    '#2a91a8',
    '#2e9ab2',
    '#32a5bf',
    '#81b144',
    '#8fc549',
    '#e0af27',
    '#eeba2a',
    '#fec72e',
    '#bf342d',
    '#ca3931',
    '#d7423a'
];

export class Polygon {
    constructor(x, y, radius, sides) {
        this.x = x; // 중심의 x 좌표
        this.y = y; // 중심의 y 좌표
        this.radius = radius; // 반지름
        this.sides = sides; // 다각형의 변 수
        this.rotate = 0; // 회전 각도 초기값
    }

    animate(ctx, moveX) {
        ctx.save(); // 현재 상태 저장

        const angle = PI2 / this.sides; // 각 변의 각도 계산
        const angle2 = PI2 / 4; // 사각형의 각도 계산

        ctx.translate(this.x, this.y); // 캔버스의 중심을 다각형의 중심으로 이동
        this.rotate += moveX * 0.008; // 회전 각도를 업데이트
        ctx.rotate(this.rotate); // 다각형을 회전

        for (let i = 0; i < this.sides; i++) {
            ctx.fillStyle = interactive[i % interactive.length]; // 채우기 색상을 interactive 안에 있는 색상으로 설정

            const x = this.radius * Math.cos(angle * i); // x 좌표 계산
            const y = this.radius * Math.sin(angle * i); // y 좌표 계산

            ctx.save();
            ctx.translate(x, y); // 다각형의 중심을 각 변의 끝점으로 이동
            ctx.rotate(((360 / this.sides) * i + 45) * Math.PI / 180); // 변의 끝점을 기준으로 45도 회전
            ctx.beginPath();

            for (let j = 0; j < 4; j++) { // 사각형의 각 점을 계산
                const x2 = 160 * Math.cos(angle2 * j);
                const y2 = 160 * Math.sin(angle2 * j);
                (j == 0) ? ctx.moveTo(x2, y2) : ctx.lineTo(x2, y2);
            }
            ctx.fill(); // 사각형 채우기
            ctx.closePath();
            ctx.restore();

            // 주석 처리된 다각형 경로 그리기 코드
            // (i == 0) ? ctx.moveTo(x, y) : ctx.lineTo(x, y);

            // ctx.beginPath(); // 새로운 경로 시작
            // ctx.arc(x, y, 30, 0, PI2, false); // 각 꼭짓점에 원 그리기
            // ctx.fill(); // 원 채우기
        }

        // 주석 처리된 다각형 경로 채우기 및 종료 코드
        //ctx.fill();
        //ctx.closePath();
        ctx.restore(); // 저장된 상태 복원
    }
}




// const PI2 = Math.PI * 2;

// export class Polygon {
//     constructor(x,y,radius,sides) {
//         this.x = x;
//         this.y = y;
//         this.radius = radius;
//         this.sides = sides;
//         this.rotate = 0;
//     }

//     animate(ctx, moveX) {
//         ctx.save();
//         ctx.fillStyle = '#000';
//         //ctx.beginPath();

//         const angle = PI2 / this.sides;



//         ctx.translate(this.x, this.y);

//         this.rotate -= moveX * 0.008;
//         ctx.rotate(this.rotate);


//         for(let i=0; i < this.sides; i++){
//             const x = this.radius * Math.cos(angle * i);
//             const y = this.radius * Math.sin(angle * i);

//             //(i == 0) ? ctx.moveTo(x, y) : ctx.lineTo(x,y);

//             ctx.beginPath;
//             ctx.arc(x, y, 30, 0 ,PI2, false);
//             ctx.fill();
//         }
//         //ctx.fill();
//         //ctx.closePath();
//         ctx.restore();
//     }
// }