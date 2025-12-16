class Popup {
  constructor({ popupSelector }) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close");

    this._handleEscapeClose = this._handleEscapeClose.bind(this);
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popup.classList.add("popup_visible");
    document.addEventListener("keyup", this._handleEscapeClose);
  }

  close() {
    this._popup.classList.remove("popup_visible");
    document.removeEventListener("keyup", this._handleEscapeClose);
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}

export default Popup;
