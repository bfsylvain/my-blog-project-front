import "./presentationSection.scss";
import VerticalForest from "../../../assets/images/vertical-forest.jpg";

export default function PresentationSection() {
  return (
    <div className="presentation-sections">
      <section className="section ">
        <div className="text-area">
        <h1>Tu pourras aussi trouver...</h1>
        <p className="presentation-text">
        Découvrez des lieux insolites, paradisiaques ou époustouflants à ravers les différents récits de voyages que vous trouverez ici. Découvrez des paysages naturels à couper le souffle, où chaque coin du globe révèle une beauté sauvage et authentique.
        </p>
        </div>
        <a href="/articles" className="button-link">Commencer la visite</a>
        </section>
      <section className="section right">
        <div className="img-container">
          <img className="img-right" src={VerticalForest} alt="forest" />
        </div>
      </section>
    </div>
  )
}
