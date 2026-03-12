import{A as D,w as q,b as g,r as Z,D as J}from"./iframe-DsjzZ_5Z.js";const N=t=>t??D;function F(t,e,s){return t?e(t):s?.(t)}const K=({slot:t,title:e,className:s,width:n="24",height:o="24",styles:i}={})=>g`
	<svg
		slot=${N(t)}
		class=${`clear-icon ${s??""}`}
		viewBox="0 0 24 24"
		preserveAspectRatio="xMidYMid meet"
		focusable="false"
		width=${n}
		height=${o}
		style=${N(i)}
	>
		${F(e,()=>q`<title>${e}</title>`)}
		<path
			d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
		/>
	</svg>
`;let C,B=0;function G(t){C=t}function T(){C=null,B=0}function V(){return B++}const P=Symbol("haunted.phase"),x=Symbol("haunted.hook"),z=Symbol("haunted.update"),j=Symbol("haunted.commit"),p=Symbol("haunted.effects"),_=Symbol("haunted.layoutEffects"),O="haunted.context";class tt{update;host;virtual;[x];[p];[_];constructor(e,s){this.update=e,this.host=s,this[x]=new Map,this[p]=[],this[_]=[]}run(e){G(this);let s=e();return T(),s}_runEffects(e){let s=this[e];G(this);for(let n of s)n.call(this);T()}runEffects(){this._runEffects(p)}runLayoutEffects(){this._runEffects(_)}teardown(){this[x].forEach(s=>{typeof s.teardown=="function"&&s.teardown(!0)})}}const et=Promise.resolve().then.bind(Promise.resolve());function I(){let t=[],e;function s(){e=null;let n=t;t=[];for(var o=0,i=n.length;o<i;o++)n[o]()}return function(n){t.push(n),e==null&&(e=et(s))}}const st=I(),H=I();class nt{renderer;host;state;[P];_updateQueued;_active;constructor(e,s){this.renderer=e,this.host=s,this.state=new tt(this.update.bind(this),s),this[P]=null,this._updateQueued=!1,this._active=!0}update(){this._active&&(this._updateQueued||(st(()=>{let e=this.handlePhase(z);H(()=>{this.handlePhase(j,e),H(()=>{this.handlePhase(p)})}),this._updateQueued=!1}),this._updateQueued=!0))}handlePhase(e,s){switch(this[P]=e,e){case j:this.commit(s),this.runEffects(_);return;case z:return this.render();case p:return this.runEffects(p)}}render(){return this.state.run(()=>this.renderer.call(this.host,this.host))}runEffects(e){this.state._runEffects(e)}teardown(){this.state.teardown()}pause(){this._active=!1}resume(){this._active=!0}}const ot=(...t)=>{const e=new CSSStyleSheet;return e.replaceSync(t.join("")),e},it=t=>t?.map(e=>typeof e=="string"?ot(e):e),rt=(t="")=>t.replace(/-+([a-z])?/g,(e,s)=>s?s.toUpperCase():"");function at(t){class e extends nt{frag;renderResult;constructor(o,i,a){super(o,a||i),this.frag=i}commit(o){this.renderResult=t(o,this.frag)}}function s(n,o,i){const a=(i||o||{}).baseElement||HTMLElement,{observedAttributes:d=[],useShadowDOM:A=!0,shadowRootInit:S={},styleSheets:$}=i||o||{},v=it(n.styleSheets||$);class f extends a{_scheduler;static get observedAttributes(){return n.observedAttributes||d||[]}constructor(){if(super(),A===!1)this._scheduler=new e(n,this);else{const r=this.attachShadow({mode:"open",...S});v&&(r.adoptedStyleSheets=v),this._scheduler=new e(n,r,this)}}connectedCallback(){this._scheduler.resume(),this._scheduler.update(),this._scheduler.renderResult?.setConnected(!0)}disconnectedCallback(){this._scheduler.pause(),this._scheduler.teardown(),this._scheduler.renderResult?.setConnected(!1)}attributeChangedCallback(r,h,c){if(h===c)return;let u=c===""?!0:c;Reflect.set(this,rt(r),u)}}function k(l){let r=l,h=!1;return Object.freeze({enumerable:!0,configurable:!0,get(){return r},set(c){h&&r===c||(h=!0,r=c,this._scheduler&&this._scheduler.update())}})}const M=new Proxy(a.prototype,{getPrototypeOf(l){return l},set(l,r,h,c){let u;return r in l?(u=Object.getOwnPropertyDescriptor(l,r),u&&u.set?(u.set.call(c,h),!0):(Reflect.set(l,r,h,c),!0)):(typeof r=="symbol"||r[0]==="_"?u={enumerable:!0,configurable:!0,writable:!0,value:h}:u=k(h),Object.defineProperty(c,r,u),u.set&&u.set.call(c,h),!0)}});return Object.setPrototypeOf(f.prototype,M),f}return s}class b{id;state;constructor(e,s){this.id=e,this.state=s}}function ct(t,...e){let s=V(),n=C[x],o=n.get(s);return o||(o=new t(s,C,...e),n.set(s,o)),o.update(...e)}function m(t){return ct.bind(null,t)}function Q(t){return m(class extends b{callback;lastValues;values;_teardown;constructor(e,s,n,o){super(e,s),t(s,this)}update(e,s){this.callback=e,this.values=s}call(){const e=!this.values||this.hasChanged();this.lastValues=this.values,e&&this.run()}run(){this.teardown(),this._teardown=this.callback.call(this.state)}teardown(e){typeof this._teardown=="function"&&(this._teardown(),this._teardown=void 0),e&&(this.lastValues=this.values=void 0)}hasChanged(){return!this.lastValues||this.values.some((e,s)=>this.lastValues[s]!==e)}})}function U(t,e){t[p].push(e)}const R=Q(U),ut=t=>t instanceof Element?t:t.startNode||t.endNode||t.parentNode,lt=m(class extends b{Context;value;_ranEffect;_unsubscribe;constructor(t,e,s){super(t,e),this._updater=this._updater.bind(this),this._ranEffect=!1,this._unsubscribe=null,U(e,this)}update(t){return this.Context!==t&&(this._subscribe(t),this.Context=t),this.value}call(){this._ranEffect||(this._ranEffect=!0,this._unsubscribe&&this._unsubscribe(),this._subscribe(this.Context),this.state.update())}_updater(t){this.value=t,this.state.update()}_subscribe(t){const e={Context:t,callback:this._updater};ut(this.state.host).dispatchEvent(new CustomEvent(O,{detail:e,bubbles:!0,cancelable:!0,composed:!0}));const{unsubscribe:n=null,value:o}=e;this.value=n?o:t.defaultValue,this._unsubscribe=n}teardown(){this._unsubscribe&&this._unsubscribe()}});function ht(t){return e=>{const s={Provider:class extends HTMLElement{listeners;_value;constructor(){super(),this.style.display="contents",this.listeners=new Set,this.addEventListener(O,this)}disconnectedCallback(){this.removeEventListener(O,this)}handleEvent(n){const{detail:o}=n;o.Context===s&&(o.value=this.value,o.unsubscribe=this.unsubscribe.bind(this,o.callback),this.listeners.add(o.callback),n.stopPropagation())}unsubscribe(n){this.listeners.delete(n)}set value(n){this._value=n;for(let o of this.listeners)o(n)}get value(){return this._value}},Consumer:t(function({render:n}){const o=lt(s);return n(o)},{useShadowDOM:!1}),defaultValue:e};return s}}const Y=m(class extends b{value;values;constructor(t,e,s,n){super(t,e),this.value=s(),this.values=n}update(t,e){return this.hasChanged(e)&&(this.values=e,this.value=t()),this.value}hasChanged(t=[]){return t.some((e,s)=>this.values[s]!==e)}}),dt=(t,e)=>Y(()=>t,e);function ft(t,e){t[_].push(e)}Q(ft);m(class extends b{args;constructor(t,e,s){super(t,e),this.updater=this.updater.bind(this),typeof s=="function"&&(s=s()),this.makeArgs(s)}update(){return this.args}updater(t){const[e]=this.args;typeof t=="function"&&(t=t(e)),!Object.is(e,t)&&(this.makeArgs(t),this.state.update())}makeArgs(t){this.args=Object.freeze([t,this.updater])}});m(class extends b{reducer;currentState;constructor(t,e,s,n,o){super(t,e),this.dispatch=this.dispatch.bind(this),this.currentState=o!==void 0?o(n):n}update(t){return this.reducer=t,[this.currentState,this.dispatch]}dispatch(t){this.currentState=this.reducer(this.currentState,t),this.state.update()}});const pt=/([A-Z])/gu;m(class extends b{property;eventName;constructor(t,e,s,n){if(super(t,e),this.state.virtual)throw new Error("Can't be used with virtual components.");this.updater=this.updater.bind(this),this.property=s,this.eventName=s.replace(pt,"-$1").toLowerCase()+"-changed",this.state.host[this.property]==null&&(typeof n=="function"&&(n=n()),n!=null&&this.updateProp(n))}update(t,e){return[this.state.host[this.property],this.updater]}updater(t){const e=this.state.host[this.property];typeof t=="function"&&(t=t(e)),!Object.is(e,t)&&this.updateProp(t)}updateProp(t){this.notify(t).defaultPrevented||(this.state.host[this.property]=t)}notify(t){const e=new CustomEvent(this.eventName,{detail:{value:t,path:this.property},cancelable:!0});return this.state.host.dispatchEvent(e),e}});function bt({render:t}){const e=at(t),s=ht(e);return{component:e,createContext:s}}const mt={CHILD:2},gt=t=>(...e)=>({_$litDirective$:t,values:e});class vt{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,s,n){this._$Ct=e,this._$AM=s,this._$Ci=n}_$AS(e,s){return this.update(e,s)}update(e,s){return this.render(...s)}}const y=(t,e)=>{const s=t._$AN;if(s===void 0)return!1;for(const n of s)n._$AO?.(e,!1),y(n,e);return!0},E=t=>{let e,s;do{if((e=t._$AM)===void 0)break;s=e._$AN,s.delete(t),t=e}while(s?.size===0)},X=t=>{for(let e;e=t._$AM;t=e){let s=e._$AN;if(s===void 0)e._$AN=s=new Set;else if(s.has(t))break;s.add(t),$t(e)}};function _t(t){this._$AN!==void 0?(E(this),this._$AM=t,X(this)):this._$AM=t}function yt(t,e=!1,s=0){const n=this._$AH,o=this._$AN;if(o!==void 0&&o.size!==0)if(e)if(Array.isArray(n))for(let i=s;i<n.length;i++)y(n[i],!1),E(n[i]);else n!=null&&(y(n,!1),E(n));else y(this,t)}const $t=t=>{t.type==mt.CHILD&&(t._$AP??=yt,t._$AQ??=_t)};class wt extends vt{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,s,n){super._$AT(e,s,n),X(this),this.isConnected=e._$AU}_$AO(e,s=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),s&&(y(this,e),E(this))}setValue(e){if(Z(this._$Ct))this._$Ct._$AI(e,this);else{const s=[...this._$Ct._$AH];s[this._$Ci]=e,this._$Ct._$AI(s,this,0)}}disconnected(){}reconnected(){}}const{component:xt}=bt({render:J});const Ct=()=>new Et;class Et{}const L=new WeakMap,At=gt(class extends wt{render(t){return D}update(t,[e]){const s=e!==this.G;return s&&this.G!==void 0&&this.rt(void 0),(s||this.lt!==this.ct)&&(this.G=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),D}rt(t){if(this.isConnected||(t=void 0),typeof this.G=="function"){const e=this.ht??globalThis;let s=L.get(e);s===void 0&&(s=new WeakMap,L.set(e,s)),s.get(this.G)!==void 0&&this.G.call(this.ht,void 0),s.set(this.G,t),t!==void 0&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){return typeof this.G=="function"?L.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),St=(t,...e)=>t.flatMap((s,n)=>[s,e[n]??""]).join(""),kt=St`
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
`,W=m(class extends b{update(){return this.state.host}}),Mt=()=>{const t=W(),e=dt(()=>{t.dispatchEvent(new Event("close")),t.onClose?.()},[]);return R(()=>{const s=t.shadowRoot;if(!s)return;const n=o=>o.target.value==="cancel"&&e();return s.addEventListener("click",n),()=>{s.removeEventListener("click",n)}},[]),{close:e}},Pt=(t,e,s)=>{const n=t.width/3,o=t.height/3,i=Math.min(window.innerWidth-2*n,Math.max(-n,e)),a=Math.min(window.innerHeight-2*o,Math.max(-o,s));return{x:i,y:a}},Lt=(t,e,s,n)=>o=>{if(!o.target.closest(e))return;const i=Pt,a=t.getBoundingClientRect(),d=o.clientX-a.x,A=o.clientY-a.y,S=(f,k)=>{const M=f-d,l=k-A,r=i(a,M,l);Object.assign(t.style,{inset:"auto",margin:"0",left:r.x+"px",top:r.y+"px",transform:"none"})},$=f=>S(f.clientX,f.clientY),v=f=>{document.removeEventListener("mousemove",$),document.removeEventListener("mouseup",v)};document.addEventListener("mousemove",$),document.addEventListener("mouseup",v)},Dt=()=>{const t=W(),{unmovable:e}=t;R(()=>{if(e)return;const s=t.shadowRoot;if(!s)return;const n=s.querySelector("dialog");if(!n)return;const o=Lt(n,".title");return s.addEventListener("mousedown",o),()=>s.removeEventListener("mousedown",o)},[e])},Ot=({title:t,content:e,closeable:s=!1,onClose:n})=>g`
		<div class="title" part="title">
			${t}
			${F(s,()=>g`
					<button class="close" @click=${n}>${K()}</button>
				`)}
		</div>
		<div class="content" part="content">${e}</div>
	`,Rt=(t,{observedAttributes:e,styles:s,...n}={})=>xt(o=>{const{close:i}=Mt();Dt();const a=Y(()=>Ct(),[]);return R(()=>{const d=a.value;d&&!d.open&&d.isConnected&&d.showModal()},[]),g`
				<style>
					${kt}${s}
				</style>
				<dialog ${At(a)} @close=${i}>
					${Ot({title:o.heading||o.title,content:t(o),closeable:o.closeable,onClose:i})}
				</dialog>
			`},{observedAttributes:["title","heading","unmovable","closeable",...e??[]],...n});customElements.define("demo-dialog",Rt(()=>g`<p>Dialog content goes here</p>`));const Nt=({heading:t,closeable:e,unmovable:s})=>g`
    <demo-dialog
        .heading=${t}
        ?closeable=${e}
        ?unmovable=${s}
    ></demo-dialog>
`,Tt={title:"Dialog",render:Nt,argTypes:{heading:{control:"text",description:"The title displayed at the top of the dialog"},closeable:{control:"boolean",description:"Shows a close button in the title bar"},unmovable:{control:"boolean",description:"Prevents the dialog from being dragged"}}},w={args:{heading:"Dialog Title",closeable:!0,unmovable:!1}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    heading: 'Dialog Title',
    closeable: true,
    unmovable: false
  }
}`,...w.parameters?.docs?.source}}};const zt=["Basic"];export{w as Basic,zt as __namedExportsOrder,Tt as default};
