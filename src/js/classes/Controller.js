import parseData from "../parseData";
import Win from "./Win";
import Rotate from "./Rotate";
import { Router } from "../util/router";

export default class Controller {
  constructor(config) {
    console.log("Controller config", config);

    const _STATE = _A;

    if (!_STATE.is[404]) {
      _STATE.mutating = true;
      _STATE.page = {};
      _STATE.fromBack = false;

      this.transitionM = config.transition.mutation;
      this.device = config.device;

      R.BM(this, ["eD"]);

      new Win(this.device);
      if (this.device === "m") new Rotate();

      _STATE.engine = new config.engine();

      this.onPopstate();
      R.L(document.body, "a", "click", this.eD);

      new config.transition.intro(config => {
        this.intro(config);
      });
    }
  }

  onPopstate() {
    const doc = document;
    let isComplete = doc.readyState === "complete";
    let isLoading = !isComplete;

    onload = () => {
      setTimeout(() => {
        isLoading = false;
      }, 0);
    };

    onpopstate = event => {
      if (isLoading && doc.readyState === "complete") {
        R.PD(event);
        event.stopImmediatePropagation();
      }

      const _STATE = _A;
      if (!R.Is.und(_STATE.config.routes)) {
        if (_STATE.mutating) {
          this.hPS();
        } else {
          _STATE.mutating = true;
          this.out(location.pathname, "back");
        }
      }
    };
  }

  eD(event) {
    console.log("Event", event);

    const _STATE = _A;
    let target = event.target;
    let isAnchor = false;
    let isSubmit = false;

    while (target) {
      const tagName = target.tagName;

      if (tagName === "A") {
        isAnchor = true;
        break;
      }

      if ((tagName === "INPUT" || tagName === "BUTTON") && target.type === "submit") {
        isSubmit = true;
        break;
      }

      target = target.parentNode;
    }

    if (isAnchor) {
      const href = target.href;
      const hrefPrefix = href.substring(0, 3);

      if (!target.hasAttribute("target") && !["mai", "tel"].includes(hrefPrefix)) {
        R.PD(event);

        if (!_STATE.mutating) {
          const newUrl = href.replace(/^.*\/\/[^/]+/, "");
          if (newUrl !== _STATE.route.new.url) {
            _STATE.mutating = true;
            this.out(newUrl, target);
          } else if (target.id === "nav-logo") {
            location.href = "/";
          }
        }
      }
    } else if (isSubmit) {
      R.PD(event);
    }
  }

  intro(callback) {
    const _STATE = _A;

    R.Fetch({
      url: `${_STATE.route.new.url}?webp=${_STATE.webp}&device=${this.device}`,
      type: "html",
      success: response => {
        const parsedData = parseData;
        _STATE.config.routes = parsedData.routes;
        _STATE.data = parsedData.data;
        this.cache = parsedData.cache;

        this.add(document.body, "afterbegin", parsedData.body);

        this.main = R.G.id("main");
        this.transitionM = new this.transitionM();

        callback();
      }
    });
  }

  out(url, target) {
    Router(url);

    const _STATE = _A;
    _STATE.target = target;
    _STATE.fromBack = target === "back";

    _STATE.page.update = () => {
      this.in();
    };

    this.transitionM.out();
  }

  in() {
    const _STATE = _A;
    const cachedData = this.cache[_STATE.route.new.url];

    document.title = cachedData.title;

    if (_STATE.target !== "back") {
      this.hPS();
    }

    _STATE.page.insertNew = () => {
      this.add(this.main, "beforeend", cachedData.html);
    };

    _STATE.page.removeOld = () => {
      const firstChild = this.main.children[0];
      firstChild.parentNode.removeChild(firstChild);
    };

    this.transitionM.in();
  }

  add(element, position, content) {
    element.insertAdjacentHTML(position, content);
  }

  hPS() {
    const newUrl = _A.route.new.url;
    history.pushState({ page: newUrl }, "", newUrl);
  }
}
