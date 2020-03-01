import React from "react";
import "./About.css";

const img_profile =
  "https://scontent.fsin2-1.fna.fbcdn.net/v/t1.0-9/1508573_10152860854262753_8069599316435852797_n.jpg?_nc_cat=103&_nc_ohc=fbCc0jn0x4gAX_pOFfq&_nc_ht=scontent.fsin2-1.fna&oh=c9f43ee7c90e2f1a3d2e440215763e81&oe=5EDBE295";
const img_kfc = "https://media0.giphy.com/media/kfQraZBA266GAOq7w3/source.gif";

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      errorMessage: "",
      img: img_profile
    };
  }
  getWindowSize() {
    let heightWindow = window.innerHeight;
    let widthWindow = window.innerWidth;
    return heightWindow >= widthWindow ? widthWindow : heightWindow;
  }
  render() {
    return (
      <div className="about-profile"
        width={(this.getWindowSize() * 1.2)}>
        <p className="about-text">
          Wee Meng is a software developer who works for food
        </p>
        <div>
          <img
            src={this.state.img}
            alt="profile"
            width={this.getWindowSize() * 2 / 4}
            className="about-profile__image"
            onMouseEnter={() => {
              this.setState({
                img: img_kfc
              });
            }}
            onMouseOut={() => {
              this.setState({
                img: img_profile
              });
            }}
          ></img>
        </div>
      </div>
    );
  }
}

export default About;
