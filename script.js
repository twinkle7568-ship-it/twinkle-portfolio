(function(){
/* Three.js particle hero */
var canvas=document.getElementById('bg');
if(window.THREE){
var scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(70,innerWidth/innerHeight,.1,1000);camera.position.z=60;
var renderer=new THREE.WebGLRenderer({canvas:canvas,alpha:true,antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(innerWidth,innerHeight);
var N=innerWidth<700?1200:2800,pos=new Float32Array(N*3),col=new Float32Array(N*3);
var pal=[new THREE.Color('#7C5CFF'),new THREE.Color('#22D3EE'),new THREE.Color('#F472B6')];
for(var i=0;i<N;i++){pos[i*3]=(Math.random()-.5)*200;pos[i*3+1]=(Math.random()-.5)*140;pos[i*3+2]=(Math.random()-.5)*120;var c=pal[i%3];col[i*3]=c.r;col[i*3+1]=c.g;col[i*3+2]=c.b}
var g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('color',new THREE.BufferAttribute(col,3));
var pts=new THREE.Points(g,new THREE.PointsMaterial({size:.9,vertexColors:true,transparent:true,opacity:.85,blending:THREE.AdditiveBlending,depthWrite:false}));
scene.add(pts);
var mx=0,my=0,sy=0;
addEventListener('mousemove',function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
addEventListener('scroll',function(){sy=scrollY});
addEventListener('resize',function(){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
(function loop(t){
pts.rotation.y=t*.00005+mx*.4;pts.rotation.x=my*.3+sy*.0004;
camera.position.z=60-Math.min(sy*.02,20);
renderer.render(scene,camera);requestAnimationFrame(loop)})(0);
}
/* Scroll reveal + skill bars */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);count(e.target)}})},{threshold:.15});
document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});
/* Counters */
function count(root){root.querySelectorAll('[data-n]').forEach(function(b){var to=+b.dataset.n,s=0,st=Math.max(1,to/40);var id=setInterval(function(){s+=st;if(s>=to){s=to;clearInterval(id)}b.textContent=Math.round(s)+'+'},30)})}
document.getElementById('yr').textContent=new Date().getFullYear();
})();
