import{A as D,w as Z,b as g,r as J,D as K}from"./iframe-BQ8MgkgE.js";const O=t=>t??D;function z(t,e,s){return t?e(t):s?.(t)}const V=({slot:t,title:e,className:s,width:n="24",height:o="24",styles:i}={})=>g`
	<svg
		slot=${O(t)}
		class=${`clear-icon ${s??""}`}
		viewBox="0 0 24 24"
		preserveAspectRatio="xMidYMid meet"
		focusable="false"
		width=${n}
		height=${o}
		style=${O(i)}
	>
		${z(e,()=>Z`<title>${e}</title>`)}
		<path
			d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
		/>
	</svg>
`;let C,B=0;function N(t){C=t}function T(){C=null,B=0}function tt(){return B++}const P=Symbol("haunted.phase"),w=Symbol("haunted.hook"),G=Symbol("haunted.update"),j=Symbol("haunted.commit"),m=Symbol("haunted.effects"),_=Symbol("haunted.layoutEffects"),R="haunted.context";class et{update;host;virtual;[w];[m];[_];constructor(e,s){this.update=e,this.host=s,this[w]=new Map,this[m]=[],this[_]=[]}run(e){N(this);let s=e();return T(),s}_runEffects(e){let s=this[e];N(this);for(let n of s)n.call(this);T()}runEffects(){this._runEffects(m)}runLayoutEffects(){this._runEffects(_)}teardown(){this[w].forEach(s=>{typeof s.teardown=="function"&&s.teardown(!0)})}}const st=Promise.resolve().then.bind(Promise.resolve());function I(){let t=[],e;function s(){e=null;let n=t;t=[];for(var o=0,i=n.length;o<i;o++)n[o]()}return function(n){t.push(n),e==null&&(e=st(s))}}const nt=I(),H=I();class ot{renderer;host;state;[P];_updateQueued;_active;constructor(e,s){this.renderer=e,this.host=s,this.state=new et(this.update.bind(this),s),this[P]=null,this._updateQueued=!1,this._active=!1}update(){this._active&&(this._updateQueued||(nt(()=>{let e=this.handlePhase(G);H(()=>{this.handlePhase(j,e),H(()=>{this.handlePhase(m)})}),this._updateQueued=!1}),this._updateQueued=!0))}handlePhase(e,s){switch(this[P]=e,e){case j:this.commit(s),this.runEffects(_);return;case G:return this.render();case m:return this.runEffects(m)}}render(){return this.state.run(()=>this.renderer.call(this.host,this.host))}runEffects(e){this.state._runEffects(e)}teardown(){this.state.teardown()}pause(){this._active=!1}resume(){this._active=!0}}const it=(...t)=>{const e=new CSSStyleSheet;return e.replaceSync(t.join("")),e},rt=t=>t?.map(e=>typeof e=="string"?it(e):e),at=(t="")=>t.replace(/-+([a-z])?/g,(e,s)=>s?s.toUpperCase():"");function ct(t){class e extends ot{frag;renderResult;constructor(o,i,a){super(o,a||i),this.frag=i}commit(o){this.renderResult=t(o,this.frag)}}function s(n,o,i){const a=(i||o||{}).baseElement||HTMLElement,{observedAttributes:b=[],useShadowDOM:k=!0,shadowRootInit:A={},styleSheets:y}=i||o||{},v=rt(n.styleSheets||y);class d extends a{_scheduler;static get observedAttributes(){return n.observedAttributes||b||[]}constructor(){if(super(),k===!1)this._scheduler=new e(n,this);else{const r=this.attachShadow({mode:"open",...A});v&&(r.adoptedStyleSheets=v),this._scheduler=new e(n,r,this)}}connectedCallback(){this._scheduler.resume(),this._scheduler.update(),this._scheduler.renderResult?.setConnected(!0)}disconnectedCallback(){this._scheduler.pause(),this._scheduler.teardown(),this._scheduler.renderResult?.setConnected(!1)}attributeChangedCallback(r,h,c){if(h===c)return;let u=c===""?!0:c;Reflect.set(this,at(r),u)}}function S(l){let r=l,h=!1;return Object.freeze({enumerable:!0,configurable:!0,get(){return r},set(c){h&&r===c||(h=!0,r=c,this._scheduler&&this._scheduler.update())}})}const M=new Proxy(a.prototype,{getPrototypeOf(l){return l},set(l,r,h,c){let u;return r in l?(u=Object.getOwnPropertyDescriptor(l,r),u&&u.set?(u.set.call(c,h),!0):(Reflect.set(l,r,h,c),!0)):(typeof r=="symbol"||r[0]==="_"?u={enumerable:!0,configurable:!0,writable:!0,value:h}:u=S(h),Object.defineProperty(c,r,u),u.set&&u.set.call(c,h),!0)}});return Object.setPrototypeOf(d.prototype,M),d}return s}class f{id;state;constructor(e,s){this.id=e,this.state=s}}function ut(t,...e){let s=tt(),n=C[w],o=n.get(s);return o||(o=new t(s,C,...e),n.set(s,o)),o.update(...e)}function p(t){return ut.bind(null,t)}function Q(t){return p(class extends f{callback;lastValues;values;_teardown;constructor(e,s,n,o){super(e,s),t(s,this)}update(e,s){this.callback=e,this.values=s}call(){const e=!this.values||this.hasChanged();this.lastValues=this.values,e&&this.run()}run(){this.teardown(),this._teardown=this.callback.call(this.state)}teardown(e){typeof this._teardown=="function"&&(this._teardown(),this._teardown=void 0),e&&(this.lastValues=this.values=void 0)}hasChanged(){return!this.lastValues||this.values.some((e,s)=>this.lastValues[s]!==e)}})}function U(t,e){t[m].push(e)}const Y=Q(U),lt=t=>t instanceof Element?t:t.startNode||t.endNode||t.parentNode,ht=p(class extends f{Context;value;_ranEffect;_unsubscribe;constructor(t,e,s){super(t,e),this._updater=this._updater.bind(this),this._ranEffect=!1,this._unsubscribe=null,U(e,this)}update(t){return this.Context!==t&&(this._subscribe(t),this.Context=t),this.value}call(){this._ranEffect||(this._ranEffect=!0,this._unsubscribe&&this._unsubscribe(),this._subscribe(this.Context),this.state.update())}_updater(t){this.value=t,this.state.update()}_subscribe(t){const e={Context:t,callback:this._updater};lt(this.state.host).dispatchEvent(new CustomEvent(R,{detail:e,bubbles:!0,cancelable:!0,composed:!0}));const{unsubscribe:n=null,value:o}=e;this.value=n?o:t.defaultValue,this._unsubscribe=n}teardown(){this._unsubscribe&&this._unsubscribe()}});function dt(t){return e=>{const s={Provider:class extends HTMLElement{listeners;_value;constructor(){super(),this.style.display="contents",this.listeners=new Set,this.addEventListener(R,this)}disconnectedCallback(){this.removeEventListener(R,this)}handleEvent(n){const{detail:o}=n;o.Context===s&&(o.value=this.value,o.unsubscribe=this.unsubscribe.bind(this,o.callback),this.listeners.add(o.callback),n.stopPropagation())}unsubscribe(n){this.listeners.delete(n)}set value(n){this._value=n;for(let o of this.listeners)o(n)}get value(){return this._value}},Consumer:t(function({render:n}){const o=ht(s);return n(o)},{useShadowDOM:!1}),defaultValue:e};return s}}const X=p(class extends f{value;values;constructor(t,e,s,n){super(t,e),this.value=s(),this.values=n}update(t,e){return this.hasChanged(e)&&(this.values=e,this.value=t()),this.value}hasChanged(t=[]){return t.some((e,s)=>this.values[s]!==e)}}),ft=(t,e)=>X(()=>t,e);function pt(t,e){t[_].push(e)}Q(pt);p(class extends f{args;constructor(t,e,s){super(t,e),this.updater=this.updater.bind(this),typeof s=="function"&&(s=s()),this.makeArgs(s)}update(){return this.args}updater(t){const[e]=this.args;typeof t=="function"&&(t=t(e)),!Object.is(e,t)&&(this.makeArgs(t),this.state.update())}makeArgs(t){this.args=Object.freeze([t,this.updater])}});p(class extends f{reducer;currentState;constructor(t,e,s,n,o){super(t,e),this.dispatch=this.dispatch.bind(this),this.currentState=o!==void 0?o(n):n}update(t){return this.reducer=t,[this.currentState,this.dispatch]}dispatch(t){this.currentState=this.reducer(this.currentState,t),this.state.update()}});const bt=/([A-Z])/gu;p(class extends f{property;eventName;constructor(t,e,s,n){if(super(t,e),this.state.virtual)throw new Error("Can't be used with virtual components.");this.updater=this.updater.bind(this),this.property=s,this.eventName=s.replace(bt,"-$1").toLowerCase()+"-changed",this.state.host[this.property]==null&&(typeof n=="function"&&(n=n()),n!=null&&this.updateProp(n))}update(t,e){return[this.state.host[this.property],this.updater]}updater(t){const e=this.state.host[this.property];typeof t=="function"&&(t=t(e)),!Object.is(e,t)&&this.updateProp(t)}updateProp(t){this.notify(t).defaultPrevented||(this.state.host[this.property]=t)}notify(t){const e=new CustomEvent(this.eventName,{detail:{value:t,path:this.property},cancelable:!0});return this.state.host.dispatchEvent(e),e}});function mt(t){let e=t;return{get current(){return e},set current(s){e=s},get value(){return e},set value(s){e=s}}}function gt(t){return X(()=>mt(t),[])}p(class extends f{update(){return this.state.host}});function vt({render:t}){const e=ct(t),s=dt(e);return{component:e,createContext:s}}const _t={CHILD:2},xt=t=>(...e)=>({_$litDirective$:t,values:e});class yt{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,s,n){this._$Ct=e,this._$AM=s,this._$Ci=n}_$AS(e,s){return this.update(e,s)}update(e,s){return this.render(...s)}}const x=(t,e)=>{const s=t._$AN;if(s===void 0)return!1;for(const n of s)n._$AO?.(e,!1),x(n,e);return!0},E=t=>{let e,s;do{if((e=t._$AM)===void 0)break;s=e._$AN,s.delete(t),t=e}while(s?.size===0)},W=t=>{for(let e;e=t._$AM;t=e){let s=e._$AN;if(s===void 0)e._$AN=s=new Set;else if(s.has(t))break;s.add(t),Ct(e)}};function $t(t){this._$AN!==void 0?(E(this),this._$AM=t,W(this)):this._$AM=t}function wt(t,e=!1,s=0){const n=this._$AH,o=this._$AN;if(o!==void 0&&o.size!==0)if(e)if(Array.isArray(n))for(let i=s;i<n.length;i++)x(n[i],!1),E(n[i]);else n!=null&&(x(n,!1),E(n));else x(this,t)}const Ct=t=>{t.type==_t.CHILD&&(t._$AP??=wt,t._$AQ??=$t)};class Et extends yt{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,s,n){super._$AT(e,s,n),W(this),this.isConnected=e._$AU}_$AO(e,s=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),s&&(x(this,e),E(this))}setValue(e){if(J(this._$Ct))this._$Ct._$AI(e,this);else{const s=[...this._$Ct._$AH];s[this._$Ci]=e,this._$Ct._$AI(s,this,0)}}disconnected(){}reconnected(){}}const{component:kt}=vt({render:K}),L=new WeakMap,At=xt(class extends Et{render(t){return D}update(t,[e]){const s=e!==this.G;return s&&this.G!==void 0&&this.rt(void 0),(s||this.lt!==this.ct)&&(this.G=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),D}rt(t){if(this.isConnected||(t=void 0),typeof this.G=="function"){const e=this.ht??globalThis;let s=L.get(e);s===void 0&&(s=new WeakMap,L.set(e,s)),s.get(this.G)!==void 0&&this.G.call(this.ht,void 0),s.set(this.G,t),t!==void 0&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){return typeof this.G=="function"?L.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),St=t=>class extends t{connectedCallback(){super.connectedCallback?.(),this.dispatchEvent(new CustomEvent("connected"))}};class F extends St(HTMLElement){static is="cosmoz-dialog-connectable"}customElements.define(F.is,F);const Mt=(t,...e)=>t.flatMap((s,n)=>[s,e[n]??""]).join(""),Pt=Mt`
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
`,q=p(class extends f{update(){return this.state.host}}),Lt=()=>{const t=q(),e=ft(()=>{t.dispatchEvent(new Event("close")),t.onClose?.()},[]);return Y(()=>{const s=t.shadowRoot;if(!s)return;const n=o=>o.target.value==="cancel"&&e();return s.addEventListener("click",n),()=>{s.removeEventListener("click",n)}},[]),{close:e}},Dt=(t,e,s)=>{const n=t.width/3,o=t.height/3,i=Math.min(window.innerWidth-2*n,Math.max(-n,e)),a=Math.min(window.innerHeight-2*o,Math.max(-o,s));return{x:i,y:a}},Rt=(t,e,s,n)=>o=>{if(!o.target.closest(e))return;const i=Dt,a=t.getBoundingClientRect(),b=o.clientX-a.x,k=o.clientY-a.y,A=(d,S)=>{const M=d-b,l=S-k,r=i(a,M,l);Object.assign(t.style,{inset:"auto",margin:"0",left:r.x+"px",top:r.y+"px",transform:"none"})},y=d=>A(d.clientX,d.clientY),v=d=>{document.removeEventListener("mousemove",y),document.removeEventListener("mouseup",v)};document.addEventListener("mousemove",y),document.addEventListener("mouseup",v)},zt=()=>{const t=q(),{unmovable:e}=t;Y(()=>{if(e)return;const s=t.shadowRoot;if(!s)return;const n=s.querySelector("dialog");if(!n)return;const o=Rt(n,".title");return s.addEventListener("mousedown",o),()=>s.removeEventListener("mousedown",o)},[e])},Ot=({title:t,content:e,closeable:s=!1,onClose:n})=>g`
		<div class="title" part="title">
			${t}
			${z(s,()=>g`
					<button class="close" @click=${n}>${V()}</button>
				`)}
		</div>
		<div class="content" part="content">${e}</div>
	`,Nt=(t,{observedAttributes:e,styles:s,...n}={})=>kt(o=>{const{close:i}=Lt();zt();const a=gt();return g`
				${z(s,()=>g`<style>
							${s}
						</style>`)}
				<cosmoz-dialog-connectable
					@connected=${()=>{const b=a.current;b&&!b.open&&b.showModal()}}
				>
					<dialog ${At(a)} @close=${i} part="dialog">
						${Ot({title:o.heading||o.title,content:t(o),closeable:o.closeable,onClose:i})}
					</dialog>
				</cosmoz-dialog-connectable>
			`},{observedAttributes:["title","heading","unmovable","closeable",...e??[]],styleSheets:[Pt],...n});customElements.define("demo-dialog",Nt(()=>g`<p>Dialog content goes here</p>`));const Tt=({heading:t,closeable:e,unmovable:s})=>g`
    <demo-dialog
        .heading=${t}
        ?closeable=${e}
        ?unmovable=${s}
    ></demo-dialog>
`,jt={title:"Dialog",render:Tt,argTypes:{heading:{control:"text",description:"The title displayed at the top of the dialog"},closeable:{control:"boolean",description:"Shows a close button in the title bar"},unmovable:{control:"boolean",description:"Prevents the dialog from being dragged"}}},$={args:{heading:"Dialog Title",closeable:!0,unmovable:!1}};$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  args: {
    heading: 'Dialog Title',
    closeable: true,
    unmovable: false
  }
}`,...$.parameters?.docs?.source}}};const Ht=["Basic"];export{$ as Basic,Ht as __namedExportsOrder,jt as default};
