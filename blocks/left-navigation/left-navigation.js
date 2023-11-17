import { getMetadata } from "../../scripts/aem.js";

/**
 * decorates the aside, mainly the left navigation
 * @param {Element} block The aside block element
 */
export default async function decorate(block) {
    // fetch aside content
    const leftNavMeta = getMetadata('left-nav');
    const leftNavPath = leftNavMeta ? new URL(leftNavMeta).pathname : '/left-nav';
    const resp = await fetch(`${leftNavPath}.plain.html`);
    if (resp.ok) {
        const html = await resp.text();
        block.innerHTML = html;
    }
    const paragraphs = document.querySelectorAll('.left-navigation p');
    paragraphs.forEach(paragraph => {
    paragraph.addEventListener('click', function() {
      const dropdown = this.nextElementSibling;
      // Toggle the 'hidden' class to show/hide the dropdown
      if (dropdown.style.display === 'none' || dropdown.style.display === '') {
        dropdown.style.display = 'block';
        paragraph.querySelector('img').src = "/icons/caret-down.svg";
      } else {
        dropdown.style.display = 'none';
        paragraph.querySelector('img').src = "/icons/caret-right.svg";
      }
    });
  });
}