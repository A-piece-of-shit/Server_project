import{af as p,d as O,r as d,B as R,o as u,D as v,e as a,b as e,A as _,f as D,c as S,H as $,G as E,g as z,J as N,m,ag as W,F as K,ah as Q,ai as X,aj as Y,p as Z,aC as ee,E as te,aG as ae,aH as se,ak as le,ad as ne,y as oe,z as ie,_ as ue}from"./index-875aa0db.js";/* empty css                      *//* empty css               *//* empty css                        */import"./el-tooltip-4ed993c7.js";const re=(l,g)=>p.get(`/sku/get/${l}/${g}`),ce=l=>p.get(`/sku/listing/${l}`),de=l=>p.get(`/sku/delist/${l}`),_e=l=>p.get(`/sku/info/${l}`),me=l=>p.get(`/sku/delete/${l}`),y=l=>(oe("data-v-d72aab36"),l=l(),ie(),l),pe=["src"],ge=y(()=>_("h3",null,"详细信息",-1)),fe=y(()=>_("h5",null,"平台属性",-1)),he=y(()=>_("h5",null,"销售属性",-1)),ke=y(()=>_("h5",null,"商品图片",-1)),ve=["src"],ye=O({__name:"Sku",setup(l){const g="http://127.0.0.1:3000/development",o=d(1),w=d(10),I=d(100);R(()=>{r()});const b=d([]),r=async(n=1)=>{o.value=n;const s=await re(o.value,w.value);s.code===200&&(b.value=s.data.records,I.value=s.data.total)},V=n=>{r(n)},P=()=>{r()},q=async n=>{n.isListing?(await de(n.id)).code===200&&(m({type:"success",message:"下架成功"}),r(o.value)):(await ce(n.id)).code===200&&(m({type:"success",message:"上架成功"}),r(o.value))},A=()=>{m({type:"success",message:"编辑功能正在开发中~"})},C=d(!1),f=d({platformAttrList:[],salesAttrList:[],salesImgList:[]}),B=async n=>{C.value=!0;const s=await _e(n.id);s.code===200&&(f.value=s.data)},U=async n=>{const{code:s}=await me(n);s===200?(m({type:"success",message:"成功"}),r(b.value.length>1?o.value:o.value-1)):m({type:"error",message:"失败"})};return(n,s)=>{const i=W,h=K,T=Q,G=X,j=Y,c=Z,L=ee,k=te,F=ae,H=se,M=le,J=ne;return u(),v(J,null,{default:a(()=>[e(G,{border:"",data:b.value},{default:a(()=>[e(i,{type:"index",label:"序号",align:"center",width:"60"}),e(i,{label:"名称",prop:"skuName",width:"100"}),e(i,{label:"描述",prop:"skuDesc"}),e(i,{label:"图片"},{default:a(({row:t})=>[_("img",{src:D(g)+"/"+t.skuImgUrl,alt:"sku图片",style:{width:"100%"}},null,8,pe)]),_:1}),e(i,{label:"重量",prop:"skuWeight",width:"80"}),e(i,{label:"价格",prop:"skuPrice",width:"80"}),e(i,{label:"操作",fixed:"right",width:"300"},{default:a(({row:t})=>[e(h,{name:`commoditymanagement-sku-${t.isListing?"delist":"listing"}`,onClick:x=>q(t),width:"40",height:"40",style:{"vertical-align":"middle",cursor:"pointer"}},null,8,["name","onClick"]),e(h,{name:"commoditymanagement-sku-edit",onClick:A,width:"32",height:"32",style:{"vertical-align":"middle",cursor:"pointer"}}),e(h,{name:"commoditymanagement-sku-view",onClick:x=>B(t),width:"40",height:"40",style:{"vertical-align":"middle",cursor:"pointer"}},null,8,["onClick"]),e(T,{title:`您确定要删除${t.skuName}吗？`,onConfirm:x=>U(t.id),width:200},{reference:a(()=>[e(h,{name:"commoditymanagement-sku-delete",width:"40",height:"40",style:{"vertical-align":"middle",cursor:"pointer"}})]),_:2},1032,["title","onConfirm"])]),_:1})]),_:1},8,["data"]),e(j,{"current-page":o.value,"onUpdate:currentPage":[s[0]||(s[0]=t=>o.value=t),V],"onUpdate:pageSize":[P,s[1]||(s[1]=t=>w.value=t)],"page-size":w.value,"page-sizes":[10,20,30,40],background:"",layout:"prev, pager, next, jumper,->,sizes,total",total:I.value,style:{"margin-top":"20px"}},null,8,["current-page","page-size","total"]),e(M,{modelValue:C.value,"onUpdate:modelValue":s[2]||(s[2]=t=>C.value=t),direction:"btt",size:"70%"},{header:a(({})=>[ge]),default:a(({})=>[e(k,null,{default:a(()=>[e(c,{span:2},{default:a(()=>[fe]),_:1}),e(c,{span:22},{default:a(()=>[(u(!0),S($,null,E(f.value.platformAttrList,t=>(u(),v(L,{key:t.id,style:{"margin-right":"2vw"}},{default:a(()=>[z(N(t.attrName),1)]),_:2},1024))),128))]),_:1})]),_:1}),e(k,{style:{margin:"3vh 0 3vh 0"}},{default:a(()=>[e(c,{span:2},{default:a(()=>[he]),_:1}),e(c,{span:22},{default:a(()=>[(u(!0),S($,null,E(f.value.salesAttrList,t=>(u(),v(L,{key:t.id,style:{"margin-right":"2vw"}},{default:a(()=>[z(N(t.attrName),1)]),_:2},1024))),128))]),_:1})]),_:1}),e(k,null,{default:a(()=>[e(c,{span:2,style:{"margin-bottom":"1vh"}},{default:a(()=>[ke]),_:1})]),_:1}),e(k,null,{default:a(()=>[e(c,{span:24},{default:a(()=>[e(H,{trigger:"click",height:"auto"},{default:a(()=>[(u(!0),S($,null,E(f.value.salesImgList,t=>(u(),v(F,{key:t.id,style:{height:"100vh"}},{default:a(()=>[_("img",{src:D(g)+"/"+t.imgUrl,alt:"销售图片",style:{width:"100%"}},null,8,ve)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})}}});const Ee=ue(ye,[["__scopeId","data-v-d72aab36"]]);export{Ee as default};
