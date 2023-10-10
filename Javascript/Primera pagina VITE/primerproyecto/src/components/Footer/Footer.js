import "./Footer.css";

const template = () => `

<h3><span>With love from </span> from Mario Novaro</h3>
`;

export const printTemplateFooter = () => {
  document.querySelector("footer").innerHTML = template();
};
