import{s as R,p as l,j as r}from"./factory.Db5S1wuu.js";import{r as u}from"./index.NEDEFKed.js";import{c as S}from"./panda-context.Ctm2tEss.js";import{S as G}from"./input.CC5RgVLe.js";import{S as g,E as p}from"./icons.CIle0EBC.js";import{H as h}from"./hstack.cpn5HBQ5.js";import{T as b}from"./token-content.bnrf__dw.js";import{T as W,S as C}from"./token-group.NjgizlY6.js";import{g as T}from"./vstack.DSknDi-L.js";import"./index.DvseB-QT.js";import"./hstack.B2vgu9i9.js";const k=u.forwardRef(function(t,e){const[s,i]=R(t,["justify","gap"]),o=T(s),c={ref:e,...o,...i};return u.createElement(l.div,c)});class f{constructor(){this.r=0,this.g=0,this.b=0,this.toString=()=>"<r: "+this.r+" g: "+this.g+" b: "+this.b+" >"}}class x{constructor(){this.WCAG_AA=!1,this.WCAG_AAA=!1,this.customRatio=void 0,this.toString=()=>"< WCAG-AA: "+(this.WCAG_AA?"pass":"fail")+" WCAG-AAA: "+(this.WCAG_AAA?"pass":"fail")+" >"}}let j=class{constructor(){this.fontSize=14,this.rgbClass=new f,this.isValidSixDigitColorCode=t=>/^(#)?([0-9a-fA-F]{6})?$/.test(t),this.isValidThreeDigitColorCode=t=>/^(#)?([0-9a-fA-F]{3})?$/.test(t),this.isValidColorCode=t=>this.isValidSixDigitColorCode(t)||this.isValidThreeDigitColorCode(t),this.isValidRatio=t=>typeof t=="number",this.convertColorToSixDigit=t=>"#"+t[1]+t[1]+t[2]+t[2]+t[3]+t[3],this.hexToLuminance=t=>{if(!this.isValidColorCode(t))throw new Error("Invalid Color :"+t);this.isValidThreeDigitColorCode(t)&&(t=this.convertColorToSixDigit(t));const e=this.getRGBFromHex(t),s=this.calculateLRGB(e);return this.calculateLuminance(s)},this.check=(t,e,s,i)=>{if(typeof s<"u"&&(this.fontSize=s),!t||!e)return!1;const o=this.hexToLuminance(t),c=this.hexToLuminance(e),a=this.getContrastRatio(o,c);return typeof i<"u"?this.isValidRatio(i)?this.verifyCustomContrastRatio(a,i):!1:this.verifyContrastRatio(a)},this.checkPairs=(t,e)=>{const s=[];for(const i in t){const o=t[i];typeof o.fontSize<"u"?s.push(this.check(o.colorA,o.colorB,o.fontSize,e)):s.push(this.check(o.colorA,o.colorB,void 0,e))}return s},this.calculateLuminance=t=>.2126*t.r+.7152*t.g+.0722*t.b,this.isLevelAA=(t,e,s)=>this.check(t,e,s).WCAG_AA,this.isLevelAAA=(t,e,s)=>this.check(t,e,s).WCAG_AAA,this.isLevelCustom=(t,e,s)=>this.check(t,e,void 0,s).customRatio,this.getRGBFromHex=t=>{const e=new f;if(typeof t!="string")throw new Error("must use string");const s=parseInt(t.slice(1,3),16),i=parseInt(t.slice(3,5),16),o=parseInt(t.slice(5,7),16);return e.r=s,e.g=i,e.b=o,e},this.calculateSRGB=t=>{const e=new f;for(const s in t)e[s]=parseFloat((t[s]/255).toString());return e},this.calculateLRGB=t=>{const e=this.calculateSRGB(t),s=Object.create(this.rgbClass);let i=0;for(const o in e)i=parseFloat(e[o]),i<=.03928?s[o]=i/12.92:s[o]=Math.pow((i+.055)/1.055,2.4);return s},this.getContrastRatio=(t,e)=>{let s,i;return t>=e?(s=t,i=e):(s=e,i=t),(s+.05)/(i+.05)},this.verifyContrastRatio=t=>{const a=new x;return(this.fontSize||14)>=18?(a.WCAG_AA=t>=3,a.WCAG_AAA=t>=4.5):(a.WCAG_AA=t>=4.5,a.WCAG_AAA=t>=7),a},this.verifyCustomContrastRatio=(t,e)=>{const s=new x;s.toString=function(){return"< Custom Ratio: "+(this.customRatio?"pass":"fail")+"  >"};const i=Object.create(s);return i.customRatio=t>=e,i}}};const v=(n,t)=>{const e=new j;let s;try{s=e.checkPairs([{colorA:n,colorB:t,fontSize:14},{colorA:n,colorB:t,fontSize:18}])}catch{}return s},y=(n,t)=>{const e=new j;let s,i,o;try{s=e.hexToLuminance(n),i=e.hexToLuminance(t),o=e.getContrastRatio(s,i)}catch{}return o};function m(n){const{score:t,size:e}=n;return r.jsxs(r.Fragment,{children:[r.jsxs(h,{justify:"space-between",fontWeight:"medium",children:[r.jsxs(h,{gap:"2",children:[r.jsx("span",{children:t.WCAG_AA?r.jsx(g,{}):r.jsx(p,{})}),r.jsx("span",{children:"AA"})]}),r.jsx("span",{children:e==="regular"?"4.5:1":"3:1"})]}),r.jsxs(h,{justify:"space-between",fontWeight:"medium",children:[r.jsxs(h,{gap:"2",children:[r.jsx("span",{children:t.WCAG_AAA?r.jsx(g,{}):r.jsx(p,{})}),r.jsx("span",{children:"AAA"})]}),r.jsx("span",{children:e==="regular"?"7:1":"4.5:1"})]})]})}function _(n){const{title:t,colors:e,onChange:s,value:i}=n;return r.jsxs(C,{flex:"1",children:[r.jsx(l.span,{fontWeight:"semibold",children:t}),r.jsx(l.div,{display:"flex",flexDirection:"column",borderWidth:"1px",borderColor:"card",pt:"16",style:{background:i}}),r.jsx(G,{value:i,onChange:o=>s(o.currentTarget.value),children:e.map(o=>r.jsx("option",{value:o.label,children:o.label},o.label))})]})}function $(){const n=S,[t,e]=u.useState("#000000"),[s,i]=u.useState("#ffffff"),o=n.find(A=>A.label===t)?.value||t,c=n.find(A=>A.label===s)?.value||s,a=v(o,c),d=y(o,c);return r.jsx(W,{children:r.jsxs(b,{children:[r.jsxs(h,{gap:"3",p:"2",children:[r.jsx(_,{title:"Background",value:c,onChange:i,colors:n}),r.jsx(_,{title:"Foreground",value:o,onChange:e,colors:n})]}),r.jsx(h,{justify:"center",fontWeight:"semibold",fontSize:"2xl",p:"2",outline:"none",borderWidth:"1px",borderColor:"card",suppressContentEditableWarning:!0,contentEditable:!0,style:{background:c,color:o},children:"example text showing contrast"}),r.jsxs("div",{children:[r.jsxs(k,{textAlign:"center",gap:"2.5",children:[r.jsx(l.span,{fontWeight:"bold",fontSize:"4xl",children:d?`${d?.toFixed(2).replace(/[.,]00$/,"")}:1`:":"}),r.jsx(l.span,{fontWeight:"semibold",opacity:"0.5",children:"Contrast ratio"})]}),a&&r.jsxs(l.div,{display:"flex",gap:"5",marginTop:"10",children:[r.jsxs(C,{flex:"1",gap:"4",children:[r.jsx(l.span,{fontWeight:"semibold",children:"Normal Text"}),r.jsx(m,{score:a[0],size:"regular"})]}),r.jsxs(C,{flex:"1",gap:"4",children:[r.jsx(l.span,{fontWeight:"semibold",children:"Large Text"}),r.jsx(m,{score:a[1],size:"large"})]})]})]})]})})}export{$ as default};
