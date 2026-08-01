export const PROTOCOL = 'QRB2';
export const PROFILES = {
  safe: { label: 'Güvenli', fps: 8, blockSize: 280, level: 'M', note: 'Zayıf kamera ve uzak mesafe' },
  balanced: { label: 'Dengeli', fps: 14, blockSize: 520, level: 'L', note: 'Çoğu telefon için önerilen' },
  fast: { label: 'Hızlı', fps: 20, blockSize: 720, level: 'L', note: 'İyi kamera ve parlak ekran' },
  turbo: { label: 'Turbo', fps: 26, blockSize: 900, level: 'L', note: 'Yeni cihazlar ve yakın mesafe' }
};
export function bytesToBase64(bytes) { let binary = ''; for (let i=0;i<bytes.length;i+=0x8000) binary += String.fromCharCode(...bytes.subarray(i,i+0x8000)); return btoa(binary); }
export function base64ToBytes(value) { return Uint8Array.from(atob(value), c => c.charCodeAt(0)); }
export function checksum(value) { let h=0x811c9dc5; for(let i=0;i<value.length;i++){h^=value.charCodeAt(i);h=Math.imul(h,0x01000193);} return (h>>>0).toString(36); }
function random(seed) { let s=seed>>>0; return()=>{s+=0x6d2b79f5;let v=s;v=Math.imul(v^(v>>>15),v|1);v^=v+Math.imul(v^(v>>>7),v|61);return((v^(v>>>14))>>>0)/4294967296;}; }
export function indicesForSymbol(id,count) {
  if(count<=1)return[0];
  if(id%3===0)return[Math.floor(id/3)%count];
  const next=random((id^Math.imul(count,0x9e3779b1))>>>0),roll=next();
  const degree=Math.min(count,roll<.44?2:roll<.72?3:roll<.88?4:roll<.96?5:7),selected=new Set();
  while(selected.size<degree)selected.add(Math.floor(next()*count));
  return[...selected].sort((a,b)=>a-b);
}
export function splitIntoBlocks(bytes,blockSize) {
  const count=Math.max(1,Math.ceil(bytes.length/blockSize));
  return Array.from({length:count},(_,i)=>{const b=new Uint8Array(blockSize);b.set(bytes.subarray(i*blockSize,(i+1)*blockSize));return b;});
}
export function createSymbol(blocks,id) {
  const out=new Uint8Array(blocks[0].length);
  for(const index of indicesForSymbol(id,blocks.length))for(let i=0;i<out.length;i++)out[i]^=blocks[index][i];
  return out;
}
export class FountainDecoder {
  constructor(count,size){this.blockCount=count;this.blockSize=size;this.blocks=Array(count).fill(null);this.equations=new Map();this.symbols=new Set();this.solved=0;}
  add(id,payload){
    if(this.symbols.has(id))return{duplicate:true};
    this.symbols.add(id);const indices=new Set(indicesForSymbol(id,this.blockCount)),data=payload.slice();
    this.reduce(indices,data);
    if(indices.size===1)this.solve([...indices][0],data);
    else if(indices.size>1)this.equations.set(id,{indices,data});
    return{duplicate:false};
  }
  reduce(indices,data){for(const i of [...indices]){const known=this.blocks[i];if(!known)continue;for(let o=0;o<data.length;o++)data[o]^=known[o];indices.delete(i);}}
  solve(index,data){
    if(this.blocks[index])return;this.blocks[index]=data.slice();this.solved++;
    let changed=true;
    while(changed){changed=false;for(const[id,eq]of[...this.equations]){
      if(eq.indices.has(index)){for(let o=0;o<eq.data.length;o++)eq.data[o]^=data[o];eq.indices.delete(index);}
      if(eq.indices.size===1){const next=[...eq.indices][0];this.equations.delete(id);if(!this.blocks[next]){index=next;data=eq.data.slice();this.blocks[index]=data;this.solved++;changed=true;break;}}
      else if(eq.indices.size===0)this.equations.delete(id);
    }}
  }
  get complete(){return this.solved===this.blockCount;}
  assemble(fileSize){const all=new Uint8Array(this.blockCount*this.blockSize);this.blocks.forEach((b,i)=>all.set(b,i*this.blockSize));return all.slice(0,fileSize);}
}
