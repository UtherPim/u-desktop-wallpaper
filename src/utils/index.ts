export const isScrollBottom = (dom: HTMLElement, viewportHeight: number):boolean => {
    const scrollTop = dom.scrollTop; // 获取当前滚动条的位置
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