(()=>{
const cv=document.getElementById('c'),M=cv.getContext('2d');
const C={g1:'#00826E',r1:'#F07878',l1:'#8C82E6',g2:'#1EA08C',nk:'#05232D',be:'#F0F0E1'};
const HF='Helvetica,Arial,sans-serif',CF='"Chakra Petch",Helvetica,Arial,sans-serif';
try{document.fonts.load('500 14px "Chakra Petch"')}catch(e){}
let cw=600,ch=480;
function resize(){cw=cv.clientWidth||600;ch=Math.round(Math.max(420,Math.min(cw*0.95,(window.innerHeight||900)*0.82,760)));cv.style.height=ch+'px';const d=window.devicePixelRatio||1;cv.width=Math.round(cw*d);cv.height=Math.round(ch*d);M.setTransform(d,0,0,d,0,0);if(LREADY)layout();}
resize();window.addEventListener('resize',resize);
const L=4000,FH=36,FALLS=[1150,2150,3150],ISL=[800,1700,2650];
const clamp=(v,a,b)=>v<a?a:v>b?b:v,lerp=(a,b,t)=>a+(b-a)*t;
const mix=(a,b,t)=>[lerp(a[0],b[0],t),lerp(a[1],b[1],t),lerp(a[2],b[2],t)],rgb=a=>'rgb('+(a[0]|0)+','+(a[1]|0)+','+(a[2]|0)+')';
const cxR=y=>210+55*Math.sin(y/420)+28*Math.sin(y/170+1);
const hwR=y=>Math.max(0,(118+28*Math.sin(y/260+2))*Math.min(1,(L+40-y)/320+0.2)*(y<0?1-y/50:1));
const cx=y=>y<=L?cxR(y):cxR(L);
const hw=y=>{const r=hwR(y);if(y<L-30)return r;const dy=y-LY;return Math.max(r,Math.abs(dy)<LR?Math.sqrt(LR*LR-dy*dy):0)};
const LY=L+300,LR=320,X0=cxR(L);
const PW='planb4ever';let reached=false,lake=false,LK=null,LS={h:0,r:0,s:0,k:0},toastQ=[];
const KIDS=['Iiih!','Mamma, en fisk!','Den nuddade mig!','Pappa! Fisken!','Den är jättestor!','Den har tittat på mig!'];
function buildLake(){const o={hurdles:[],rings:[],buoys:[],kids:[],cabin:{x:X0+262,y:LY+250}};
for(let i=0;i<4;i++)o.hurdles.push({x:X0-40,y:LY-190+i*85,a:0,cd:0,passed:0});
for(let i=0;i<3;i++)o.rings.push({x:X0+95+(i%2)*25,y:LY-160+i*105,z:16,flash:0});
for(let i=0;i<6;i++)o.buoys.push({x:X0-175,y:LY-200+i*72,side:i%2?1:-1,lit:0});
for(let i=0;i<4;i++)o.kids.push({x:X0+170+Math.random()*80,y:LY-120+i*80,hx:X0+170+Math.random()*80,hy:LY-120+i*80,vx:0,vy:0,t:Math.random()*6,scared:0,say:'',col:['#e85d75','#f2c230','#5aa9e6','#7cc576'][i],hair:['#4a2f1f','#e8c46a','#2b2b2b','#a0522d'][i]});
return o}
function inLake(y){return y>L-15}
function showLakeBtn(){reached=true;const b=document.getElementById('bLake');if(b)b.hidden=false}
function enterLake(){lake=true;LK=buildLake();endT=T;changed=true;S.chime();if(rec.length>4){ghost=rec.slice();ghostBest=1e9}showLakeBtn();toast('Källsjön! Här kostar inget ork. Lek fritt.');toastQ=['Nedströms flyttade sig några stenar. Nästa tur blir lättare.','Lösenordet till Källsjön är PlanB4ever. Det tar dig hit direkt nästa gång.','Prova hindren, ringarna och slalombanan. Badgästerna är skygga.']}
function goLake(){changed=true;startRun();f.y=L+40;f.x=X0;camX=f.x;camY=f.y-BACK;maxY=f.y;lake=true;LK=buildLake();showLakeBtn();toast('Välkommen tillbaka till Källsjön.');toastQ=['Prova hindren, ringarna och slalombanan. Badgästerna är skygga.']}
function lakeUpdate(dt,py){if(!LK)return;
if(toastT<=0&&toastQ.length)toast(toastQ.shift());
for(const h of LK.hurdles){h.cd-=dt}
for(const r of LK.rings){r.flash-=dt;if(f.air>0&&((py<r.y&&f.y>=r.y)||(py>r.y&&f.y<=r.y))&&Math.abs(f.x-r.x)<11&&f.z>5&&f.z<28){r.flash=1.2;LS.r++;S.ding();toast(pick(['Genom ringen!','Snyggt!','Som en delfin.']))}}
for(let i=0;i<LK.buoys.length;i++){const b=LK.buoys[i];if(!b.lit&&((py<b.y&&f.y>=b.y)||(py>b.y&&f.y<=b.y))&&Math.sign(f.x-b.x)===b.side&&Math.abs(f.x-b.x)<70){b.lit=1;S.tick();const n=LK.buoys.filter(q=>q.lit).length;LS.s=Math.max(LS.s,n);if(n===LK.buoys.length){S.chime();toast('Slalombanan klar!');setTimeout(()=>LK&&LK.buoys.forEach(q=>q.lit=0),2500)}}}
for(const k of LK.kids){k.t+=dt;if(k.scared>0){k.scared-=dt;k.x+=k.vx*dt;k.y+=k.vy*dt;k.vx*=Math.exp(-1.2*dt);k.vy*=Math.exp(-1.2*dt)}else{k.x+=(k.hx-k.x)*0.3*dt+Math.sin(k.t*0.7)*4*dt;k.y+=(k.hy-k.y)*0.3*dt+Math.cos(k.t*0.5)*4*dt;if(Math.random()<0.002){k.hx=X0+120+Math.random()*160;k.hy=LY-150+Math.random()*300}}
const c0=cx(k.y),h=hw(k.y);k.x=clamp(k.x,c0-h+14,c0+h-14);k.y=clamp(k.y,L+20,LY+LR-30);
const d=Math.hypot(f.x-k.x,f.y-k.y);if(d<26&&f.air<=0&&k.scared<=0.5){const dx=(k.x-f.x)/(d||1),dy=(k.y-f.y)/(d||1);k.vx=dx*90;k.vy=dy*90;k.scared=2.2;k.say=pick(KIDS);LS.k++;S.scream();if(d<14){f.x=k.x-dx*14;f.y=k.y-dy*14}}}}
function lakeAir(){if(!LK)return;for(const h of LK.hurdles){if(h.cd>0||h.passed)continue;const q=capQ(h,22,f.x,f.y);if(Math.hypot(q[0]-f.x,q[1]-f.y)<12)h.passed=1}}
function lakeLand(){if(!LK)return;let n=0;for(const h of LK.hurdles)if(h.passed){h.passed=0;h.cd=1.2;n++}if(n){LS.h+=n;S.ding();toast(n>1?'Över '+n+' hinder!':pick(['Över hindret!','Hopp!','Felfritt.']))}}
function lakeCollide(){if(!LK)return;for(const h of LK.hurdles){const q=capQ(h,22,f.x,f.y),dx=f.x-q[0],dy=f.y-q[1],d=Math.hypot(dx,dy),mn=11;if(d<mn&&d>0.01){f.x=q[0]+dx/d*mn;f.y=q[1]+dy/d*mn}}for(const b of LK.buoys){const dx=f.x-b.x,dy=f.y-b.y,d=Math.hypot(dx,dy);if(d<10&&d>0.01){f.x=b.x+dx/d*10;f.y=b.y+dy/d*10}}}
function lkSprites(add){if(!LK)return;
const c=LK.cabin,pc=P(c.x,c.y,0);if(pc&&pc[3]<1300)add({d:pc[3],fn:()=>{const[X,Y,k]=pc;g.globalAlpha=fogA(pc[3]);const j1=P(c.x-10,c.y-8,1),j2=P(c.x-70,c.y-60,1),j3=P(c.x-62,c.y-68,1),j4=P(c.x-2,c.y-16,1);if(j1&&j2&&j3&&j4){poly([[j1[0],j1[1]],[j2[0],j2[1]],[j3[0],j3[1]],[j4[0],j4[1]]]);g.fillStyle=bim?'#efe1c4':'#8a6a48';g.fill();ol(1)}
const w=46*k,h=26*k;g.fillStyle=bim?'#f3d6d2':'#9b2c22';g.fillRect(X-w/2,Y-h,w,h);if(bim){g.strokeStyle='#222';g.lineWidth=1;g.strokeRect(X-w/2,Y-h,w,h)}g.fillStyle=bim?'#e9e9e9':'#3a2f2a';poly([[X-w/2-3*k,Y-h],[X,Y-h-16*k],[X+w/2+3*k,Y-h]]);g.fill();ol(1);g.fillStyle='#f4f1e8';g.fillRect(X-w/2,Y-h,2*k,h);g.fillRect(X+w/2-2*k,Y-h,2*k,h);g.fillRect(X-15*k,Y-h*0.7,9*k,8*k);g.fillRect(X+6*k,Y-h*0.7,9*k,8*k);g.fillStyle=bim?'#cccccc':'#5a3a2a';g.fillRect(X-3*k,Y-h*0.55,6*k,h*0.55);g.globalAlpha=1}});
for(const h of LK.hurdles){const p=P(h.x,h.y,0);if(!p||p[3]>1100)continue;add({d:p[3],fn:()=>{const[X,Y,k]=p;g.globalAlpha=fogA(p[3]);g.save();g.translate(X,Y);g.scale(k,k*0.55);g.beginPath();if(g.roundRect)g.roundRect(-22,-4.5,44,9,4.5);else g.rect(-22,-4.5,44,9);g.fillStyle=bim?'#d8bf98':(h.cd>0?'#c9a874':'#7a5b3c');g.fill();g.strokeStyle=bim?'#222':'#4b3624';g.lineWidth=1/k;g.stroke();for(const sx of[-24,24]){g.beginPath();g.arc(sx,0,3.5,0,7);g.fillStyle=bim?'#ffffff':'#e8463a';g.fill();g.stroke()}g.restore();g.globalAlpha=1}})}
for(const r of LK.rings){const p=P(r.x,r.y,r.z),p0=P(r.x,r.y,0);if(!p||!p0||p[3]>1100)continue;add({d:p[3],fn:()=>{const[X,Y,k]=p;g.globalAlpha=fogA(p[3]);g.strokeStyle=bim?'#222':'#ffffff';g.lineWidth=Math.max(1,0.8*k);g.beginPath();g.moveTo(p0[0],p0[1]);g.lineTo(X,Y+11*k);g.stroke();g.fillStyle=bim?'#f6d0a8':'#f08a24';g.beginPath();g.ellipse(p0[0],p0[1],4*k,1.8*k,0,0,7);g.fill();ol(1);
g.lineWidth=Math.max(1.5,2.6*k);for(let i=0;i<8;i++){g.strokeStyle=r.flash>0?(i%2?'#ffe27a':'#ffffff'):(bim?(i%2?'#bfbfbf':'#ffffff'):(i%2?'#f08a24':'#ffffff'));g.beginPath();g.arc(X,Y,11*k,i*Math.PI/4,(i+1)*Math.PI/4);g.stroke()}if(bim){g.strokeStyle='#222';g.lineWidth=1;g.beginPath();g.arc(X,Y,12.5*k,0,7);g.stroke()}g.globalAlpha=1}})}
for(const b of LK.buoys){const p=P(b.x,b.y,0);if(!p||p[3]>1100)continue;add({d:p[3],fn:()=>{const[X,Y,k]=p;g.globalAlpha=fogA(p[3]);poly([[X,Y-12*k],[X-4*k,Y],[X+4*k,Y]]);g.fillStyle=bim?'#f3d6d2':'#e8463a';g.fill();ol(1);g.fillStyle='#ffffff';poly([[X-1.6*k,Y-7*k],[X+1.6*k,Y-7*k],[X+2.6*k,Y-4.5*k],[X-2.6*k,Y-4.5*k]]);g.fill();if(b.lit){g.fillStyle=bim?'#1f7ad6':'#7cf0a0';g.beginPath();g.arc(X,Y-13*k,2.4*k,0,7);g.fill()}g.globalAlpha=1}})}
for(const kd of LK.kids){const p=P(kd.x,kd.y,0);if(!p||p[3]>1100)continue;add({d:p[3],fn:()=>{const[X,Y,k]=p;g.globalAlpha=fogA(p[3]);const bob=Math.sin(kd.t*3)*0.8*k;
if(kd.scared>0&&!bim){g.fillStyle='rgba(255,255,255,0.7)';for(let i=0;i<5;i++){const a=kd.t*8+i*1.3;g.beginPath();g.arc(X+Math.cos(a)*9*k,Y-2*k+Math.sin(a*1.3)*2*k,1.3*k,0,7);g.fill()}}
g.lineWidth=Math.max(1,3*k);for(let i=0;i<6;i++){g.strokeStyle=bim?(i%2?'#dddddd':'#ffffff'):(i%2?'#ffffff':kd.col);g.beginPath();g.ellipse(X,Y+bob,7*k,3*k,0,i*Math.PI/3,(i+1)*Math.PI/3);g.stroke()}if(bim){g.strokeStyle='#222';g.lineWidth=1;g.beginPath();g.ellipse(X,Y+bob,8.5*k,4*k,0,0,7);g.stroke()}
const sw=Math.sin(kd.t*(kd.scared>0?14:4))*3*k;g.strokeStyle=bim?'#222':'#e8c6a3';g.lineWidth=Math.max(1,1.4*k);g.beginPath();g.moveTo(X-3*k,Y-3*k+bob);g.lineTo(X-8*k,Y-6*k+sw+bob);g.moveTo(X+3*k,Y-3*k+bob);g.lineTo(X+8*k,Y-6*k-sw+bob);g.stroke();
g.beginPath();g.arc(X,Y-6*k+bob,3.3*k,0,7);g.fillStyle=bim?'#f4f4f4':'#e8c6a3';g.fill();ol(1);g.beginPath();g.arc(X,Y-7*k+bob,3.4*k,Math.PI,0);g.fillStyle=bim?'#e0e0e0':kd.hair;g.fill();if(kd.scared>0){g.fillStyle='#222';g.beginPath();g.arc(X,Y-4.6*k+bob,0.9*k,0,7);g.fill()}
g.globalAlpha=1;if(kd.scared>0&&p[3]<500)bubble(kd.say,X,Y-10*k)}})}}
function lakeLabs(labs){if(!LK)return;const near=(o,name,z)=>{const dz=o.y-camY;if(dz>30&&dz<520){const q=P(o.x,o.y,z||0);if(q)labs.push([q[0],q[1],name,q[3]])}};LK.hurdles.slice(0,2).forEach(h=>near(h,'HINDER, HOPPA, 0 ORK'));LK.rings.forEach(r=>near(r,'RING, HOPPA IGENOM',r.z));near(LK.buoys[0],'SLALOMBANA, 6 BOJAR');LK.kids.slice(0,2).forEach(k=>near(k,'BADGÄST, SKYGG',6));near(LK.cabin,'STUGA, LÖSENORD: PlanB4ever',20)}

function rng(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
let changed=false,rocks=[];
function buildRocks(){const r=rng(11),a=[];for(let y=420;y<L-180;y+=60+r()*70){const skip=FALLS.some(f=>y>f-140&&y<f+FH+40)||ISL.some(i=>Math.abs(y-i)<90);const n=r()<0.35?2:1;for(let i=0;i<n;i++){const w=hw(y)-24,x=cx(y)+(r()*2-1)*w,rr=10+r()*12,yy=y+r()*20;if(!skip)a.push({x,y:yy,r:rr});}}
ISL.forEach(y=>a.push({x:cx(y),y,r:42,isl:true}));
if(changed){FALLS.forEach(f=>{a.push({x:cx(f-100),y:f-100,r:13,gift:true});a.push({x:cx(f-230)+18,y:f-230,r:12,gift:true});});for(let y=520;y<L-250;y+=330){if(!FALLS.some(f=>Math.abs(y-f)<280)&&!ISL.some(i=>Math.abs(y-i)<120))a.push({x:cx(y)-12,y,r:12,gift:true});}}
a.sort((p,q)=>p.y-q.y);return a;}
rocks=buildRocks();
const TREES=[];{const r=rng(5);for(let y=-200;y<L+800;y+=22){for(const sd of[-1,1]){if(r()<0.72)TREES.push({side:sd,off:14+r()*120,y:y+r()*14,h:34+r()*46,type:r()<0.22?1:0,tone:r()})}}}
const W0={vy:0,m:1};
function current(x,y){if(y>L-10){W0.vy=0;W0.m=1;return W0}const h=Math.max(hw(y),1),dx=(x-cx(y))/h,c=(44+14*clamp(y,0,L)/L)*(changed?0.92:1),prof=0.55+0.45*Math.max(0,1-dx*dx);let m=1;
for(const k of rocks){if(k.y<y-50)continue;if(k.y>y+220)break;const dy=k.y-y,len=k.r*4.5;if(dy>-k.r&&dy<len){const t=Math.max(0,dy)/len,half=k.r*(1.05-0.75*t),ax=Math.abs(x-k.x);if(ax<half){const f=0.05+0.95*Math.pow(t,1.6),e=ax/half;m=Math.min(m,f+(1-f)*e*e*e);}}}
let vy=-c*prof*m;if(m<0.3)vy+=14*(0.3-m)/0.3;
for(const f of FALLS){if(y>=f&&y<=f+FH){vy=-330;break}if(y>f-75&&y<f){vy*=1.5;break}}
W0.vy=vy;W0.m=m;return W0;}
let snd=true,bim=false,specs=false,clashes=0,AC=null,nb=null;
function ac(){try{if(!AC)AC=new(window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();}catch(e){}return AC}
function tone(type,f0,f1,dur,g,dl=0){if(!snd||!AC)return;const t=AC.currentTime+dl,o=AC.createOscillator(),v=AC.createGain();o.type=type;o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+dur);v.gain.setValueAtTime(g,t);v.gain.exponentialRampToValueAtTime(0.0008,t+dur);o.connect(v);v.connect(AC.destination);o.start(t);o.stop(t+dur+0.03)}
function noise(dur,g,f0,f1,ft,dl=0){if(!snd||!AC)return;if(!nb){nb=AC.createBuffer(1,AC.sampleRate,AC.sampleRate);const d=nb.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1}const t=AC.currentTime+dl,src=AC.createBufferSource(),fl=AC.createBiquadFilter(),v=AC.createGain();src.buffer=nb;fl.type=ft;fl.frequency.setValueAtTime(f0,t);fl.frequency.exponentialRampToValueAtTime(f1,t+dur);v.gain.setValueAtTime(g,t);v.gain.exponentialRampToValueAtTime(0.0008,t+dur);src.connect(fl);fl.connect(v);v.connect(AC.destination);src.start(t);src.stop(t+dur+0.03)}
const S={blubb:()=>tone('sine',240+Math.random()*90,480+Math.random()*160,0.09,0.05),
bonk:()=>{tone('square',150,55,0.15,0.06);noise(0.1,0.15,900,250,'lowpass')},
bump:()=>{tone('sine',320,140,0.12,0.08);tone('sine',500,260,0.08,0.04,0.06)},
snap:()=>{noise(0.07,0.25,3500,1500,'highpass');tone('square',900,400,0.04,0.03)},
thunk:()=>{tone('sine',160,55,0.28,0.15);noise(0.12,0.15,600,200,'lowpass')},
boat:()=>{tone('sine',180,90,0.3,0.12);tone('square',233,232,0.3,0.035,0.15);tone('square',196,195,0.45,0.035,0.5)},
whoosh:()=>noise(0.45,0.2,350,2600,'bandpass'),
big:()=>{noise(0.7,0.22,300,3200,'bandpass');tone('triangle',300,900,0.5,0.05)},
splash:()=>{noise(0.45,0.3,3000,400,'lowpass');tone('sine',700,160,0.18,0.05)},
bub:()=>tone('sine',700+Math.random()*600,1300+Math.random()*700,0.05,0.025),
fail:()=>tone('triangle',440,110,0.45,0.1),
wah:()=>{[392,370,349].forEach((f,i)=>tone('sawtooth',f,f*0.97,0.3,0.05,i*0.33));tone('sawtooth',330,290,1.0,0.05,0.99)},
squeak:()=>{tone('sine',1300,1900,0.08,0.06);tone('sine',1500,2100,0.08,0.05,0.1)},moo:()=>{tone('sawtooth',110,80,0.9,0.05);tone('sine',220,160,0.9,0.03)},plink:()=>{tone('triangle',1200,1250,0.25,0.06);tone('triangle',1800,1850,0.3,0.04,0.08)},chat:()=>{for(let i=0;i<4;i++){const q=300+Math.random()*250;tone('square',q,q*1.1,0.06,0.012,i*0.08)}},
tick:()=>{noise(0.05,0.08,3000,1500,'highpass')},knock:()=>{tone('sine',120,70,0.2,0.07);noise(0.06,0.06,500,200,'lowpass')},
ding:()=>{tone('triangle',880,880,0.25,0.07);tone('triangle',1320,1320,0.35,0.06,0.1)},scream:()=>{tone('sine',900,1500,0.18,0.05);tone('sine',1000,1700,0.22,0.05,0.2)},
chime:()=>{[523,659,784,1047,1319].forEach((f,i)=>tone('triangle',f,f*1.001,0.6,0.07,i*0.11))}};
const BONK=['Aj.','Sten.','Den stod där förut också.','Bonk.'],BUMP=['Ursäkta!','Förlåt, jag ska bara förbi.','Ni simmar åt fel håll.'],OVER=['Över!','Hej då!','Hopp hopp.','Ursäkta, jag tar vägen ovanför.'];
const DT=[{hl:8,rad:3,cost:3,sp:1.1,hit:['Kvist.','Pinne i fenan.','Knaster.'],name:'KVIST, −3 ORK'},{hl:17,rad:5,cost:8,sp:0.9,hit:['Stock! Aj.','Där kom en hel stock.','Dunk.'],name:'STOCK, −8 ORK'},{hl:14,rad:8,cost:16,sp:0.75,hit:['Båt!','Från båten: Se upp, fisken!','Någon tutade.'],name:'BÅT, −16 ORK, EJ I TIDPLAN'}];
const CHT=80,BACK=110;
let VX=0,VY=0,VW=600,VH=480,SIDE=0;
function layout(){if(bim){SIDE=cw>=520?Math.min(190,Math.round(cw*0.3)):0;VX=SIDE;VY=46;VW=cw-SIDE;VH=ch-46-22}else{SIDE=0;VX=0;VY=0;VW=cw;VH=ch}}
var LREADY=true;
const CANOE=['Det var DU som sa vänster.','Jag sa höger på kartan!','Kartan är upp och ner.','Det är den inte alls.','Vi skulle ha tagit bussen.','Paddla nu bara.','Var det en fisk?','Den simmar fortare än vi.'],BOTTLE=['Källan ligger där vattnet är klarast.','Vila i lä före forsen.','Hälsningar från kanotisterna. Vi är vilse.','Den som hoppar över båtar sparar ork.','Den som läser detta har för mycket fritid.'];
const SUD={canoe:{r:6,hl:20,name:'KANOT, TVÅ TURISTER, OENIGA',el:'Kanot'},duck:{r:6,name:'BADANKA, 0 ORK',el:'Badanka'},hat:{r:7,name:'SKYDDSHJÄLM, SAKNAS PÅ BYGGET',el:'Skyddshjälm'},moose:{r:16,name:'ÄLG, KORSAR ÄLVEN',el:'Älg'},bottle:{r:6,name:'FLASKPOST, LÄS MIG',el:'Flaskpost'},heron:{r:-1,name:'HÄGER, OBSERVATÖR',el:'Häger'}};
const SPT=Object.keys(SUD);let SU=[],surpT=4,lastSu='',toastTitle='Meddelande';
let g=M,W=600,H=480,hor=144,F=300;
function setView(w,h){W=w;H=h;hor=Math.round(H*0.3);F=0.66*H}
function P(x,y,z){const dz=y-camY;if(dz<6)return null;const k=F/dz;return[W/2+(x-camX)*k,hor+(CHT-z)*k,k,dz]}
let state='start',T=0,overT=1,endT=0,f={},camX=210,camY=190,maxY=300,rec=[],recT=0,ghost=null,ghostBest=-1,ghostOn=true,toastTxt='',toastT=0,blubT=0,bonkT=0,bumpT=0,bubT=0,spawnT=1,seen={},footNow=false,lastEff=0;
const keys={},bubbles=[],PT=[],ST=[],DB=[],rings=[];let steerId=null,px=0,py=0;
function inv(x,y){const lx=x-VX,ly=y-VY,h0=VH*0.3,F0=0.66*VH;let dz=ly>h0+3?CHT*F0/(ly-h0):900;dz=Math.min(dz,900);return[camX+(lx-VW/2)*dz/F0,camY+dz]}
const btn=()=>({x:VX+VW-50,y:VY+VH-50,r:bim?28:36});
function farPt(near){for(let i=0;i<14;i++){const dz=near?20+Math.random()*900:450+Math.random()*500,y=camY+dz,h=hw(y);if(h>15)return[cx(y)+(Math.random()*2-1)*h*0.95,y,0]}const y=camY+BACK;return[cx(y)+(Math.random()*2-1)*hw(y)*0.8,y,0]}
function resetFish(){f={x:cx(300),y:300,vx:0,vy:0,ang:Math.PI/2,stam:100,air:0,airD:1,at:0,z:0,tail:0,overs:0};camX=f.x;camY=f.y-BACK;maxY=300;}
resetFish();
for(let i=0;i<220;i++)PT.push(farPt(true));
for(let i=0;i<6;i++){const p=farPt(true);ST.push({x:p[0],y:p[1],ph:Math.random()*6})}
function toast(t){toastTxt=t;toastT=2.2;toastTitle='Meddelande'}
function hitToast(t,el){clashes++;if(bim){toastTxt='Element överlappar: Lax och '+el+'.';toastT=2.4;toastTitle='Varning'}else if(t)toast(t)}
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function startRun(){lake=false;LK=null;LS={h:0,r:0,s:0,k:0};toastQ=[];rocks=buildRocks();resetFish();state='play';T=0;rec=[];recT=0;toastT=0;DB.length=0;spawnT=1.5;SU=[];surpT=4;clashes=0;if(changed&&!seen.gift){seen.gift=1;toast('Stenarna du flyttade vid källan ligger kvar.')}for(let i=0;i<PT.length;i++)PT[i]=farPt(true);}
function endRun(k){state=k;overT=0;endT=T;steerId=null;const reached=k==='won'?1e9:maxY;if(rec.length>4&&reached>=ghostBest){ghost=rec.slice();ghostBest=reached}if(k==='won'){changed=true;S.chime()}else S.wah()}
function footOf(y){return FALLS.find(v=>y>v-75&&y<v+2)}
function capQ(o,hl,x,y){const ex=Math.cos(o.a)*hl,ey=Math.sin(o.a)*hl,ux=x-(o.x-ex),uy=y-(o.y-ey),u=clamp((ux*ex*2+uy*ey*2)/(4*hl*hl),0,1);return[o.x-ex+2*ex*u,o.y-ey+2*ey*u]}
function rockPush(o,hl,rad,dt){let hit=false;for(const r of rocks){if(r.y<o.y-80)continue;if(r.y>o.y+80)break;const q=hl>0?capQ(o,hl,r.x,r.y):[o.x,o.y],dx=q[0]-r.x,dy=q[1]-r.y,d=Math.hypot(dx,dy),mn=r.r+rad;if(d<mn){const nx=d>0.01?dx/d:1,ny=d>0.01?dy/d:0,p=mn-d;o.x+=nx*p;o.y+=ny*p;const side=Math.abs(nx)>0.05?Math.sign(nx):(o.x>=r.x?1:-1);o.vx=(o.vx||0)+side*80*dt;if(hl>0)o.va=(o.va||0)+((q[0]-o.x)*ny-(q[1]-o.y)*nx)*0.6*dt;hit=true}}return hit}
function segQ(d,x,y){const t=DT[d.k],ex=Math.cos(d.a)*t.hl,ey=Math.sin(d.a)*t.hl,ux=x-(d.x-ex),uy=y-(d.y-ey),u=clamp((ux*ex*2+uy*ey*2)/(4*t.hl*t.hl),0,1);return[d.x-ex+2*ex*u,d.y-ey+2*ey*u]}
function steerTarget(){const kx=(keys.ArrowRight||keys.d?1:0)-(keys.ArrowLeft||keys.a?1:0),ky=(keys.ArrowUp||keys.w?1:0)-(keys.ArrowDown||keys.s?1:0);if(kx||ky)return[f.x+kx*120,f.y+ky*120];if(steerId!==null)return inv(px,py);return null}
function tryJump(){if(state!=='play'||f.air>0)return;const foot=footOf(f.y),cost=(lake&&inLake(f.y))?0:(foot!==undefined?20:12);if(f.stam<cost){S.fail();toast('För lite ork för att hoppa. Vila i lä.');return}
const tg=steerTarget();let ux=Math.cos(f.ang),uy=Math.sin(f.ang);if(tg){const dx=tg[0]-f.x,dy=tg[1]-f.y,d=Math.hypot(dx,dy);if(d>8){ux=dx/d;uy=dy/d}}
f.ax0=f.x;f.ay0=f.y;f.overs=0;
if(foot!==undefined&&uy>0.2){f.ax1=f.x+ux*20;f.ay1=foot+FH+45;f.airD=0.8;f.zmax=40;S.big();toast('Uppför forsen!')}
else{f.ax1=f.x+ux*85;f.ay1=f.y+uy*85;for(const v of FALLS){if(f.ay1>=v-4&&f.ay1<=v+FH+8)f.ay1=v-6}f.airD=0.55;f.zmax=24;S.whoosh()}
f.air=f.airD;f.stam-=cost;f.ang=Math.atan2(uy,ux)}
function update(dt){
T+=dt;overT+=dt;if(toastT>0)toastT-=dt;
for(let i=0;i<PT.length;i++){const p=PT[i],w=current(p[0],p[1]);p[1]+=w.vy*dt;p[2]=w.vy;const dz=p[1]-camY;if(dz<10||dz>1000||hw(p[1])<3)PT[i]=farPt(false);}
for(const st of ST){if(inLake(st.y)){if(st.ang===undefined)st.ang=Math.random()*Math.PI*2;st.ang+=Math.sin(T*0.5+st.ph)*0.6*dt;const ox=st.x-X0,oy=st.y-LY;if(Math.hypot(ox,oy)>LR-45||st.y<L+25){let d=Math.atan2(-oy,-ox)-st.ang;d=Math.atan2(Math.sin(d),Math.cos(d));st.ang+=d*Math.min(1,1.8*dt)}st.x+=Math.cos(st.ang)*14*dt;st.y+=Math.sin(st.ang)*14*dt}else{st.ang=undefined;const w=current(st.x,st.y);st.y+=w.vy*dt*0.95;st.x+=Math.sin(T*0.8+st.ph)*6*dt+(st.vx||0)*dt;st.vx=(st.vx||0)*Math.exp(-0.8*dt);rockPush(st,0,5,dt)}const dz=st.y-camY;if(dz<-30||dz>1100||hw(st.y)<10){const p=farPt(false);st.x=p[0];st.y=p[1];st.ang=undefined}const c0=cx(st.y),h=hw(st.y);st.x=clamp(st.x,c0-h+8,c0+h-8);}
for(let i=bubbles.length-1;i>=0;i--){const b=bubbles[i];b.t+=dt;b.z=(b.z||0)+10*dt;b.x+=Math.sin(b.t*9)*8*dt;if(b.t>1)bubbles.splice(i,1)}
for(let i=rings.length-1;i>=0;i--){rings[i].t+=dt*1.4;if(rings[i].t>1)rings.splice(i,1)}
if(state!=='play')return;
spawnT-=dt;if(spawnT<=0&&!(lake&&f.y>L-150)){spawnT=0.7+Math.random()*1.0;if(DB.length<18){const r=Math.random(),k=r<0.55?0:r<0.88?1:2,y=camY+600+Math.random()*350,h=hw(y);if(h>20)DB.push({k,x:cx(y)+(Math.random()*2-1)*h*0.9,y,a:Math.random()*Math.PI,va:(Math.random()-0.5)*(k===2?0.4:1.5),hit:0,passed:0})}}
for(let i=DB.length-1;i>=0;i--){const d=DB[i],w=current(d.x,d.y);d.y+=w.vy*DT[d.k].sp*dt;d.x+=(d.vx||0)*dt;d.vx=(d.vx||0)*Math.exp(-0.8*dt);d.a+=d.va*dt;d.va=clamp(d.va,-2.5,2.5);d.hit-=dt;d.rt=(d.rt||0)-dt;if(rockPush(d,DT[d.k].hl,DT[d.k].rad,dt)&&d.rt<=0&&d.y-camY<350&&d.y>camY){d.rt=1.2;[S.tick,S.knock,S.knock][d.k]()}const c0=cx(d.y),h=hw(d.y);d.x=clamp(d.x,c0-h+10,c0+h-10);if(d.y-camY<-40||d.y<-200)DB.splice(i,1)}
surpT-=dt;if(surpT<=0&&!(lake&&f.y>L-150)){surpT=7+Math.random()*7;let tp;do{tp=pick(SPT)}while(tp===lastSu);lastSu=tp;const y=camY+750+Math.random()*200,h=hw(y);if(h>30){const o={tp,y,x:cx(y)+(Math.random()*2-1)*h*0.6,a:tp==='canoe'?Math.PI/2+(Math.random()-0.5)*0.5:Math.random()*Math.PI,t:0,li:0,lt:0,said:0,hitT:0};if(tp==='moose'){o.dir=Math.random()<0.5?1:-1;o.x=cx(y)-o.dir*(h+8)}if(tp==='heron'){o.sd=Math.random()<0.5?1:-1;o.x=cx(y)+o.sd*(h+12)}SU.push(o)}}
for(let i=SU.length-1;i>=0;i--){const o=SU[i];o.t+=dt;o.hitT-=dt;o.sayT=(o.sayT||0)-dt;const dz=o.y-camY;if(['canoe','duck','hat','bottle'].includes(o.tp)){const w=current(o.x,o.y);o.y+=w.vy*(o.tp==='canoe'?0.6:1)*dt;o.a+=Math.sin(o.t*0.7)*0.15*dt+(o.va||0)*dt;o.va=(o.va||0)*Math.exp(-1.5*dt);o.x+=(o.vx||0)*dt;o.vx=(o.vx||0)*Math.exp(-0.8*dt);o.rt=(o.rt||0)-dt;if(rockPush(o,o.tp==='canoe'?20:0,SUD[o.tp].r,dt)&&o.rt<=0&&o.y-camY<400&&o.y>camY){o.rt=1.5;if(o.tp==='canoe'){o.sayTxt=pick(['STEN! Du sa att det var fritt.','Det där var din sida.','Backa! Nej, andra backa.']);o.sayT=2.5;S.knock()}else if(o.tp==='duck')S.squeak();else S.tick()}const c0=cx(o.y),h=hw(o.y);o.x=clamp(o.x,c0-h+12,c0+h-12)}
if(o.tp==='moose'){o.x+=o.dir*11*dt;if(Math.abs(o.x-cx(o.y))>hw(o.y)+30&&o.t>3){SU.splice(i,1);continue}}
if(!o.said&&dz<420){o.said=1;if(o.tp==='moose')S.moo();if(o.tp==='heron')toast('En häger följer dig med blicken.');if(o.tp==='duck')toast('En badanka. Varifrån kom den?')}
if(o.tp==='canoe'){o.lt+=dt;if(dz<520&&o.lt>2.3){o.lt=0;o.li++;if(dz<350)S.chat()}}
if(dz<-50||o.y<-200)SU.splice(i,1)}
const tg=steerTarget();let eff=0;const py0=f.y;
if(f.air>0){f.air-=dt;const t=clamp(1-f.air/f.airD,0,1);f.at=t;f.z=Math.sin(Math.PI*t)*f.zmax;f.x=lerp(f.ax0,f.ax1,t);f.y=lerp(f.ay0,f.ay1,t);f.tail+=dt*22;
for(const st of ST){if(!st.passed&&Math.hypot(st.x-f.x,st.y-f.y)<14){st.passed=1;f.overs++}}
for(const r of rocks){if(!r.passed&&Math.hypot(r.x-f.x,r.y-f.y)<r.r+4){r.passed=1;f.overs++}}
for(const o of SU){const sd=SUD[o.tp];if(sd.r<0||o.passed)continue;const q=o.tp==='canoe'?capQ(o,sd.hl,f.x,f.y):[o.x,o.y];if(Math.hypot(q[0]-f.x,q[1]-f.y)<sd.r+8){o.passed=1;f.overs++}}
if(lake)lakeAir();
for(const d of DB){if(!d.passed){const q=segQ(d,f.x,f.y);if(Math.hypot(q[0]-f.x,q[1]-f.y)<DT[d.k].rad+8){d.passed=1;f.overs++}}}
if(f.air<=0){f.air=0;f.at=0;f.z=0;f.vx=0;f.vy=0;S.splash();if(lake)lakeLand();rings.push({x:f.x,y:f.y,t:0});if(f.overs>0)toast(pick(OVER));ST.forEach(st=>st.passed=0);rocks.forEach(r=>r.passed=0);DB.forEach(d=>{if(d.passed)d.hit=0.6;d.passed=0});SU.forEach(o=>{if(o.passed)o.hitT=0.6;o.passed=0});const c0=cx(f.y),h=hw(f.y);f.x=clamp(f.x,c0-h+7,c0+h-7)}}
else{
const w=current(f.x,f.y),lee=w.m<0.35;let ax=0,ay=0;
if(tg){const dx=tg[0]-f.x,dy=tg[1]-f.y,d=Math.hypot(dx,dy);if(d>8){const ux=dx/d,uy=dy/d;let Fo=240;if(uy<0&&!inLake(f.y))Fo*=1+uy*0.75;const rel=Math.abs(f.x-cx(f.y))/Math.max(hw(f.y),1);if(rel>0.8)Fo*=0.55;if(f.stam<=0)Fo*=0.45;ax=ux*Fo;ay=uy*Fo;eff=Fo/240;}}
const k=2.3,e=Math.exp(-k*dt);f.vx=f.vx*e+ax/k*(1-e);f.vy=w.vy+(f.vy-w.vy)*e+ay/k*(1-e);
if(eff>0.05){f.stam-=7*eff*(lee?0.4:1)*dt;if(f.stam<=0&&!seen.tired){seen.tired=1;toast('Slut på ork. Släpp och glid, eller hitta lä.')}}else f.stam+=(lee?55:18)*dt;
f.stam=clamp(f.stam,0,100);if(lake&&inLake(f.y))f.stam=100;
if(lee&&!seen.lee&&T>1){seen.lee=1;toast('Lä bakom stenen. Här vilar man.')}
if(lee&&eff<0.05&&f.stam<100){bubT-=dt;if(bubT<=0){bubT=0.25+Math.random()*0.3;S.bub();bubbles.push({x:f.x+6*Math.cos(f.ang),y:f.y+6*Math.sin(f.ang),t:0,z:0})}}
f.x+=f.vx*dt;f.y+=f.vy*dt;
const c0=cx(f.y),h=hw(f.y);if(f.x<c0-h+7){f.x=c0-h+7;f.vx=Math.abs(f.vx)*0.2}if(f.x>c0+h-7){f.x=c0+h-7;f.vx=-Math.abs(f.vx)*0.2}
bonkT-=dt;for(const r of rocks){if(Math.abs(r.y-f.y)>r.r+10)continue;const dx=f.x-r.x,dy=f.y-r.y,d=Math.hypot(dx,dy),mn=r.r+7;if(d<mn&&d>0.01){const nx=dx/d,ny=dy/d;f.x=r.x+nx*mn;f.y=r.y+ny*mn;const vn=f.vx*nx+f.vy*ny;if(vn<0){f.vx-=1.5*vn*nx;f.vy-=1.5*vn*ny}if(bonkT<=0&&vn<-25){bonkT=0.35;S.bonk();f.stam=Math.max(0,f.stam-3);hitToast(Math.random()<0.5?pick(BONK):'',r.isl?'Ö':'Sten')}}}
if(lake)lakeCollide();
bumpT-=dt;for(const st of ST){const dx=f.x-st.x,dy=f.y-st.y,d=Math.hypot(dx,dy);if(d<13&&d>0.01){const nx=dx/d,ny=dy/d;f.x=st.x+nx*13;f.y=st.y+ny*13;f.vy=Math.min(f.vy,-60);if(bumpT<=0){bumpT=0.6;S.bump();hitToast(Math.random()<0.6?pick(BUMP):'','Fisk (stim)')}}}
for(const d of DB){const t=DT[d.k];if(Math.abs(d.y-f.y)>t.hl+t.rad+10)continue;const q=segQ(d,f.x,f.y),dx=f.x-q[0],dy=f.y-q[1],dd=Math.hypot(dx,dy),mn=t.rad+6;if(dd<mn&&dd>0.01){f.x=q[0]+dx/dd*mn;f.y=q[1]+dy/dd*mn;if(d.hit<=0){d.hit=0.8;f.stam=Math.max(0,f.stam-t.cost);f.vy=Math.min(f.vy,-80-30*d.k);[S.snap,S.thunk,S.boat][d.k]();hitToast(d.k===2||Math.random()<0.6?pick(t.hit):'',['Kvist','Stock','Båt'][d.k])}}}
for(let i=SU.length-1;i>=0;i--){const o=SU[i],sd=SUD[o.tp];if(sd.r<0)continue;const q=o.tp==='canoe'?capQ(o,sd.hl,f.x,f.y):[o.x,o.y],dx=f.x-q[0],dy=f.y-q[1],dd=Math.hypot(dx,dy),mn=sd.r+6;if(dd<mn&&dd>0.01){if(o.tp==='bottle'){S.plink();toast('Flaskpost: '+pick(BOTTLE));SU.splice(i,1);continue}f.x=q[0]+dx/dd*mn;f.y=q[1]+dy/dd*mn;if(o.hitT<=0){o.hitT=1;if(o.tp==='duck'){S.squeak();if(bim)hitToast('',sd.el);else toast('Pip.')}else if(o.tp==='canoe'){S.bump();if(bim)hitToast('',sd.el);else toast(pick(['Kanotisterna: Var kom den fisken ifrån?','Kanotisterna: Nu blev det ditt fel.']))}else if(o.tp==='hat'){S.bonk();if(bim)hitToast('',sd.el);else toast('Någons bygghjälm. Den borde vara på bygget.')}else if(o.tp==='moose'){S.moo();if(bim)hitToast('',sd.el);else toast('Älgen bryr sig inte.')}}}}
f.tail+=dt*(5+14*eff);
if(eff>0.3){blubT-=dt;if(blubT<=0){blubT=0.42;S.blubb()}}
const da=tg&&eff>0?Math.atan2(ay,ax):Math.PI/2;let d=da-f.ang;d=Math.atan2(Math.sin(d),Math.cos(d));f.ang+=d*Math.min(1,dt*7);
}
lastEff=eff;
footNow=f.air<=0&&footOf(f.y)!==undefined;
if(footNow&&!seen.fall){seen.fall=1;toast('Forsen! Tryck Hoppa, eller mellanslag.')}
if(!seen.jump&&T>4&&!lake){seen.jump=1;toast('Hoppa över stenar, stockar och fiskar.')}
maxY=Math.max(maxY,f.y);camX+=(f.x-camX)*Math.min(1,dt*3);camY+=(f.y-BACK-camY)*Math.min(1,dt*5);
recT+=dt;if(recT>=0.1){recT-=0.1;rec.push(f.x,f.y)}
if(lake)lakeUpdate(dt,py0);
if(!lake&&f.y>=L-22)enterLake();else if(f.y<=10)endRun('mouth');
}
const SKY=[185,210,220],HAZE=[200,214,212];
function poly(pts){g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath()}
function fogA(dz){return clamp(1.25-dz/1100,0,1)}
function tree(t){const y=t.y,x=cx(y)+t.side*(hw(y)+t.off);if((y>L-200&&y<LY&&Math.abs(x-X0)<LR+20)||Math.hypot(x-X0,y-LY)<LR+15)return null;const p=P(x,y,0);if(!p||p[3]<25||p[3]>1350)return null;return{d:p[3],fn:()=>{const[X,Y,k]=p,h=t.h*k,w=h*0.42;if(X<-w||X>W+w)return;g.globalAlpha=fogA(p[3]);
if(bim){g.lineWidth=0.8;g.strokeStyle='#2b3329';if(t.type===0){g.fillStyle='#d4e6c6';poly([[X,Y-h],[X-w*0.45,Y-h*0.15],[X+w*0.45,Y-h*0.15]]);g.fill();g.stroke()}else{g.fillStyle='#e2edd6';g.beginPath();g.ellipse(X,Y-h*0.68,w*0.4,h*0.3,0,0,7);g.fill();g.stroke()}g.beginPath();g.moveTo(X,Y-h*(t.type===0?0.15:0.38));g.lineTo(X,Y);g.stroke();g.globalAlpha=1;return}
if(t.type===0){g.fillStyle='#4a3a2a';g.fillRect(X-w*0.05,Y-h*0.18,w*0.1,h*0.18);const c1=t.tone<0.5?'#2f4b3a':'#35503d',c2='#22392c';for(let i=0;i<3;i++){const top=Y-h*(1-i*0.22),bot=Y-h*(0.45-i*0.15),ww=w*(0.6+i*0.2);g.fillStyle=c1;g.beginPath();g.moveTo(X,top);g.lineTo(X-ww/2,bot);g.lineTo(X+ww/2,bot);g.closePath();g.fill();g.fillStyle=c2;g.beginPath();g.moveTo(X,top);g.lineTo(X,bot);g.lineTo(X+ww/2,bot);g.closePath();g.fill()}}
else{g.fillStyle='#e6e2d6';g.fillRect(X-w*0.04,Y-h*0.6,w*0.08,h*0.6);g.fillStyle='#3a3a36';g.fillRect(X-w*0.04,Y-h*0.4,w*0.08,h*0.03);g.fillStyle='#6f9150';g.beginPath();g.ellipse(X,Y-h*0.72,w*0.42,h*0.3,0,0,7);g.fill();g.fillStyle='#5b7d42';g.beginPath();g.ellipse(X+w*0.12,Y-h*0.66,w*0.28,h*0.22,0,0,7);g.fill()}
g.globalAlpha=1}}}
function rockS(r){const p=P(r.x,r.y,0);if(!p||p[3]>1200)return null;return{d:p[3],fn:()=>{const[X,Y,k]=p,R=r.r*k;if(X<-R*2||X>W+R*2)return;g.globalAlpha=fogA(p[3]);
if(bim){g.strokeStyle='#222';g.lineWidth=0.9;const rx=r.isl?R*1.05:R,ry=r.isl?R*0.5:R*0.75,cy=Y-(r.isl?R*0.2:R*0.3),pts=[],top=[];for(let i=0;i<6;i++){const a=i/6*Math.PI*2+0.3;pts.push([X+Math.cos(a)*rx,cy+Math.sin(a)*ry]);top.push([X+Math.cos(a)*rx*0.55,cy-ry*0.35+Math.sin(a)*ry*0.5])}g.fillStyle=r.isl?'#dbe7cf':'#c9c9c9';poly(pts);g.fill();g.stroke();g.fillStyle=r.isl?'#e8f0df':'#e3e3e3';poly(top);g.fill();g.stroke();g.beginPath();for(let i=0;i<6;i+=2){g.moveTo(top[i][0],top[i][1]);g.lineTo(pts[i][0],pts[i][1])}g.stroke();
if(r.isl){for(const[ox,hh]of[[-0.4,1.1],[0.1,1.4],[0.45,0.9]]){const tx=X+ox*rx,ty=cy-ry*0.3,h=hh*R*0.8;g.fillStyle='#d4e6c6';poly([[tx,ty-h],[tx-h*0.2,ty],[tx+h*0.2,ty]]);g.fill();g.stroke()}}
if(r.gift){g.strokeStyle=C.l1;g.lineWidth=1.5;g.setLineDash([4,3]);g.beginPath();g.ellipse(X,Y,R*1.4,R*0.55,0,0,7);g.stroke();g.setLineDash([])}g.globalAlpha=1;return}
g.strokeStyle='rgba(255,255,255,0.2)';g.lineWidth=Math.max(0.6,Math.min(k*0.7,2));for(const sd of[-1,1]){const a=P(r.x+sd*r.r,r.y,0),b=P(r.x+sd*r.r*1.4,r.y-Math.min(r.r*1.6,24),0);if(a&&b){g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);g.stroke()}}
if(r.isl){g.fillStyle='#6b6a62';g.beginPath();g.ellipse(X,Y-R*0.15,R*1.05,R*0.5,0,0,7);g.fill();g.fillStyle='#5c6e47';g.beginPath();g.ellipse(X,Y-R*0.35,R*0.95,R*0.45,0,0,7);g.fill();
for(const[ox,oy,hh]of[[-14,6,44],[8,10,56],[18,-4,38],[-4,-8,50]]){const q=P(r.x+ox,r.y+oy,R*0.3/k);if(!q)continue;const h=hh*q[2],w=h*0.42;g.fillStyle='#2f4b3a';g.beginPath();g.moveTo(q[0],q[1]-h);g.lineTo(q[0]-w/2,q[1]);g.lineTo(q[0]+w/2,q[1]);g.closePath();g.fill();g.fillStyle='#22392c';g.beginPath();g.moveTo(q[0],q[1]-h);g.lineTo(q[0],q[1]);g.lineTo(q[0]+w/2,q[1]);g.closePath();g.fill()}}
else{g.fillStyle='#5e5d57';g.beginPath();g.ellipse(X,Y-R*0.3,R,R*0.75,0,0,7);g.fill();g.fillStyle='#86847a';g.beginPath();g.ellipse(X-R*0.25,Y-R*0.6,R*0.55,R*0.32,0,0,7);g.fill()}
g.strokeStyle='rgba(255,255,255,'+(r.isl?0.45:0.8)+')';g.lineWidth=Math.max(0.8,Math.min(R*0.12,4));g.beginPath();g.ellipse(X,Y,R*1.08,R*0.32,0,Math.PI*1.05,Math.PI*1.95);g.stroke();
if(r.gift){g.strokeStyle=C.l1;g.lineWidth=Math.max(1,k*1.2);g.setLineDash([4,3]);g.beginPath();g.ellipse(X,Y,R*1.4,R*0.55,0,0,7);g.stroke();g.setLineDash([])}
g.globalAlpha=1}}}
function fishS(x,y,z,ang,tail,kind,eff){const p=P(x,y,z);if(!p)return null;return{d:p[3]-0.5,fn:()=>{const[X,Y,k]=p;if(X<-50||X>W+50)return;
if(kind==='me'&&z>0.5){const q=P(x,y,0);if(q){g.fillStyle='rgba(5,20,25,0.35)';g.beginPath();g.ellipse(q[0],q[1],5*q[2],3*q[2],0,0,7);g.fill()}}
g.save();g.translate(X,Y);g.scale(k,k*0.6);g.rotate(-(ang-Math.PI/2));const sc=kind==='stim'?0.8:1;g.scale(sc,sc);
const gh=kind==='ghost';if(gh){g.globalAlpha=0.55;g.strokeStyle=bim?'#1f7ad6':'#ffffff';g.lineWidth=0.8;g.setLineDash([1.5,1.5])}
if(bim&&!gh){const me=kind==='me';g.fillStyle=me?'rgba(156,195,234,0.95)':'#d6d6d6';g.strokeStyle=me?'#1f7ad6':'#333';g.lineWidth=(me?1.6:1)/k;g.save();g.translate(0,9.5);g.rotate(Math.sin(tail)*0.5);poly([[0,0],[-4.5,7],[0,4.5],[4.5,7]]);g.fill();g.stroke();g.restore();g.beginPath();g.ellipse(0,0,4.3,11,0,0,7);g.fill();g.stroke();g.beginPath();g.moveTo(0,-11);g.lineTo(0,9);g.stroke();g.restore();
if(me){const bw=8*k,bh=13*k*0.6;g.strokeStyle='#1f7ad6';g.lineWidth=1;g.setLineDash([3,2]);g.strokeRect(X-bw,Y-bh,bw*2,bh*2);g.setLineDash([]);g.fillStyle='#1f7ad6';for(const[a,b]of[[-1,-1],[1,-1],[1,1],[-1,1]])g.fillRect(X+a*bw-3,Y+b*bh-3,6,6)}return}
if(kind==='me'&&eff>0.3&&z<0.5){g.strokeStyle='rgba(255,255,255,0.3)';g.lineWidth=0.6;g.beginPath();g.moveTo(-2.5,15);g.quadraticCurveTo(-5,19,-8,22);g.moveTo(2.5,15);g.quadraticCurveTo(5,19,8,22);g.stroke()}
const fl=Math.sin(tail*1.3)*0.4;
if(!gh){g.fillStyle=kind==='stim'?'#6d7a80':'#7d8a8d';for(const sd of[-1,1]){g.save();g.translate(sd*3.6,-3);g.rotate(sd*(0.6+fl));g.beginPath();g.ellipse(sd*1.5,0,2.6,1.1,0,0,7);g.fill();g.restore()}}
g.save();g.translate(0,9.5);g.rotate(Math.sin(tail)*0.5);g.beginPath();g.moveTo(0,0);g.lineTo(-4.5,7);g.lineTo(0,4.5);g.lineTo(4.5,7);g.closePath();if(gh)g.stroke();else{g.fillStyle=kind==='stim'?'#5e6b71':'#5b6669';g.fill()}g.restore();
g.beginPath();g.ellipse(0,0,4.3,11,0,0,7);if(gh)g.stroke();else{g.fillStyle=kind==='stim'?'#97a4aa':'#b7c0c2';g.fill();
if(kind==='me'){g.fillStyle='rgba(222,120,110,0.85)';g.beginPath();g.ellipse(0,1,3.9,7.5,0,0,7);g.fill()}
g.fillStyle=kind==='stim'?'#4f5c62':'#46525a';g.beginPath();g.ellipse(0,-0.5,1.9,9.5,0,0,7);g.fill();
g.fillStyle='#2a3236';for(const[sx2,sy2]of[[-1.2,-4],[1,-1],[-0.6,2.5],[1.2,4.5],[0,-6.5]]){g.beginPath();g.arc(sx2,sy2,0.45,0,7);g.fill()}
g.fillStyle='#1c2326';g.beginPath();g.arc(-2.3,-8.3,0.7,0,7);g.arc(2.3,-8.3,0.7,0,7);g.fill()}
g.restore();g.globalAlpha=1;g.setLineDash([])}}}
function debS(d){const p=P(d.x,d.y,0);if(!p||p[3]>1100)return null;return{d:p[3],fn:()=>{const[X,Y,k]=p;if(X<-80||X>W+80)return;g.globalAlpha=fogA(p[3]);g.save();g.translate(X,Y);g.scale(k,k*0.55);g.rotate(-d.a);g.lineCap='round';
if(bim){const lw=1.1/k;g.lineWidth=lw;g.strokeStyle='#222';if(d.k===0){g.strokeStyle='#7a6548';g.lineWidth=2/k;g.beginPath();g.moveTo(-8,0);g.lineTo(8,0);g.moveTo(1,0);g.lineTo(5,-4);g.stroke()}else if(d.k===1){g.beginPath();g.rect(-17,-4.5,34,9);g.fillStyle='#d8bf98';g.fill();g.stroke();g.beginPath();g.ellipse(15.5,0,2.2,4.2,0,0,7);g.fillStyle='#efe1c4';g.fill();g.stroke()}else{poly([[-14,-7],[9,-7],[16,0],[9,7],[-14,7]]);g.fillStyle='#e6cfa8';g.fill();g.stroke();poly([[-12,-5],[8,-5],[12,0],[8,5],[-12,5]]);g.fillStyle='#f1e3c8';g.fill();g.stroke();g.beginPath();g.arc(-7,0,3.2,0,7);g.fillStyle='#f2b36b';g.fill();g.stroke()}g.restore();g.globalAlpha=1;return}
g.strokeStyle='rgba(255,255,255,0.35)';g.lineWidth=0.8;g.beginPath();g.ellipse(0,0,DT[d.k].hl+4,DT[d.k].rad+4,0,0,7);g.stroke();
if(d.k===0){g.strokeStyle='#5a4632';g.lineWidth=1.5;g.beginPath();g.moveTo(-8,0);g.lineTo(8,0);g.moveTo(1,0);g.lineTo(5,-4);g.moveTo(-3,0);g.lineTo(-6,3);g.stroke();g.fillStyle='#6e9a4a';g.beginPath();g.ellipse(6,-5,2,1.1,-0.6,0,7);g.fill()}
else if(d.k===1){g.beginPath();if(g.roundRect)g.roundRect(-17,-4.5,34,9,4.5);else g.rect(-17,-4.5,34,9);g.fillStyle='#7a5b3c';g.fill();g.strokeStyle='#4b3624';g.lineWidth=0.8;g.stroke();g.beginPath();g.moveTo(-12,-1.5);g.lineTo(8,-1.5);g.moveTo(-9,1.8);g.lineTo(10,1.8);g.stroke();g.fillStyle='#c9a874';g.beginPath();g.ellipse(15.5,0,2.2,4.2,0,0,7);g.fill();g.stroke()}
else{g.strokeStyle='#6b4f33';g.lineWidth=1.2;g.beginPath();g.moveTo(-3,-14);g.lineTo(-1,14);g.stroke();g.beginPath();g.moveTo(-14,-7);g.lineTo(9,-7);g.quadraticCurveTo(17,0,9,7);g.lineTo(-14,7);g.closePath();g.fillStyle='#8a6440';g.fill();g.strokeStyle='#4b3624';g.lineWidth=0.9;g.stroke();g.beginPath();g.moveTo(-12,-5);g.lineTo(8,-5);g.quadraticCurveTo(13,0,8,5);g.lineTo(-12,5);g.closePath();g.fillStyle='#b0875a';g.fill();g.fillStyle='#e07a3a';g.beginPath();g.arc(-7,0,3.4,0,7);g.fill();g.fillStyle='#e8c6a3';g.beginPath();g.arc(-7,0,1.8,0,7);g.fill()}
g.restore();g.globalAlpha=1}}}
function fallS(fy){const c0=cx(fy),h0=hw(fy),c1=cx(fy+FH),h1=hw(fy+FH),a=P(c0-h0,fy,0),b=P(c0+h0,fy,0),c=P(c1+h1,fy+FH,16),d=P(c1-h1,fy+FH,16);if(!a||!c||a[3]>1300)return null;return{d:a[3],fn:()=>{g.globalAlpha=fogA(a[3]);if(bim){g.fillStyle='#dde8ef';poly([[a[0],a[1]],[b[0],b[1]],[c[0],c[1]],[d[0],d[1]]]);g.fill();g.save();g.clip();g.strokeStyle='#5a7a90';g.lineWidth=0.7;g.beginPath();for(let i=-4;i<24;i++){const t=i/20;g.moveTo(lerp(d[0],c[0],t),lerp(d[1],c[1],t));g.lineTo(lerp(a[0],b[0],t+0.12),lerp(a[1],b[1],t+0.12))}g.stroke();g.restore();g.strokeStyle='#222';g.lineWidth=1;poly([[a[0],a[1]],[b[0],b[1]],[c[0],c[1]],[d[0],d[1]]]);g.stroke();g.globalAlpha=1;return}g.fillStyle='#e7efee';g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);g.lineTo(c[0],c[1]);g.lineTo(d[0],d[1]);g.closePath();g.fill();
g.strokeStyle='#b5cbce';g.lineWidth=Math.max(0.6,a[2]*0.8);g.setLineDash([4*a[2],5*a[2]]);g.lineDashOffset=-T*45*a[2];g.beginPath();for(let i=1;i<14;i++){const t=i/14;g.moveTo(lerp(d[0],c[0],t),lerp(d[1],c[1],t));g.lineTo(lerp(a[0],b[0],t),lerp(a[1],b[1],t))}g.stroke();g.setLineDash([]);g.lineDashOffset=0;
g.strokeStyle='#8fb0b5';g.lineWidth=Math.max(0.8,a[2]);g.beginPath();g.moveTo(d[0],d[1]);g.lineTo(c[0],c[1]);g.stroke();
g.fillStyle='rgba(255,255,255,0.45)';for(let i=0;i<14;i++){const t=(i+0.5)/14,r=(4+3*Math.sin(T*6+i*2.1))*a[2];g.beginPath();g.arc(lerp(a[0],b[0],t),lerp(a[1],b[1],t)-r*0.3,Math.max(0.5,r),0,7);g.fill()}
g.globalAlpha=1}}}
function srcS(){const p=P(cx(L),L,0);if(!p||p[3]>1300)return null;return{d:p[3],fn:()=>{const[X,Y,k]=p;g.globalAlpha=fogA(p[3]);if(bim){g.fillStyle='#9fc6e6';g.strokeStyle='#222';g.lineWidth=1;g.beginPath();g.ellipse(X,Y,26*k,11*k,0,0,7);g.fill();g.stroke();g.globalAlpha=1;return}g.fillStyle='rgba(200,230,232,0.9)';g.beginPath();g.ellipse(X,Y,26*k,11*k,0,0,7);g.fill();for(let i=0;i<3;i++){const q=(T*0.6+i/3)%1;g.strokeStyle='rgba(255,255,255,'+(1-q)+')';g.lineWidth=Math.max(0.6,k);g.beginPath();g.ellipse(X,Y,(26+q*26)*k,(11+q*11)*k,0,0,7);g.stroke()}g.fillStyle='#ffffff';for(let i=0;i<6;i++){const q=(T*0.8+i/6)%1;g.globalAlpha=fogA(p[3])*(1-q);g.beginPath();g.arc(X+Math.sin(i*2.3)*14*k,Y-q*30*k,Math.max(0.6,1.4*k),0,7);g.fill()}g.globalAlpha=1}}}
function ol(lw){if(bim){g.strokeStyle='#222';g.lineWidth=lw;g.stroke()}}
function bubble(t,X,Y){g.font='12px '+HF;const w=g.measureText(t).width+14;g.fillStyle='#ffffff';g.strokeStyle='#333';g.lineWidth=1;g.beginPath();if(g.roundRect)g.roundRect(X-w/2,Y-30,w,22,6);else g.rect(X-w/2,Y-30,w,22);g.fill();g.stroke();g.beginPath();g.moveTo(X-4,Y-8.5);g.lineTo(X,Y-1);g.lineTo(X+4,Y-8.5);g.fill();g.fillStyle='#222';g.textAlign='center';g.fillText(t,X,Y-15);g.textAlign='left'}
function suS(o){const p=P(o.x,o.y,0);if(!p||p[3]>1100)return null;return{d:p[3],fn:()=>{const[X,Y,k]=p;if(X<-120||X>W+120)return;g.globalAlpha=fogA(p[3]);const lw=1/k;g.save();g.translate(X,Y);
if(o.tp==='canoe'){g.scale(k,k*0.55);g.rotate(-o.a);g.beginPath();g.moveTo(-21,0);g.quadraticCurveTo(0,-9,21,0);g.quadraticCurveTo(0,9,-21,0);g.fillStyle=bim?'#ecc0b4':'#c8442f';g.fill();ol(lw*1.2);g.beginPath();g.moveTo(-17,0);g.quadraticCurveTo(0,-6.5,17,0);g.quadraticCurveTo(0,6.5,-17,0);g.fillStyle=bim?'#f6e6dc':'#e7c9a0';g.fill();ol(lw);
for(const[px2,col]of[[-8,'#3a6ea5'],[8,'#e0b03a']]){const sw=Math.sin(o.t*4+px2)*3;g.strokeStyle=bim?'#222':'#6b4f33';g.lineWidth=1.6/k;g.beginPath();g.moveTo(px2+sw,-11);g.lineTo(px2-sw,11);g.stroke();g.beginPath();g.arc(px2,0,3.3,0,7);g.fillStyle=bim?'#d6e4f2':col;g.fill();ol(lw);g.beginPath();g.arc(px2,0,1.8,0,7);g.fillStyle=bim?'#f4f4f4':'#e8c6a3';g.fill();ol(lw)}}
else if(o.tp==='duck'){const b=Math.sin(o.t*3)*0.6;g.scale(k,k);g.beginPath();g.ellipse(0,-2+b,5,3.2,0,0,7);g.fillStyle=bim?'#fbefb0':'#f5cf2a';g.fill();ol(lw);g.beginPath();g.arc(2.6,-6+b,2.3,0,7);g.fill();ol(lw);g.beginPath();g.ellipse(4.8,-5.8+b,1.6,0.8,0,0,7);g.fillStyle=bim?'#f6d0a8':'#f08a24';g.fill();ol(lw);g.fillStyle='#222';g.beginPath();g.arc(3.2,-6.6+b,0.45,0,7);g.fill()}
else if(o.tp==='hat'){g.scale(k,k*0.8);g.rotate(Math.sin(o.t)*0.2);g.beginPath();g.ellipse(0,-0.5,7,2.6,0,0,7);g.fillStyle=bim?'#fbefb0':'#f2c230';g.fill();ol(lw);g.beginPath();g.ellipse(0,-2.5,4.6,3.4,0,Math.PI,0);g.fillStyle=bim?'#fdf6d6':'#f7d24a';g.fill();ol(lw);g.strokeStyle=bim?'#222':'#d9a91c';g.lineWidth=lw;g.beginPath();g.moveTo(0,-5.9);g.lineTo(0,-1.5);g.stroke()}
else if(o.tp==='bottle'){g.scale(k,k*0.55);g.rotate(-o.a);g.beginPath();g.ellipse(0,0,6,2.3,0,0,7);g.fillStyle=bim?'#d4ead9':'rgba(79,143,95,0.85)';g.fill();ol(lw);g.fillStyle=bim?'#ffffff':'#f0e6c8';g.fillRect(-3,-0.8,5,1.6);g.fillStyle=bim?'#d4ead9':'#4f8f5f';g.fillRect(5.5,-0.9,3,1.8);g.fillStyle='#b08a5a';g.fillRect(8.4,-0.8,1.4,1.6)}
else if(o.tp==='moose'){g.scale(k*o.dir,k);const c1=bim?'#e3d6c8':'#5b4330',c2=bim?'#efe6dc':'#4a3526';g.strokeStyle=bim?'#222':'#3b2b1f';g.lineWidth=2/k;g.beginPath();for(const lx of[-9,-6,7,10]){g.moveTo(lx,0);g.lineTo(lx,-11)}g.stroke();g.beginPath();g.ellipse(0,-15,13,6,0,0,7);g.fillStyle=c1;g.fill();ol(lw);g.beginPath();g.ellipse(-3,-19,6,3,0,0,7);g.fill();g.beginPath();g.moveTo(9,-17);g.lineTo(14,-22);g.lineTo(17,-20);g.lineTo(12,-14);g.closePath();g.fill();ol(lw);g.beginPath();g.ellipse(18,-20,4.5,2.6,0.3,0,7);g.fillStyle=c2;g.fill();ol(lw);g.fillStyle=bim?'#ffffff':'#c9b48a';g.beginPath();g.ellipse(14,-26,5,1.8,-0.4,0,7);g.fill();ol(lw);g.beginPath();g.ellipse(17,-27,4,1.6,0.5,0,7);g.fill();ol(lw);if(!bim){g.strokeStyle='rgba(255,255,255,0.45)';g.lineWidth=1/k;g.beginPath();g.ellipse(0,0,15,2.5,0,0,7);g.stroke()}}
else if(o.tp==='heron'){g.scale(-o.sd*k,k);g.strokeStyle=bim?'#222':'#555';g.lineWidth=1.4/k;g.beginPath();g.moveTo(0,0);g.lineTo(0,-14);g.moveTo(2,0);g.lineTo(1,-14);g.stroke();g.beginPath();g.ellipse(0,-18,6,3.5,-0.3,0,7);g.fillStyle=bim?'#eeeeee':'#9aa3a8';g.fill();ol(lw);g.strokeStyle=bim?'#222':'#b9c1c5';g.lineWidth=2/k;g.beginPath();g.moveTo(4,-20);g.quadraticCurveTo(8,-26,5,-30);g.stroke();g.beginPath();g.ellipse(6,-31,2.4,1.6,0,0,7);g.fillStyle=bim?'#ffffff':'#c9d0d4';g.fill();ol(lw);g.strokeStyle=bim?'#222':'#d9a62a';g.lineWidth=1.2/k;g.beginPath();g.moveTo(8,-31);g.lineTo(13,-30);g.stroke()}
g.restore();g.globalAlpha=1;
if(o.tp==='canoe'&&p[3]<520&&state==='play'){const sp=o.li%2,ox=o.x+Math.cos(o.a)*(sp?8:-8),oy=o.y+Math.sin(o.a)*(sp?8:-8),q=P(ox,oy,10);if(q)bubble(o.sayT>0?o.sayTxt:CANOE[o.li%CANOE.length],q[0],q[1])}}}}
function drawWorld(){
const u=H/480;if(bim){g.fillStyle='#eceef1';g.fillRect(0,0,W,hor+2);g.strokeStyle='#b8bcc2';g.lineWidth=1;g.beginPath();g.moveTo(0,hor+0.5);g.lineTo(W,hor+0.5);g.stroke()}else{const sg=g.createLinearGradient(0,0,0,hor);sg.addColorStop(0,'#a9c6d3');sg.addColorStop(1,'#e2ebe9');g.fillStyle=sg;g.fillRect(0,0,W,hor+2);
g.fillStyle='#8aa292';g.beginPath();g.moveTo(0,hor+1);for(let x=0;x<=W;x+=W/40)g.lineTo(x,hor-(14+9*Math.sin(x/W*6+camX*0.004)+5*Math.sin(x/W*17))*u);g.lineTo(W,hor+1);g.closePath();g.fill();
g.fillStyle='#6a8775';g.beginPath();g.moveTo(0,hor+1);for(let x=0;x<=W;x+=W/50)g.lineTo(x,hor-(5+6*Math.sin(x/W*9+1+camX*0.009)+3*Math.sin(x/W*29))*u);g.lineTo(W,hor+1);g.closePath();g.fill()}
const step=2,BH=[236,238,241];
for(let y0=hor;y0<H;y0+=step){const dz=CHT*F/(y0+step*0.5-hor);const wy=camY+dz,fog=clamp((dz-250)/1300,0,1),c=cx(wy),h=hw(wy),k=F/dz;
if(bim){const z0=y0-hor>0.5?Math.floor((camY+CHT*F/(y0-hor))/40):-1e9,z1=Math.floor((camY+CHT*F/(y0+step-hor))/40),cont=z0!==z1;g.fillStyle=rgb(mix(cont?[168,164,154]:[226,222,210],BH,fog));g.fillRect(0,y0,W,step);if(h>0.5){const xl=W/2+(c-h-camX)*k,xr=W/2+(c+h-camX)*k,bk=9*k;g.fillStyle=rgb(mix([200,194,180],BH,fog));g.fillRect(xl-bk,y0,xr-xl+2*bk,step);let col=[140,188,222];for(const fv of FALLS){if(wy>=fv&&wy<=fv+FH){col=[214,228,238];break}}g.fillStyle=rgb(mix(col,BH,fog));g.fillRect(xl,y0,xr-xl,step)}continue}
g.fillStyle=rgb(mix((Math.floor(wy/22)&1)?[104,138,76]:[95,128,69],HAZE,fog));g.fillRect(0,y0,W,step);
if(h>0.5){const xl=W/2+(c-h-camX)*k,xr=W/2+(c+h-camX)*k,bk=9*k;g.fillStyle=rgb(mix([158,148,122],HAZE,fog));g.fillRect(xl-bk,y0,xr-xl+2*bk,step);
const tt=clamp(wy/L,0,1);let col=mix(mix([60,70,56],[32,78,88],tt),SKY,Math.pow(clamp(dz/1000,0,1),0.8)*0.75);if((Math.floor((wy+T*45)/7)&1))col=mix(col,[0,0,0],0.06);
for(const fv of FALLS){if(wy>=fv&&wy<=fv+FH){col=[232,240,240];break}if(wy>fv-60&&wy<fv)col=mix(col,[235,242,242],0.45*(1-(fv-wy)/60))}
if(wy>L-40)col=mix(col,[70,140,155],0.4);g.fillStyle=rgb(mix(col,HAZE,fog));g.fillRect(xl,y0,xr-xl,step)}}
if(bim){g.strokeStyle='rgba(0,0,0,0.08)';g.lineWidth=1;g.beginPath();for(let x=Math.floor((camX-1200)/60)*60;x<camX+1200;x+=60){const a=P(x,camY+15,0),b=P(x,camY+1300,0);if(a&&b){g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1])}}g.stroke();g.strokeStyle='#2a2f36';g.beginPath();for(const sd of[-1,1]){let first=true;for(let wy=camY+12;wy<camY+1300;wy+=12){const h=hw(wy);if(h<0.5){first=true;continue}const q=P(cx(wy)+sd*h,wy,0);if(!q)continue;first?g.moveTo(q[0],q[1]):g.lineTo(q[0],q[1]);first=false}}g.stroke()}
g.fillStyle='rgba(8,24,28,0.16)';for(const r of rocks){const dz=r.y-camY;if(bim||dz<-20||dz>900||r.isl)continue;g.beginPath();let ok=true;for(let i=0;i<14;i++){const a=i/14*Math.PI*2,q=P(r.x+Math.cos(a)*r.r*0.85,r.y-r.r*2.2+Math.sin(a)*r.r*2.3,0);if(!q){ok=false;break}i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1])}if(ok)g.fill()}
g.strokeStyle=bim?'#1f5f99':'#ffffff';g.lineWidth=1;for(const p of PT){const a=P(p[0],p[1],0),b=P(p[0],p[1]-p[2]*0.25,0);if(!a||!b)continue;g.globalAlpha=0.5*fogA(a[3]);g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);g.stroke()}g.globalAlpha=1;
for(const rg of rings){const q=P(rg.x,rg.y,0);if(!q)continue;g.strokeStyle=bim?'rgba(31,122,214,'+(1-rg.t)+')':'rgba(255,255,255,'+(1-rg.t)+')';g.lineWidth=Math.max(1,q[2]*1.2);g.beginPath();g.ellipse(q[0],q[1],(6+rg.t*30)*q[2],(6+rg.t*30)*q[2]*0.45,0,0,7);g.stroke()}
const sp=[];const add=o=>{if(o)sp.push(o)};
for(const t of TREES){const dz=t.y-camY;if(dz>20&&dz<1400)add(tree(t))}
for(const r of rocks){const dz=r.y-camY;if(dz>-10&&dz<1250)add(rockS(r))}
for(const fv of FALLS)add(fallS(fv));lkSprites(add);
for(const d of DB)add(debS(d));for(const o of SU)add(suS(o));
for(const st of ST)add(fishS(st.x,st.y,0,st.ang===undefined?-Math.PI/2:st.ang,T*(st.ang===undefined?3:6)+st.ph,'stim',0));
if(ghostOn&&ghost&&state==='play'){const n=ghost.length/2,i=Math.min(n-1,Math.floor(T/0.1));add(fishS(ghost[i*2],ghost[i*2+1],0,Math.PI/2,T*12,'ghost',0))}
for(const b of bubbles){const q=P(b.x,b.y,b.z);if(q)sp.push({d:q[3],fn:()=>{g.fillStyle='rgba(255,255,255,'+(1-b.t)+')';g.beginPath();g.arc(q[0],q[1],Math.max(0.6,1.3*q[2]),0,7);g.fill()}})}
add(fishS(f.x,f.y,f.z,f.ang,f.tail,'me',lastEff));
sp.sort((a,b)=>b.d-a.d);for(const s of sp)s.fn();
if(footNow&&f.stam>=20&&state==='play'){const q=P(f.x,f.y,0);if(q){const z=(T*1.5)%1;g.strokeStyle='rgba(30,160,140,'+(1-z)+')';g.lineWidth=2;g.beginPath();g.ellipse(q[0],q[1],(14+z*16)*q[2],(14+z*16)*q[2]*0.45,0,0,7);g.stroke()}}
}
function chip(t,ax,ay,dx,dy){g.font='500 11px '+CF;const w=g.measureText(t).width+12,tx=ax+dx,ty=ay+dy;g.strokeStyle=C.g2;g.lineWidth=1;g.beginPath();g.moveTo(ax,ay);g.lineTo(tx,ty);g.stroke();g.fillStyle=C.g2;g.beginPath();g.arc(ax,ay,2.2,0,7);g.fill();const bx=dx>=0?tx:tx-w;g.fillStyle='rgba(5,35,45,0.88)';g.fillRect(bx,ty-9,w,18);g.fillStyle=C.be;g.fillText(t,bx+6,ty+4)}
function drawSpecs(){g.strokeStyle='rgba(30,160,140,0.55)';g.lineWidth=1;g.beginPath();
for(let wy=Math.ceil((camY+20)/50)*50;wy<camY+900;wy+=50){const c=cx(wy),h=hw(wy);if(h<2)continue;const a=P(c-h,wy,0),b=P(c+h,wy,0);if(a&&b){g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1])}}
for(let i=-3;i<=3;i++){let first=true;for(let wy=camY+20;wy<camY+900;wy+=20){const h=hw(wy);if(h<2)break;const q=P(cx(wy)+i*h/3.5,wy,0);if(!q)continue;first?g.moveTo(q[0],q[1]):g.lineTo(q[0],q[1]);first=false}}g.stroke();
g.setLineDash([3,3]);g.strokeStyle=C.be;for(const r of rocks){const dz=r.y-camY;if(dz<20||dz>500||r.isl)continue;g.beginPath();let ok=true;for(let i=0;i<=16;i++){const a=i/16*Math.PI*2,q=P(r.x+Math.cos(a)*r.r*0.85,r.y-r.r*2.2+Math.sin(a)*r.r*2.3,0);if(!q){ok=false;break}i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1])}if(ok)g.stroke()}g.setLineDash([]);
const labs=[];
for(const fv of FALLS){const dz=fv-camY;if(dz>30&&dz<850){const q=P(cx(fv),fv,8);if(q)labs.push([q[0],q[1],'FORS, HÖJD 1,2 m, HOPPA HÄR',q[3]])}}
const rs=rocks.filter(r=>{const dz=r.y-camY;return dz>40&&dz<520}).sort((a,b)=>a.y-b.y).slice(0,3);for(const r of rs){const q=P(r.x,r.y,r.r*0.8);if(q)labs.push([q[0],q[1],r.isl?'Ö, VÄLJ SIDA':r.gift?'STEN, FLYTTAD AV DIG':'STEN, LÄ BAKOM',q[3]])}
for(const d of DB){const dz=d.y-camY;if(dz>30&&dz<480){const q=P(d.x,d.y,0);if(q)labs.push([q[0],q[1],DT[d.k].name,q[3]])}}
for(const o of SU){const dz=o.y-camY;if(dz>30&&dz<520){const q=P(o.x,o.y,o.tp==='moose'||o.tp==='heron'?20:0);if(q)labs.push([q[0],q[1],SUD[o.tp].name,q[3]])}}
lakeLabs(labs);
let ns=0;for(const st of ST){const dz=st.y-camY;if(dz>30&&dz<450&&ns<2){const q=P(st.x,st.y,0);if(q){labs.push([q[0],q[1],'STIM, PÅ VÄG NEDSTRÖMS',q[3]]);ns++}}}
labs.sort((a,b)=>a[3]-b[3]);labs.slice(0,5).forEach((l,i)=>{if(l[0]<-20||l[0]>W+20)return;const dx=(l[0]<W/2?1:-1)*(28+(i%2)*14),dy=-22-(i%3)*10;chip(l[2],l[0],l[1],dx,dy)});
const q=P(f.x,f.y,f.z);if(q)chip('FISK 01, ORK '+Math.round(f.stam)+' %',q[0]+8,q[1],34,18);
g.font='500 11px '+CF;const t=lake?'KÄLLSJÖN: HITTAD':'↑ KÄLLAN: POSITION OKÄND';const w=g.measureText(t).width+12;g.fillStyle='rgba(5,35,45,0.88)';g.fillRect(W/2-w/2,hor-34,w,18);g.fillStyle=C.be;g.fillText(t,W/2-w/2+6,hor-21)}
function viewCube(){const s=42,x=VW-62,y=40;g.lineWidth=1;g.strokeStyle='#8a929c';g.fillStyle='#e2e6ea';poly([[x-s/2,y-s/2],[x-s/2+9,y-s/2-9],[x+s/2+9,y-s/2-9],[x+s/2,y-s/2]]);g.fill();g.stroke();g.fillStyle='#cfd5db';poly([[x+s/2,y-s/2],[x+s/2+9,y-s/2-9],[x+s/2+9,y+s/2-9],[x+s/2,y+s/2]]);g.fill();g.stroke();g.fillStyle='#f6f7f9';g.fillRect(x-s/2,y-s/2,s,s);g.strokeRect(x-s/2,y-s/2,s,s);g.fillStyle='#4a525c';g.font='11px '+HF;g.textAlign='center';g.fillText('FRAM',x,y+4);g.beginPath();g.ellipse(x+4,y+s/2+10,s*0.9,s*0.26,0,0,7);g.stroke();g.textAlign='left'}
const PBP=["svg2", "metadata8", "defs6", "namedview4", "g10", "g12", "M 1467.62,2244.59 H 863.305 v -431.66 h 604.315 c 333.75,0 604.31,-270.55 604.31,-604.31 0,-333.749 -270.56,-604.311 -604.31,-604.311 -333.76,0 -604.315,270.562 -604.315,604.311 v 604.31 H 431.652 v -604.31 c 0,-572.108 463.856,-1035.96 1035.968,-1035.96 572.11,0 1035.96,463.852 1035.96,1035.96 0,572.11 -463.85,1035.97 -1035.96,1035.97", "path14", "m 0,1812.93 h 431.652 v 431.66 H 0 v -431.66", "path16", "m 431.652,2244.59 h 431.653 v 431.65 H 431.652 v -431.65", "path18"];let PB=null;
function pbLogo(x,y,s,col){if(typeof Path2D==='undefined')return;if(!PB)PB=PBP.map(p=>new Path2D(p));g.save();g.translate(x,y);g.scale(s/356.82666,s/356.82666);g.transform(1.3333333,0,0,-1.3333333,0,356.82667);g.scale(0.1,0.1);g.fillStyle=col;PB.forEach(p=>g.fill(p));g.restore()}
function bimChrome(){const m=Math.max(0,Math.round((f.y-300)/2));
g.fillStyle='#2d3440';g.fillRect(0,0,W,18);g.fillStyle=C.g1;g.fillRect(3,2,14,14);pbLogo(4,3,12,'#ffffff');g.fillStyle='#e8ecf2';g.font='11px '+HF;g.textAlign='center';g.fillText('Upstream.rvt - 3D-vy: {Älv}',W/2,13.5);g.textAlign='left';
g.fillStyle='#f2f2f2';g.fillRect(0,18,W,28);g.fillStyle='#c8c8c8';g.fillRect(0,45,W,1);
g.font='11px '+HF;let x=4;g.fillStyle='#1f7ad6';g.fillRect(x,22,38,20);g.fillStyle='#fff';g.fillText('Arkiv',x+6,36);x+=46;
const ctx2='Ändra | Lax',cwid=g.measureText(ctx2).width+16;
for(const t of['Arkitektur','Konstruktion','System','Infoga','Kommentera','Analysera','Massa och terräng','Samarbeta','Vy','Hantera']){const w=g.measureText(t).width+14;if(x+w>W-cwid-8)break;g.fillStyle='#333';g.fillText(t,x+7,36);x+=w}
g.fillStyle='#d5ecc6';g.fillRect(W-cwid-4,22,cwid,20);g.strokeStyle='#6fa64a';g.lineWidth=1;g.strokeRect(W-cwid-4+0.5,22.5,cwid-1,19);g.fillStyle='#2f5a17';g.fillText(ctx2,W-cwid+4,36);
if(SIDE>0){g.fillStyle='#fafafa';g.fillRect(0,46,SIDE,H-68);g.fillStyle='#c8c8c8';g.fillRect(SIDE-1,46,1,H-68);g.save();g.beginPath();g.rect(0,46,SIDE-1,H-68);g.clip();
let y=46;g.fillStyle='#e6e6e6';g.fillRect(0,y,SIDE,20);g.fillStyle='#222';g.font='700 11px '+HF;g.fillText('Egenskaper',8,y+14);y+=26;
g.strokeStyle='#bdbdbd';g.strokeRect(6.5,y+0.5,SIDE-14,32);g.fillStyle='#1f7ad6';g.fillRect(10,y+6,16,20);g.fillStyle='#222';g.font='700 11px '+HF;g.fillText('Fisk',32,y+14);g.font='11px '+HF;g.fillText('Atlantlax, 60 cm',32,y+27);y+=40;
const rows=[['Begränsningar'],['Nivå','Vattenyta'],['Förskjutning',(f.z/30).toFixed(2)+' m'],['Identitetsdata'],['Märkning','FISK 01'],['Kommentarer','Mot strömmen'],['Faser'],['Skapad i fas','Rom'],['Status',state==='won'?'Vid källan':'Uppströms'],['Prestanda'],['Ork',Math.round(f.stam)+' %'],['Hoppkostnad',(footNow?20:12)+' ork'],['Uppströms',m+' m']];
const lc=Math.round(SIDE*0.47);for(const r of rows){if(r.length===1){g.fillStyle='#ececec';g.fillRect(0,y,SIDE,17);g.fillStyle='#222';g.font='700 11px '+HF;g.fillText(r[0],8,y+12)}else{g.fillStyle='#ffffff';g.fillRect(0,y,SIDE,17);g.fillStyle='#e2e2e2';g.fillRect(0,y+16,SIDE,1);g.fillRect(lc,y,1,17);g.fillStyle='#555';g.font='11px '+HF;g.fillText(r[0],8,y+12);g.fillStyle='#111';g.fillText(r[1],lc+6,y+12)}y+=17}
y+=10;g.fillStyle='#e6e6e6';g.fillRect(0,y,SIDE,20);g.fillStyle='#222';g.font='700 11px '+HF;g.fillText('Projektbläddrare',8,y+14);y+=26;g.font='11px '+HF;
for(const[t,ind,b]of[['Vyer (alla)',0],['3D-vyer',1],['{Älv}',2,1],['Planvyer',1],['Mynning',2],[lake?'Källsjön':'Källan (saknas)',2],['Scheman',0],['Kollisionsrapport ('+clashes+')',1],['Familjer',0],['Fiskar',1],['Stockar och båtar',1],['Kanoter',1]]){g.fillStyle=b?'#1f7ad6':'#333';g.font=(b?'700 ':'')+'11px '+HF;g.fillText((ind?'':'')+t,10+ind*12,y+11);y+=16}
g.restore()}
g.fillStyle='#ececec';g.fillRect(0,H-22,W,22);g.fillStyle='#c8c8c8';g.fillRect(0,H-22,W,1);g.fillStyle='#333';g.font='11px '+HF;
if(SIDE>0){g.fillText('Klicka för att välja, TAB för alternativ, Ctrl lägger till',8,H-7);g.textAlign='right';g.fillText('X '+f.x.toFixed(1)+'   Y '+f.y.toFixed(1)+'   Kollisioner: '+clashes+'   Huvudmodell',W-8,H-7);g.textAlign='left'}
else g.fillText('FISK 01  |  Ork '+Math.round(f.stam)+' %  |  '+m+' m  |  Kollisioner '+clashes,8,H-7)}
function bimToast(){g.globalAlpha=Math.min(1,toastT*2);g.font='11px '+HF;const w=Math.min(VW-20,g.measureText(toastTxt).width+56),x0=VX+(VW-w)/2,y0=VY+10;g.fillStyle='#ffffff';g.fillRect(x0,y0,w,40);g.strokeStyle=toastTitle==='Varning'?'#c9a227':'#8a929c';g.lineWidth=1;g.strokeRect(x0+0.5,y0+0.5,w-1,39);g.fillStyle=toastTitle==='Varning'?'#f2c230':'#1f7ad6';poly([[x0+18,y0+9],[x0+28,y0+27],[x0+8,y0+27]]);g.fill();g.fillStyle=toastTitle==='Varning'?'#222':'#fff';g.font='700 11px '+HF;g.textAlign='center';g.fillText(toastTitle==='Varning'?'!':'i',x0+18,y0+25);g.textAlign='left';g.fillStyle='#222';g.fillText(toastTitle,x0+38,y0+16);g.font='11px '+HF;g.fillText(toastTxt,x0+38,y0+31);g.globalAlpha=1}
function rr(x,y,w,h,r){g.beginPath();if(g.roundRect)g.roundRect(x,y,w,h,r);else g.rect(x,y,w,h)}
function wrap(t,mw){const ws=t.split(' '),out=[];let l='';for(const x of ws){const tt=l?l+' '+x:x;if(g.measureText(tt).width>mw&&l){out.push(l);l=x}else l=tt}out.push(l);return out}
function panel(title,paras,foot){g.fillStyle='rgba(5,35,45,0.35)';g.fillRect(0,0,W,H);const pw=Math.min(W-40,400),mw=pw-44;g.font='14px '+HF;const blocks=paras.map(p=>wrap(p,mw));let n=0;blocks.forEach(b=>n+=b.length);const ph=30+40+n*20+blocks.length*8+40+18,x0=(W-pw)/2,y0=(H-ph)/2;
rr(x0,y0,pw,ph,10);g.fillStyle=C.nk;g.fill();g.textAlign='center';g.fillStyle=C.be;g.font='700 30px '+HF;g.fillText(title,W/2,y0+50);
let yy=y0+86;g.font='14px '+HF;g.fillStyle='rgba(240,240,225,0.85)';blocks.forEach(b=>{b.forEach(l=>{g.fillText(l,W/2,yy);yy+=20});yy+=8});
g.strokeStyle=C.be;g.lineWidth=1;g.beginPath();g.moveTo(x0+22,yy);g.lineTo(x0+pw-22,yy);g.stroke();g.fillStyle=C.g2;g.font='500 15px '+CF;g.fillText(foot,W/2,yy+26);g.textAlign='left'}
function drawHUD(){const jc=footNow?20:12,can=f.stam>=jc&&f.air<=0;
if(bim)bimChrome();else{rr(10,10,176,50,8);g.fillStyle=C.nk;g.fill();g.fillStyle=C.be;g.font='12px '+HF;g.fillText('Ork',20,30);g.fillStyle='rgba(240,240,225,0.2)';g.fillRect(52,21,122,9);g.fillStyle=f.stam>=jc?C.g2:C.r1;g.fillRect(52,21,122*f.stam/100,9);g.fillStyle=C.be;g.fillRect(52+122*jc/100,18,1.5,15);
g.font='500 13px '+CF;g.fillText(lake&&inLake(f.y)?'Källsjön':Math.max(0,Math.round((f.y-300)/2))+' m uppströms',20,50);if(lake){g.font='500 12px '+CF;let t='Hinder '+LS.h+'  ·  Ringar '+LS.r+'  ·  Slalom '+LS.s+'/6  ·  Skrämda badgäster '+LS.k;if(g.measureText(t).width+20>W-110)t='Hinder '+LS.h+' · Ringar '+LS.r+' · Slalom '+LS.s+'/6 · Skrämda '+LS.k;const w=g.measureText(t).width+20;rr(10,H-60,w,26,8);g.fillStyle=C.nk;g.fill();g.fillStyle=C.be;g.fillText(t,20,H-42)}}
if(state==='play'&&bim){const b=btn();g.globalAlpha=can?1:0.45;g.fillStyle=footNow?'#3d93e8':'#1f7ad6';g.fillRect(b.x-34,b.y-18,68,36);g.strokeStyle='#0f4f91';g.lineWidth=1;g.strokeRect(b.x-33.5,b.y-17.5,67,35);g.fillStyle='#fff';g.font='700 12px '+HF;g.textAlign='center';g.fillText('Hoppa',b.x,b.y+4);g.textAlign='left';g.globalAlpha=1}
else if(state==='play'){const b=btn(),pulse=footNow&&can?1+0.08*Math.sin(T*10):1;g.globalAlpha=can?1:0.4;g.fillStyle=footNow?C.g2:C.g1;g.beginPath();g.arc(b.x,b.y,b.r*pulse,0,7);g.fill();g.strokeStyle=C.be;g.lineWidth=1.5;g.stroke();g.fillStyle=C.be;g.textAlign='center';g.font='500 15px '+CF;g.fillText('Hoppa',b.x,b.y+5);g.textAlign='left';g.globalAlpha=1}
if(toastT>0&&state==='play'&&bim)bimToast();
else if(toastT>0&&state==='play'){g.globalAlpha=Math.min(1,toastT*2);g.font='15px '+HF;const ls=wrap(toastTxt,W-60),w=Math.max(...ls.map(l=>g.measureText(l).width))+28,h=14+ls.length*19;rr((W-w)/2,72,w,h,8);g.fillStyle=C.nk;g.fill();g.fillStyle=C.be;g.textAlign='center';ls.forEach((l,i)=>g.fillText(l,W/2,93+i*19));g.textAlign='left';g.globalAlpha=1}
if(!bim){g.fillStyle='rgba(5,35,45,0.7)';g.font='11px '+HF;g.textAlign='left';g.fillText('Upstream v1.0',12,H-10)}
if(state==='start')panel('Upstream',['Någonstans uppströms ligger källan. Ingen vet riktigt var, men det sägs att man får leka där.','Du ser laxen bakifrån. Håll fingret där du vill simma, eller använd piltangenterna. Släpp, så tar strömmen dig med. Vila i lä bakom stenar.','Kvistar, stockar och båtar kommer flytande. Väj, eller hoppa med knappen eller mellanslag.'],'Tryck för att börja');
else if(state==='mouth')panel('Mynningen',['Varmt, lugnt och fullt av fisk som kom hit precis som du.','Längst uppströms: '+Math.max(0,Math.round((maxY-300)/2))+' m'],'Tryck för att simma igen');
else if(state==='won'){const m=Math.floor(endT/60),sec=Math.floor(endT%60);panel('Källan',['Här börjar älven. Du knuffade till en sten, och nu rinner vattnet lite annorlunda hela vägen ner.','Tid: '+m+':'+String(sec).padStart(2,'0')],'Tryck för att simma igen')}}
function render(){layout();M.save();M.translate(VX,VY);M.beginPath();M.rect(0,0,VW,VH);M.clip();g=M;setView(VW,VH);drawWorld();if(specs)drawSpecs();if(bim)viewCube();M.restore();g=M;setView(cw,ch);drawHUD()}
function loc(e){const r=cv.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top]}
cv.addEventListener('pointerdown',e=>{cv.focus();ac();const[x,y]=loc(e);if(state!=='play'){if(overT>0.6)startRun();return}const b=btn();if(bim?(Math.abs(x-b.x)<38&&Math.abs(y-b.y)<22):Math.hypot(x-b.x,y-b.y)<b.r+6){tryJump();return}if(x<VX||y<VY||y>VY+VH)return;if(steerId===null){steerId=e.pointerId;px=x;py=y;try{cv.setPointerCapture(e.pointerId)}catch(_){}}});
cv.addEventListener('pointermove',e=>{if(e.pointerId===steerId){const[x,y]=loc(e);px=x;py=y}});
const up=e=>{if(e.pointerId===steerId)steerId=null};cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
cv.addEventListener('keydown',e=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key))e.preventDefault();if(e.key===' '&&!e.repeat){if(state==='play')tryJump();else{ac();startRun()}return}keys[e.key]=true;if(state!=='play'&&e.key==='Enter'){ac();startRun()}});
cv.addEventListener('keyup',e=>{keys[e.key]=false});
document.getElementById('bSound').onclick=()=>{snd=!snd;document.getElementById('tSound').textContent=snd?'Ljud på':'Ljud av'};
document.getElementById('bGhost').onclick=()=>{ghostOn=!ghostOn;document.getElementById('tGhost').textContent=ghostOn?'Spökfisk på':'Spökfisk av'};
document.getElementById('bSpecs').onclick=()=>{specs=!specs;document.getElementById('tSpecs').textContent=specs?'Specifikationer på':'Specifikationer av';cv.focus()};
document.getElementById('bBim').onclick=()=>{bim=!bim;layout();document.getElementById('tBim').textContent=bim?'BIM-läge på':'BIM-läge av';cv.focus()};
document.getElementById('bHome').onclick=()=>{lake=false;LK=null;toastQ=[];state='start';overT=0;steerId=null;resetFish();DB.length=0;SU=[];toastT=0;cv.focus()};
document.getElementById('bLake').onclick=()=>{ac();goLake();cv.focus()};
{const fm=document.getElementById('pwForm'),inp=document.getElementById('pwIn'),err=document.getElementById('pwErr');if(fm){fm.onsubmit=e=>{e.preventDefault();const v=String(inp.value||'').trim().toLowerCase();if(v===PW){err.textContent='';inp.value='';ac();goLake();cv.focus()}else{err.textContent=v?'Fel lösenord. Det finns vid källan.':'Skriv lösenordet först.'}};inp.oninput=()=>{err.textContent=''}}}
document.getElementById('bRestart').onclick=()=>{ac();startRun();cv.focus()};
let last=performance.now();
function loop(n){if(Math.abs(cv.clientWidth-cw)>1)resize();const dt=Math.min(0.05,(n-last)/1000);last=n;update(dt);render();requestAnimationFrame(loop)}
requestAnimationFrame(loop);
})();
