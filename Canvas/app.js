import { Polygon } from "./polygon.js"; // Polygon 클래스 import

class App {
    constructor() {
        this.canvas = document.createElement('canvas'); // 새로운 캔버스 요소 생성
        document.body.appendChild(this.canvas); // 캔버스를 문서의 바디에 추가
        this.ctx = this.canvas.getContext('2d'); // 2D 컨텍스트 가져오기

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1; // 디바이스 픽셀 비율 설정

        window.addEventListener('resize', this.resize.bind(this), false); // 윈도우 리사이즈 이벤트 리스너 추가

        this.isDown = false; // 마우스 클릭 상태 초기값
        this.moveX = 0; // 이동 거리 초기값
        this.offsetX = 0; // 마우스 오프셋 초기값
    
        document.addEventListener('pointerdown', this.onDown.bind(this), false); // 포인터 다운 이벤트 리스너 추가
        document.addEventListener('pointermove', this.onMove.bind(this), false); // 포인터 이동 이벤트 리스너 추가
        document.addEventListener('pointerup', this.onUp.bind(this), false); // 포인터 업 이벤트 리스너 추가

        window.requestAnimationFrame(this.animate.bind(this)); // 애니메이션 프레임 요청

        this.resize(); // 초기 크기 설정 호출
    }

    resize() {
        this.stageWidth = document.body.clientWidth; // 스테이지 너비 설정
        this.stageHeight = document.body.clientHeight; // 스테이지 높이 설정

        this.canvas.width = this.stageWidth * this.pixelRatio; // 캔버스 너비 설정
        this.canvas.height = this.stageHeight * this.pixelRatio; // 캔버스 높이 설정
        this.ctx.scale(this.pixelRatio, this.pixelRatio); // 캔버스 스케일 설정

        this.polygon = new Polygon(
            this.stageWidth / 2, // 다각형의 중심 x 좌표
            this.stageHeight + (this.stageHeight /4.5), // 다각형의 중심 y 좌표 (위치를 선정한다.)
            this.stageHeight / 1.8, // 다각형의 반지름
            15 // 다각형의 변 수
            
        );
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this)); // 애니메이션 프레임 요청
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight); // 캔버스 초기화

        this.moveX *= 0.9; // 이동 거리 감소 (감속 효과)

        if (this.polygon) {
            this.polygon.animate(this.ctx, this.moveX); // 다각형 애니메이션 호출
        }
    }

    onDown(e) {
        this.isDown = true; // 마우스 클릭 상태 설정
        this.moveX = 0; // 이동 거리 초기화
        this.offsetX = e.clientX; // 마우스 오프셋 설정
        console.log('Pointer down:', e.clientX, e.clientY); // 디버그용 출력
    }

    onMove(e) {
        if (this.isDown) {
            this.moveX = e.clientX - this.offsetX; // 이동 거리 계산
            this.offsetX = e.clientX; // 마우스 오프셋 업데이트
        }
        console.log('Pointer move:', e.clientX, e.clientY); // 디버그용 출력
    }

    onUp(e) {
        this.isDown = false; // 마우스 클릭 상태 해제
    }
}

window.onload = () => {
    new App(); // 페이지 로드 시 App 인스턴스 생성
};





// // app.js
// import { Polygon } from "./polygon.js";


// class App {
//     constructor() {
//         this.canvas = document.createElement('canvas');
//         document.body.appendChild(this.canvas);
//         this.ctx = this.canvas.getContext('2d');

//         this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

//         // 이벤트 리스너에서 bind 사용하여 this를 바인딩합니다.
//         window.addEventListener('resize', this.resize.bind(this), false);



//         this.isDown = false;
//         this.moveX = 0;
//         this.offsetX = 0;
    
//         // pointerdown 이벤트와 pointermove 이벤트에 대한 메서드를 bind 합니다.
//         document.addEventListener('pointerdown', this.onDown.bind(this), false);
//         document.addEventListener('pointermove', this.onMove.bind(this), false);
//         document.addEventListener('pointerup', this.onUp.bind(this), false);
//         // requestAnimationFrame에도 bind를 사용하여 this를 바인딩합니다.
//         window.requestAnimationFrame(this.animate.bind(this));

//         this.resize(); // 초기 resize 호출
//     }

//     resize() {
//         this.stageWidth = document.body.clientWidth;
//         this.stageHeight = document.body.clientHeight;

//         this.canvas.width = this.stageWidth * this.pixelRatio;
//         this.canvas.height = this.stageHeight * this.pixelRatio;
//         this.ctx.scale(this.pixelRatio, this.pixelRatio);

//         this.polygon = new Polygon(
//             this.stageWidth / 2,
//             this.stageHeight / 2,
//             this.stageHeight / 3,
//             5 // ?각형을 생성합니다.
//         );
//     }

//     animate() {
//         window.requestAnimationFrame(this.animate.bind(this));
//         this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

//         this.moveX *= 0.92;


//         // polygon 객체의 animate 메서드 호출
//         if (this.polygon) {
//             this.polygon.animate(this.ctx, this.moveX);
//         }
//     }

//     onDown(e) {
//         this.isDown = true;
//         this.moveX = 0;
//         this.offsetX = e.clientX;
//         console.log('Pointer down:', e.clientX, e.clientY);
//     }

//     onMove(e) {
//         if (this.isDown) {
//             this.moveX = e.clientX - this.offsetX;
//             this.offsetX = e.clientX;
//         }
//         console.log('Pointer move:', e.clientX, e.clientY);
//     }
//     onUp(e) {
//         this.isDown = false;
//     }
// }

// // window.onload에 App 클래스 인스턴스를 생성합니다.
// window.onload = () => {
//     new App();
// };



// import { Polygon } from "./polygon.js";


// class App{
//     constructor(){
//         this.canvas = document.createElement('canvas');
//         document.body.appendChild(this.canvas);
//         this.ctx=this.canvas.getContext('2d');


//         this.pixelRatio= window.devicePixelRatio > 1 ? 2 : 1;

//         window.addEventListener('resize',this.resize.bind(this),false);
//         this.resize();

//         window.addEventListener('pointerdown', this.onDown.bind(this), false);
//         document.addEventListener('pointermove', this.onMove.bind(this), false);


//         window.requestAnimationFrame(this.animate.bind(this));
//     }
//     resize()
//     {
//         this.stageWidth = document.body.clientWidth;
//         this.stageHeight = document.body.clientHeight;

//         this.canvas.width = this.stageWidth * this.pixelRatio;
//         this.canvas.height = this.stageHeight * this.pixelRatio;
//         this.ctx.scale(this.pixelRatio,this.pixelRatio);

//         this.polygon = new Polygon(
//             this.stageWidth / 2,
//             this.stageHeight / 2,
//             this.stageHeight / 3,
//             3
//         );
//     }
//         animate(){
//             window.requestAnimationFrame(this.animate.bind(this));
//             this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

//             this.polygon.animate(this.ctx);
//         }
// }


// window.onload = ()  => {
//     new App();
// }