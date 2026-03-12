import{A as D,w as q,b as g,r as Z,D as J}from"./iframe-AlqUJCXV.js";const N=e=>e??D;function H(e,t,s){return e?t(e):s?.(e)}const K=({slot:e,title:t,className:s,width:n="24",height:o="24",styles:i}={})=>g`
	<svg
		slot=${N(e)}
		class=${`clear-icon ${s??""}`}
		viewBox="0 0 24 24"
		preserveAspectRatio="xMidYMid meet"
		focusable="false"
		width=${n}
		height=${o}
		style=${N(i)}
	>
		${H(t,()=>q`<title>${t}</title>`)}
		<path
			d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
		/>
	</svg>
`;let C,F=0;function R(e){C=e}function G(){C=null,F=0}function V(){return F++}const P=Symbol("haunted.phase"),w=Symbol("haunted.hook"),T=Symbol("haunted.update"),z=Symbol("haunted.commit"),p=Symbol("haunted.effects"),_=Symbol("haunted.layoutEffects"),O="haunted.context";class tt{update;host;virtual;[w];[p];[_];constructor(t,s){this.update=t,this.host=s,this[w]=new Map,this[p]=[],this[_]=[]}run(t){R(this);let s=t();return G(),s}_runEffects(t){let s=this[t];R(this);for(let n of s)n.call(this);G()}runEffects(){this._runEffects(p)}runLayoutEffects(){this._runEffects(_)}teardown(){this[w].forEach(s=>{typeof s.teardown=="function"&&s.teardown(!0)})}}const et=Promise.resolve().then.bind(Promise.resolve());function B(){let e=[],t;function s(){t=null;let n=e;e=[];for(var o=0,i=n.length;o<i;o++)n[o]()}return function(n){e.push(n),t==null&&(t=et(s))}}const st=B(),j=B();class nt{renderer;host;state;[P];_updateQueued;_active;constructor(t,s){this.renderer=t,this.host=s,this.state=new tt(this.update.bind(this),s),this[P]=null,this._updateQueued=!1,this._active=!0}update(){this._active&&(this._updateQueued||(st(()=>{let t=this.handlePhase(T);j(()=>{this.handlePhase(z,t),j(()=>{this.handlePhase(p)})}),this._updateQueued=!1}),this._updateQueued=!0))}handlePhase(t,s){switch(this[P]=t,t){case z:this.commit(s),this.runEffects(_);return;case T:return this.render();case p:return this.runEffects(p)}}render(){return this.state.run(()=>this.renderer.call(this.host,this.host))}runEffects(t){this.state._runEffects(t)}teardown(){this.state.teardown()}pause(){this._active=!1}resume(){this._active=!0}}const ot=(...e)=>{const t=new CSSStyleSheet;return t.replaceSync(e.join("")),t},it=e=>e?.map(t=>typeof t=="string"?ot(t):t),rt=(e="")=>e.replace(/-+([a-z])?/g,(t,s)=>s?s.toUpperCase():"");function at(e){class t extends nt{frag;renderResult;constructor(o,i,a){super(o,a||i),this.frag=i}commit(o){this.renderResult=e(o,this.frag)}}function s(n,o,i){const a=(i||o||{}).baseElement||HTMLElement,{observedAttributes:f=[],useShadowDOM:A=!0,shadowRootInit:S={},styleSheets:x}=i||o||{},v=it(n.styleSheets||x);class d extends a{_scheduler;static get observedAttributes(){return n.observedAttributes||f||[]}constructor(){if(super(),A===!1)this._scheduler=new t(n,this);else{const r=this.attachShadow({mode:"open",...S});v&&(r.adoptedStyleSheets=v),this._scheduler=new t(n,r,this)}}connectedCallback(){this._scheduler.resume(),this._scheduler.update(),this._scheduler.renderResult?.setConnected(!0)}disconnectedCallback(){this._scheduler.pause(),this._scheduler.teardown(),this._scheduler.renderResult?.setConnected(!1)}attributeChangedCallback(r,h,c){if(h===c)return;let u=c===""?!0:c;Reflect.set(this,rt(r),u)}}function k(l){let r=l,h=!1;return Object.freeze({enumerable:!0,configurable:!0,get(){return r},set(c){h&&r===c||(h=!0,r=c,this._scheduler&&this._scheduler.update())}})}const M=new Proxy(a.prototype,{getPrototypeOf(l){return l},set(l,r,h,c){let u;return r in l?(u=Object.getOwnPropertyDescriptor(l,r),u&&u.set?(u.set.call(c,h),!0):(Reflect.set(l,r,h,c),!0)):(typeof r=="symbol"||r[0]==="_"?u={enumerable:!0,configurable:!0,writable:!0,value:h}:u=k(h),Object.defineProperty(c,r,u),u.set&&u.set.call(c,h),!0)}});return Object.setPrototypeOf(d.prototype,M),d}return s}class b{id;state;constructor(t,s){this.id=t,this.state=s}}function ct(e,...t){let s=V(),n=C[w],o=n.get(s);return o||(o=new e(s,C,...t),n.set(s,o)),o.update(...t)}function m(e){return ct.bind(null,e)}function I(e){return m(class extends b{callback;lastValues;values;_teardown;constructor(t,s,n,o){super(t,s),e(s,this)}update(t,s){this.callback=t,this.values=s}call(){const t=!this.values||this.hasChanged();this.lastValues=this.values,t&&this.run()}run(){this.teardown(),this._teardown=this.callback.call(this.state)}teardown(t){typeof this._teardown=="function"&&(this._teardown(),this._teardown=void 0),t&&(this.lastValues=this.values=void 0)}hasChanged(){return!this.lastValues||this.values.some((t,s)=>this.lastValues[s]!==t)}})}function Q(e,t){e[p].push(t)}const U=I(Q),ut=e=>e instanceof Element?e:e.startNode||e.endNode||e.parentNode,lt=m(class extends b{Context;value;_ranEffect;_unsubscribe;constructor(e,t,s){super(e,t),this._updater=this._updater.bind(this),this._ranEffect=!1,this._unsubscribe=null,Q(t,this)}update(e){return this.Context!==e&&(this._subscribe(e),this.Context=e),this.value}call(){this._ranEffect||(this._ranEffect=!0,this._unsubscribe&&this._unsubscribe(),this._subscribe(this.Context),this.state.update())}_updater(e){this.value=e,this.state.update()}_subscribe(e){const t={Context:e,callback:this._updater};ut(this.state.host).dispatchEvent(new CustomEvent(O,{detail:t,bubbles:!0,cancelable:!0,composed:!0}));const{unsubscribe:n=null,value:o}=t;this.value=n?o:e.defaultValue,this._unsubscribe=n}teardown(){this._unsubscribe&&this._unsubscribe()}});function ht(e){return t=>{const s={Provider:class extends HTMLElement{listeners;_value;constructor(){super(),this.style.display="contents",this.listeners=new Set,this.addEventListener(O,this)}disconnectedCallback(){this.removeEventListener(O,this)}handleEvent(n){const{detail:o}=n;o.Context===s&&(o.value=this.value,o.unsubscribe=this.unsubscribe.bind(this,o.callback),this.listeners.add(o.callback),n.stopPropagation())}unsubscribe(n){this.listeners.delete(n)}set value(n){this._value=n;for(let o of this.listeners)o(n)}get value(){return this._value}},Consumer:e(function({render:n}){const o=lt(s);return n(o)},{useShadowDOM:!1}),defaultValue:t};return s}}const dt=m(class extends b{value;values;constructor(e,t,s,n){super(e,t),this.value=s(),this.values=n}update(e,t){return this.hasChanged(t)&&(this.values=t,this.value=e()),this.value}hasChanged(e=[]){return e.some((t,s)=>this.values[s]!==t)}}),Y=(e,t)=>dt(()=>e,t);function ft(e,t){e[_].push(t)}I(ft);m(class extends b{args;constructor(e,t,s){super(e,t),this.updater=this.updater.bind(this),typeof s=="function"&&(s=s()),this.makeArgs(s)}update(){return this.args}updater(e){const[t]=this.args;typeof e=="function"&&(e=e(t)),!Object.is(t,e)&&(this.makeArgs(e),this.state.update())}makeArgs(e){this.args=Object.freeze([e,this.updater])}});m(class extends b{reducer;currentState;constructor(e,t,s,n,o){super(e,t),this.dispatch=this.dispatch.bind(this),this.currentState=o!==void 0?o(n):n}update(e){return this.reducer=e,[this.currentState,this.dispatch]}dispatch(e){this.currentState=this.reducer(this.currentState,e),this.state.update()}});const pt=/([A-Z])/gu;m(class extends b{property;eventName;constructor(e,t,s,n){if(super(e,t),this.state.virtual)throw new Error("Can't be used with virtual components.");this.updater=this.updater.bind(this),this.property=s,this.eventName=s.replace(pt,"-$1").toLowerCase()+"-changed",this.state.host[this.property]==null&&(typeof n=="function"&&(n=n()),n!=null&&this.updateProp(n))}update(e,t){return[this.state.host[this.property],this.updater]}updater(e){const t=this.state.host[this.property];typeof e=="function"&&(e=e(t)),!Object.is(t,e)&&this.updateProp(e)}updateProp(e){this.notify(e).defaultPrevented||(this.state.host[this.property]=e)}notify(e){const t=new CustomEvent(this.eventName,{detail:{value:e,path:this.property},cancelable:!0});return this.state.host.dispatchEvent(t),t}});function bt({render:e}){const t=at(e),s=ht(t);return{component:t,createContext:s}}const mt={CHILD:2},gt=e=>(...t)=>({_$litDirective$:e,values:t});class vt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,s,n){this._$Ct=t,this._$AM=s,this._$Ci=n}_$AS(t,s){return this.update(t,s)}update(t,s){return this.render(...s)}}const y=(e,t)=>{const s=e._$AN;if(s===void 0)return!1;for(const n of s)n._$AO?.(t,!1),y(n,t);return!0},E=e=>{let t,s;do{if((t=e._$AM)===void 0)break;s=t._$AN,s.delete(e),e=t}while(s?.size===0)},X=e=>{for(let t;t=e._$AM;e=t){let s=t._$AN;if(s===void 0)t._$AN=s=new Set;else if(s.has(e))break;s.add(e),xt(t)}};function _t(e){this._$AN!==void 0?(E(this),this._$AM=e,X(this)):this._$AM=e}function yt(e,t=!1,s=0){const n=this._$AH,o=this._$AN;if(o!==void 0&&o.size!==0)if(t)if(Array.isArray(n))for(let i=s;i<n.length;i++)y(n[i],!1),E(n[i]);else n!=null&&(y(n,!1),E(n));else y(this,e)}const xt=e=>{e.type==mt.CHILD&&(e._$AP??=yt,e._$AQ??=_t)};class $t extends vt{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,s,n){super._$AT(t,s,n),X(this),this.isConnected=t._$AU}_$AO(t,s=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),s&&(y(this,t),E(this))}setValue(t){if(Z(this._$Ct))this._$Ct._$AI(t,this);else{const s=[...this._$Ct._$AH];s[this._$Ci]=t,this._$Ct._$AI(s,this,0)}}disconnected(){}reconnected(){}}const{component:wt}=bt({render:J}),L=new WeakMap,Ct=gt(class extends $t{render(e){return D}update(e,[t]){const s=t!==this.G;return s&&this.G!==void 0&&this.rt(void 0),(s||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),D}rt(e){if(this.isConnected||(e=void 0),typeof this.G=="function"){const t=this.ht??globalThis;let s=L.get(t);s===void 0&&(s=new WeakMap,L.set(t,s)),s.get(this.G)!==void 0&&this.G.call(this.ht,void 0),s.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return typeof this.G=="function"?L.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),Et=(e,...t)=>e.flatMap((s,n)=>[s,t[n]??""]).join(""),At=Et`
	dialog:not([open]) {
		display: none;
	}

	dialog {
		margin: auto;
		padding: 0;
		border: none;
		width: 550px;
		max-width: 98vw;
		max-height: 96vh;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		background: var(--cosmoz-dialog-background-color, #fff);
		box-shadow:
			0 16px 24px 2px #00000024,
			0 6px 30px 5px #0000001f,
			0 8px 10px -5px #0006;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.6);
	}

	.title {
		display: flex;
		padding: var(--dialog-title-padding, 22px 24px);
		padding-bottom: 0px;
		color: var(--dialog-title-color, #000);
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
`,W=m(class extends b{update(){return this.state.host}}),St=()=>{const e=W(),t=Y(()=>{e.dispatchEvent(new Event("close")),e.onClose?.()},[]);return U(()=>{const s=e.shadowRoot,n=o=>o.target.value==="cancel"&&t();return s.addEventListener("click",n),()=>{s.removeEventListener("click",n)}},[]),{close:t}},kt=(e,t,s)=>{const n=e.width/3,o=e.height/3,i=Math.min(window.innerWidth-2*n,Math.max(-n,t)),a=Math.min(window.innerHeight-2*o,Math.max(-o,s));return{x:i,y:a}},Mt=(e,t,s,n)=>o=>{if(!o.target.closest(t))return;const i=kt,a=e.getBoundingClientRect(),f=o.clientX-a.x,A=o.clientY-a.y,S=(d,k)=>{const M=d-f,l=k-A,r=i(a,M,l);Object.assign(e.style,{left:r.x+"px",top:r.y+"px",transform:"initial"})},x=d=>S(d.clientX,d.clientY),v=d=>{document.removeEventListener("mousemove",x),document.removeEventListener("mouseup",v)};document.addEventListener("mousemove",x),document.addEventListener("mouseup",v)},Pt=()=>{const e=W(),{unmovable:t}=e;U(()=>{if(t)return;const s=e.shadowRoot;if(!s)return;const n=s.querySelector("dialog");if(!n)return;const o=Mt(n,".title");return s.addEventListener("mousedown",o),()=>s.removeEventListener("mousedown",o)},[t])},Lt=({title:e,content:t,closeable:s=!1,onClose:n})=>g`
		<div class="title" part="title">
			${e}
			${H(s,()=>g`
					<button class="close" @click=${n}>${K()}</button>
				`)}
		</div>
		<div class="content" part="content">${t}</div>
	`,Dt=(e,{observedAttributes:t,styles:s,...n}={})=>wt(o=>{const{close:i}=St();Pt();const a=Y(f=>f&&!f.open&&f.showModal(),[]);return g`
				<style>
					${At}${s}
				</style>
				<dialog ${Ct(a)} @close=${i}>
					${Lt({title:o.heading||o.title,content:e(o),closeable:o.closeable,onClose:i})}
				</dialog>
			`},{observedAttributes:["title","heading","unmovable","closeable",...t??[]],...n});customElements.define("demo-dialog",Dt(()=>g`<p>Dialog content goes here</p>`));const Ot=({heading:e,closeable:t,unmovable:s})=>g`
    <demo-dialog
        .heading=${e}
        ?closeable=${t}
        ?unmovable=${s}
    ></demo-dialog>
`,Rt={title:"Dialog",render:Ot,argTypes:{heading:{control:"text",description:"The title displayed at the top of the dialog"},closeable:{control:"boolean",description:"Shows a close button in the title bar"},unmovable:{control:"boolean",description:"Prevents the dialog from being dragged"}}},$={args:{heading:"Dialog Title",closeable:!0,unmovable:!1}};$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  args: {
    heading: 'Dialog Title',
    closeable: true,
    unmovable: false
  }
}`,...$.parameters?.docs?.source}}};const Gt=["Basic"];export{$ as Basic,Gt as __namedExportsOrder,Rt as default};
