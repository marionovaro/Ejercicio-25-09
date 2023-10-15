import "./Footer.css";
const templateFooter = () => `
<div class="footer">
    <h3>Mario's Final JS Project. Hope you enjoy playing it as much as I did creating it!</h3>
</div>
`
export const printTemplateFooter = () => {
    document.querySelector("footer").innerHTML = templateFooter();
    console.log("funciona3")
}