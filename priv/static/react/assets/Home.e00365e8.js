import{r as c,j as t,a as e}from"./index.246cba40.js";import{u as h}from"./channel.e5e9a602.js";const d="/react/assets/react.35ef61ed.svg",g="/react/assets/phoenix.150a2de5.svg",u="/react/assets/vite.4a748afd.svg";function f(){const[s,n]=c.exports.useState(0),[l,r]=c.exports.useState(0),a=h("counter:lobby","shout",o=>r(o.count));function i(){n(o=>o+1),a&&a.push("count",{count:s+1})}return t("div",{className:"App",children:[t("div",{children:[e("a",{href:"https://vitejs.dev",target:"_blank",children:e("img",{src:u,className:"logo",alt:"Vite logo"})}),e("a",{href:"https://reactjs.org",target:"_blank",children:e("img",{src:d,className:"logo react",alt:"React logo"})}),e("a",{href:"http://localhost",title:"phoenix",children:e("img",{src:g,className:"logo",alt:"Phoenix logo"})}),e("p",{className:"read-the-docs",children:"Click on the Phoenix logo to go the API"}),e("hr",{})]}),e("h1",{children:"Phoenix, React, Vite"}),e("hr",{}),t("div",{className:"card",children:["Total clicks received: ",l]}),e("div",{className:"card",children:t("button",{onClick:i,children:["count is ",s]})}),t("p",{children:["User token: ",window.userToken]})]})}export{f as default};