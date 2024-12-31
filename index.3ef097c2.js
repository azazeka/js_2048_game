class t{constructor(t=null){t?this.state=t:this.state=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],this.score=0,this.status="idle"}setStatus(t){this.gameStatus=t}getStatus(){return this.status}getState(){return this.state.map(t=>[...t])}getScore(){return this.score}hasChanged(t,e){return JSON.stringify(t)!==JSON.stringify(e)}moveLeft(){if("playing"!==this.gameStatus)return;let t=!1,e=0;for(let s=0;s<4;s++){let a=this.state[s].filter(t=>0!==t);for(let s=0;s<a.length-1;s++)a[s]===a[s+1]&&(a[s]*=2,e+=a[s],a.splice(s+1,1),t=!0,s--);for(;a.length<4;)a.push(0);JSON.stringify(this.state[s])!==JSON.stringify(a)&&(t=!0),this.state[s]=a}return t&&(this.score+=e,this.addRandomTile(),this.checkGameEnd()),t}moveRight(){if("playing"!==this.gameStatus)return;let t=!1,e=0;for(let s=0;s<4;s++){let a=this.state[s].filter(t=>0!==t);for(let s=a.length-1;s>0;s--)a[s]===a[s-1]&&(a[s]*=2,e+=a[s],a.splice(s-1,1),t=!0);for(;a.length<4;)a.unshift(0);JSON.stringify(this.state[s])!==JSON.stringify(a)&&(t=!0),this.state[s]=a}return t&&(this.score+=e,this.addRandomTile(),this.checkGameEnd()),t}moveUp(){if("playing"!==this.gameStatus)return;let t=!1,e=0;for(let s=0;s<4;s++){let a=[];for(let t=0;t<4;t++)a.push(this.state[t][s]);a=a.filter(t=>0!==t);for(let s=0;s<a.length-1;s++)a[s]===a[s+1]&&(a[s]*=2,e+=a[s],a.splice(s+1,1),t=!0,s--);for(;a.length<4;)a.push(0);for(let e=0;e<4;e++)this.state[e][s]!==a[e]&&(t=!0,this.state[e][s]=a[e])}return t&&(this.score+=e,this.addRandomTile(),this.checkGameEnd()),t}moveDown(){if("playing"!==this.gameStatus)return;let t=!1,e=0;for(let s=0;s<4;s++){let a=[];for(let t=0;t<4;t++)a.push(this.state[t][s]);a=a.filter(t=>0!==t);for(let s=a.length-1;s>0;s--)a[s]===a[s-1]&&(a[s]*=2,e+=a[s],a.splice(s-1,1),t=!0);for(;a.length<4;)a.unshift(0);for(let e=0;e<4;e++)this.state[e][s]!==a[e]&&(t=!0,this.state[e][s]=a[e])}return t&&(this.score+=e,this.addRandomTile(),this.checkGameEnd()),t}start(){this.state=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],this.score=0,this.status="playing",this.addRandomTile(),this.addRandomTile()}addRandomTile(){let t=[];for(let e=0;e<4;e++)for(let s=0;s<4;s++)0===this.state[e][s]&&t.push([e,s]);if(t.length>0){let[e,s]=t[Math.floor(Math.random()*t.length)];this.state[e][s]=.9>Math.random()?2:4}}restart(){this.start()}hasAvailableMoves(){for(let t=0;t<4;t++)for(let e=0;e<3;e++)if(this.state[t][e]===this.state[t][e+1])return!0;for(let t=0;t<3;t++)for(let e=0;e<4;e++)if(this.state[t][e]===this.state[t+1][e])return!0;return!1}checkGameEnd(){for(let t=0;t<4;t++)for(let e=0;e<4;e++)if(2048===this.state[t][e])return this.status="win",!0;for(let t=0;t<4;t++)for(let e=0;e<4;e++)if(0===this.state[t][e])return!1;for(let t=0;t<4;t++)for(let e=0;e<3;e++)if(this.state[t][e]===this.state[t][e+1])return!1;for(let t=0;t<3;t++)for(let e=0;e<4;e++)if(this.state[t][e]===this.state[t+1][e])return!1;return this.status="lose",!0}#t(t){let e=JSON.stringify(this.state);return this.state=t,e!==JSON.stringify(this.state)}}document.addEventListener("DOMContentLoaded",()=>{let e=new t,s=document.querySelector(".button.start"),a=document.querySelector(".message-start"),i=document.querySelector(".message-lose"),r=document.querySelector(".message-win"),l=document.querySelector(".game-score"),n=document.querySelector(".game-field");document.body.style.overflow="hidden",document.body.style.position="fixed",document.body.style.width="100%",document.body.style.height="100%";let o=0,h=0;function d(){var t;t=e.getState(),document.querySelectorAll(".field-row").forEach((e,s)=>{e.querySelectorAll(".field-cell").forEach((e,a)=>{let i=t[s][a],r=parseInt(e.textContent)||0;e.classList.forEach(t=>{t.startsWith("field-cell--")&&e.classList.remove(t)}),0===i?(e.textContent="",e.className="field-cell"):(e.textContent=i,e.className=`field-cell field-cell--${i}`,r!==i&&(0===r?(e.classList.add("field-cell--new"),setTimeout(()=>{e.classList.remove("field-cell--new")},150)):i===2*r&&(e.classList.add("field-cell--merged"),setTimeout(()=>{e.classList.remove("field-cell--merged")},150))))})}),l.textContent=e.getScore();let n=e.getStatus();switch(a.classList.add("hidden"),i.classList.add("hidden"),r.classList.add("hidden"),n){case"idle":a.classList.remove("hidden"),s.textContent="Start";break;case"lose":i.classList.remove("hidden"),s.textContent="Play Again";break;case"win":r.classList.remove("hidden"),s.textContent="Play Again";break;default:s.textContent="Restart"}}n.addEventListener("touchstart",t=>{o=t.touches[0].clientX,h=t.touches[0].clientY},{passive:!0}),n.addEventListener("touchmove",t=>{"playing"===e.getStatus()&&t.preventDefault()},{passive:!1}),n.addEventListener("touchend",t=>{if("playing"!==e.getStatus())return;let s=t.changedTouches[0].clientX,a=t.changedTouches[0].clientY,i=s-o,r=a-h;if(!(30>Math.abs(i)&&30>Math.abs(r)))(Math.abs(i)>Math.abs(r)?i>0?e.moveRight():e.moveLeft():r>0?e.moveDown():e.moveUp())&&d()},{passive:!1}),document.addEventListener("keydown",t=>{if("playing"!==e.getStatus())return;let s=!1;switch(t.key){case"ArrowLeft":s=e.moveLeft();break;case"ArrowRight":s=e.moveRight();break;case"ArrowUp":s=e.moveUp();break;case"ArrowDown":s=e.moveDown();break;default:return}s&&d()}),s.addEventListener("click",()=>{s.classList.contains("start")?(s.classList.remove("start"),s.classList.add("restart"),s.textContent="Restart",a?.classList.add("hidden")):e.restart(),e.start(),e.setStatus("playing"),d()})});
//# sourceMappingURL=index.3ef097c2.js.map
