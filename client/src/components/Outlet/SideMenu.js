import React from "react";
import "../../css/SideMenu.scss";
const SideMenu = () => {
  (function () {
    var ui = {
      button: document.querySelector(".btn-float"),
      menuItems: document.querySelectorAll(".menu-float__item"),
      menu: document.querySelector(".menu-float"),
    };

    var controlMenu = function () {
      ui.button.classList.toggle("btn-float--active");
      ui.menu.classList.toggle("menu-float--hidden");

      // For accessibility
      ui.button.toggleAttributeBoolean("aria-expanded");
      ui.menu.toggleAttributeBoolean("aria-hidden");
    };

    var init = (function () {
      ui.button.addEventListener("click", controlMenu);
    })();

    var isAttributeValueBoolean = function (value) {
      return /^(true|false)$/g.test(value);
    };

    // Switch value between 'true' or 'false'
    Element.prototype.toggleAttributeBoolean = function (attr) {
      if (isAttributeValueBoolean(this.getAttribute(attr))) {
        this.setAttribute(
          attr,
          this.getAttribute(attr) === "true" ? "false" : "true"
        );
        return this.getAttribute(attr);
      }

      throw new Error(
        "The attribute does not exist or its value is not a Boolean"
      );
    };
  })();

  return (
    <div class="container">
      <button
        class="btn-float"
        aria-label="Menu de Produtos"
        aria-controls="menu"
        aria-expanded="false"
      ></button>

      <nav>
        <ul
          class="menu-float menu-float--hidden"
          id="menu"
          role="menu"
          aria-hidden="true"
        >
          <li role="presentation">
            <a class="menu-float__item" href="#" role="menuitem">
              <i class="menu-float__icon"></i>
              <p class="menu-float__text">Importar Produto</p>
            </a>
          </li>
          <li role="presentation">
            <a class="menu-float__item" href="#" role="menuitem">
              <i class="menu-float__icon"></i>
              <p class="menu-float__text">Novo Produto</p>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default SideMenu;
