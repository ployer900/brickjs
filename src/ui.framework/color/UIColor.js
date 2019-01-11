/**
 * 颜色类
 */
export default class UIColor {
    constructor(color) {
        this.color = color;
    }
    initWithString(colorStr) {
        this.color = colorStr;
    }
}

UIColor.Red = '#F00';
UIColor.Green = '#0F0';
UIColor.Blue = '#00F';
UIColor.Gray = '#CCC';
