export const isScrollBottom = (dom?: HTMLElement | null):boolean => {
    if(!dom) return false;
    const scrollTop = dom.scrollTop; // 获取当前滚动条的位置
    const viewportHeight = dom.clientHeight
    const documentHeight = dom.scrollHeight; // dom的总高度
 
    return scrollTop + viewportHeight >= documentHeight; // 当滚动位置加上视口高度大于等于文档高度时，表明到达底部
}

export const downloadBlob = (_blob: Blob, name: string):void => {
    const blob = new Blob([_blob]); //处理文档流
    const elink = document.createElement('a');
    elink.style.display = 'none';
    elink.download = name? name: new Date().getTime() + ''
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href);
    document.body.removeChild(elink);
}

export function generateGradientColors(baseColor: string, steps: number) :string[] {
    let r = parseInt(baseColor.substring(1, 3), 16);
    let g = parseInt(baseColor.substring(3, 5), 16);
    let b = parseInt(baseColor.substring(5, 7), 16);
   
    let gradientColors = [];
    let stepR = (255 - r) / steps;
    let stepG = (255 - g) / steps;
    let stepB = (255 - b) / steps;
   
    for (let i = 0; i <= steps; i++) {
      let newR = Math.round(r + (stepR * i));
      let newG = Math.round(g + (stepG * i));
      let newB = Math.round(b + (stepB * i));
      let hex = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
      gradientColors.push(hex);
    }
   
    return gradientColors;
  }

  function rgbToHex(r: number, g: number, b: number): string {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .slice(1)
        .toUpperCase()}`;
}

function rgbaToHex(r: number, g: number, b: number, a: number): string {
    const hex = rgbToHex(r, g, b);
    return `${hex} (${a})`; // Alpha 不转换为十六进制
}

function hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;

    let r: number, g: number, b: number;
    if (h < 60) {
        r = c; g = x; b = 0;
    } else if (h < 120) {
        r = x; g = c; b = 0;
    } else if (h < 180) {
        r = 0; g = c; b = x;
    } else if (h < 240) {
        r = 0; g = x; b = c;
    } else if (h < 300) {
        r = x; g = 0; b = c;
    } else {
        r = c; g = 0; b = x;
    }

    return rgbToHex(Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255));
}

export function colorToHex(color: string): string | null {
    const tempElement = document.createElement('div');
    tempElement.style.color = color;
    document.body.appendChild(tempElement);
    const computedColor = getComputedStyle(tempElement).color;
    document.body.removeChild(tempElement);

    const rgbMatch = computedColor.match(/rgba?\((\d+), (\d+), (\d+)(?:, (\d+\.?\d*))?\)/);
    if (rgbMatch) {
        const r = parseInt(rgbMatch[1]);
        const g = parseInt(rgbMatch[2]);
        const b = parseInt(rgbMatch[3]);
        return rgbToHex(r, g, b);
    }
    
    return null; // 无法转换
}
