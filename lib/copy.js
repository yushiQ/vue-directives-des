const vueCopy = {
   /**
    * [bind 绑定函数，第一次绑定时调用]
    * @Author   stonehe
    * @modifier stonehe
    * @param    {[Object]}  el            [dom对象]
    * @param    {[Stirng]}  options.value [绑定值]
    */
    bind(el, { value }) {
        el.$value = value.value;
        el.handler = () => {
            if (!el.$value) {
                return;
            }
            // 动态创建 textarea 标签
            // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
            // 将要 copy 的值赋给 textarea 标签的 value 属性
            // 将 textarea 插入到 body 中
            // 选中值并复制
            const textarea = document.createElement('textarea');
            textarea.readOnly = 'readonly';
            textarea.style.position = 'absolute';
            textarea.style.left = '-9999px';
            textarea.value = el.$value;
            document.body.appendChild(textarea);
            textarea.select();
            textarea.setSelectionRange(0, textarea.value.length);
            const result = document.execCommand('Copy');
            if (result) {
                alert(value.message ? value.message : '复制成功' );
            }
            document.body.removeChild(textarea);
        };
        // 绑定点击事件，就是所谓的一键 copy 啦
        el.addEventListener('click', el.handler);
    },
    // 当传进来的值更新的时候触发
    componentUpdated(el, { value }) {
        el.$value = value;
    },
    unbind(el) {
        el.removeEventListener('click', el.handler);
    },
};

export default vueCopy;