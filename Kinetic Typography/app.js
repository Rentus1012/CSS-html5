// app.js

import { Text } from './text.js';

class App {
    constructor() {
        WebFont.load({
            google: {
                families: ['Hind:700'] // 글꼴 이름 수정
            },
            fontactive: () => {
                console.log('Font loaded'); // 폰트 로딩 디버깅
                this.text = new Text();
                this.text.setText(
                    'B',
                    2,
                    document.body.clientWidth,
                    document.body.clientHeight
                );
                console.log('Text set'); // 텍스트 설정 디버깅
            },
            active: () => {
                console.log('WebFont active');
            },
            inactive: () => {
                console.log('WebFont inactive');
            }
        });
    }
}

window.onload = () => {
    new App();
    console.log('App loaded'); // 앱 로드 디버깅
};
