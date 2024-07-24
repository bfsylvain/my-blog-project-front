import "./cardComment.scss";

export default function CardComment() {
  return (
    <div className="card-comment">
      <section className="img-area">
        <img className="author-img" src="https://picsum.photos/278/150" alt="user" />
      </section>
      <section className="comment-area">
        <header className="comment-header">
          <p className="commenter-name">Mouss</p>
          <p className="comment-date">25 janvier 2024</p>
        </header>
        <div className="comment-text-area">
          <p className="comment-text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde eaque
            harum quasi est labore cupiditate quod. Voluptas nemo impedit, dicta
            mollitia autem aspernatur quod in est sit soluta, aperiam
            perspiciatis.
          </p>
        </div>
      </section>
    </div>
  );
}
