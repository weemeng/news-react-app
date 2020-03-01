const React = require("react");
const axios = require("axios");

function SetCommentsDetails(props) {
  return (
    <div>
      <p>{props.title}</p>
      <p>
        <img src={props.imgsrc} alt={props.title} className="news__img"></img>
      </p>
      <p className="news__sourceDate">
        {props.source} | {time.toDateString()}
      </p>
      <span className="headline_top">______________</span>
      <p className="news__description">{props.description}</p>
      <span className="headline_bot">______________</span>
    </div>
  );
}

class CommentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state({
      status: "ok",
      commentsData: {},
      userLoggedIn: false
    });
  }

  attemptGetRequest() {
    axios
      .get("/user")
      .then(res => {
        this.setState({
          loginStatus: true
        });
      })
      .catch(err => {
        console.log("User not logged in");
      });
  }

  readComments() {
    axios
      .get(`/news/${this.state.newsId}/comments`)
      .then(res => {
        this.setState({
          commentsData: res.data
        });
      })
      .catch(err => {
        console.log(
          "AXIOS Unable to read comments. Go think about what you have done"
        );
        console.log(err);
      });
  }

  postComments() {
    axios
      .get(`/news/${this.state.newsId}/comments`)
      .then(res => {
        this.setState({
          commentsData: res.data
        });
      })
      .catch(err => {
        console.log(
          "AXIOS Unable to read comments. Go think about what you have done"
        );
        console.log(err);
      });
  }

  displayComments() {
    SetCommentsDetails();
  }

  render() {
    const { newsId } = this.props;
    return (
      <div>
        <div>{!!this.state.userLoggedIn ? <addCommentArea /> : true}</div>
      </div>
    );
  }
}

module.exports = CommentComponent;
