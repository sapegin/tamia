import{j as s,p as e}from"./factory.Db5S1wuu.js";import{t as p}from"./index.DvseB-QT.js";import{r as m}from"./index.NEDEFKed.js";import{g as l}from"./sizes-sort.LCBd4mn7.js";import{T as d}from"./token-group.NjgizlY6.js";import{E as c}from"./empty-state.DW0ZBvS_.js";import{a as x}from"./icons.CIle0EBC.js";import{G as h}from"./grid.7qt7PxXU.js";const u=/^(min|max|fit)-content$/,g=/(ch|%)$/;function T(i){const{sizes:r,name:a}=i,o=l(r).filter(n=>!n.extensions.isNegative&&!n.name.includes("breakpoint-")&&!u.test(n.value)&&!g.test(n.value));return o.length===0?s.jsxs(c,{title:"No Tokens",icon:s.jsx(x,{}),children:["The panda config does not contain any `",a,"`` tokens"]}):s.jsx(d,{children:s.jsxs(h,{display:"grid",columnGap:"10",rowGap:"2.5",columns:5,children:[s.jsx(e.span,{fontWeight:"semibold",children:"Name"}),s.jsx(e.span,{fontWeight:"semibold",children:"Size"}),s.jsx(e.span,{fontWeight:"semibold",gridColumn:"span 3 / span 3",children:"Pixels"}),s.jsx(e.hr,{gridColumn:"span 5 / span 5"}),o.sort((n,t)=>n.extensions.prop-t.extensions.prop).map((n,t)=>s.jsxs(m.Fragment,{children:[s.jsx("b",{children:n.extensions.prop}),s.jsx("span",{children:n.value}),s.jsx("span",{children:p(n.value)}),s.jsx(e.span,{height:"5",background:"rgba(255, 192, 203, 0.5)",gridColumn:"span 2 / span 2",style:{width:n.value}})]},t))]})})}export{T as default};
