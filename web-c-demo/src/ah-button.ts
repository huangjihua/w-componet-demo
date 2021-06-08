import { html, css, LitElement, property } from 'lit-element';

export class AhButton extends LitElement{
  static styles = css`
    :host {
      position: relative;
      display: inline-flex;
      padding: 4px 8px;
      box-sizing: border-box;
      vertical-align: middle;
      line-height: 1.8;
      overflow: hidden;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--borderColor, rgba(0, 0, 0, 0.2));
      font-size: 14px;
      color: var(--fontColor, #333);
      border-radius: var(--borderRadius, 4px);
      transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s, color 0.3s;
    }

    :host([shape="circle"]) {
      border-radius: 50%;
    }

    :host(:not([disabled]):active) {
      z-index: 1;
      transform: translateY(0.1em);
    }

    :host([disabled]),
    :host([loading]) {
      pointer-events: none;
      opacity: 0.6;
    }

    :host([block]) {
      display: flex;
    }

    :host([disabled]:not([type])) {
      background: rgba(0, 0, 0, 0.1);
    }

    :host([disabled]) .btn,
    :host([loading]) .btn {
      cursor: not-allowed;
      pointer-events: all;
    }

    :host(:not([type="primary"]):not([type="danger"]):not([disabled]):hover),
    :host(:not([type="primary"]):not([type="danger"]):focus-within),
    :host([type="flat"][focus]) {
      color: var(--themeColor, #05f);
      border-color: var(--themeColor, #05f);
    }

    :host(:not([type="primary"]):not([type="danger"])) .btn::after {
      background-image: radial-gradient(circle,
          var(--themeColor, #05f) 10%,
          transparent 10.01%);
    }

    :host([type="primary"]) {
      color: #fff;
      background: var(--themeBackground, var(--themeColor, #05f));
    }

    :host([type="danger"]) {
      color: #fff;
      background: var(--themeBackground, var(--dangerColor, #f60));
    }

    :host([type="dashed"]) {
      border-style: dashed;
    }

    :host([type="flat"]),
    :host([type="primary"]),
    :host([type="danger"]) {
      border: 0;
      padding: calc(4px + 1px) calc(8px + 1px);
    }

    :host([type="flat"]) .btn::before {
      content: "";
      position: absolute;
      background: var(--themeColor, #05f);
      pointer-events: none;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      opacity: 0;
      transition: 0.3s;
    }

    :host([type="flat"]:not([disabled]):hover) .btn::before {
      opacity: 0.1;
    }

    :host(:not([disabled]):hover) {
      z-index: 1;
    }

    :host([type="flat"]:focus-within) .btn:before,
    :host([type="flat"][focus]) .btn:before {
      opacity: 0.2;
    }

    :host(:focus-within) {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .ah-btn {
      background: none;
      outline: 0;
      border: 0;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      padding: 0;
      user-select: none;
      cursor: unset;
    }

    ::-moz-focus-inner {
      border: 0;
    }

    .ah-btn::after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      left: var(--x, 0);
      top: var(--y, 0);
      pointer-events: none;
      background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
      background-repeat: no-repeat;
      background-position: 50%;
      transform: translate(-50%, -50%) scale(10);
      opacity: 0;
      transition: transform 0.3s, opacity 0.8s;
    }

    .ah-btn:not([disabled]):active::after {
      transform: translate(-50%, -50%) scale(0);
      opacity: 0.3;
      transition: 0s;
    }

    wx-icon {
      margin-right: 5px;
      transition: none;
    }

    :host(:empty) wx-icon {
      margin: auto;
    }

    :host(:empty) {
      padding: 8px;
    }

    :host([type="flat"]:empty),
    :host([type="primary"]:empty) {
      padding: calc(8px + 1px);
    }

    ::slotted(wx-icon) {
      transition: none;
    }

    :host([href]) {
      cursor: pointer;
    }
  `;

  // 按钮风格：primary,dashed,flat,danger和default
  @property({ type: String }) type = "default";

  // 转换成a标签
  @property({ type: String }) href = "";

  @property({ type: String }) target = null || "_blank";

  @property({ type: String }) rel = "";

  // 下载按钮
  @property({ type: String }) download = false;

  // 带loading
  @property({ type: Boolean }) loading = false;

  // 左边带图标，left,heart,search,link
  @property({ type: String }) icon = "";

  // 形状 circle
  @property({ type: String }) shape = "circle";

  // 适合其父元素宽度
  @property({ type: Boolean }) block = false;

  // 是否禁用
  @property({ type: Boolean }) disabled = false;

  // 状态切换
  @property({ type: Boolean }) toggle = this.hasAttribute("toggle");

  @property({ type: Boolean }) checked = false;



  connectedCallback() {
    super.connectedCallback();
    this.onmousedown = e => {
      const { left, top } = this.getBoundingClientRect();
      if (!this.disabled) {
        // 按钮点击动态波纹效果位置
        this.style.setProperty("--x", `${e.clientX - left}px`);
        this.style.setProperty("--y", `${e.clientY - top}px`);
      }
    };
  }

  // focus() {
  //   const btn = this.shadowRoot.querySelector(".ah-btn") as HTMLElement;
  //   btn.focus();
  // }

  firstUpdated() {
    this.addEventListener("click", () => {
      if (this.toggle) {
        this.checked = !this.checked;
        if (this.checked) {
          this.setAttribute("checked", "");
        } else {
          this.removeAttribute("checked");
        }
      }
    });
    this.addEventListener("keydown", e => {
      if (e.keyCode === 13) e.stopPropagation();
    });
  }


  render() {
      let result;
      const _loading = this.loading
        ? html`
            <wx-loading></wx-loading>
          `
        : "";
      const button = this.disabled
        ? html`
          <button class="ah-btn" id="ah-btn" name="ah-btn" disabled="${this.disabled}"></button>
        `
        : html`
            <button class="ah-btn" id="ah-btn" name="ah-btn"></button>
          `;
      if (this.href) {
        result = html`
          <a id="ah-btn" class="ah-btn" name="ah-btn" href="${this.href}" target="${this.target}"
          rel="${this.rel}" download="${this.download}"> </a>
        `;
      } else {
        result = html`
          ${_loading} ${button}
        `;
      }
      result = html`
        ${result}
        ${!this.loading && this.icon && this.icon !== "null"
          ? html`
              <wx-icon name="${this.icon}"></wx-icon>
            `
          : ""}
        <slot></slot>
      `;
      return result;
  }
}
if (!customElements.get("ah-button")) {
  customElements.define("ah-button", AhButton);
}
