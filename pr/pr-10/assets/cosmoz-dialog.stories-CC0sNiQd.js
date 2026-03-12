import{A as Y,w as X,b as g,D as I}from"./iframe-DW6sp2P6.js";const D=t=>t??Y;function F(t,e,s){return t?e(t):s?.(t)}const U=({slot:t,title:e,className:s,width:n="24",height:o="24",styles:a}={})=>g`
	<svg
		slot=${D(t)}
		class=${`clear-icon ${s??""}`}
		viewBox="0 0 24 24"
		preserveAspectRatio="xMidYMid meet"
		focusable="false"
		width=${n}
		height=${o}
		style=${D(a)}
	>
		${F(e,()=>X`<title>${e}</title>`)}
		<path
			d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
		/>
	</svg>
`;let _,B=0;function R(t){_=t}function A(){_=null,B=0}function W(){return B++}const $=Symbol("haunted.phase"),y=Symbol("haunted.hook"),O=Symbol("haunted.update"),z=Symbol("haunted.commit"),f=Symbol("haunted.effects"),v=Symbol("haunted.layoutEffects"),M="haunted.context";class Z{update;host;virtual;[y];[f];[v];constructor(e,s){this.update=e,this.host=s,this[y]=new Map,this[f]=[],this[v]=[]}run(e){R(this);let s=e();return A(),s}_runEffects(e){let s=this[e];R(this);for(let n of s)n.call(this);A()}runEffects(){this._runEffects(f)}runLayoutEffects(){this._runEffects(v)}teardown(){this[y].forEach(s=>{typeof s.teardown=="function"&&s.teardown(!0)})}}const q=Promise.resolve().then.bind(Promise.resolve());function T(){let t=[],e;function s(){e=null;let n=t;t=[];for(var o=0,a=n.length;o<a;o++)n[o]()}return function(n){t.push(n),e==null&&(e=q(s))}}const G=T(),j=T();class J{renderer;host;state;[$];_updateQueued;_active;constructor(e,s){this.renderer=e,this.host=s,this.state=new Z(this.update.bind(this),s),this[$]=null,this._updateQueued=!1,this._active=!0}update(){this._active&&(this._updateQueued||(G(()=>{let e=this.handlePhase(O);j(()=>{this.handlePhase(z,e),j(()=>{this.handlePhase(f)})}),this._updateQueued=!1}),this._updateQueued=!0))}handlePhase(e,s){switch(this[$]=e,e){case z:this.commit(s),this.runEffects(v);return;case O:return this.render();case f:return this.runEffects(f)}}render(){return this.state.run(()=>this.renderer.call(this.host,this.host))}runEffects(e){this.state._runEffects(e)}teardown(){this.state.teardown()}pause(){this._active=!1}resume(){this._active=!0}}const K=(...t)=>{const e=new CSSStyleSheet;return e.replaceSync(t.join("")),e},V=t=>t?.map(e=>typeof e=="string"?K(e):e),tt=(t="")=>t.replace(/-+([a-z])?/g,(e,s)=>s?s.toUpperCase():"");function et(t){class e extends J{frag;renderResult;constructor(o,a,r){super(o,r||a),this.frag=a}commit(o){this.renderResult=t(o,this.frag)}}function s(n,o,a){const r=(a||o||{}).baseElement||HTMLElement,{observedAttributes:k=[],useShadowDOM:S=!0,shadowRootInit:C={},styleSheets:x}=a||o||{},m=V(n.styleSheets||x);class h extends r{_scheduler;static get observedAttributes(){return n.observedAttributes||k||[]}constructor(){if(super(),S===!1)this._scheduler=new e(n,this);else{const i=this.attachShadow({mode:"open",...C});m&&(i.adoptedStyleSheets=m),this._scheduler=new e(n,i,this)}}connectedCallback(){this._scheduler.resume(),this._scheduler.update(),this._scheduler.renderResult?.setConnected(!0)}disconnectedCallback(){this._scheduler.pause(),this._scheduler.teardown(),this._scheduler.renderResult?.setConnected(!1)}attributeChangedCallback(i,d,u){if(d===u)return;let c=u===""?!0:u;Reflect.set(this,tt(i),c)}}function P(l){let i=l,d=!1;return Object.freeze({enumerable:!0,configurable:!0,get(){return i},set(u){d&&i===u||(d=!0,i=u,this._scheduler&&this._scheduler.update())}})}const L=new Proxy(r.prototype,{getPrototypeOf(l){return l},set(l,i,d,u){let c;return i in l?(c=Object.getOwnPropertyDescriptor(l,i),c&&c.set?(c.set.call(u,d),!0):(Reflect.set(l,i,d,u),!0)):(typeof i=="symbol"||i[0]==="_"?c={enumerable:!0,configurable:!0,writable:!0,value:d}:c=P(d),Object.defineProperty(u,i,c),c.set&&c.set.call(u,d),!0)}});return Object.setPrototypeOf(h.prototype,L),h}return s}class p{id;state;constructor(e,s){this.id=e,this.state=s}}function st(t,...e){let s=W(),n=_[y],o=n.get(s);return o||(o=new t(s,_,...e),n.set(s,o)),o.update(...e)}function b(t){return st.bind(null,t)}function N(t){return b(class extends p{callback;lastValues;values;_teardown;constructor(e,s,n,o){super(e,s),t(s,this)}update(e,s){this.callback=e,this.values=s}call(){const e=!this.values||this.hasChanged();this.lastValues=this.values,e&&this.run()}run(){this.teardown(),this._teardown=this.callback.call(this.state)}teardown(e){typeof this._teardown=="function"&&(this._teardown(),this._teardown=void 0),e&&(this.lastValues=this.values=void 0)}hasChanged(){return!this.lastValues||this.values.some((e,s)=>this.lastValues[s]!==e)}})}function H(t,e){t[f].push(e)}const Q=N(H),nt=t=>t instanceof Element?t:t.startNode||t.endNode||t.parentNode,ot=b(class extends p{Context;value;_ranEffect;_unsubscribe;constructor(t,e,s){super(t,e),this._updater=this._updater.bind(this),this._ranEffect=!1,this._unsubscribe=null,H(e,this)}update(t){return this.Context!==t&&(this._subscribe(t),this.Context=t),this.value}call(){this._ranEffect||(this._ranEffect=!0,this._unsubscribe&&this._unsubscribe(),this._subscribe(this.Context),this.state.update())}_updater(t){this.value=t,this.state.update()}_subscribe(t){const e={Context:t,callback:this._updater};nt(this.state.host).dispatchEvent(new CustomEvent(M,{detail:e,bubbles:!0,cancelable:!0,composed:!0}));const{unsubscribe:n=null,value:o}=e;this.value=n?o:t.defaultValue,this._unsubscribe=n}teardown(){this._unsubscribe&&this._unsubscribe()}});function rt(t){return e=>{const s={Provider:class extends HTMLElement{listeners;_value;constructor(){super(),this.style.display="contents",this.listeners=new Set,this.addEventListener(M,this)}disconnectedCallback(){this.removeEventListener(M,this)}handleEvent(n){const{detail:o}=n;o.Context===s&&(o.value=this.value,o.unsubscribe=this.unsubscribe.bind(this,o.callback),this.listeners.add(o.callback),n.stopPropagation())}unsubscribe(n){this.listeners.delete(n)}set value(n){this._value=n;for(let o of this.listeners)o(n)}get value(){return this._value}},Consumer:t(function({render:n}){const o=ot(s);return n(o)},{useShadowDOM:!1}),defaultValue:e};return s}}const it=b(class extends p{value;values;constructor(t,e,s,n){super(t,e),this.value=s(),this.values=n}update(t,e){return this.hasChanged(e)&&(this.values=e,this.value=t()),this.value}hasChanged(t=[]){return t.some((e,s)=>this.values[s]!==e)}}),at=(t,e)=>it(()=>t,e);function ut(t,e){t[v].push(e)}const ct=N(ut);b(class extends p{args;constructor(t,e,s){super(t,e),this.updater=this.updater.bind(this),typeof s=="function"&&(s=s()),this.makeArgs(s)}update(){return this.args}updater(t){const[e]=this.args;typeof t=="function"&&(t=t(e)),!Object.is(e,t)&&(this.makeArgs(t),this.state.update())}makeArgs(t){this.args=Object.freeze([t,this.updater])}});b(class extends p{reducer;currentState;constructor(t,e,s,n,o){super(t,e),this.dispatch=this.dispatch.bind(this),this.currentState=o!==void 0?o(n):n}update(t){return this.reducer=t,[this.currentState,this.dispatch]}dispatch(t){this.currentState=this.reducer(this.currentState,t),this.state.update()}});const lt=/([A-Z])/gu;b(class extends p{property;eventName;constructor(t,e,s,n){if(super(t,e),this.state.virtual)throw new Error("Can't be used with virtual components.");this.updater=this.updater.bind(this),this.property=s,this.eventName=s.replace(lt,"-$1").toLowerCase()+"-changed",this.state.host[this.property]==null&&(typeof n=="function"&&(n=n()),n!=null&&this.updateProp(n))}update(t,e){return[this.state.host[this.property],this.updater]}updater(t){const e=this.state.host[this.property];typeof t=="function"&&(t=t(e)),!Object.is(e,t)&&this.updateProp(t)}updateProp(t){this.notify(t).defaultPrevented||(this.state.host[this.property]=t)}notify(t){const e=new CustomEvent(this.eventName,{detail:{value:t,path:this.property},cancelable:!0});return this.state.host.dispatchEvent(e),e}});function dt({render:t}){const e=et(t),s=rt(e);return{component:e,createContext:s}}const{component:ht}=dt({render:I}),E=b(class extends p{update(){return this.state.host}}),ft=(t,...e)=>t.flatMap((s,n)=>[s,e[n]??""]).join(""),pt=ft`
	:host {
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 550px;
		max-width: 98vw;
		max-height: 96vh;
		border-radius: 10px;
	}
	:host([backdrop]) {
		box-shadow: 0 0 0 100vmax rgb(0, 0, 0, 0.6);
		z-index: 10;
	}
	:host([backdrop])::before {
		content: '';
		display: block;
		position: absolute;
		z-index: -1;
		top: -100vh;
		bottom: -100vh;
		right: -100vw;
		left: -100vw;
	}
	:host::after {
		content: '';
		display: block;
		z-index: -1;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		pointer-events: none;
		box-shadow:
			0 16px 24px 2px #00000024,
			0 6px 30px 5px #0000001f,
			0 8px 10px -5px #0006;
	}
	.title {
		display: flex;
		padding: var(--dialog-title-padding, 22px 24px);
		padding-bottom: 0px;
		color: var(--dialog-title-color, #00000);
		background-color: var(--dialog-title-background-color, #fff);
		font-size: var(--dialog-title-font-size, 20px);
		font-weight: var(--dialog-title-font-weight, 400);
		line-height: 1.4;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		border-bottom: 1px solid var(--dialog-title-background-color, #fff);
	}
	:host(:not([unmovable])) .title {
		cursor: move;
		user-select: none;
	}

	.content {
		background: var(--cosmoz-dialog-background-color, #fff);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		border-bottom-right-radius: 10px;
		border-bottom-left-radius: 10px;
	}

	.close {
		display: flex;
		background-color: transparent;
		margin: 0 0 0 auto;
		padding-right: 0;
		padding-left: 0;
		min-width: unset;
		min-height: unset;
		border: unset;
		cursor: pointer;
	}
`,bt=()=>{const t=E(),e=at(()=>{t.dispatchEvent(new Event("close")),t.onClose?.()},[]);return Q(()=>{const s=r=>{r.preventDefault(),e()},n=t.shadowRoot,o=r=>r.target.value==="cancel"&&s(r),a=r=>!r.defaultPrevented&&r.key==="Escape"&&s(r);return n.addEventListener("click",o),document.addEventListener("keydown",a,!0),()=>{n.removeEventListener("click",o),document.removeEventListener("keydown",a,!0)}},[]),{close:e}},mt=()=>{const t=E(),{manualFocus:e}=t;ct(()=>{!e&&!t.matches(":focus-within")&&(t.setAttribute("tabindex","-1"),t.focus(),t.removeAttribute("tabindex"))},[e])},vt=(t,e,s)=>{const n=t.width/3,o=t.height/3,a=Math.min(window.innerWidth-2*n,Math.max(-n,e)),r=Math.min(window.innerHeight-2*o,Math.max(-o,s));return{x:a,y:r}},gt=(t,e,s,n)=>o=>{if(!o.target.closest(e))return;const a=vt,r=t.getBoundingClientRect(),k=o.clientX-r.x,S=o.clientY-r.y,C=(h,P)=>{const L=h-k,l=P-S,i=a(r,L,l);Object.assign(t.style,{left:i.x+"px",top:i.y+"px",transform:"initial"})},x=h=>C(h.clientX,h.clientY),m=h=>{document.removeEventListener("mousemove",x),document.removeEventListener("mouseup",m)};document.addEventListener("mousemove",x),document.addEventListener("mouseup",m)},xt=()=>{const t=E(),{unmovable:e}=t;Q(()=>{if(e)return;const s=t.shadowRoot;if(!s)return;const n=gt(t,".title");return s.addEventListener("mousedown",n),()=>s.removeEventListener("mousedown",n)},[e])},wt=()=>{bt(),xt(),mt()},yt=({title:t,content:e,styles:s,closeable:n=!1})=>{const o=E();return g`
		<style>
			${pt}${s}
		</style>
		<div class="title" part="title">
			${t}
			${F(n,()=>g`
					<button
						class="close"
						@click=${()=>{o.dispatchEvent(new Event("close")),o.onClose?.()}}
					>
						${U()}
					</button>
				`)}
		</div>
		<div class="content" part="content">${e}</div>
	`},_t=(t,{observedAttributes:e,styles:s,...n}={})=>ht(o=>(wt(),yt({title:o.heading||o.title,content:t(o),styles:s,closeable:o.closeable})),{observedAttributes:["title","heading","manual-focus","unmovable","closeable",...e??[]],...n});customElements.define("demo-dialog",_t(()=>g`<p>Dialog content goes here</p>`));const Et=({heading:t,closeable:e,unmovable:s})=>g`
    <demo-dialog
        .heading=${t}
        ?closeable=${e}
        ?unmovable=${s}
        backdrop
    ></demo-dialog>
`,St={title:"Dialog",render:Et,argTypes:{heading:{control:"text",description:"The title displayed at the top of the dialog"},closeable:{control:"boolean",description:"Shows a close button in the title bar"},unmovable:{control:"boolean",description:"Prevents the dialog from being dragged"}}},w={args:{heading:"Dialog Title",closeable:!0,unmovable:!1}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    heading: 'Dialog Title',
    closeable: true,
    unmovable: false
  }
}`,...w.parameters?.docs?.source}}};const Ct=["Basic"];export{w as Basic,Ct as __namedExportsOrder,St as default};
