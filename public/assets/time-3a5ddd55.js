const s=()=>{let e="";const t=new Date().getHours();switch(t){case(t<8?t:t-1):{e="早上好";break}case(t<12?t:t-1):{e="上午好";break}case(t<18?t:t-1):{e="下午好";break}case(t<22?t:t-1):{e="晚上好";break}default:{e="hello";break}}return e},a=()=>{const e=new Date;return`${e.getFullYear()}年${e.getMonth()+1}月${e.getDate()}日${e.getHours()}时${e.getMinutes()}分${e.getSeconds()}秒`},r=()=>{const e=new Date;return`${e.getFullYear()}年${e.getMonth()+1}月${e.getDate()}日 ${e.getHours()}时：${e.getMinutes()}分：${e.getSeconds()}秒`};export{r as a,a as b,s as g};