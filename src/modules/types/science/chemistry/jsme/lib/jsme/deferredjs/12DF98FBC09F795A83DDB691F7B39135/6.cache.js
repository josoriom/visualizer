$wnd.jsme.runAsyncCallback6('var ffa="400px",gfa="Accept",hfa="Cancel",ifa="Paste",jfa="Paste the text to import into the text area below.",kfa="dragend",lfa="dragenter",mfa="dragover",nfa="drop",ofa="file",pfa="gwt-FileUpload",qfa="gwt-HTML",rfa="gwt-TextArea",sfa="textarea";t(239,227,{});function o$(){o$=v;p$=new RE(kfa,new q$)}function r$(a){a.a.cancelBubble=!0;bD(a.a)}function q$(){}t(240,239,{},q$);_.dd=function(){r$(this)};_.gd=function(){return p$};var p$;function s$(){s$=v;t$=new RE(lfa,new u$)}function u$(){}\nt(241,239,{},u$);_.dd=function(){r$(this)};_.gd=function(){return t$};var t$;function v$(){v$=v;w$=new RE(mfa,new x$)}function x$(){}t(242,239,{},x$);_.dd=function(){r$(this)};_.gd=function(){return w$};var w$;function y$(){y$=v;z$=new RE(nfa,new A$)}function A$(){}t(243,239,{},A$);\n_.dd=function(a){var b,c,d,e;this.a.cancelBubble=!0;bD(this.a);d=(this.a.dataTransfer||null).files;e=0;a:for(;e<d.length;++e){if(0<a.a.d&&e>=a.a.d)break a;b=d[e];c=new FileReader;tfa(c,a.a.b);1==a.a.c&&c.readAsText(b)}0==d.length&&(b=(this.a.dataTransfer||null).getData(Ev),a.a.b.a.a.f.pb[kw]=null!=b?b:l)};_.gd=function(){return z$};var z$;function B$(a,b,c){tG(!a.mb?a.mb=new IG(a):a.mb,c,b)}function C$(){this.pb=lC(ofa);this.pb[Bo]=pfa}t(361,342,Ax,C$);_.zd=function(a){vJ(this,a)};\nfunction D$(a){var b=aD(lp);u_(Ou,t_(b));this.pb=b;this.b=new M0(this.pb);this.pb[Bo]=qfa;L0(this.b,a,!0);U0(this)}t(365,366,Ax,D$);function E$(){ZL();var a=aD(sfa);!hI&&(hI=new gI);!fI&&(fI=new eI);this.pb=a;this.pb[Bo]=rfa}t(405,406,Ax,E$);function F$(a,b){var c,d;c=aD(Uv);d=aD(Dv);d[wn]=a.a.a;d.style[lw]=a.b.a;var e=(jI(),kI(d));c.appendChild(e);iI(a.d,c);HJ(a,b,d)}function G$(){BK.call(this);this.a=(EK(),LK);this.b=(MK(),PK);this.e[uo]=ze;this.e[to]=ze}t(414,358,fx,G$);\n_.Yd=function(a){var b;b=nC(a.pb);(a=LJ(this,a))&&this.d.removeChild(nC(b));return a};function H$(a){try{a.w=!1;var b,c,d;d=a.hb;c=a.ab;d||(a.pb.style[mw]=hq,kL(a.pb,!1),a.ab=!1,a.je());b=a.pb;b.style[Sq]=0+(TD(),vt);b.style[Ov]=Re;r2(a,ty(rD($doc)+(qD()-iC(a.pb,Is)>>1),0),ty(sD($doc)+(pD()-iC(a.pb,Hs)>>1),0));d||((a.ab=c)?(a.pb.style[Io]=Zt,a.pb.style[mw]=nw,kL(a.pb,!0),Vx(a.gb,200)):(a.pb.style[mw]=nw,kL(a.pb,!0)))}finally{a.w=!0}}\nfunction I$(a){a.i=(new E1(a.j)).yc.Ye();rJ(a.i,new J$(a),(XE(),XE(),YE));a.d=E(lM,n,47,[a.i])}function K$(){M2();var a,b,c,d,e;i3.call(this,(A3(),B3),null,!0);this.Xg();this.db=!0;a=new D$(this.k);this.f=new E$;this.f.pb.style[tw]=Te;fJ(this.f,Te);this.Vg();D2(this,ffa);e=new G$;e.pb.style[fq]=Te;e.e[uo]=10;c=(EK(),FK);e.a=c;F$(e,a);F$(e,this.f);this.e=new TK;this.e.e[uo]=20;for(b=this.d,c=0,d=b.length;c<d;++c)a=b[c],QK(this.e,a);F$(e,this.e);R2(this,e);N1(this,!1);this.Wg()}t(688,689,UX,K$);\n_.Vg=function(){I$(this)};_.Wg=function(){var a=this.f;a.pb.readOnly=!0;var b=iJ(a.pb)+"-readonly";eJ(a.Ld(),b,!0)};_.Xg=function(){M1(this.I.b,"Copy")};_.d=null;_.e=null;_.f=null;_.i=null;_.j="Close";_.k="Press Ctrl-C (Command-C on Mac) or right click (Option-click on Mac) on the selected text to copy it, then paste into another program.";function J$(a){this.a=a}t(691,1,{},J$);_.kd=function(){T2(this.a,!1)};_.a=null;function L$(a){this.a=a}t(692,1,{},L$);\n_.Rc=function(){nJ(this.a.f.pb,!0);mL(this.a.f.pb);var a=this.a.f,b;b=jC(a.pb,kw).length;if(0<b&&a.kb){if(0>b)throw new jU("Length must be a positive integer. Length: "+b);if(b>jC(a.pb,kw).length)throw new jU("From Index: 0  To Index: "+b+"  Text Length: "+jC(a.pb,kw).length);var a=a.pb,c=0;try{var d=a.createTextRange(),e=a.value.substr(c,b).match(/(\\r\\n)/gi);null!=e&&(b-=e.length);var f=a.value.substring(0,c).match(/(\\r\\n)/gi);null!=f&&(c-=f.length);d.collapse(!0);d.moveStart("character",c);d.moveEnd("character",\nb);d.select()}catch(g){}}};_.a=null;function M$(a){I$(a);a.a=(new E1(a.b)).yc.Ye();rJ(a.a,new N$(a),(XE(),XE(),YE));a.d=E(lM,n,47,[a.a,a.i])}function O$(a){a.j=hfa;a.k=jfa;a.b=gfa;M1(a.I.b,ifa)}function P$(a){M2();K$.call(this);this.c=a}t(694,688,UX,P$);_.Vg=function(){M$(this)};_.Wg=function(){fJ(this.f,"150px")};_.Xg=function(){O$(this)};_.je=function(){h3(this);YB((VB(),WB),new Q$(this))};_.a=null;_.b=null;_.c=null;function R$(a){M2();P$.call(this,a)}t(693,694,UX,R$);\n_.Vg=function(){var a;M$(this);a=new C$;rJ(a,new S$(this),(G_(),G_(),H_));this.d=E(lM,n,47,[this.a,a,this.i])};_.Wg=function(){fJ(this.f,"150px");var a=new T$(this),b=this.f;B$(b,new U$,(s$(),s$(),t$));B$(b,new V$,(o$(),o$(),p$));B$(b,new W$,(v$(),v$(),w$));B$(b,new X$(a),(y$(),y$(),z$))};_.Xg=function(){O$(this);this.k+=" Or drag and drop a file on it."};function S$(a){this.a=a}t(695,1,{},S$);_.jd=function(a){var b,c;b=new FileReader;a=(c=a.a.srcElement,c.files[0]);ufa(b,new Y$(this));b.readAsText(a)};\n_.a=null;function Y$(a){this.a=a}t(696,1,{},Y$);_.Yg=function(a){gP();YL(this.a.a.f,a)};_.a=null;t(699,1,{});t(698,699,{});_.b=null;_.c=1;_.d=-1;function T$(a){this.a=a;this.b=new Z$(this);this.c=this.d=1}t(697,698,{},T$);_.a=null;function Z$(a){this.a=a}t(700,1,{},Z$);_.Yg=function(a){this.a.a.f.pb[kw]=null!=a?a:l};_.a=null;function N$(a){this.a=a}t(704,1,{},N$);_.kd=function(){if(this.a.c){var a=this.a.c,b;b=new dP(a.a,0,jC(this.a.f.pb,kw));SS(a.a.a,b.a)}T2(this.a,!1)};_.a=null;\nfunction Q$(a){this.a=a}t(705,1,{},Q$);_.Rc=function(){nJ(this.a.f.pb,!0);mL(this.a.f.pb)};_.a=null;t(706,1,ux);_.ad=function(){var a,b;a=new $$(this.a);void 0!=$wnd.FileReader?b=new R$(a):b=new P$(a);F2(b);H$(b)};function $$(a){this.a=a}t(707,1,{},$$);_.a=null;t(708,1,ux);_.ad=function(){var a;a=new K$;var b=this.a,c;YL(a.f,b);b=(c=rU(b,"\\r\\n|\\r|\\n|\\n\\r"),c.length);fJ(a.f,20*(10>b?b:10)+vt);YB((VB(),WB),new L$(a));F2(a);H$(a)};function ufa(a,b){a.onload=function(a){b.Yg(a.target.result)}}\nfunction tfa(a,b){a.onloadend=function(a){b.Yg(a.target.result)}}function X$(a){this.a=a}t(713,1,{},X$);_.a=null;function U$(){}t(714,1,{},U$);function V$(){}t(715,1,{},V$);function W$(){}t(716,1,{},W$);V(699);V(698);V(713);V(714);V(715);V(716);V(239);V(241);V(240);V(242);V(243);V(688);V(694);V(693);V(707);V(691);V(692);V(704);V(705);V(695);V(696);V(697);V(700);V(365);V(414);V(405);V(361);w(RX)(6);\n//@ sourceURL=6.js\n')