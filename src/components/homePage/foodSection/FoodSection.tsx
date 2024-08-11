import "./foodSection.scss";
const VerticalCocktail = "../../../assets/images/vertical-cocktail.avif"
export default function FoodSection() {
  return (
    <div className="presentation-sections">
    <section className="section right">
      <div className="img-container">
        <img className="img-right" src={VerticalCocktail} alt="forest" />
      </div>
    </section>
    <section className="section ">
      <div className="text-area">
      <h1>Ce que tu trouveras ici..</h1>
      <p className="presentation-text">
      De cocktails traditionnels à des créations innovantes, chaque article ici est un voyage délicieux qui éveillera vos papilles. Que vous soyez un gourmet passionné ou un amateur curieux, laissez-vous séduire par des propsitions gourmandes et savoureuses.      </p>
      </div>
      <a href="/articles" className="button-link">Commencer la visite</a>
    </section>

  </div>

  )
}
