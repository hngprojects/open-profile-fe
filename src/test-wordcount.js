const bio1 = "this is four words";
const bio2 = "this,is,four,words";
const bio3 = "this is\nfour words";

console.warn(bio1.trim().split(/\s+/).filter(Boolean).length);
console.warn(bio2.trim().split(/\s+/).filter(Boolean).length);
console.warn(bio3.trim().split(/\s+/).filter(Boolean).length);
