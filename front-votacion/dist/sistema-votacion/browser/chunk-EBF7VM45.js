import{a as b}from"./chunk-Y3RCPZZP.js";import{a as h}from"./chunk-3MGN2CRD.js";import{a as v,c as V,d as z,e as D,h as $}from"./chunk-ZLLD3L34.js";import{D as C,Ea as M,F as m,Ga as O,H as a,Ha as S,I as o,J as f,K as w,L as p,M as A,P as l,Q as E,W as N,ca as k,da as j,ea as T,ia as F,l as u,p as P,q as g,r as I,s as x,x as s,y as d}from"./chunk-ZHU3U647.js";var q=(i,e)=>({"btn-danger":i,"btn-warning":e});function G(i,e){i&1&&(a(0,"div",12),l(1," No hay preguntas creadas "),o())}function H(i,e){i&1&&(a(0,"span",23),l(1," Cerrar pregunta "),o())}function K(i,e){i&1&&(a(0,"span",24),l(1," Pregunta cerrada"),o())}function L(i,e){if(i&1){let c=w();a(0,"div",13)(1,"div",14)(2,"div",3)(3,"div",15)(4,"div",16),f(5,"input",17),o(),a(6,"div",18)(7,"button",19),p("click",function(){let r=I(c).$implicit,n=A();return x(n.toggleEstado(r))}),C(8,H,2,0,"span",20)(9,K,2,0,"span",21),o()(),a(10,"div",18)(11,"button",22),p("click",function(){let r=I(c).$implicit,n=A();return x(n.resultado(r.id_pregunta))}),l(12,"Ver resultados"),o()()()()()()}if(i&2){let c=e.$implicit;s(5),m("placeholder",c.descripcion),s(2),m("ngClass",N(4,q,c.estado==="Activo",c.estado==="Inactivo")),s(),m("ngIf",c.estado==="Activo"),s(),m("ngIf",c.estado==="Inactivo")}}var R=(()=>{let e=class e{constructor(t,r,n,_){this.router=t,this.route=r,this.preguntasService=n,this.asambleaService=_,this.preguntas=[],this.asamblea={}}ngOnInit(){this.route.params.subscribe(r=>{this.id=+r.id,this.id&&(this.refreshPreguntas(),this.tituloAsamblea())});let t=JSON.parse(localStorage.getItem("asambleaId")??"{}");this.asambleaId=t.id_asamblea||0}tituloAsamblea(){this.id&&this.asambleaService.getById(v.getAllAsambleas,this.id).subscribe({next:t=>{t.respuesta&&t.respuesta.length>0&&(this.asamblea=t.respuesta[0])},error:t=>console.error("Error al obtener titulo",t)})}refreshPreguntas(){this.id&&this.preguntasService.getById(v.getAllPreguntas,this.id).subscribe(t=>{Array.isArray(t.respuesta)?this.preguntas=t.respuesta:this.preguntas=[]})}crearPregunta(t){this.router.navigate(["/asambleas/creacion-preguntas",t])}volver(){this.router.navigate(["/asambleas"])}resultado(t){this.router.navigate(["/asambleas/resultado/",this.asambleaId,t])}toggleEstado(t){t.estado=t.estado==="Activo"?"Inactivo":"Activo",this.preguntasService.delete(v.deletePregunta,t.id_pregunta,t).subscribe({next:r=>{console.log("Estado de la pregunta actualizado exitosamente:",r)},error:r=>{console.error("Error al actualizar el estado de la pregunta:",r),r.status===401?console.error("No autorizado, redirigiendo al login"):console.error("Error no manejado:",r)}})}};e.\u0275fac=function(r){return new(r||e)(d(O),d(M),d(h),d(b))},e.\u0275cmp=P({type:e,selectors:[["app-preguntas-ad"]],decls:19,vars:4,consts:[[1,"container","py-3"],[1,"abs-center"],[1,"card","shadow-lg","border-0"],[1,"card-body"],[1,"text-center","fs-2","text-primary","mb-4"],[1,"d-flex","flex-column","flex-md-row","justify-content-between","align-items-md-center","mb-3"],[1,"btn","btn-success",3,"click","disabled"],[1,"material-icons","align-middle","me-1"],["class","alert alert-danger text-center",4,"ngIf"],["class","row mb-2",4,"ngFor","ngForOf"],[1,"mb-3"],["type","button",1,"btn","btn-secondary","me-2",3,"click"],[1,"alert","alert-danger","text-center"],[1,"row","mb-2"],[1,"card"],[1,"row"],[1,"col-md-6"],["type","text","disabled","",1,"form-control","mb-3",3,"placeholder"],[1,"col"],[1,"btn","w-100",3,"click","ngClass"],["title","Activo",4,"ngIf"],["title","Inactivo",4,"ngIf"],[1,"btn","btn-primary","w-100",3,"click"],["title","Activo"],["title","Inactivo"]],template:function(r,n){r&1&&(f(0,"app-animation")(1,"app-nav"),a(2,"div",0)(3,"div",1)(4,"div",2)(5,"div",3)(6,"h2",4),l(7),o(),a(8,"div",5)(9,"button",6),p("click",function(){let y;return n.crearPregunta((y=n.id)!==null&&y!==void 0?y:0)}),a(10,"i",7),l(11,"add_circle"),o(),l(12," Crear pregunta"),o()(),C(13,G,2,0,"div",8)(14,L,13,7,"div",9),a(15,"div",10)(16,"button",11),p("click",function(){return n.volver()}),l(17,"Volver"),o()()()()()(),f(18,"app-footer")),r&2&&(s(7),E(n.asamblea.titulo),s(2),m("disabled",n.asamblea.estado==="Inactivo"),s(4),m("ngIf",n.preguntas.length===0),s(),m("ngForOf",n.preguntas))},dependencies:[k,j,T,V,z,D],styles:[".abs-center[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;min-height:70vh}.card[_ngcontent-%COMP%]{min-width:90vw}"]});let i=e;return i})();var Q=[{path:"",component:R}],J=(()=>{let e=class e{};e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=g({type:e}),e.\u0275inj=u({imports:[S.forChild(Q),S]});let i=e;return i})();var ge=(()=>{let e=class e{};e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=g({type:e}),e.\u0275inj=u({providers:[h,b],imports:[F,J,$]});let i=e;return i})();export{ge as PreguntasAdModule};
