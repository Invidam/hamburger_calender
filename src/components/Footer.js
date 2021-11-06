import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "../css/footer.css";
const githubElement = (
  <a href="https://github.com/Invidam" target="noreferrer">
    <FontAwesomeIcon
      className="footer-icon footer-icon__github"
      icon={faGithub}
    />
  </a>
);
export const Footer = () => {
  const iconCopyRightElement = (
    <a
      target="noreferrer"
      className=""
      href="https://www.freepik.com/vectors/food"
      title="Food vector created by rawpixel.com - www.freepik.com"
    >
      <img
        alt="app-icon"
        className="footer-icon footer-icon__icon"
        src="https://user-images.githubusercontent.com/71889359/133923788-1e176d98-acda-47ab-9eba-3815e3903ecf.png"
      ></img>
    </a>
  );
  const copyRightElement = (
    <div className="footer-content">
      <span className="footer-text">
        Web page's icon is copyed by{" "}
        <a target="noreferrer" href="freepik.com">
          freepik.com
        </a>
      </span>
      <span className="footer-text">
        Web page's style is copyed by{" "}
        <a target="noreferrer" href="https://www.bk.com/">
          BurgerKing
        </a>
      </span>
    </div>
  );
  return (
    <footer className="footer">
      <div className="footer-column footer-column__icon">
        {iconCopyRightElement} {githubElement}
      </div>
      <div className="footer-column">{copyRightElement}</div>

      <div className="footer-column"></div>
    </footer>
  );
};
