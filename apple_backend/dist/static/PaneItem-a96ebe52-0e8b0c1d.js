import{t as w,a8 as D,y as x,bN as _,r as o,cK as L,j as e,cL as M,cM as k,a1 as T,cN as j,cO as F,cP as N,cQ as R,q as p,ab as E}from"./sanity-7c0a43a0.js";const O=(t,n)=>({title:p("em",{children:["No schema found for type ",e("code",{children:n})]}),subtitle:p("em",{children:["Document: ",e("code",{children:t})]}),media:()=>e(E,{})});function W(t){const{layout:n,value:a}=t;return e(k,{...O(a._id,a._type),layout:n})}function P(t,n,a){return t===!1?!1:t||n&&n.icon||a||!1}function K(t){const{icon:n,id:a,layout:i="default",pressed:y,schemaType:s,selected:r,title:u,value:c}=t,v=w(),l=D(),{ChildLink:d}=x(),m=_(a),f=!!(s&&s.name&&v.get(s.name)),[I,h]=o.useState(!1),g=o.useMemo(()=>c&&L(c)?!s||!f?e(W,{value:c}):e(M,{documentPreviewStore:l,icon:P(n,s,N),layout:i,schemaType:s,value:c,presence:m}):e(k,{status:e(T,{muted:!0,children:e(j,{})}),icon:P(n,s,R),layout:i,title:u}),[l,f,n,i,s,u,c,m]),C=o.useMemo(()=>function(b){return e(d,{...b,childId:a})},[d,a]),S=o.useCallback(()=>h(!0),[]);return o.useEffect(()=>h(!1),[r]),e(F,{__unstable_focusRing:!0,as:C,"data-as":"a","data-ui":"PaneItem",padding:2,radius:2,onClick:S,pressed:y,selected:r||I,tone:"inherit",children:g})}export{K as P};
